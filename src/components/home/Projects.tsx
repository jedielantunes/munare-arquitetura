import Image from "next/image";
import { projects } from "@/data/projects";
export default function Projects() {
  return (
    <section id="projetos" className="section projects">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow section-label">02 — Projetos</p>
            <h2>
              Espaços para <em>se inspirar.</em>
            </h2>
          </div>
          <p>
            Um encontro entre linhas, materiais
            <br className="desktop-break" /> e novas formas de viver.
          </p>
        </div>
        <p className="placeholder-note">
          Seleção ilustrativa · Nomes e fotografias temporários, sem vínculo com
          obras realizadas pela Munare.
        </p>
        <div className="project-list">
          {projects.map((project, index) => (
            <figure
              className={`project project-${index + 1}`}
              key={project.name}
            >
              <div className="project-image image-frame">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 70vw, 62vw"
                />
              </div>
              <figcaption>
                <div>
                  <span className="eyebrow">
                    {project.category} · Estudo ilustrativo
                  </span>
                  <h3>{project.name}</h3>
                </div>
                <span
                  className="project-future"
                  aria-label="Detalhes do projeto disponíveis em uma próxima etapa"
                >
                  Ver projeto ↗<small>Em breve</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
