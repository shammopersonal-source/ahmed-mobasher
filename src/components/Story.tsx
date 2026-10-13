import type { CSSProperties } from "react";
import { tracks } from "@/content/sections";
import { scenes, story, type Scene } from "@/content/story";
import { site } from "@/content/site";
import { CutSection } from "./CutSection";
import { ArrowDownIcon } from "./icons";
import { SceneFrame } from "./SceneFrame";

// Frames step right by track, echoing the rows of the timeline. Desktop only.
const STAGGER = ["md:col-start-1", "md:col-start-2", "md:col-start-3", "md:col-start-4"];
const corner = "absolute h-3 w-3 border-gold-ink";

function Slate({ scene, inverted }: { scene: Scene; inverted: boolean }) {
  const track = tracks.find((t) => t.id === scene.track)!;
  return (
    <div
      className={`label flex flex-wrap items-center gap-x-4 gap-y-1 border-b px-4 py-3 md:w-44 md:shrink-0 md:flex-col md:items-start md:justify-between md:gap-0 md:border-r md:border-b-0 md:px-5 md:py-6 ${
        inverted ? "border-line text-on-dark-muted" : "border-line-on-light bg-ivory-warm text-on-light-muted"
      }`}
    >
      <p className={`flex items-center gap-2 ${inverted ? "text-gold-light" : "text-on-light"}`}>
        <span className="playing-dot h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
        <span className="md:text-sm">
          SC {scene.number} <span aria-hidden>/</span> {story.take}
        </span>
      </p>
      <dl className="flex gap-x-4 md:mt-auto md:block md:space-y-2">
        {scene.years ? (
          <div>
            <dt className="sr-only">Year</dt>
            <dd>{scene.years}</dd>
          </div>
        ) : null}
        <div>
          <dt className="sr-only">Track</dt>
          <dd>
            {track.id} · {track.label}
          </dd>
        </div>
      </dl>
    </div>
  );
}

/** Rough Cut: the About text as six scenes, each a frame with its slate. */
export function Story() {
  return (
    <CutSection id="story" transition="hard-cut" labelledBy="story-title" className="bg-ivory pb-20 text-on-light outline-none md:pb-32">
      <header className="px-5 pt-16 pb-12 md:px-16 md:pt-28 md:pb-20">
        <p className="label text-gold-ink">
          {story.slate} · {scenes.length} scenes
        </p>
        <h2 id="story-title" className="display mt-5" style={{ "--display-size": "clamp(3rem, 10vw, 9rem)" } as CSSProperties}>
          {story.opener[0]}
          <br />
          {story.opener[1]}
        </h2>
        <p className="mt-6 max-w-[36ch] text-lg leading-snug text-on-light-muted md:mt-8 md:text-xl">{story.subtitle}</p>
      </header>

      <ol className="grid gap-5 px-3 md:grid-cols-12 md:gap-y-8 md:px-16">
        {scenes.map((scene, i) => {
          const inverted = i === scenes.length - 1;
          const row = tracks.findIndex((t) => t.id === scene.track);
          return (
            <li key={scene.id} className={`md:col-span-9 ${STAGGER[row]}`}>
              <SceneFrame
                id={scene.id}
                className={`scene relative flex scroll-mt-6 flex-col border outline-none md:flex-row ${
                  inverted ? "border-navy bg-navy text-on-dark" : "border-line-on-light bg-ivory"
                }`}
              >
                <span aria-hidden className={`${corner} -top-px -left-px border-t border-l`} />
                <span aria-hidden className={`${corner} -right-px -bottom-px border-r border-b`} />
                <Slate scene={scene} inverted={inverted} />

                <div className="px-4 py-6 md:px-10 md:py-9">
                  <h3
                    id={`${scene.id}-title`}
                    className="display"
                    style={{ "--display-size": "clamp(2.5rem, 4vw, 3.5rem)", lineHeight: 1 } as CSSProperties}
                  >
                    {scene.title}
                  </h3>
                  <div className={`mt-5 max-w-[60ch] space-y-4 text-[1.0625rem] md:text-lg ${inverted ? "text-on-dark-muted" : "text-on-light-muted"}`}>
                    {scene.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                  {scene.quote ? (
                    <blockquote
                      className="display mt-6 max-w-[18ch] text-gold-light"
                      style={{ "--display-size": "clamp(2.5rem, 4.5vw, 4rem)", lineHeight: 1.02 } as CSSProperties}
                    >
                      “{scene.quote}”
                    </blockquote>
                  ) : null}
                  {scene.after ? (
                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                      <p className="text-lg text-on-dark">{scene.after}</p>
                      <a href="#agency" className="btn btn-ghost min-h-11 px-4">
                        See {site.agency.name}
                        <ArrowDownIcon width={12} height={12} />
                      </a>
                    </div>
                  ) : null}
                </div>
              </SceneFrame>
            </li>
          );
        })}
      </ol>
    </CutSection>
  );
}
