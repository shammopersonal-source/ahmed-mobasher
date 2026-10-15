import { skills, skillsIntro } from "@/content/skills";
import { SectionHead, shell } from "./SectionHead";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="dark bg-navy py-20 text-ivory md:py-28">
      <div className={shell}>
        <SectionHead id="skills" index="02" label={skillsIntro.label} title={skillsIntro.title} dark />
        <ol className="mt-12 grid gap-px border border-line bg-[var(--line)] md:mt-16 md:grid-cols-2 xl:grid-cols-4">
          {skills.map((s, i) => (
            <li key={s.id} className="flex flex-col bg-navy p-6 md:p-8">
              <div className="flex h-7 items-center justify-between gap-3">
                <span className="mono text-gold">{String(i + 1).padStart(2, "0")}</span>
                {s.tag ? <span className="mono border border-dashed border-gold px-2 py-1 text-gold-light">{s.tag}</span> : null}
              </div>
              <h3 className="mt-6 text-4xl font-extrabold tracking-[-0.035em]">{s.name}</h3>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools">
                {s.tools.map((t) => (
                  <li key={t} className="mono bg-navy-light px-2.5 py-1.5 text-ivory">
                    {t}
                  </li>
                ))}
              </ul>
              <ul className="mt-6 space-y-2.5 text-[1.0625rem] text-ivory">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span className="mt-[0.6em] h-0.5 w-3 shrink-0 bg-gold" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-8 text-on-dark-muted">{s.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
