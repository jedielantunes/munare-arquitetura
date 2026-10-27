import Image from "next/image";
export default function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-photo">
        <Image
          src="/projects/hero.jpg"
          alt="Ambiente residencial com madeira, vegetação e luz natural"
          fill
          priority
          sizes="(max-width: 760px) 100vw, 62vw"
        />
      </div>
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="small-line" /> Espaços com propósito
          </p>
          <h1 id="hero-title">
            Te ajudo a alcançar a <em>estética ideal</em> para sua casa.
          </h1>
          <p className="hero-description">
            Crio do zero ideias, conceitos e soluções em harmonia com o seu
            espaço.
          </p>
          <div className="hero-actions">
            <a href="#projetos" className="button">
              Conheça meus projetos <span aria-hidden="true">→</span>
            </a>
            <a href="#contato" className="text-link">
              Fale comigo ↗
            </a>
          </div>
          <p className="hero-disciplines eyebrow">
            Arquitetura · Interiores · Conceito
          </p>
        </div>
      </div>
      <span className="hero-image-caption">A beleza de se sentir em casa.</span>
      <a
        href="#sobre"
        className="hero-scroll"
        aria-label="Conheça o conceito da Munare"
      >
        Explore <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
