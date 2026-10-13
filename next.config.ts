import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The stylesheet is ~9 KB: inlining it removes the only render-blocking request before the headline paints.
  experimental: { inlineCss: true },
};

export default config;
