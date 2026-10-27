import { NextResponse } from "next/server";
import { services } from "@/data/services";

export const runtime = "nodejs";
const subjects = new Set([...services.map(([name]) => name), "Outro assunto"]);
const unavailable =
  "O envio pelo formulário está temporariamente indisponível. Fale pelo WhatsApp ou envie um e-mail para Munareconceito@gmail.com.";
const json = (message: string, status: number) =>
  NextResponse.json(
    { message },
    { status, headers: { "Cache-Control": "no-store" } },
  );

export async function POST(request: Request) {
  // Same-origin browser submissions only. Requests without Origin remain usable by non-browser clients.
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return json("Origem não permitida.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return json("Formato de mensagem inválido.", 415);
  if (Number(request.headers.get("content-length") || 0) > 24000)
    return json("Mensagem muito longa.", 413);
  let data: Record<string, unknown>;
  try {
    // Bounded streaming read also protects requests without Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return json("Mensagem inválida.", 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) {
        await reader.cancel();
        return json("Mensagem muito longa.", 413);
      }
      chunks.push(value);
    }
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return json("Mensagem inválida.", 400);
    data = parsed as Record<string, unknown>;
  } catch {
    return json("Mensagem inválida.", 400);
  }
  if (typeof data.website === "string" && data.website.trim())
    return json("Não foi possível validar o formulário.", 400);
  const get = (key: string) =>
    typeof data[key] === "string" ? data[key].trim() : "";
  const name = get("name"),
    email = get("email"),
    phone = get("phone"),
    subject = get("subject"),
    message = get("message");
  if (
    name.length < 2 ||
    name.length > 100 ||
    /[\r\n]/.test(name) ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !/^[+\d ()-]{8,30}$/.test(phone) ||
    phone.replace(/\D/g, "").length < 8 ||
    !subjects.has(subject) ||
    message.length < 10 ||
    message.length > 5000
  )
    return json(
      "Confira os campos: nome, e-mail, telefone, assunto e mensagem (mínimo de 10 caracteres).",
      400,
    );
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  if (!key || !from) return json(unavailable, 503);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: ["Munareconceito@gmail.com"],
        reply_to: email,
        subject: `Contato pelo site — ${subject}`,
        text: `Nome: ${name}\nE-mail: ${email}\nTelefone / WhatsApp: ${phone}\nAssunto: ${subject}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) return json(unavailable, 502);
    const result: unknown = await response.json();
    if (
      !result ||
      typeof result !== "object" ||
      !("id" in result) ||
      typeof result.id !== "string"
    )
      return json(unavailable, 502);
    return json("Mensagem enviada com sucesso.", 200);
  } catch {
    return json(unavailable, 502);
  }
}
