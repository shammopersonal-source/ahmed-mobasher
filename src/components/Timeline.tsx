"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { clips, tracks, type TrackId } from "@/content/sections";
import { yearMarks } from "@/content/years";
import { INITIAL_TIMECODE, formatTimecode, jumpTo, seek, subscribe, type Layout } from "@/lib/playhead";
import { Clip } from "./Clip";

const DRAG_THRESHOLD = 5;
const KEY_STEP = 0.02;
const trackIndex = (id: TrackId) => tracks.findIndex((t) => t.id === id);
// Ruler ticks: a year appears above the clip where the content first gives it.
const ticks = clips.map((c, i) => {
  const year = yearMarks[c.id]?.[0].year;
  const previous = clips.slice(0, i).reverse().map((p) => yearMarks[p.id]?.at(-1)?.year).find(Boolean);
  return year !== previous ? year : undefined;
});

/**
 * The master timeline: primary navigation. A horizontal sequence along the bottom
 * on desktop, a slim vertical rail on the right edge on mobile. Without JS it is
 * still a list of anchor links to every section.
 */
export function Timeline() {
  const lane = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const progress = useRef(0);
  const drag = useRef<{ x: number; y: number; scrubbing: boolean } | null>(null);
  const swallowClick = useRef(false);

  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const [year, setYear] = useState(yearMarks[clips[0].id][0].year);
  const [scrubbing, setScrubbing] = useState(false);

  useEffect(() => {
    const vertical = window.matchMedia("(max-width: 767.98px)");
    const readouts = document.querySelectorAll<HTMLElement>("[data-timecode]");
    let size = { w: 0, h: 0 };
    let drawn: Layout | null = null;
    let last = { active: -1, year: -1, code: "" };

    const place = () => {
      if (!head.current) return;
      const offset = progress.current * (vertical.matches ? size.h : size.w);
      head.current.style.transform = vertical.matches ? `translate3d(0,${offset}px,0)` : `translate3d(${offset}px,0,0)`;
    };

    const sizer = new ResizeObserver(([entry]) => {
      size = { w: entry.contentRect.width, h: entry.contentRect.height };
      place();
    });
    if (lane.current) sizer.observe(lane.current);

    const unsubscribe = subscribe((p, layout) => {
      if (layout !== drawn) {
        drawn = layout;
        layout.starts.forEach((start, i) => {
          const end = layout.starts[i + 1] ?? 1;
          items.current[i]?.style.setProperty("--s", String(start));
          items.current[i]?.style.setProperty("--l", String(end - start));
        });
      }
      progress.current = p.progress;
      place();
      head.current?.setAttribute("aria-valuenow", String(Math.round(p.progress * 100)));

      const code = formatTimecode(p);
      if (code !== last.code) readouts.forEach((el) => (el.textContent = code));
      if (p.active !== last.active) setActive(p.active);
      if (p.year !== last.year) setYear(p.year);
      last = { active: p.active, year: p.year, code };
    });

    setReady(true);
    return () => {
      unsubscribe();
      sizer.disconnect();
    };
  }, []);

  const positionOf = (e: PointerEvent) => {
    const rect = lane.current!.getBoundingClientRect();
    return rect.width > rect.height ? (e.clientX - rect.left) / rect.width : (e.clientY - rect.top) / rect.height;
  };

  const startScrub = (e: PointerEvent) => {
    drag.current!.scrubbing = true;
    lane.current!.setPointerCapture(e.pointerId);
    setScrubbing(true);
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, scrubbing: false };
    // Grabbing the playhead itself scrubs straight away; a press on a clip waits to see if it is a click.
    if (head.current?.contains(e.target as Node)) startScrub(e);
  };

  const onPointerMove = (e: PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    if (!d.scrubbing) {
      if (Math.hypot(e.clientX - d.x, e.clientY - d.y) < DRAG_THRESHOLD) return;
      startScrub(e);
    }
    seek(positionOf(e));
  };

  const onPointerEnd = () => {
    if (drag.current?.scrubbing) {
      swallowClick.current = true;
      // A drag that ends over a clip must not also count as a click on it.
      setTimeout(() => (swallowClick.current = false), 0);
      setScrubbing(false);
    }
    drag.current = null;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const actions: Record<string, () => void> = {
      ArrowRight: () => seek(progress.current + KEY_STEP),
      ArrowUp: () => seek(progress.current + KEY_STEP),
      ArrowLeft: () => seek(progress.current - KEY_STEP),
      ArrowDown: () => seek(progress.current - KEY_STEP),
      PageDown: () => jumpTo(active + 1),
      PageUp: () => jumpTo(active - 1),
      Home: () => seek(0),
      End: () => seek(1),
    };
    const action = actions[e.key];
    if (!action) return;
    e.preventDefault();
    action();
  };

  const go = (index: number) => {
    const { target } = clips[index];
    jumpTo(index);
    history.replaceState(null, "", `#${target}`);
    document.getElementById(target)?.focus({ preventScroll: true });
  };

  return (
    <nav
      aria-label="Timeline"
      className="fixed top-[var(--topbar-h)] right-0 bottom-0 z-50 w-[var(--rail-w)] border-l border-line bg-navy select-none md:top-auto md:left-0 md:grid md:h-[var(--timeline-h)] md:w-auto md:grid-cols-[9.75rem_1fr] md:border-t md:border-l-0 md:py-2 md:pr-4"
    >
      {/* Track header: timecode readout and track names. Desktop only. */}
      <div className="hidden grid-rows-[1.125rem_repeat(4,1rem)] gap-y-0.5 pl-4 md:grid" aria-hidden>
        <span data-timecode className="label self-center text-gold">
          {INITIAL_TIMECODE}
        </span>
        {tracks.map((t) => (
          <span key={t.id} className="label flex items-center gap-2 text-[0.625rem] text-on-dark-faint">
            <span className="w-4 text-on-dark-muted">{t.id}</span>
            {t.label}
          </span>
        ))}
      </div>

      <div
        ref={lane}
        className="relative h-full touch-none md:touch-auto"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onClickCapture={(e) => {
          if (!swallowClick.current) return;
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <ol className="absolute inset-0">
          {clips.map((s, i) => (
            <li
              key={s.id}
              ref={(el) => {
                items.current[i] = el;
              }}
              style={{ "--s": i / clips.length, "--l": 1 / clips.length } as CSSProperties}
              className="absolute inset-x-0 top-[calc(var(--s)*100%)] h-[calc(var(--l)*100%)] md:inset-x-auto md:inset-y-0 md:left-[calc(var(--s)*100%)] md:h-auto md:w-[calc(var(--l)*100%)]"
            >
              <Clip
                href={`#${s.target}`}
                label={s.label}
                name={s.name}
                track={trackIndex(s.track)}
                linked={s.linked?.map(trackIndex)}
                year={ticks[i]}
                active={ready && i === active}
                onSelect={() => go(i)}
              />
            </li>
          ))}
        </ol>

        {ready ? (
          <div
            ref={head}
            role="slider"
            tabIndex={0}
            aria-label="Playhead"
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
            aria-valuetext={`${clips[active].name}, ${year}`}
            onKeyDown={onKeyDown}
            className="group absolute inset-x-0 top-0 -mt-3.5 flex h-7 cursor-grab touch-none items-center md:inset-x-auto md:inset-y-0 md:left-0 md:mt-0 md:-ml-3 md:h-auto md:w-6 md:cursor-ew-resize md:flex-col"
          >
            {/* gold-light line with a navy outline so it reads over any clip, including the active one */}
            <span className="h-0.5 w-full bg-gold-light shadow-[0_0_0_1px_var(--navy)] md:h-full md:w-0.5" />
            <span className="absolute top-1/2 left-0 h-3 w-2 -translate-y-1/2 bg-gold-light shadow-[0_0_0_1px_var(--navy)] group-focus-visible:bg-ivory md:top-0 md:left-1/2 md:h-2.5 md:w-3 md:-translate-x-1/2 md:translate-y-0" />
            {/* Mobile has no room for clip labels, so the playhead names where you are while you drag. */}
            <span
              className={`label absolute right-full mr-2 border border-line-strong bg-navy px-2 py-1.5 whitespace-nowrap text-gold-light transition-opacity md:hidden ${scrubbing ? "opacity-100" : "opacity-0"}`}
              aria-hidden
            >
              {clips[active].name.split(":")[0]} · {year}
            </span>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
