import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { site } from "@/config/site";
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
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  publisher: site.name,
  category: "architecture",
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    locale: "pt_BR",
    type: "website",
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/opengraph-image",
        alt: "Munare Arquitetura — Arquitetura, Interiores e Conceito",
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
