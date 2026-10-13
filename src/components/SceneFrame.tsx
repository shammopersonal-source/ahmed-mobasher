"use client";

import type { ReactNode } from "react";
import { useActiveClip } from "./TransitionController";

/** Marks the scene under the playhead as playing, so the page and the timeline agree. */
export function SceneFrame({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  const playing = useActiveClip() === id;
  return (
    <article id={id} tabIndex={-1} aria-labelledby={`${id}-title`} data-playing={playing || undefined} className={className}>
      {children}
    </article>
  );
}
