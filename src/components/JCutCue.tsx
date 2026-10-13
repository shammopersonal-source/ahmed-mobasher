"use client";

import type { CSSProperties } from "react";
import type { SectionId } from "@/content/sections";
import { useApproaching } from "./TransitionController";

// Fixed bar heights so the waveform is identical on server and client.
const WAVE = Array.from({ length: 160 }, (_, i) => 22 + Math.round(70 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.37))));

/**
 * The J-cut's audio lead: the next section's name and waveform arrive along the bottom
 * of the frame while the outgoing section is still on screen. Decorative; JS only.
 */
export function JCutCue({ section, label }: { section: SectionId; label: string }) {
  const shown = useApproaching() === section;
  return (
    <div
      aria-hidden
      data-shown={shown || undefined}
      className="jcut-cue pointer-events-none fixed right-[var(--rail-w)] bottom-[var(--timeline-h)] left-0 z-40 flex h-11 items-center gap-4 border-t border-line-strong bg-navy px-4 md:px-6"
    >
      <span className="label shrink-0 text-gold-light">A1 · Audio in</span>
      <span className="flex h-7 min-w-0 flex-1 items-center gap-0.5 overflow-hidden">
        {WAVE.map((h, i) => (
          <span key={i} className="jcut-bar w-0.5 shrink-0 bg-gold" style={{ height: `${h}%`, "--i": i % 9 } as CSSProperties} />
        ))}
      </span>
      <span className="label shrink-0 text-on-dark">Next: {label}</span>
    </div>
  );
}
