"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { clips, sections, type SectionId } from "@/content/sections";
import { subscribe } from "@/lib/playhead";

type Edit = { section: SectionId; clip: string; hydrated: boolean };
const EditContext = createContext<Edit>({ section: sections[0].id, clip: clips[0].id, hydrated: false });

/** Id of the timeline clip under the playhead (a section, or a scene inside Story). */
export const useActiveClip = () => useContext(EditContext).clip;

/**
 * Whether a section's entrance edit has happened yet: "pending" until the playhead first
 * reaches it, "in" from then on. Undefined before hydration, so without JS every section
 * is simply visible.
 */
export function useCut(id: SectionId): "pending" | "in" | undefined {
  const { section, hydrated } = useContext(EditContext);
  const index = sections.findIndex((s) => s.id === id);
  const reached = sections.findIndex((s) => s.id === section) >= index;
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (reached) setSeen(true);
  }, [reached]);
  return hydrated ? (seen || reached ? "in" : "pending") : undefined;
}

/**
 * Owns the edit grammar: tracks the clip under the playhead and shows the editor's
 * marker naming each transition as the cut happens. Sections run their own entrance
 * through `useCut`.
 */
export function TransitionController({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  // Bumped on every change of section so the marker replays.
  const [cut, setCut] = useState(0);

  useEffect(() => {
    let last = -1;
    const unsubscribe = subscribe((p) => {
      if (p.active === last) return;
      const changedSection = last !== -1 && clips[last].section !== clips[p.active].section;
      last = p.active;
      setActive(p.active);
      setHydrated(true);
      if (changedSection) setCut((n) => n + 1);
    });
    return unsubscribe;
  }, []);

  const section = clips[active].section;
  const transition = sections.find((s) => s.id === section)?.transition;

  return (
    <EditContext.Provider value={{ section, clip: clips[active].id, hydrated }}>
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
    </EditContext.Provider>
  );
}
