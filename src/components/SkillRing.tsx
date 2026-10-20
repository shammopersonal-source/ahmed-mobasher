import type { CSSProperties } from "react";

type Props = { level?: number; name: string };

/**
 * A ring that sweeps up to `level` (and counts the number up) once the skills cards come
 * into view — all rings together. The final state is what's rendered, so without JS or
 * with reduced motion it simply shows the result. Animation lives in globals.css.
 */
export function SkillRing({ level, name }: Props) {
  const to = level ?? 100;
  return (
    <div className="relative h-16 w-16 shrink-0" role="img" aria-label={level === undefined ? `${name}: in progress` : `${name}: ${level}%`}>
      <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden className="block">
        <circle cx="32" cy="32" r="28" fill="none" stroke="var(--line)" strokeWidth="4" />
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="4"
          transform="rotate(-90 32 32)"
          className="ring-arc"
          style={{ "--to": to } as CSSProperties}
        />
      </svg>
      <span aria-hidden className="absolute inset-0 flex items-center justify-center">
        {level === undefined ? (
          <span className="mono text-[0.625rem] text-gold-light">Lab</span>
        ) : (
          <span className={`flex items-baseline leading-none font-extrabold tracking-[-0.02em] ${level >= 100 ? "text-[0.9375rem]" : "text-lg"}`}>
            <span className="ring-num" style={{ "--to": level, "--count-color": "var(--ivory)" } as CSSProperties}>
              <span>{level}</span>
            </span>
            <span className="text-[0.625rem] text-on-dark-muted">%</span>
          </span>
        )}
      </span>
    </div>
  );
}
