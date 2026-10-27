import Image from "next/image";
import { Brand } from "../Brand";
export default function Studio() {
  return (
    <section className="section studio">
      <div className="container studio-grid">
        <div className="studio-copy">
          <p className="eyebrow section-label">Sobre a Munare</p>
          <h2>
            Arquitetura feita para pessoas e para a forma como{" "}
            <em>elas vivem.</em>
          </h2>
          <p>
            A Munare nasce da vontade de aproximar pessoas e espaços. De criar
            ambientes em que a identidade de cada pessoa encontre lugar nos
            materiais, nas proporções e nos pequenos detalhes.
          </p>
          <p>
            Um trabalho pensado com sensibilidade, escuta e intenção. Porque
            morar também é pertencer.
          </p>
          <Brand />
        </div>
        <div className="studio-image image-frame">
          <Image
            src="/projects/studio.jpg"
            alt="Referência de ambiente acolhedor com poltrona, materiais naturais e luz do dia"
            fill
            sizes="(max-width: 760px) 100vw, 45vw"
          />
        </div>
      </div>
    </section>
  );
}
