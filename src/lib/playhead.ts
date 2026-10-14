// Scroll → playhead store shared by the Timeline and the TransitionController.
// Progress is pushed imperatively (once per frame) so scrubbing never re-renders React.
import { clips } from "@/content/sections";
import { yearMarks } from "@/content/years";

export type Playhead = {
  /** 0..1 across the whole page. */
  progress: number;
  /** Index into `clips` of the clip under the playhead. */
  active: number;
  year: number;
  /** Running frame count at 24fps, derived from scroll distance. */
  frames: number;
};

export type Layout = {
  /** Start of each clip as a 0..1 fraction; clip i ends where i + 1 starts. */
  starts: number[];
  maxScroll: number;
};

const FPS = 24;
const PX_PER_FRAME = 3;
/** A section takes over once its top edge is this far up the viewport. */
const HANDOVER = 0.35;
/** Shortest a clip may be, as a fraction of the timeline. */
const MIN_CLIP = 0.04;

type Listener = (p: Playhead, layout: Layout) => void;

let layout: Layout = { starts: clips.map((_, i) => i / clips.length), maxScroll: 1 };

/** The last year the content gives at or before this point; held until the next one. */
function yearAt(active: number, within: number) {
  for (let i = active; i >= 0; i--) {
    const marks = yearMarks[clips[i].id] ?? [];
    for (let m = marks.length - 1; m >= 0; m--) if (i < active || marks[m].at <= within) return marks[m].year;
  }
  return yearMarks[clips[0].id][0].year;
}

let state: Playhead = { progress: 0, active: 0, year: yearAt(0, 0), frames: 0 };
const listeners = new Set<Listener>();
let frame = 0;
let attached = false;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function measure() {
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  let prev = 0;
  const starts = clips.map((c, i) => {
    const el = document.getElementById(c.target);
    if (!el || i === 0) return 0;
    const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * HANDOVER;
    prev = Math.max(prev, clamp01(top / maxScroll));
    return prev;
  });
  // Keep every clip long enough to hit comfortably (≥24px on the shortest mobile rail),
  // even when its section is short; earlier clips give up the space.
  for (let i = 1; i < starts.length; i++) starts[i] = Math.max(starts[i], starts[i - 1] + MIN_CLIP);
  for (let i = starts.length - 1, end = 1; i > 0; i--) {
    starts[i] = Math.min(starts[i], end - MIN_CLIP);
    end = starts[i];
  }
  layout = { starts, maxScroll };
}

function read() {
  frame = 0;
  const progress = clamp01(window.scrollY / layout.maxScroll);
  let active = 0;
  for (let i = 0; i < layout.starts.length; i++) if (progress >= layout.starts[i]) active = i;
  const start = layout.starts[active];
  const end = layout.starts[active + 1] ?? 1;
  const within = end > start ? (progress - start) / (end - start) : 0;
  state = { progress, active, year: yearAt(active, within), frames: Math.round(window.scrollY / PX_PER_FRAME) };
  listeners.forEach((l) => l(state, layout));
}

const schedule = () => {
  if (!frame) frame = requestAnimationFrame(read);
};
const remeasure = () => {
  measure();
  schedule();
};

export function subscribe(listener: Listener) {
  listeners.add(listener);
  if (!attached) {
    attached = true;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    new ResizeObserver(remeasure).observe(document.body);
  }
  remeasure();
  return () => {
    listeners.delete(listener);
  };
}

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Scrub: move the page to a 0..1 position immediately. */
export function seek(progress: number) {
  window.scrollTo({ top: clamp01(progress) * layout.maxScroll, behavior: "instant" });
}

/** Jump: travel to a clip, animated unless the visitor asked for less motion. */
export function jumpTo(index: number) {
  const el = document.getElementById(clips[Math.min(clips.length - 1, Math.max(0, index))].target);
  el?.scrollIntoView({ behavior: prefersReducedMotion() ? "instant" : "smooth", block: "start" });
}

export function formatTimecode({ year, frames }: Pick<Playhead, "year" | "frames">) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const s = Math.floor(frames / FPS);
  return `[${year}]:${pad(Math.floor(s / 60) % 100)}:${pad(s % 60)}:${pad(frames % FPS)}`;
}

export const INITIAL_TIMECODE = formatTimecode({ year: yearAt(0, 0), frames: 0 });
