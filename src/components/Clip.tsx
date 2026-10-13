import type { MouseEvent } from "react";

// Top-edge tint per track row (V1, V2, A1, R1). Tracks are told apart by label and
// row first; the tint is a quiet secondary cue.
const TINT = ["border-t-gold/40", "border-t-ivory-deep/40", "border-t-gold-light/40", "border-t-gold-dark/40"];
// Row on desktop, lane on the mobile rail. Row 1 is the ruler.
// (On the 3px mobile lanes navy-light is invisible against navy, so bars use ivory at reduced opacity there.)
const SLOT = [
  "col-start-1 row-start-1 md:col-start-1 md:row-start-2",
  "col-start-2 row-start-1 md:col-start-1 md:row-start-3",
  "col-start-3 row-start-1 md:col-start-1 md:row-start-4",
  "col-start-4 row-start-1 md:col-start-1 md:row-start-5",
];

type Props = {
  href: string;
  label: string;
  /** Row index of the labelled clip. */
  track: number;
  /** Rows that carry an unlabelled linked clip. */
  linked?: number[];
  /** Year tick drawn on the ruler above the clip, when it differs from the previous one. */
  year?: number;
  active: boolean;
  onSelect: () => void;
};

/**
 * One section on the timeline. The whole column is the link (a comfortable target);
 * the bars inside it are the visible clips.
 */
export function Clip({ href, label, track, linked = [], year, active, onSelect }: Props) {
  const onClick = (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onSelect();
  };

  return (
    <a
      href={href}
      draggable={false}
      aria-current={active ? "true" : undefined}
      onClick={onClick}
      className="group grid h-full grid-cols-[repeat(4,3px)] justify-center gap-x-0.5 py-px md:grid-cols-1 md:grid-rows-[1.125rem_repeat(4,1rem)] md:justify-normal md:gap-x-0 md:gap-y-0.5 md:px-px md:py-0"
    >
      <span className="label hidden items-center border-l border-line pl-1.5 text-[0.625rem] text-on-dark-faint md:row-start-1 md:flex" aria-hidden>
        {year}
      </span>

      {linked.map((row) => (
        <span key={row} className={`border-t bg-ivory/20 md:bg-navy-light/60 ${TINT[row]} ${SLOT[row]}`} aria-hidden />
      ))}

      <span
        className={`label flex min-w-0 items-center border-t text-[0.625rem] transition-colors md:px-1.5 ${SLOT[track]} ${
          active
            ? "border-t-gold bg-gold text-navy"
            : `bg-ivory/40 text-on-dark-muted md:bg-navy-light group-hover:bg-[color-mix(in_srgb,var(--navy-light)_82%,var(--ivory))] group-hover:text-ivory ${TINT[track]}`
        }`}
      >
        <span className="truncate max-md:sr-only">{label}</span>
      </span>
    </a>
  );
}
