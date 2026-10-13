Self-hosted Latin subsets (from Google Fonts, all SIL Open Font License 1.1):

- `BodoniModa-latin.woff2` — variable (opsz 6–96, wght 400–900)
- `BodoniModa-hero.woff2` — the hero headline's glyphs only; regenerate with `npm run subset-hero-font`
- `IBMPlexSans-latin.woff2` — variable (wght 100–700)
- `IBMPlexMono-400-latin.woff2` — regular

Loaded with `next/font/local` in `src/app/layout.tsx`. Self-hosting keeps the stylesheet to
one `@font-face` per family instead of one per language subset.
