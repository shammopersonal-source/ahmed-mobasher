import { site } from "@/content/site";
import { INITIAL_TIMECODE } from "@/lib/playhead";

export function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[var(--topbar-h)] items-center justify-between gap-4 border-b border-line bg-navy/90 px-4 backdrop-blur-sm md:px-6">
      <div className="flex flex-col gap-0.5 md:flex-row md:items-baseline md:gap-3">
        <a href="#hero" className="heading text-[0.9375rem] whitespace-nowrap text-on-dark">
          {site.name}
        </a>
        <span className="label hidden text-on-dark-faint md:inline">Creative technologist</span>
        {/* On desktop the readout lives in the timeline; on mobile it sits under the name. */}
        <span data-timecode className="label text-[0.625rem] text-gold md:hidden" aria-hidden>
          {INITIAL_TIMECODE}
        </span>
      </div>
      <a href="#contact" className="btn btn-primary min-h-10 px-4 text-xs">
        Hire me
      </a>
    </header>
  );
}
