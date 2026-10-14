"use client";

import { useState } from "react";
import { reviews } from "@/content/reviews";
import { LockIcon } from "./icons";

/**
 * Testimonials as review notes pinned along a mini timeline. Hover, focus or tap a marker
 * (or a note in the list) to bring it up in the viewer. Every note is also written out in
 * full in the list.
 */
export function ClientNotes() {
  const [active, setActive] = useState(0);
  const note = reviews[active];

  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-8">
        <figure className="flex min-h-72 flex-col justify-between border border-line bg-navy-mid p-5 md:min-h-96 md:p-10" aria-live="polite">
          <div className="label flex items-center justify-between gap-4 text-on-dark-faint">
            <span className="text-gold">Note {active + 1} of {reviews.length}</span>
            <span>{note.timecode}</span>
          </div>
          <blockquote className="my-8 text-xl leading-relaxed text-ivory md:text-2xl">“{note.text}”</blockquote>
          <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-2 text-on-dark">
              <LockIcon width={14} height={14} className="text-gold" />
              {note.author}
            </span>
            <span className="label text-on-dark-muted">
              {note.service} · {note.location}
            </span>
          </figcaption>
        </figure>

        {/* Mini review timeline */}
        <div className="relative mt-4 h-16 border border-line bg-navy px-4">
          <div className="absolute inset-x-4 top-8 h-px bg-line-strong" aria-hidden />
          <div className="label absolute inset-x-4 top-2 flex justify-between text-[0.5625rem] text-on-dark-faint" aria-hidden>
            <span>00:00:00:00</span>
            <span>00:01:00:00</span>
          </div>
          <ol className="absolute inset-x-4 top-0 bottom-0">
            {reviews.map((r, i) => (
              <li key={r.id} className="absolute top-0 bottom-0 -ml-5 w-10" style={{ left: `${r.at * 100}%` }}>
                <button
                  type="button"
                  data-razor
                  aria-label={`Note ${i + 1}: ${r.service}, ${r.location}, at ${r.timecode}`}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex h-full w-full flex-col items-center justify-center gap-1 pt-2"
                >
                  <span className={`h-3 w-3 rotate-45 border ${i === active ? "border-gold-light bg-gold-light" : "border-gold bg-navy group-hover:bg-gold"}`} />
                  <span className={`label text-[0.5625rem] ${i === active ? "text-gold-light" : "text-on-dark-faint"}`}>{r.timecode.slice(3, 8)}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <ol className="border border-line md:col-span-4">
        {reviews.map((r, i) => (
          <li key={r.id} className="border-line not-last:border-b">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`w-full p-4 text-left transition-colors md:p-5 ${i === active ? "bg-navy-mid" : "hover:bg-navy-mid/60"}`}
            >
              <span className="label flex justify-between gap-3 text-on-dark-faint">
                <span className={i === active ? "text-gold-light" : "text-gold"}>{r.timecode}</span>
                <span>{r.location}</span>
              </span>
              <span className="mt-2 flex items-center gap-2 text-on-dark">
                <LockIcon width={12} height={12} className="text-on-dark-faint" />
                {r.author} · {r.service}
              </span>
              <span className="note-excerpt mt-2 block text-sm leading-relaxed text-on-dark-muted">{r.text}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
