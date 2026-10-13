"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { sections, type SectionId } from "@/content/sections";
import { subscribe } from "@/lib/playhead";

const ActiveSection = createContext<SectionId>(sections[0].id);

/** Which clip is under the playhead. Sections use this to run their entrance edit. */
export const useActiveSection = () => useContext(ActiveSection);

/**
 * Owns the edit grammar: tracks the clip under the playhead and shows the editor's
 * marker naming each transition as the cut happens. Section-specific transition
 * visuals hook in through `useActiveSection`.
 */
export function TransitionController({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  // Bumped on every cut so the marker replays even when the same label repeats.
  const [cut, setCut] = useState(0);

  useEffect(() => {
    let last = -1;
    return subscribe((p) => {
      if (p.active === last) return;
      const first = last === -1;
      last = p.active;
      setActive(p.active);
      if (!first) setCut((n) => n + 1);
    });
  }, []);

  const transition = sections[active].transition;

  return (
    <ActiveSection.Provider value={sections[active].id}>
      {children}
      {cut > 0 && transition ? (
        <div
          key={cut}
          aria-hidden
          className="marker label pointer-events-none fixed top-[calc(var(--topbar-h)+0.75rem)] right-[calc(var(--rail-w)+0.75rem)] z-40 flex items-center gap-2 border border-line-strong bg-navy/90 px-2.5 py-1.5 text-gold-light md:right-6"
        >
          <span className="h-2 w-2 rotate-45 bg-gold" />
          {transition}
        </div>
      ) : null}
    </ActiveSection.Provider>
  );
}
