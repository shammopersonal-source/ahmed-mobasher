"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { clips, sections, type SectionId } from "@/content/sections";
import { subscribe } from "@/lib/playhead";

type Edit = { clip: string; cutIndex: number; hydrated: boolean };
const EditContext = createContext<Edit>({ clip: clips[0].id, cutIndex: 0, hydrated: false });

/** Id of the timeline clip under the playhead (a section, or a scene inside Story). */
export const useActiveClip = () => useContext(EditContext).clip;

/**
 * Whether a section's entrance edit has happened yet: "pending" until its top edge first
 * comes far enough into view, "in" from then on. Undefined before hydration, so without
 * JS every section is simply visible.
 */
export function useCut(id: SectionId): "pending" | "in" | undefined {
  const { cutIndex, hydrated } = useContext(EditContext);
  if (!hydrated) return undefined;
  return sections.findIndex((s) => s.id === id) <= cutIndex ? "in" : "pending";
}

/**
 * A section cuts in once its top edge is this fraction of the viewport height above the
 * bottom of the visible area. It bounds how much of the outgoing shot's empty frame can
 * ever be on screen before the cut.
 */
const CUT_BAND = 0.22;
const desktopTimeline = "(min-width: 768px)";
const DESKTOP_TIMELINE_PX = 100; // --timeline-h

/**
 * Owns the edit grammar: decides when each section cuts in, tracks the clip under the
 * playhead, and shows the editor's marker naming each transition as it happens.
 */
export function TransitionController({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [cutIndex, setCutIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  // What the marker shows; `n` changes on every showing so it replays.
  const [marker, setMarker] = useState<{ n: number; text: string } | null>(null);

  useEffect(() => {
    const desktop = window.matchMedia(desktopTimeline);
    let lastClip = -1;
    let cut = 0;
    let first = true;
    // Sections whose marker already showed at their cut, so arriving doesn't show it twice.
    const announced = new Set<SectionId>();
    const show = (id: SectionId) => {
      const text = sections.find((s) => s.id === id)?.transition;
      if (text) setMarker((m) => ({ n: (m?.n ?? 0) + 1, text }));
    };

    const unsubscribe = subscribe((p) => {
      // 1. Cuts: advance through every section whose top has crossed the cut line.
      const line = window.innerHeight * (1 - CUT_BAND) - (desktop.matches ? DESKTOP_TIMELINE_PX : 0);
      let next = cut;
      while (next + 1 < sections.length) {
        const el = document.getElementById(sections[next + 1].id);
        if (!el || el.getBoundingClientRect().top > line) break;
        next++;
      }
      if (next !== cut) {
        cut = next;
        setCutIndex(cut);
        if (!first) {
          announced.add(sections[cut].id);
          show(sections[cut].id);
        }
      }

      // 2. Active clip, and the marker when a section is re-entered later.
      if (p.active !== lastClip) {
        const section = clips[p.active].section;
        const changed = lastClip !== -1 && clips[lastClip].section !== section;
        lastClip = p.active;
        setActive(p.active);
        if (changed && !announced.delete(section)) show(section);
      }

      if (first) {
        first = false;
        setHydrated(true);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <EditContext.Provider value={{ clip: clips[active].id, cutIndex, hydrated }}>
      {children}
      {marker ? (
        <div
          key={marker.n}
          aria-hidden
          className="marker label pointer-events-none fixed top-[calc(var(--topbar-h)+0.75rem)] right-[calc(var(--rail-w)+0.75rem)] z-40 flex items-center gap-2 border border-line-strong bg-navy/90 px-2.5 py-1.5 text-gold-light md:right-6"
        >
          <span className="h-2 w-2 rotate-45 bg-gold" />
          {marker.text}
        </div>
      ) : null}
    </EditContext.Provider>
  );
}
