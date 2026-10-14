"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { projects, quoteFor, type Project } from "@/content/projects";
import { ClipFrame, frameCount } from "./ClipFrames";
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon, LockIcon } from "./icons";
import { useCut } from "./TransitionController";

const SCRUB_THRESHOLD = 8;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Bin layout densifies as clips are added: the featured clip runs full width, the rest
 * sit two across while there are only a few, then three, then four.
 */
const restSpan = (n: number) => (n <= 2 ? "md:col-span-6" : n <= 6 ? "md:col-span-4" : "md:col-span-3");

function BinClip({ project, featured, span, onOpen }: { project: Project; featured: boolean; span: string; onOpen: () => void }) {
  const [frame, setFrame] = useState(0);
  const drag = useRef<{ x: number; scrubbing: boolean } | null>(null);
  const swallow = useRef(false);
  const total = frameCount(project);

  const frameAt = (e: PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return Math.min(total - 1, Math.max(0, Math.floor(((e.clientX - rect.left) / rect.width) * total)));
  };

  // Mouse: hover scrubs. Touch/pen: a sideways drag scrubs, a tap opens.
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reducedMotion()) return;
    if (e.pointerType === "mouse") return setFrame(frameAt(e));
    const d = drag.current;
    if (!d) return;
    if (!d.scrubbing && Math.abs(e.clientX - d.x) > SCRUB_THRESHOLD) d.scrubbing = true;
    if (d.scrubbing) setFrame(frameAt(e));
  };

  return (
    <li className={featured ? "md:col-span-12" : span}>
      <button
        type="button"
        data-razor
        data-match-target={featured || undefined}
        onClick={() => {
          if (swallow.current) return (swallow.current = false);
          onOpen();
        }}
        aria-haspopup="dialog"
        className={`group flex h-full w-full flex-col border border-line bg-navy text-left transition-colors hover:border-line-strong ${featured ? "md:grid md:grid-cols-3" : ""}`}
      >
        <span
          className={`relative block aspect-video w-full touch-pan-y overflow-hidden border-b border-line ${featured ? "md:col-span-2 md:border-r md:border-b-0" : ""}`}
          onPointerMove={onPointerMove}
          onPointerDown={(e) => (drag.current = { x: e.clientX, scrubbing: false })}
          onPointerUp={() => {
            if (drag.current?.scrubbing) swallow.current = true;
            drag.current = null;
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") setFrame(0);
          }}
        >
          <ClipFrame project={project} frame={frame} size={featured ? "featured" : "bin"} />
          {/* Filmstrip: one cell per frame, the current one lit */}
          <span className="absolute inset-x-0 bottom-0 flex h-1.5 gap-px bg-navy" aria-hidden>
            {Array.from({ length: total }, (_, i) => (
              <span key={i} className={`flex-1 ${i === frame ? "bg-gold" : "bg-navy-light"}`} />
            ))}
          </span>
        </span>
        <span className="flex flex-1 flex-col gap-2 p-4 md:p-5">
          <span className="label flex justify-between text-on-dark-faint">
            <span>Clip {project.number}</span>
            <span>{project.status}</span>
          </span>
          <span className={`heading text-on-dark ${featured ? "text-xl md:text-2xl" : "text-lg"}`}>{project.title}</span>
          {featured ? <span className="line-clamp-4 text-[0.9375rem] leading-relaxed text-on-dark-muted">{project.brief}</span> : null}
          <span className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((t) => (
              <span key={t} className="label border border-line px-2 py-1 text-[0.625rem] text-on-dark-muted">
                {t}
              </span>
            ))}
          </span>
          <span className="label mt-2 flex items-center gap-1.5 text-gold group-hover:text-gold-light">
            Open in source monitor <ArrowUpRightIcon width={12} height={12} />
          </span>
        </span>
      </button>
    </li>
  );
}

