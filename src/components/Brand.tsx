import Image from "next/image";

export function Brand({ symbolOnly = false }: { symbolOnly?: boolean }) {
  return (
    <span className={`brand ${symbolOnly ? "brand-symbol-only" : ""}`}>
      <span className="brand-symbol">
        <Image
          src="/brand/logomunare.png"
          alt={symbolOnly ? "Símbolo Munare Arquitetura" : ""}
          fill
          sizes="90px"
        />
      </span>
      {!symbolOnly && (
        <span className="brand-name">
          MUNARE<span>ARQUITETURA</span>
        </span>
      )}
    </span>
  );
}
