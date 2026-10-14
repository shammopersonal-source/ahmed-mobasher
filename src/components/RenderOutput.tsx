"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { subscribe } from "@/lib/playhead";

/**
 * Agency's render: a progress bar tied to scroll, with the frame below revealed by the
 * render's scan line as it advances. Without JS, or with reduced motion, it is simply
 * complete.
 */
export function RenderOutput({ file, steps, children }: { file: string; steps: string[]; children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(100);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return subscribe(() => {
      const el = frame.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight;
      // 0% as the frame's top enters the bottom of the screen, 100% by the time it is 35% from the top.
      const next = Math.round(Math.min(1, Math.max(0, (vh - top) / (vh * 0.65))) * 100);
      setPct((p) => (p === next ? p : next));
    });
  }, []);

  const done = pct >= 100;
  const step = Math.min(steps.length - 1, Math.floor((pct / 100) * steps.length));

  return (
    <div>
      <div className="border border-b-0 border-line-on-light bg-ivory-warm px-4 py-3 md:px-6">
        <div className="label flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-on-light-muted">
          <span>
            Render output · <span className="text-on-light">{file}</span>
          </span>
          <span aria-live="polite" className={done ? "text-gold-ink" : ""}>
            {done ? "Render complete" : `Rendering ${steps[step]}`} · {pct}%
          </span>
        </div>
        <div className="mt-2.5 h-1.5 bg-ivory-deep" role="progressbar" aria-label="Render progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
          <div className="h-full origin-left bg-gold-ink" style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
      </div>
      <div ref={frame} className="render-frame relative border border-line-on-light bg-ivory" style={{ "--reveal": `${100 - pct}%` } as React.CSSProperties} data-rendering={done ? undefined : true}>
        {children}
      </div>
    </div>
  );
}
