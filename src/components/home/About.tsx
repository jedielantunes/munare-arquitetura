import Image from "next/image";
export default function About() {
  return (
    <section id="sobre" className="section about">
      <div className="container">
        <p className="eyebrow section-label">01 — Sobre</p>
        <div className="about-grid">
          <div className="about-image image-frame">
            <Image
              src="/projects/conceito.jpg"
              alt="Detalhes de um interior com texturas naturais, madeira e luz suave"
              fill
              sizes="(max-width: 760px) 100vw, 38vw"
            />
          </div>
          <div className="about-copy">
            <p className="eyebrow">Um olhar para o que é seu</p>
            <h2>
              Cada espaço pede uma <em>solução única.</em>
            </h2>
            <p>
              Um projeto começa pela escuta. Pelos seus desejos, pela sua rotina
              e pelo potencial do lugar que você escolheu para viver.
            </p>
            <p>
              Na Munare, estética e funcionalidade caminham juntas. Cada escolha
              busca o equilíbrio entre o espaço existente e a identidade de quem
              o habita.
            </p>
            <a className="text-link" href="#servicos">
              Conheça nossas possibilidades <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
