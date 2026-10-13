"use client";

import type { ReactNode } from "react";
import type { SectionId } from "@/content/sections";
import { useCut } from "./TransitionController";

type Props = {
  id: SectionId;
  /** Which entrance edit the stylesheet should run, e.g. "hard-cut". */
  transition: string;
  labelledBy: string;
  className?: string;
  children: ReactNode;
};

/**
 * A section whose entrance is an edit. It only reports state (`data-cut`); the
 * transition itself lives in CSS, and with no JS the attribute is never set, so the
 * section is just there.
 */
export function CutSection({ id, transition, labelledBy, className, children }: Props) {
  return (
    <section id={id} tabIndex={-1} aria-labelledby={labelledBy} data-transition={transition} data-cut={useCut(id)} className={className}>
      {children}
    </section>
  );
}
