import { about } from "@/content/about";
import { site } from "@/content/site";
import { ArrowRightIcon } from "./icons";
import { reveal, revealGroup, SectionHead, shell } from "./SectionHead";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t-2 border-navy bg-ivory py-20 md:py-28">
      <div className={shell}>
        <SectionHead id="about" index="01" label={about.label} title={<>{about.title[0]}<br />{about.title[1]}</>} reveal />

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-5" {...revealGroup(2)}>
          <div className="md:col-span-7">
            <p className="text-2xl leading-snug font-bold tracking-[-0.015em] md:text-[1.75rem]" {...reveal(0)}>{about.intro}</p>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-on-light-muted" {...reveal(1)}>
              {about.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <dl className="border-t-2 border-navy">
              {about.facts.map((f, i) => (
                <div key={f.label} className="flex items-baseline justify-between gap-4 border-b border-line-on-light py-4" {...reveal(1 + i)}>
                  <dt className="mono text-on-light-faint">{f.label}</dt>
                  <dd className="text-right text-lg font-bold">{f.value}</dd>
                </div>
              ))}
            </dl>
            <a href={site.agency.url} target="_blank" rel="noopener" className="nudge-parent mt-6 flex items-center justify-between gap-4 bg-navy p-5 text-ivory transition-colors duration-300 hover:bg-navy-light focus-visible:bg-navy-light" {...reveal(5)}>
              <span>
                <span className="mono block text-gold">{site.agency.role}</span>
                <span className="mt-1 block text-xl font-bold">{site.agency.name}</span>
              </span>
              <ArrowRightIcon width={20} height={20} className="nudge text-gold-light" />
            </a>
          </aside>
        </div>

        {/* The bigger story */}
        <div className="mt-16 bg-navy p-6 text-ivory md:mt-24 md:grid md:grid-cols-12 md:gap-5 md:p-12" {...revealGroup()}>
          <div className="md:col-span-5" {...reveal(0)}>
            <p className="mono text-gold">{about.bigger.title}</p>
            <blockquote className="mt-5 text-[2rem] leading-[1.05] font-extrabold tracking-[-0.035em] text-gold-light md:text-5xl">“{about.bigger.quote}”</blockquote>
          </div>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-on-dark-muted md:col-span-6 md:col-start-7 md:mt-0" {...reveal(1)}>
            {about.bigger.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="text-ivory">{about.bigger.after}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
