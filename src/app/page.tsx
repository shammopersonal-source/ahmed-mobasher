import { About } from "@/components/About";
import { Agency } from "@/components/Agency";
import { Certificates } from "@/components/Certificates";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";

export default function Page() {
  return (
    <>
      <a href="#about" className="btn btn-navy sr-only z-[70] focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Work />
        <Agency />
        <Certificates />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
