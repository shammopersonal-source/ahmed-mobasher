import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // experimental.inlineCss was tried and dropped: once every section was in, the doubled
  // CSS in the HTML (326 KB raw vs 176 KB) made LCP worse (mobile, applied throttling
  // 2.7 s with it vs 1.5 s without; simulated 3.1 s vs 2.9 s).
};

export default config;
