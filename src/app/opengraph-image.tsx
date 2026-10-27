import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const alt = "Munare Arquitetura — Arquitetura, Interiores e Conceito";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public/brand/logomunare.png"),
  );
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#232624",
        color: "#efeee8",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        border: "24px solid #e2e0d8",
      }}
    >
      <div
        style={{
          display: "flex",
          width: 142,
          height: 142,
          borderRadius: "50%",
          overflow: "hidden",
          marginBottom: 36,
        }}
      >
        {/* O renderizador de Open Graph requer img com o arquivo original embutido. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          width={142}
          height={142}
          alt=""
          style={{ objectFit: "cover", objectPosition: "center 57%" }}
        />
      </div>
      <div style={{ display: "flex", fontSize: 67, letterSpacing: 16 }}>
        MUNARE
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 20,
          letterSpacing: 10,
          marginTop: 12,
        }}
      >
        ARQUITETURA
      </div>
      <div
        style={{
          display: "flex",
          width: 70,
          height: 1,
          background: "#aeb3a6",
          marginTop: 40,
        }}
      />
      <div
        style={{
          display: "flex",
          fontSize: 18,
          color: "#c1c4b9",
          letterSpacing: 3,
          marginTop: 28,
        }}
      >
        Arquitetura · Interiores · Conceito
      </div>
    </div>,
    size,
  );
}
