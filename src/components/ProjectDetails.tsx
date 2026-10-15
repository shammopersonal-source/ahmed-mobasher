import { quoteFor, type Project } from "@/content/projects";
import { LockIcon } from "./icons";

/** Brief, what he did, tags, client, result and the client's words. Used by the dialog and the no-JS list. */
export function ProjectDetails({ project, titleId }: { project: Project; titleId?: string }) {
  const quote = quoteFor(project);
  const rows = [
    { label: "Tags", value: project.tags.join(" · ") },
    project.client ? { label: "Client", value: [project.client.name, project.client.location].filter(Boolean).join(" · ") } : null,
    project.result ? { label: "Result", value: project.result } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div>
      <p className="mono text-gold">
        {project.number} / {project.category}
      </p>
      <h3 id={titleId} className="mt-3 text-3xl leading-[1] font-extrabold tracking-[-0.03em] md:text-4xl">
        {project.title}
      </h3>
      <p className="mt-5 text-lg leading-relaxed text-on-dark-muted">{project.brief}</p>
      <h4 className="mono mt-7 text-gold">What I did</h4>
      <ul className="mt-3 space-y-2 text-[1.0625rem]">
        {project.did.map((d) => (
          <li key={d} className="flex gap-3">
            <span className="mt-[0.6em] h-0.5 w-3 shrink-0 bg-gold" aria-hidden />
            {d}
          </li>
        ))}
      </ul>
      <dl className="mt-7 border-t border-line">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-line py-3">
            <dt className="mono pt-1 text-on-dark-faint">{r.label}</dt>
            <dd className="text-[1.0625rem]">{r.value}</dd>
          </div>
        ))}
      </dl>
      {quote ? (
        <figure className="mt-7 border-l-2 border-gold pl-4">
          <blockquote className="leading-relaxed text-on-dark-muted">“{quote.text}”</blockquote>
          <figcaption className="mono mt-3 flex items-center gap-2 text-on-dark-faint">
            <LockIcon width={12} height={12} /> {quote.author} · {quote.location}
          </figcaption>
        </figure>
      ) : null}
    </div>
  );
}
