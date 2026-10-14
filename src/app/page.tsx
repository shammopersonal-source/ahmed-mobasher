import { Agency } from "@/components/Agency";
import { Contact } from "@/components/Contact";
import { Craft } from "@/components/Craft";
import { Credits } from "@/components/Credits";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { JCutCue } from "@/components/JCutCue";
import { Reviews } from "@/components/Reviews";
import { Story } from "@/components/Story";
import { Timeline } from "@/components/Timeline";
import { TopBar } from "@/components/TopBar";
import { TransitionController } from "@/components/TransitionController";
import { Work } from "@/components/Work";

export default function Page() {
  return (
    <TransitionController>
      <a href="#story" className="btn btn-primary sr-only z-[70] focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
        Skip to content
      </a>
      <TopBar />
      <Timeline />
      <main className="pr-[var(--rail-w)]">
        <Hero />
        <Story />
        <Craft />
        <Work />
        <Agency />
        <Reviews />
        <Credits />
        <Contact />
      </main>
      <Footer />
      <JCutCue section="craft" label="Skills and craft" />
      <div className="texture" aria-hidden />
    </TransitionController>
  );
}
