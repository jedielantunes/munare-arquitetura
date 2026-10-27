import Image from "next/image";
export default function FinalCTA() {
  return (
    <section className="final-cta">
      <Image src="/projects/casa-patio.jpg" alt="" fill sizes="100vw" />
      <div className="container final-cta-content">
        <p className="eyebrow">Um novo olhar para o seu lugar</p>
        <h2>
          Te ajudo a transformar ideias em um espaço que{" "}
          <em>faça sentido para você.</em>
        </h2>
        <a
          href="https://wa.me/5511963375527"
          target="_blank"
          rel="noopener noreferrer"
          className="button button-light"
        >
          Vamos conversar <span aria-hidden="true">→</span>
          <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
        </a>
      </div>
    </section>
  );
}
