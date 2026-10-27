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
export default function Home() {
  return (
    <>
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
    </>
  );
}
