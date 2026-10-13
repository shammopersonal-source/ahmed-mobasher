import type { SectionId } from "@/content/sections";

type Props = { id: SectionId; slate: string; title: string; note: string };

/** Build-time stand-in for a section that hasn't been cut yet. Removed as each section lands. */
export function PendingSection({ id, slate, title, note }: Props) {
  return (
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
      className="flex min-h-[calc(100svh-var(--timeline-h))] flex-col justify-center border-t border-line px-6 py-24 outline-none md:px-16"
    >
      <p className="label text-gold">{slate}</p>
      <h2 id={`${id}-title`} className="display mt-4" style={{ "--display-size": "clamp(2.5rem, 7vw, 5.5rem)" } as React.CSSProperties}>
        {title}
      </h2>
      <p className="mt-6 max-w-prose text-on-dark-muted">{note}</p>
    </section>
  );
}
