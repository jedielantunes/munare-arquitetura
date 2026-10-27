import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Projects from "@/components/home/Projects";
import Manifesto from "@/components/home/Manifesto";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import Studio from "@/components/home/Studio";
import Contact from "@/components/home/Contact";
import FinalCTA from "@/components/home/FinalCTA";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { site } from "@/config/site";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}#organization`,
  name: site.name,
  url: site.url,
  logo: new URL("/brand/logomunare.png", site.url).href,
  email: site.email,
  telephone: site.phone,
  sameAs: [site.instagram, site.youtube],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main id="conteudo" className="min-h-screen">
        <Hero />
        <About />
        <Projects />
        <Manifesto />
        <Services />
        <Process />
        <Studio />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  );
}
