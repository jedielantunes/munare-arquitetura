import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-editorial",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: "Munare Arquitetura | Arquitetura e Interiores",
  description:
    "Ideias, conceitos e soluções de arquitetura e interiores criadas em harmonia com o seu espaço.",
  openGraph: {
    title: "Munare Arquitetura | Arquitetura e Interiores",
    description:
      "Ideias, conceitos e soluções de arquitetura e interiores criadas em harmonia com o seu espaço.",
    locale: "pt_BR",
    type: "website",
    siteName: "Munare Arquitetura",
    images: [
      {
        url: "/brand/logomunare.png",
        width: 544,
        height: 701,
        alt: "Símbolo da Munare Arquitetura",
      },
    ],
  },
  icons: { icon: "/brand/logomunare.png", apple: "/brand/logomunare.png" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${serif.variable} ${sans.variable}`}>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
