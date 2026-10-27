import { Brand } from "../Brand";
export default function Manifesto() {
  return (
    <section className="manifesto">
      <div className="container manifesto-inner">
        <div>
          <p className="eyebrow">A essência Munare</p>
          <h2>
            Forma, função
            <br />e <em>identidade.</em>
          </h2>
        </div>
        <div className="manifesto-aside">
          <Brand symbolOnly />
          <p>
            Acreditamos em espaços que acolhem, em escolhas que têm propósito e
            na beleza que nasce do equilíbrio.
          </p>
        </div>
      </div>
    </section>
  );
}
