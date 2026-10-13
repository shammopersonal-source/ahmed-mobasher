"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { effects, type EffectId } from "@/content/craft";
import { site } from "@/content/site";
import { Picture } from "./Picture";

const SWATCHES = ["navy", "navy-mid", "navy-light", "ivory", "ivory-warm", "ivory-deep", "gold", "gold-dark", "gold-light"];

// The preview's own markup, shown when the Development effect is on.
const MARKUP = [
  '<figure class="shot">',
  '  <img src="ahmed.avif"',
  `       alt="${site.name}">`,
  "  <figcaption>",
  `    ${site.tagline}`,
  "  </figcaption>",
  "</figure>",
];

// Circuit traces for the Robotics effect, on a 160×90 board (same 16:9 as the frame, so strokes scale evenly).
const TRACES = [
  "M0 14 H22 L30 22 H52",
  "M0 30 H14 L22 38 H52",
  "M0 74 H26 L36 64 H52",
  "M52 46 H40 L32 54 H10 V90",
  "M76 20 V8 H118 L126 16 H160",
  "M84 20 V12 H104 L110 6 V0",
  "M92 64 V78 L100 86 H160",
  "M76 64 V84 H58 L52 90",
  "M108 38 H128 L136 30 H160",
  "M108 50 H122 L132 60 H148 V90",
];
const PADS = [
  [22, 14], [14, 30], [26, 74], [10, 54], [118, 8], [104, 12], [100, 86], [58, 84], [128, 38], [148, 60],
];

/**
 * The inspector: a preview frame on one side, the effect stack on the other. Every
 * effect's content is always readable; the switch only changes what the frame shows.
 */
export function EffectsInspector() {
  const [on, setOn] = useState<Record<EffectId, boolean>>({ video: true, design: false, development: false, robotics: false });
  // Switches do nothing without JS, so they only appear once it is running.
  const [live, setLive] = useState(false);
  useEffect(() => setLive(true), []);

  const toggle = (id: EffectId) => setOn((state) => ({ ...state, [id]: !state[id] }));
  const active = effects.filter((e) => on[e.id]);

  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-10">
      {/* Preview */}
      <div className="sticky top-[var(--topbar-h)] z-10 -mx-3 bg-navy px-3 py-3 md:top-[calc(var(--topbar-h)+1.5rem)] md:col-span-7 md:mx-0 md:self-start md:p-0">
        <figure
          className="fx-preview relative aspect-video overflow-hidden border border-line bg-navy-mid"
          data-video={on.video || undefined}
          data-design={on.design || undefined}
          data-development={on.development || undefined}
          data-robotics={on.robotics || undefined}
        >
          <div className="fx-shot absolute inset-0 bg-linear-to-b from-navy-light to-navy-mid">
            <Picture
              name="portrait-1"
              alt=""
              className="absolute bottom-0 left-[30%] h-[92%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
            />
            <p className="absolute bottom-[12%] left-[30%] -translate-x-1/2 bg-navy/85 px-2 py-1 font-mono text-[0.5625rem] whitespace-nowrap text-ivory md:text-xs">
              {site.tagline}
            </p>
          </div>

          {/* Video: grade + letterbox */}
          <div className="fx-layer fx-grade absolute inset-0" aria-hidden />
          <div className="fx-layer fx-bars absolute inset-0" aria-hidden />

          {/* Design: layout grid + the site's palette */}
          <div className="fx-layer fx-grid absolute inset-0" aria-hidden>
            <span className="label absolute top-[13%] left-[1.5%] text-[0.5rem] text-gold-light md:text-[0.625rem]">12 col</span>
            <span className="absolute bottom-[5%] left-[6%] flex">
              {SWATCHES.map((c) => (
                <span key={c} className="h-2.5 w-2.5 border border-navy md:h-4 md:w-4" style={{ background: `var(--${c})` }} />
              ))}
            </span>
          </div>

          {/* Robotics: circuit trace (under the markup panel when both are on) */}
          <svg className="fx-layer fx-trace absolute inset-0 h-full w-full" viewBox="0 0 160 90" aria-hidden>
            <rect x="52" y="20" width="56" height="44" fill="none" stroke="var(--gold)" strokeWidth="0.3" pathLength={1} className="fx-trace-line" />
            {TRACES.map((d, i) => (
              <path key={d} d={d} fill="none" stroke="var(--gold-light)" strokeWidth="0.3" pathLength={1} className="fx-trace-line" style={{ "--i": i } as CSSProperties} />
            ))}
            {PADS.map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.1" fill="var(--navy)" stroke="var(--gold-light)" strokeWidth="0.3" className="fx-trace-pad" />
            ))}
          </svg>

          {/* Development: the markup */}
          <pre className="fx-layer fx-markup absolute inset-y-0 right-0 flex w-[52%] flex-col justify-center overflow-hidden border-l border-line-strong bg-navy/92 px-3 font-mono text-[0.5rem] leading-relaxed text-on-dark-muted md:px-5 md:text-xs" aria-hidden>
            {MARKUP.map((line, i) => (
              <code key={i} className="block whitespace-pre">
                <span className="mr-2 inline-block w-3 text-right text-on-dark-faint md:mr-3">{i + 1}</span>
                {line}
              </code>
            ))}
          </pre>

          <figcaption className="label absolute top-0 right-0 left-0 flex items-center justify-between gap-3 bg-navy/80 px-3 py-1.5 text-[0.5625rem] text-on-dark-muted md:text-[0.6875rem]">
            <span>Preview</span>
            <span aria-live="polite">{active.length ? active.map((e) => e.name).join(" + ") : "No effects"}</span>
          </figcaption>
        </figure>
      </div>

      {/* Effect stack */}
      <ol className="border border-line md:col-span-5">
        {effects.map((effect) => (
          <li key={effect.id} className="border-line not-last:border-b">
            <article aria-labelledby={`fx-${effect.id}-name`} className="px-4 py-5 md:px-6 md:py-6">
              <header className="flex items-center gap-3">
                <button
                  id={`fx-${effect.id}`}
                  type="button"
                  role="switch"
                  aria-checked={on[effect.id]}
                  aria-label={`${effect.name} effect: ${effect.preview.toLowerCase()}`}
                  onClick={() => toggle(effect.id)}
                  className={`fx-switch label h-9 w-11 shrink-0 border text-xs normal-case ${live ? "" : "invisible"}`}
                >
                  fx
                </button>
                <p className="label text-on-dark-faint">
                  FX {effect.number} · {effect.track}
                </p>
                {effect.tag ? <p className="label ml-auto border border-dashed border-gold px-2 py-1 text-[0.625rem] text-gold-light">{effect.tag}</p> : null}
              </header>

              <h3 id={`fx-${effect.id}-name`} className="heading mt-3 text-2xl text-on-dark">
                {effect.name}
              </h3>
              <p className="mt-1 text-sm text-on-dark-faint">{effect.preview}</p>

              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tools">
                {effect.tools.map((tool) => (
                  <li key={tool} className="label border border-line bg-navy-mid px-2.5 py-1.5 text-on-dark">
                    {tool}
                  </li>
                ))}
              </ul>

              <dl className="mt-4 border-t border-line">
                {effect.params.map((param) => (
                  <div key={param.name} className="grid grid-cols-[8.5rem_1fr] gap-3 border-b border-line py-2.5">
                    <dt className="label pt-0.5 text-on-dark-faint">{param.name}</dt>
                    <dd className="text-[0.9375rem] leading-snug text-on-dark">{param.value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 text-[0.9375rem] text-on-dark-muted">{effect.intent}</p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
