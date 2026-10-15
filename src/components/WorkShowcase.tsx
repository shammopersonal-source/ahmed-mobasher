"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/content/projects";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, CloseIcon } from "./icons";
import { Picture } from "./Picture";
import { ProjectDetails } from "./ProjectDetails";

function Cover({ project }: { project: Project }) {
  const image = project.images?.[0];
  return (
    <span className={`relative flex aspect-[16/10] flex-col justify-between overflow-hidden p-5 md:p-6 ${project.accent ? "bg-gold text-navy" : "bg-navy-light text-ivory"}`}>
      {image ? (
        <Picture name={image.name} alt={image.alt} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <>
          <span aria-hidden className={`absolute -right-16 -bottom-16 h-60 w-60 rotate-[18deg] border-2 ${project.accent ? "border-navy/25" : "border-gold/35"}`} />
          <span className={`mono relative ${project.accent ? "" : "text-gold-light"}`}>
            {project.number} / {project.category}
          </span>
          <span className="relative max-w-[12ch] text-[1.75rem] leading-[0.95] font-extrabold tracking-[-0.035em] md:text-[2.5rem]">{project.title}</span>
          <span className={`mono relative ${project.accent ? "" : "text-gold-light"}`}>{project.tags.slice(1).join(" · ")}</span>
        </>
      )}
    </span>
  );
}

/** Projects in a horizontal row: swipe, drag-scroll, arrow buttons or keyboard. Each opens a dialog. */
export function WorkShowcase() {
  const track = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = track.current!;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 1);
      const card = el.firstElementChild as HTMLElement | null;
      if (card) setCurrent(Math.min(projects.length - 1, Math.round(el.scrollLeft / (card.offsetWidth + 20))));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const d = dialog.current!;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const step = (dir: 1 | -1) => {
    const el = track.current!;
    const card = el.firstElementChild as HTMLElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: reduce ? "instant" : "smooth" });
  };

  const fits = progress === 1 && current === 0;

  return (
    <div>
      <div className={`mx-auto flex max-w-[90rem] justify-end gap-2 px-5 md:px-10 ${fits ? "invisible" : ""}`}>
        <button type="button" onClick={() => step(-1)} disabled={progress <= 0} aria-label="Previous project" className="flex h-14 w-14 items-center justify-center border-2 border-ivory/30 text-ivory disabled:opacity-40">
          <ArrowLeftIcon width={20} height={20} />
        </button>
        <button type="button" onClick={() => step(1)} disabled={progress >= 1} aria-label="Next project" className="flex h-14 w-14 items-center justify-center border-2 border-gold bg-gold text-navy disabled:opacity-40">
          <ArrowRightIcon width={20} height={20} />
        </button>
      </div>

      <ul
        ref={track}
        tabIndex={0}
        aria-label="Projects"
        className="showcase mt-8 flex scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 md:scroll-px-10 md:gap-5 md:px-10 [&:focus-visible]:outline-offset-[-2px]"
      >
        {projects.map((p) => (
          <li key={p.id} className="w-[min(19rem,82vw)] shrink-0 md:w-[35rem]">
            <button type="button" onClick={() => setOpen(p)} aria-haspopup="dialog" className="group flex h-full w-full flex-col border border-line bg-navy-mid text-left">
              <Cover project={p} />
              <span className="flex flex-1 flex-col p-5 md:p-6">
                <span className="sr-only">{p.title}. </span>
                <span className="text-[1.0625rem] leading-relaxed text-on-dark-muted">{p.result ?? p.brief}</span>
                <span className="mt-auto flex items-center gap-2 pt-5 font-bold text-gold-light group-hover:underline">
                  View project <ArrowUpRightIcon width={14} height={14} />
                </span>
              </span>
            </button>
          </li>
        ))}
        {/* Trailing space so the last card can snap to the start */}
        <li aria-hidden className="w-px shrink-0 md:w-5" />
      </ul>

      <div className="mx-auto mt-8 flex max-w-[90rem] items-center gap-4 px-5 md:px-10">
        <span className="mono text-on-dark-muted">
          {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
        <span className="relative h-0.5 flex-1 bg-ivory/15" aria-hidden>
          <span className="absolute -top-px left-0 h-1 bg-gold" style={{ width: `${Math.max(1 / projects.length, progress) * 100}%` }} />
        </span>
        <span className="mono text-on-dark-muted">Swipe or scroll</span>
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="project-title"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setOpen(null);
        }}
        className="dark m-auto max-h-[calc(100svh-2rem)] w-[min(52rem,calc(100vw-1.5rem))] overflow-y-auto border border-line bg-navy p-0 text-ivory"
      >
        {open ? (
          <div>
            <div className="sticky top-0 z-10 flex justify-end border-b border-line bg-navy px-3 py-2">
              <button type="button" onClick={() => setOpen(null)} className="flex min-h-11 items-center gap-2 px-3 font-bold" aria-label="Close project">
                Close <CloseIcon width={16} height={16} />
              </button>
            </div>
            <Cover project={open} />
            <div className="p-5 md:p-10">
              <ProjectDetails project={open} titleId="project-title" />
              <a href="#contact" onClick={() => setOpen(null)} className="btn btn-gold mt-8 w-full sm:w-auto">
                Start a project like this
              </a>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
