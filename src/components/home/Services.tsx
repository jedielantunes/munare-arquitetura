import { services } from "@/data/services";
export default function Services() {
  return (
    <section id="servicos" className="section services">
      <div className="container services-grid">
        <div>
          <p className="eyebrow section-label">03 — Serviços</p>
          <h2>
            Seu espaço.
            <br />
            <em>Novas possibilidades.</em>
          </h2>
          <p className="services-intro">
            Do primeiro conceito aos detalhes que fazem a diferença. Um olhar
            completo para o seu projeto.
          </p>
        </div>
        <ol className="service-list">
          {services.map(([name, description], index) => (
            <li key={name}>
              <span className="service-number">0{index + 1}</span>
              <div>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
              <span aria-hidden="true">↗</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
