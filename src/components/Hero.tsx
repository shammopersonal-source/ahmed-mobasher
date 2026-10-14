import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { INITIAL_TIMECODE } from "@/lib/playhead";
import { ArrowDownIcon, FiverrIcon, PlayIcon, UpworkIcon } from "./icons";
import { HeroShot } from "./HeroShot";

const corner = "absolute h-3.5 w-3.5 border-gold";

/** Program monitor: who Ahmed is, what he does and how to hire him, inside one frame. */
export function Hero() {
  return (
    <section
      id="hero"
      tabIndex={-1}
      aria-labelledby="hero-title"
      className="flex min-h-[calc(100svh-var(--timeline-h))] flex-col px-3 pt-[calc(var(--topbar-h)+0.75rem)] pb-3 outline-none md:px-5 md:pt-[calc(var(--topbar-h)+1.25rem)] md:pb-5"
    >
      <div className="relative flex flex-1 flex-col border border-line">
        {/* Frame corners and safe-area guides */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className={`${corner} -top-px -left-px border-t border-l`} />
          <span className={`${corner} -top-px -right-px border-t border-r`} />
          <span className={`${corner} -bottom-px -left-px border-b border-l`} />
          <span className={`${corner} -right-px -bottom-px border-r border-b`} />
          <span className="absolute inset-[3.5%] border border-dashed border-ivory/10" />
          <span className="absolute inset-[7%] hidden border border-dashed border-ivory/[0.07] md:block" />
        </div>

        <div className="label flex items-center justify-between gap-4 border-b border-line px-4 py-3 md:px-6">
          <span className="flex items-center gap-2 text-gold-light">
            <span className="rec-dot h-2 w-2 rounded-full bg-gold-light" aria-hidden />
            Rec
            <span className="ml-3 hidden text-on-dark-faint sm:inline">Program</span>
          </span>
          <span className="text-on-dark-muted">{site.availability}</span>
        </div>

        <div className="relative grid flex-1 gap-8 px-4 py-7 md:grid-cols-12 md:gap-10 md:px-[7%] md:py-10">
          <div className="flex flex-col justify-center md:col-span-7">
            <p className="label text-gold">{site.role}</p>
            <h1
              id="hero-title"
              className="display display-hero mt-4 [--display-size:clamp(3rem,min(16vw,19svh),13rem)] md:mt-5 md:[--display-size:clamp(4rem,min(9.5vw,19svh),13rem)]"
            >
              Ahmed
              <br />
              Mobasher
            </h1>
            <p className="mt-5 max-w-[34ch] text-lg leading-snug text-on-dark-muted md:mt-6 md:text-xl">{site.summary}</p>

            <div className="mt-6 flex gap-3 md:mt-8">
              <a href="#story" className="btn btn-primary flex-1 sm:flex-none">
                <PlayIcon />
                Play the reel
              </a>
              <a href="#contact" className="btn btn-ghost flex-1 sm:flex-none">
                Hire me
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="label w-full text-on-dark-faint sm:w-auto">Or hire through</span>
              <a href={site.links.upwork} target="_blank" rel="noopener noreferrer" className="btn btn-outline-gold min-h-11 px-4">
                <UpworkIcon width={18} height={18} />
                Upwork
              </a>
              <a
                href={site.links.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fiverr"
                className="btn btn-outline-gold min-h-11 px-4"
              >
                <FiverrIcon />
              </a>
            </div>
          </div>

          {/* The shot, with the tagline keyed in as its subtitle and the stats as clip metadata */}
          <div className="flex flex-col md:col-span-5">
            <figure className="relative flex min-h-64 flex-1 items-end justify-center overflow-hidden border border-line bg-linear-to-b from-navy-light to-navy-mid">
              <HeroShot />
              <figcaption className="relative mb-4 bg-navy/85 px-3 py-1.5 font-mono text-[0.8125rem] text-ivory md:mb-6 md:text-sm">
                <span className="keyed-line" style={{ "--chars": site.tagline.length } as CSSProperties}>
                  <span className="keyed">{site.tagline}</span>
                </span>
              </figcaption>
            </figure>

            <dl className="grid grid-cols-1 border-x border-b border-line sm:grid-cols-3">
              {site.stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-baseline justify-between gap-3 border-line px-3 py-2.5 not-last:border-b sm:block sm:not-last:border-r sm:not-last:border-b-0"
                >
                  <dt className="label text-[0.625rem] text-on-dark-faint">{s.label}</dt>
                  <dd className="text-sm text-on-dark sm:mt-1">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="label flex items-center justify-between gap-4 border-t border-line px-4 py-3 md:px-6">
          <span className="text-on-dark-muted" aria-hidden>
            TC <span data-timecode>{INITIAL_TIMECODE}</span>
          </span>
          <a href="#story" className="flex items-center gap-2 text-on-dark-muted hover:text-ivory">
            Scroll to play
            <ArrowDownIcon width={12} height={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
