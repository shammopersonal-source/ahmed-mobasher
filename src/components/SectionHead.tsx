import type { CSSProperties, ReactNode } from "react";

type Props = {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  dark?: boolean;
  aside?: ReactNode;
  /** Fade the label, then the heading, then the aside in on scroll. Off by default. */
  reveal?: boolean;
};

const step = (i: number) => ({ "data-reveal": "", style: { "--i": i } as CSSProperties });

/** Mono index + label over a big heading, with optional content on the right. */
export function SectionHead({ id, index, label, title, dark = false, aside, reveal = false }: Props) {
  const r = (i: number) => (reveal ? step(i) : {});
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" {...(reveal ? { "data-reveal-group": "" } : {})}>
      <div>
        <p className={`mono ${dark ? "text-gold" : "text-gold-ink"}`} {...r(0)}>
          {index} · {label}
        </p>
        <h2 id={`${id}-title`} className="h-section mt-4" {...r(1)}>
          {title}
        </h2>
      </div>
      {aside ? (reveal ? <div {...r(2)}>{aside}</div> : aside) : null}
    </div>
  );
}

/** Props for an item in a reveal group: its place in the stagger. */
export const reveal = (i: number) => ({ "data-reveal": "", style: { "--i": i } as CSSProperties });

/** Props for a reveal group; `after` delays it behind a heading that enters with it. */
export const revealGroup = (after = 0) => ({ "data-reveal-group": "", style: { "--b": after } as CSSProperties });

export const shell = "mx-auto max-w-[90rem] px-5 md:px-10";
