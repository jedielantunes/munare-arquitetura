import fs from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";
import test from "node:test";
import assert from "node:assert/strict";
const transpile = (path) =>
  ts.transpileModule(fs.readFileSync(path, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
function loadRoute(
  env = {},
  fetch = () => {
    throw Error("Unexpected external request");
  },
) {
  const exports = {};
  const require = createRequire(import.meta.url);
  const services = {};
  vm.runInNewContext(transpile("src/data/services.ts"), { exports: services });
  vm.runInNewContext(transpile("src/app/api/contact/route.ts"), {
    exports,
    require: (id) => (id === "@/data/services" ? services : require(id)),
    Buffer,
    URL,
    AbortSignal,
    process: { env },
    fetch,
  });
  return exports.POST;
}
const valid = {
  name: "Pessoa de teste",
  email: "teste@example.com",
  phone: "11999999999",
  subject: "Reforma",
  message: "Mensagem ficticia para testar o formulario.",
  website: "",
};
const request = (body = valid, headers = {}) =>
  new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "http://localhost:3000",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
test("rejects invalid JSON, fields, non-object payloads and invalid subjects", async () => {
  const post = loadRoute();
  for (const body of [
    "{",
    null,
    [],
    {},
    { ...valid, email: "invalid" },
    { ...valid, message: "curta" },
    { ...valid, subject: "invalid" },
    { ...valid, phone: "--------" },
    { ...valid, name: "a\nb" },
  ])
    assert.equal((await post(request(body))).status, 400);
});
test("rejects cross-origin requests", async () =>
  assert.equal(
    (await loadRoute()(request(valid, { origin: "https://example.com" })))
      .status,
    403,
  ));
test("rejects unsupported content type", async () =>
  assert.equal(
    (await loadRoute()(request(valid, { "content-type": "text/plain" })))
      .status,
    415,
  ));
test("bounds message payload, including without content length", async () =>
  assert.equal((await loadRoute()(request("x".repeat(25000)))).status, 413));
test("rejects honeypot submissions", async () =>
  assert.equal(
    (await loadRoute()(request({ ...valid, website: "bot.example" }))).status,
    400,
  ));
test("returns clear unavailable status without credentials", async () =>
  assert.equal((await loadRoute()(request())).status, 503));
test("sends to fixed address with reply-to; only confirms provider acceptance", async () => {
  let calls = 0;
  const post = loadRoute(
    { RESEND_API_KEY: "fake-test-key", CONTACT_FROM: "test@example.com" },
    async (url, options) => {
      calls++;
      assert.equal(url, "https://api.resend.com/emails");
      const body = JSON.parse(options.body);
      assert.deepEqual(body.to, ["Munareconceito@gmail.com"]);
      assert.equal(body.reply_to, valid.email);
      assert.match(body.text, /Mensagem ficticia/);
      return Response.json({ id: "test-id" });
    },
  );
  assert.equal((await post(request())).status, 200);
  assert.equal(calls, 1);
});
test("handles provider rejection, invalid success response and network failure", async () => {
  for (const fetch of [
    async () => Response.json({ message: "error" }, { status: 401 }),
    async () => Response.json({}),
    async () => {
      throw Error("network");
    },
  ]) {
    const response = await loadRoute(
      { RESEND_API_KEY: "fake-test-key", CONTACT_FROM: "test@example.com" },
      fetch,
    )(request());
    assert.equal(response.status, 502);
    assert.doesNotMatch(await response.text(), /fake-test-key/);
  }
});
