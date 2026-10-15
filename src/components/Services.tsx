import { services, servicesIntro } from "@/content/services";
import { ArrowUpRightIcon } from "./icons";
import { SectionHead, shell } from "./SectionHead";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-20 md:py-28">
      <div className={shell}>
        <SectionHead id="services" index="03" label={servicesIntro.label} title={servicesIntro.title} />
        <ol className="mt-12 border-t-2 border-navy md:mt-16">
          {services.map((s, i) => (
            <li key={s.id} className="grid gap-4 border-b border-line-on-light py-8 md:grid-cols-12 md:gap-5 md:py-10">
              <span className="mono pt-2 text-gold-ink md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[2.25rem] leading-[0.95] font-extrabold tracking-[-0.035em] md:col-span-5 md:text-5xl">{s.name}</h3>
              <p className="text-lg leading-relaxed text-on-light-muted md:col-span-4">{s.text}</p>
              <div className="md:col-span-2 md:justify-self-end">
                <a href={`#contact`} data-format={s.format} className="btn btn-outline min-h-11 px-4 text-base whitespace-nowrap">
                  {s.cta} <ArrowUpRightIcon width={14} height={14} />
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
