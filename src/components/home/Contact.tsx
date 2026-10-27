"use client";
import { useRef, useState, type FormEvent } from "react";
import { SocialLinks } from "../SocialLinks";

export default function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const statusRef = useRef<HTMLParagraphElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const form = event.currentTarget;
    setState("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        signal: AbortSignal.timeout(20000),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.message ||
            "Não foi possível enviar. Tente novamente ou fale pelo WhatsApp.",
        );
      setState("success");
      setMessage(
        "Mensagem enviada! Obrigado por compartilhar sua ideia. Entraremos em contato pelo e-mail informado.",
      );
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error &&
          error.name !== "TimeoutError" &&
          error.name !== "TypeError"
          ? error.message
          : "Não foi possível confirmar o envio. Tente novamente ou fale pelo WhatsApp.",
      );
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }
  return (
    <section id="contato" className="section contact">
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow section-label">04 — Contato</p>
          <h2>
            Vamos conversar sobre <em>seu espaço?</em>
          </h2>
          <p>Conte um pouco sobre o que você está planejando.</p>
          <a className="contact-email" href="mailto:Munareconceito@gmail.com">
            Munareconceito@gmail.com <span aria-hidden="true">↗</span>
          </a>
          <SocialLinks />
          <p className="contact-note">
            Cada boa ideia começa com uma conversa.
          </p>
        </div>
        <form
          onSubmit={submit}
          className="contact-form"
          aria-busy={state === "sending"}
        >
          <div className="form-grid">
            <label>
              Nome
              <input
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                placeholder="Como podemos te chamar?"
              />
            </label>
            <label>
              E-mail
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="seu@email.com"
              />
            </label>
            <label>
              Telefone / WhatsApp
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                minLength={8}
                maxLength={30}
                pattern={String.raw`[+0-9 \(\)\-]{8,30}`}
                placeholder="(11) 99999-9999"
              />
            </label>
            <label>
              Assunto
              <select name="subject" required defaultValue="">
                <option value="" disabled>
                  Sobre o que vamos conversar?
                </option>
                <option>Projeto arquitetônico</option>
                <option>Arquitetura residencial</option>
                <option>Design de interiores</option>
                <option>Reforma</option>
                <option>Consultoria arquitetônica</option>
                <option>Conceito e composição de ambientes</option>
                <option>Outro assunto</option>
              </select>
            </label>
          </div>
          <label>
            Mensagem
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={5000}
              rows={4}
              placeholder="Conte um pouco sobre sua ideia, seu espaço e o que você imagina para ele."
            />
          </label>
          <div className="honeypot" aria-hidden="true">
            <label>
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <p className="form-privacy">
            Usaremos seus dados apenas para responder ao seu contato.
          </p>
          <button
            className="button"
            type="submit"
            disabled={state === "sending"}
          >
            {state === "sending" ? "Enviando…" : "Enviar mensagem"}
            <span aria-hidden="true">↗</span>
          </button>
          <p
            ref={statusRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className={`form-status ${state}`}
            data-state={state}
          >
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}
