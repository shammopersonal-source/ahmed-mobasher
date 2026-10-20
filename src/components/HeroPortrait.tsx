"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { AssetName } from "@/content/assets.generated";
import { site } from "@/content/site";
import { PauseIcon, PlayIcon } from "./icons";
import { Picture } from "./Picture";

const SHOTS: { name: AssetName; alt: string }[] = [
  { name: "portrait-3", alt: "Ahmed Mobasher, arms crossed, smiling" },
  { name: "portrait-1", alt: "Ahmed Mobasher in a blue shirt" },
  { name: "portrait-2", alt: "Ahmed Mobasher in a white shirt" },
];
const INTERVAL_MS = 4500;
const MAX_TILT = 7; // degrees
const img = "absolute bottom-0 left-1/2 h-[94%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom";

/**
 * The hero portrait card. Shots rotate every few seconds (first one is server-rendered;
 * the rest load once the page runs). On devices with a fine pointer the card tilts toward
 * the cursor, with the stat chips at a different depth. Flat on touch and with reduced
 * motion; the slideshow also stays still for reduced motion.
 */
export function HeroPortrait() {
  const card = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    setReady(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setPaused(true);
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = card.current!;
    const hero = el.closest("section")!;
    let frame = 0;
    let target = { x: 0, y: 0 };
    const apply = () => {
      frame = 0;
      el.style.setProperty("--ry", `${target.x * MAX_TILT}deg`);
      el.style.setProperty("--rx", `${-target.y * MAX_TILT * 0.6}deg`);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target = {
        x: Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 0.8))),
        y: Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 0.8))),
      };
      el.dataset.tracking = "";
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const leave = () => {
      delete el.dataset.tracking;
      target = { x: 0, y: 0 };
      if (!frame) frame = requestAnimationFrame(apply);
    };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => {
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!ready || paused || held) return;
    const id = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % SHOTS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [ready, paused, held]);

  return (
    <div ref={card} className="tilt relative h-full min-h-[26rem] md:min-h-[38rem]" onMouseEnter={() => setHeld(true)} onMouseLeave={() => setHeld(false)}>
      {/* Offset block behind the card */}
      <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-5 bg-navy md:translate-x-6 md:translate-y-7" style={{ "--z": "-20px" } as CSSProperties} />

      <figure className="hero-reveal absolute inset-0 m-0 overflow-hidden border border-line bg-linear-to-b from-navy-light to-navy-mid">
        {SHOTS.map((shot, i) =>
          i === 0 || ready ? (
            <div key={shot.name} className="hero-shot absolute inset-0" data-on={i === index || undefined} aria-hidden={i !== index}>
              <Picture name={shot.name} alt={shot.alt} priority={i === 0} className={img} />
            </div>
          ) : null,
        )}
        <figcaption className="hero-tagline mono absolute bottom-4 left-1/2 z-[1] -translate-x-1/2 bg-navy px-3 py-2 whitespace-nowrap text-ivory">{site.tagline}</figcaption>
      </figure>

      {/* Stat chips float above the card */}
      <div className="tilt-float absolute -top-4 -right-2 bg-gold px-4 py-3 md:top-10 md:-right-5" style={{ "--z": "70px" } as CSSProperties}>
        <b className="block text-2xl leading-none font-extrabold tracking-[-0.03em] md:text-[1.875rem]">
          <span className="count-num" style={{ "--to": 30 } as CSSProperties}>
            <span>30</span>
          </span>
          +
        </b>
        <span className="mono">Projects done</span>
      </div>
      <div className="tilt-float absolute bottom-16 -left-2 border-2 border-navy bg-ivory px-4 py-3 md:-left-7" style={{ "--z": "50px" } as CSSProperties}>
        <b className="block text-2xl leading-none font-extrabold tracking-[-0.03em] md:text-[1.875rem]">
          <span className="count-num" style={{ "--to": 5 } as CSSProperties}>
            <span>5</span>
          </span>
          +
        </b>
        <span className="mono">Years freelancing</span>
      </div>

      {ready ? (
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-navy/85 px-1.5 py-1 text-ivory">
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
            className="flex h-7 w-7 items-center justify-center"
          >
            {paused ? <PlayIcon width={11} height={11} /> : <PauseIcon width={11} height={11} />}
          </button>
        </div>
      ) : null}
    </div>
  );
}
