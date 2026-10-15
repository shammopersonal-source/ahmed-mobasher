import type { ReactNode } from "react";

type Props = { id: string; index: string; label: string; title: ReactNode; dark?: boolean; aside?: ReactNode };

/** Mono index + label over a big heading, with optional content on the right. */
export function SectionHead({ id, index, label, title, dark = false, aside }: Props) {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <p className={`mono ${dark ? "text-gold" : "text-gold-ink"}`}>
          {index} · {label}
        </p>
        <h2 id={`${id}-title`} className="h-section mt-4">
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}

export const shell = "mx-auto max-w-[90rem] px-5 md:px-10";
