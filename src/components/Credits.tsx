import type { CSSProperties } from "react";
import { certificates, creditsIntro } from "@/content/certificates";
import { CreditsRoll } from "./CreditsRoll";
import { CutSection } from "./CutSection";

/** End Credits: certificates rolling as film credits. */
export function Credits() {
  return (
    <CutSection id="credits" transition="roll-credits" labelledBy="credits-title" className="border-t border-line bg-navy px-3 pt-16 pb-20 outline-none md:px-16 md:pt-28 md:pb-32">
      <header className="text-center">
        <p className="label text-gold">
          {creditsIntro.slate} · {certificates.length} credits
        </p>
        <h2 id="credits-title" className="display mt-5" style={{ "--display-size": "clamp(3rem, 8vw, 7rem)" } as CSSProperties}>
          {creditsIntro.title}
        </h2>
        <p className="mt-5 text-on-dark-muted">Select a credit to view the certificate.</p>
      </header>
      <div data-visuals className="mt-10 md:mt-16">
        <CreditsRoll />
      </div>
    </CutSection>
  );
}
