const steps = [
  ["Conversa", "Tudo começa com o que você imagina e deseja."],
  [
    "Entendimento do espaço",
    "Olhamos para a rotina, o lugar e suas possibilidades.",
  ],
  ["Conceito", "Damos forma às ideias e definimos uma direção."],
  ["Projeto", "Conectamos estética, funcionalidade e identidade."],
  ["Detalhamento", "Cuidamos das escolhas que dão unidade ao conjunto."],
];
export default function Process() {
  return (
    <section className="section process">
      <div className="container">
        <p className="eyebrow section-label">O caminho, juntos</p>
        <h2>
          Da ideia <em>ao espaço.</em>
        </h2>
        <ol className="process-list">
          {steps.map(([title, text], index) => (
            <li key={title}>
              <span className="eyebrow">
                0{index + 1}
                <span aria-hidden="true">↗</span>
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
