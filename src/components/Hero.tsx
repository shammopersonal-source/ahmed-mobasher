import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { HeroPortrait } from "./HeroPortrait";
import { ArrowRightIcon, FiverrIcon, UpworkIcon } from "./icons";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="mx-auto grid max-w-[90rem] gap-12 px-5 pt-8 pb-20 md:grid-cols-12 md:gap-5 md:px-10 md:pt-12 md:pb-24">
      <div className="flex flex-col md:col-span-7">
        <ul className="mono flex flex-wrap gap-2.5">
          <li className="flex items-center gap-2 border border-line-on-light bg-ivory px-2.5 py-2">
            <span className="h-[7px] w-[7px] bg-gold-dark" aria-hidden />
            {site.availability}
          </li>
          <li className="border border-line-on-light bg-ivory px-2.5 py-2">{site.contact.location}</li>
          <li className="border border-line-on-light bg-ivory px-2.5 py-2">Since 2020</li>
        </ul>

        <h1 id="hero-title" className="h-display mt-8 text-[clamp(4.5rem,11.5vw,10.5rem)] md:mt-12">
          Ahmed
          <br />
          <span className="text-transparent [-webkit-text-stroke:2px_var(--navy)]">Mob</span>asher
        </h1>
        <p className="sr-only">{site.role}. {site.summary}</p>

        <ul className="mt-8 grid grid-cols-2 border-t-2 border-navy sm:grid-cols-4 md:mt-10 md:grid-cols-2 xl:grid-cols-4" aria-label="What I do">
          {site.roles.map((r, i) => (
            <li key={r} className="hero-rise pt-4 pr-4 pb-3" style={{ "--delay": `${250 + i * 70}ms` } as CSSProperties}>
              <span className="mono text-on-light-faint">{String(i + 1).padStart(2, "0")}</span>
              <span className="block text-xl font-bold tracking-[-0.01em] md:text-[1.375rem]">{r}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap md:mt-auto md:pt-10">
          <a href="#services" style={{ "--delay": "600ms" } as CSSProperties} className="hero-rise btn btn-gold col-span-2">
            See what I do <ArrowRightIcon width={16} height={16} />
          </a>
          <a href="#contact" style={{ "--delay": "670ms" } as CSSProperties} className="hero-rise btn btn-outline col-span-2">
            Get in touch
          </a>
          <a href={site.links.upwork} target="_blank" rel="noopener noreferrer" aria-label="Hire on Upwork" style={{ "--delay": "740ms" } as CSSProperties} className="hero-rise btn btn-market">
            <UpworkIcon width={22} height={22} />
          </a>
          <a href={site.links.fiverr} target="_blank" rel="noopener noreferrer" aria-label="Hire on Fiverr" style={{ "--delay": "810ms" } as CSSProperties} className="hero-rise btn btn-market">
            <FiverrIcon />
          </a>
        </div>
      </div>

      {/* On phones the photo comes first; from tablet up it sits to the right of the name. */}
      <div className="order-first mr-3 md:order-none md:col-span-5 md:mr-6">
        <HeroPortrait />
      </div>
    </section>
  );
}
