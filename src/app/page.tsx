import { Craft } from "@/components/Craft";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { JCutCue } from "@/components/JCutCue";
import { PendingSection } from "@/components/PendingSection";
import { Timeline } from "@/components/Timeline";
import { TopBar } from "@/components/TopBar";
import { TransitionController } from "@/components/TransitionController";

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
        <PendingSection id="work" slate="SC 04 — not yet cut" title="Media Bin" note="Projects as clips, opening in a source monitor." />
        <PendingSection id="agency" slate="SC 05 — not yet cut" title="Render Output" note="Startup Solution, the next chapter." />
        <PendingSection id="reviews" slate="SC 06 — not yet cut" title="Client Notes" note="Testimonials pinned at timecodes." />
        <PendingSection id="credits" slate="SC 07 — not yet cut" title="End Credits" note="Certificates, rolling." />
        <PendingSection id="contact" slate="SC 08 — not yet cut" title="Export Settings" note="The contact form, as an export dialog." />
      </main>
      <JCutCue section="craft" label="Skills and craft" />
      <div className="texture" aria-hidden />
    </TransitionController>
  );
}
