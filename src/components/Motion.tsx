"use client";

import { useEffect } from "react";

/**
 * Scroll reveals: marks each [data-reveal-group] as shown the first time ~15% of it is
 * visible, then stops watching it (never re-animates). CSS does the rest.
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");
    const groups = document.querySelectorAll<HTMLElement>("[data-reveal-group]");
    if (!("IntersectionObserver" in window)) {
      groups.forEach((g) => g.setAttribute("data-shown", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-shown", "");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.15 },
    );
    groups.forEach((g) => io.observe(g));
    return () => io.disconnect();
  }, []);
  return null;
}
