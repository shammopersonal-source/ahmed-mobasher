import { projects, workIntro } from "@/content/projects";
import { ProjectDetails } from "./ProjectDetails";
import { SectionHead, shell } from "./SectionHead";
import { WorkShowcase } from "./WorkShowcase";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="dark overflow-hidden bg-navy py-20 text-ivory md:py-28">
      <div className={shell}>
        <SectionHead id="work" index="04" label={`${workIntro.label} · ${String(projects.length).padStart(2, "0")}`} title={workIntro.title} dark />
      </div>

      <div className="js-only mt-6 md:-mt-14">
        <WorkShowcase />
      </div>

      {/* Without JS there is no dialog, so each project is written out in full. */}
      <ol className={`nojs-only mt-12 grid gap-5 md:grid-cols-2 ${shell}`}>
        {projects.map((p) => (
          <li key={p.id} className="border border-line bg-navy-mid p-6">
            <ProjectDetails project={p} />
          </li>
        ))}
      </ol>

      <p className={`${shell} mt-10 text-lg text-on-dark-muted`}>
        {workIntro.more}{" "}
        <a href="#contact" className="font-bold text-gold-light underline underline-offset-4">
          Ask for it
        </a>
      </p>
    </section>
  );
}
