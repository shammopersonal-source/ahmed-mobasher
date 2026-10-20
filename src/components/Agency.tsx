import { site } from "@/content/site";
import { ArrowUpRightIcon } from "./icons";
import { Picture } from "./Picture";
import { SectionHead, shell } from "./SectionHead";

const { agency } = site;

export function Agency() {
  return (
    <section id="agency" aria-labelledby="agency-title" className="bg-ivory py-20 md:py-28">
      <div className={shell}>
        <SectionHead
          id="agency"
          index="05"
          label={`Agency · Founded by ${site.name}`}
          title={<>{agency.headline[0]}<br />{agency.headline[1]}</>}
          aside={
            <a href={agency.url} target="_blank" rel="noopener" className="block w-56 shrink-0 md:w-72" aria-label={`${agency.name} website`}>
              <Picture name="startup-solution-logo-dark" alt={`${agency.name} logo`} className="h-auto w-full" />
            </a>
          }
        />

        <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:gap-5">
          <p className="text-xl leading-snug text-on-light-muted md:text-2xl lg:col-span-6">{agency.description}</p>
          <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:col-start-8 lg:items-end">
            <p className="mono border-2 border-navy px-3 py-2">{agency.offer}</p>
            <a href={agency.url} target="_blank" rel="noopener" className="btn btn-navy notch">
              Visit {agency.name} <ArrowUpRightIcon width={14} height={14} />
            </a>
          </div>
        </div>

        <ol className="mt-12 grid gap-px border border-line-on-light bg-[var(--line-on-light)] md:mt-16 lg:grid-cols-3">
          {agency.services.map((s, i) => (
            <li key={s.name} className="bg-ivory p-6 md:p-8">
              <span className="mono text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-2xl font-extrabold tracking-[-0.025em]">{s.name}</h3>
              <p className="mt-3 leading-relaxed text-on-light-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
