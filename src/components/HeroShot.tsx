"use client";

import { useEffect, useState } from "react";
import type { AssetName } from "@/content/assets.generated";
import { Picture } from "./Picture";

const SHOTS: { name: AssetName; alt: string }[] = [
  { name: "portrait-3", alt: "Ahmed Mobasher, arms crossed, smiling" },
  { name: "portrait-1", alt: "Ahmed Mobasher in a blue shirt" },
  { name: "portrait-2", alt: "Ahmed Mobasher in a white shirt" },
];
const INTERVAL_MS = 4500;
const img = "absolute bottom-0 left-1/2 h-[94%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom";

/**
 * The hero's portrait, changing shot every few seconds. The first shot is server-rendered
 * (it is part of the first paint); the others only load once the page is running. It
 * pauses while hovered or focused, when the tab is hidden, with the pause button, and
 * never runs on its own for visitors who prefer reduced motion.
 */
export function HeroShot() {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    setReady(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
  }, []);

  useEffect(() => {
    if (!ready || paused || held) return;
    const id = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % SHOTS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [ready, paused, held]);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      {SHOTS.map((shot, i) =>
        i === 0 || ready ? (
          <div key={shot.name} className="hero-shot absolute inset-0" data-on={i === index || undefined} aria-hidden={i !== index}>
            <Picture name={shot.name} alt={shot.alt} priority={i === 0} className={img} />
          </div>
        ) : null,
      )}

      {ready ? (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-navy/80 px-1.5 py-1">
          {SHOTS.map((shot, i) => (
            <button
              key={shot.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1} of ${SHOTS.length}`}
              aria-current={i === index || undefined}
              className="flex h-7 w-6 items-center justify-center"
            >
              <span className={`h-1.5 w-4 ${i === index ? "bg-gold-light" : "bg-ivory/35"}`} />
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={paused ? "Play photo slideshow" : "Pause photo slideshow"}
            className="flex h-7 w-7 items-center justify-center text-ivory"
          >
            {paused ? (
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                <path d="M2 1v8l7-4z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                <path d="M2 1h2v8H2zM6 1h2v8H6z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      ) : null}
    </div>
  );
}
