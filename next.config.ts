import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Inlining the stylesheet removes the only render-blocking request before the hero
  // headline paints: measured locally (mobile, applied throttling) LCP 0.9 s with it vs
  // 1.6 s without, simulated LCP within 0.1 s either way.
  //
  // REVISIT: this is an experimental flag, and it currently writes the CSS into the HTML
  // more than once (a <style> block plus copies in the RSC payload) — about 188 KB raw /
  // 38 KB gzipped of document vs 81 KB / 13 KB without. Re-measure on the Vercel preview,
  // and again when Next changes how the flag emits CSS; drop it if the gain disappears.
  experimental: { inlineCss: true },
};

export default config;