function SourceMonitor({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (project && !d.open) {
      setFrame(0);
      d.showModal();
    }
    if (!project && d.open) d.close();
  }, [project]);

  const total = project ? frameCount(project) : 1;
  const quote = project ? quoteFor(project) : undefined;

  return (
    <dialog
      ref={dialog}
      aria-labelledby="monitor-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) onClose();
      }}
      className="source-monitor m-auto max-h-[calc(100svh-2rem)] w-[min(72rem,calc(100vw-1.5rem))] overflow-y-auto border border-line-strong bg-navy p-0 text-on-dark backdrop:bg-navy/85"
    >
      {project ? (
        <div>
          <div className="label sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-navy px-4 py-3 md:px-6">
            <span className="text-gold">Source · Clip {project.number}</span>
            <button type="button" onClick={onClose} className="flex min-h-10 items-center gap-2 px-2 text-on-dark-muted hover:text-ivory" aria-label="Close source monitor">
              Close <CloseIcon width={14} height={14} />
            </button>
          </div>

          <div className="grid gap-0 md:grid-cols-12">
            <div className="border-line md:col-span-7 md:self-start md:border-r md:border-b">
              <div className="relative aspect-video bg-navy-mid">
                {project.video ? (
                  // Only requested once the monitor is open.
                  <video className="absolute inset-0 h-full w-full" src={project.video.src} controls preload="none" playsInline poster={project.video.poster ? `/img/${project.video.poster}.webp` : undefined} />
                ) : (
                  <ClipFrame project={project} frame={frame} size="monitor" />
                )}
              </div>
              {!project.video && total > 1 ? (
                <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2">
                  <button type="button" onClick={() => setFrame((f) => (f - 1 + total) % total)} className="flex min-h-10 min-w-10 items-center justify-center text-on-dark-muted hover:text-ivory" aria-label="Previous frame">
                    <ChevronLeftIcon />
                  </button>
                  <span className="flex flex-1 gap-1" aria-hidden>
                    {Array.from({ length: total }, (_, i) => (
                      <span key={i} className={`h-1.5 flex-1 ${i === frame ? "bg-gold" : "bg-navy-light"}`} />
                    ))}
                  </span>
                  <span className="label text-on-dark-faint" aria-live="polite">
                    Frame {frame + 1} of {total}
                  </span>
                  <button type="button" onClick={() => setFrame((f) => (f + 1) % total)} className="flex min-h-10 min-w-10 items-center justify-center text-on-dark-muted hover:text-ivory" aria-label="Next frame">
                    <ChevronRightIcon />
                  </button>
                </div>
              ) : null}
            </div>

            <div className="px-4 py-6 md:col-span-5 md:px-8 md:py-8">
              <ProjectDetails project={project} titleId="monitor-title" />
              {quote ? (
                <figure className="mt-6 border-l-2 border-gold pl-4">
                  <blockquote className="text-[0.9375rem] leading-relaxed text-on-dark-muted">“{quote.text}”</blockquote>
                  <figcaption className="label mt-3 flex items-center gap-2 text-on-dark-faint">
                    <LockIcon width={12} height={12} /> {quote.author} · {quote.location}
                  </figcaption>
                </figure>
              ) : null}
              <a href="#contact" onClick={onClose} className="btn btn-primary mt-8 w-full sm:w-auto">
                Start a project like this
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}

/** Title, brief, what he did, tags, client and result. Shared by the monitor and the no-JS list. */
export function ProjectDetails({ project, titleId }: { project: Project; titleId?: string }) {
  return (
    <>
      <p className="label text-on-dark-faint">
        Clip {project.number} · {project.status}
      </p>
      <h3 id={titleId} className="heading mt-2 text-2xl text-on-dark md:text-[1.75rem]">
        {project.title}
      </h3>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-on-dark-muted">{project.brief}</p>
      <h4 className="label mt-6 text-gold">What I did</h4>
      <ul className="mt-2 space-y-1.5 text-[0.9375rem] text-on-dark">
        {project.did.map((d) => (
          <li key={d} className="flex gap-2">
            <span className="mt-2 h-1 w-2 shrink-0 bg-gold" aria-hidden />
            {d}
          </li>
        ))}
      </ul>
      <dl className="mt-6 border-t border-line text-[0.9375rem]">
        <div className="grid grid-cols-[6rem_1fr] gap-3 border-b border-line py-2.5">
          <dt className="label pt-0.5 text-on-dark-faint">Tags</dt>
          <dd>{project.tags.join(" · ")}</dd>
        </div>
        {project.client ? (
          <div className="grid grid-cols-[6rem_1fr] gap-3 border-b border-line py-2.5">
            <dt className="label pt-0.5 text-on-dark-faint">Client</dt>
            <dd>{[project.client.name, project.client.location].filter(Boolean).join(" · ")}</dd>
          </div>
        ) : null}
        {project.result ? (
          <div className="grid grid-cols-[6rem_1fr] gap-3 border-b border-line py-2.5">
            <dt className="label pt-0.5 text-on-dark-faint">Result</dt>
            <dd>{project.result}</dd>
          </div>
        ) : null}
      </dl>
    </>
  );
}

/**
 * Match cut (Craft → Work): the inspector's preview frame travels and reshapes into the
 * featured clip, then hands over to it. Runs once, on the cut.
 */
function useMatchCut(cut: ReturnType<typeof useCut>) {
  const previous = useRef(cut);
  useEffect(() => {
    const was = previous.current;
    previous.current = cut;
    if (was !== "pending" || cut !== "in" || reducedMotion()) return;
    const target = document.querySelector<HTMLElement>("[data-match-target]")?.firstElementChild as HTMLElement | null;
    const source = document.querySelector<HTMLElement>("#craft .fx-preview");
    if (!target) return;
    const to = target.getBoundingClientRect();
    const fromRect = source?.getBoundingClientRect();
    // If the preview has already left the screen, enter from just above the top edge at its size.
    const from = fromRect && fromRect.bottom > 0 ? fromRect : new DOMRect(to.left, -to.height * 0.6, to.width, to.height);

    const shape = document.createElement("div");
    shape.className = "match-shape";
    Object.assign(shape.style, { left: `${to.left}px`, top: `${to.top}px`, width: `${to.width}px`, height: `${to.height}px` });
    document.body.append(shape);
    const sx = from.width / to.width;
    const sy = from.height / to.height;
    const animation = shape.animate(
      [
        { transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${sx}, ${sy})`, opacity: 1 },
        { transform: "none", opacity: 1, offset: 0.8 },
        { transform: "none", opacity: 0 },
      ],
      { duration: 620, easing: "cubic-bezier(.65,0,.35,1)", fill: "forwards" },
    );
    animation.onfinish = () => shape.remove();
  }, [cut]);
}

export function MediaBin() {
  const [open, setOpen] = useState<Project | null>(null);
  useMatchCut(useCut("work"));
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const ordered = [featured, ...projects.filter((p) => p !== featured)];

  return (
    <>
      <div className="label mb-3 flex items-center justify-between gap-4 border border-line bg-navy-mid px-4 py-2.5 text-on-dark-muted">
        <span>Bin · Selected work</span>
        <span>{projects.length} clips</span>
      </div>
      <ul className="grid gap-3 md:grid-cols-12">
        {ordered.map((p) => (
          <BinClip key={p.id} project={p} featured={p === featured && projects.length > 1} span={restSpan(projects.length - 1)} onOpen={() => setOpen(p)} />
        ))}
      </ul>
      <SourceMonitor project={open} onClose={() => setOpen(null)} />
    </>
  );
}
