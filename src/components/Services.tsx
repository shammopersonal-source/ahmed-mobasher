import { services, servicesIntro } from "@/content/services";
import { ArrowUpRightIcon } from "./icons";
import { reveal, revealGroup, SectionHead, shell } from "./SectionHead";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-20 md:py-28">
      <div className={shell}>
        <SectionHead id="services" index="03" label={servicesIntro.label} title={servicesIntro.title} reveal />
        <ol className="mt-12 border-t-2 border-navy md:mt-16" {...revealGroup(2)}>
          {services.map((s, i) => (
            <li key={s.id} className="lift-row grid gap-4 border-b border-line-on-light py-8 transition-colors duration-500 md:py-10 lg:grid-cols-12 lg:gap-5" {...reveal(i)}>
              <span className="mono pt-2 text-gold-ink lg:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[2.25rem] leading-[0.95] font-extrabold tracking-[-0.035em] md:text-5xl lg:col-span-5">{s.name}</h3>
              <div className="lg:col-span-6">
              <p className="max-w-[60ch] text-lg leading-relaxed text-on-light-muted">{s.text}</p>
              <div className="mt-5">
                <a href={`#contact`} data-format={s.format} className="btn btn-outline min-h-11 px-4 text-base whitespace-nowrap">
                  {s.cta} <ArrowUpRightIcon width={14} height={14} />
                </a>
              </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
