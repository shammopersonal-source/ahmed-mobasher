import type { CSSProperties } from "react";
import { projects, quoteFor, workIntro } from "@/content/projects";
import { CutSection } from "./CutSection";
import { LockIcon } from "./icons";
import { MediaBin, ProjectDetails } from "./MediaBin";

/** Media Bin: projects as clips; each opens in a source monitor. */
export function Work() {
  return (
    <CutSection id="work" transition="match-cut" labelledBy="work-title" className="border-t border-line bg-navy px-3 pt-16 pb-20 outline-none md:px-16 md:pt-28 md:pb-32">
      <header className="px-2 md:px-0">
        <p className="label text-gold">
          {workIntro.slate} · {projects.length} clips
        </p>
        <h2 id="work-title" className="display mt-5" style={{ "--display-size": "clamp(3rem, 8vw, 7rem)" } as CSSProperties}>
          {workIntro.title}
        </h2>
      </header>

      <div data-visuals data-cut-anchor className="js-only mt-10 md:mt-14">
        <MediaBin />
      </div>

      {/* Without JS there is no monitor, so every project is written out in full. */}
      <ol className="nojs-only mt-10 grid gap-3 md:grid-cols-2">
        {projects.map((p) => {
          const quote = quoteFor(p);
          return (
            <li key={p.id} className="border border-line p-5 md:p-8">
              <ProjectDetails project={p} />
              {quote ? (
                <blockquote className="mt-6 border-l-2 border-gold pl-4 text-[0.9375rem] text-on-dark-muted">
                  “{quote.text}”
                  <footer className="label mt-3 flex items-center gap-2 text-on-dark-faint">
                    <LockIcon width={12} height={12} /> {quote.author} · {quote.location}
                  </footer>
                </blockquote>
              ) : null}
            </li>
          );
        })}
      </ol>

      <p className="mt-8 px-2 text-on-dark-muted md:px-0">
        {workIntro.more}{" "}
        <a href="#contact" className="text-gold underline underline-offset-4 hover:text-gold-light">
          Ask for it
        </a>
      </p>
    </CutSection>
  );
}
