import type { CSSProperties } from "react";
import { craft, effects } from "@/content/craft";
import { CutSection } from "./CutSection";
import { EffectsInspector } from "./EffectsInspector";

/** Effects Inspector: the four disciplines as switchable effects on one frame. */
export function Craft() {
  return (
    <CutSection id="craft" transition="j-cut" labelledBy="craft-title" className="bg-navy px-3 pt-16 pb-20 outline-none md:px-16 md:pt-28 md:pb-32">
      {/* J-cut: the heading leads; the panel (the visuals) follows on the cut. */}
      <header className="px-2 md:px-0">
        <p className="label text-gold">
          {craft.slate} · {effects.length} effects
        </p>
        <h2 id="craft-title" className="display mt-5" style={{ "--display-size": "clamp(3rem, 8vw, 7rem)" } as CSSProperties}>
          {craft.title}
        </h2>
        <p className="mt-5 max-w-[40ch] text-lg leading-snug text-on-dark-muted">{craft.hint}</p>
      </header>
      <div data-visuals className="mt-10 md:mt-14">
        <EffectsInspector />
      </div>
    </CutSection>
  );
}
