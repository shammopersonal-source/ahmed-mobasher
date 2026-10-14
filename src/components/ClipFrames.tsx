import type { Project } from "@/content/projects";
import { quoteFor } from "@/content/projects";
import { Picture } from "./Picture";

/** Frames a clip can be scrubbed through: its stills, or typographic slate frames if it has none. */
export function frameCount(project: Project) {
  return project.images?.length || slateFrames(project).length;
}

type SlateFrame = { label: string; body: string; big?: boolean };

function slateFrames(project: Project): SlateFrame[] {
  const frames: SlateFrame[] = [{ label: project.status, body: project.title, big: true }];
  frames.push({ label: "Tags", body: project.tags.join(" · ") });
  if (project.result) frames.push({ label: "Result", body: project.result });
  const client = project.client;
  if (client) frames.push({ label: "Client", body: [client.name, client.service, client.location].filter(Boolean).join(" · ") });
  return frames;
}

type Props = { project: Project; frame: number; size: "bin" | "featured" | "monitor" };

/** One frame of a clip, filling its (16:9) container. */
export function ClipFrame({ project, frame, size }: Props) {
  if (project.images?.length) {
    const image = project.images[frame % project.images.length];
    return <Picture name={image.name} alt={image.alt} className="absolute inset-0 h-full w-full object-cover" />;
  }

  const frames = slateFrames(project);
  const f = frames[frame % frames.length];
  const quote = quoteFor(project);
  const scale = size === "bin" ? "text-base md:text-lg" : size === "featured" ? "text-xl md:text-3xl" : "text-xl md:text-2xl";

  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-navy-mid p-4 md:p-6">
      <div className="label flex justify-between gap-3 text-[0.625rem] text-on-dark-faint">
        <span>
          Clip {project.number} · {f.label}
        </span>
        <span>
          Fr {frame % frames.length + 1}/{frames.length}
        </span>
      </div>
      <p
        className={`max-w-[28ch] text-ivory ${f.big ? `heading ${scale}` : size === "bin" ? "text-sm md:text-base" : "text-base md:text-lg"} ${
          f.big ? "" : "text-on-dark-muted"
        }`}
      >
        {f.body}
      </p>
      <div className="label flex items-center justify-between gap-3 text-[0.625rem] text-gold">
        <span className="truncate">{project.tags[0]}</span>
        {quote ? <span className="shrink-0 text-on-dark-faint">Client note</span> : null}
      </div>
    </div>
  );
}
