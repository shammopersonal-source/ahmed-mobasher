"use client";

import { useEffect, useRef, useState } from "react";
import type { SectionId } from "@/content/sections";
import { useCut } from "./TransitionController";

/** Smash cut to black: on the cut, a beat of empty frame over everything, then the section. */
export function SmashCut({ section }: { section: SectionId }) {
  const cut = useCut(section);
  const previous = useRef(cut);
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (previous.current === "pending" && cut === "in" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setBeat((n) => n + 1);
    previous.current = cut;
  }, [cut]);

  return beat ? <div key={beat} aria-hidden className="smash pointer-events-none fixed inset-0 z-40 bg-navy" /> : null;
}
