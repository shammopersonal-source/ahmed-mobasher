import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";
import { site } from "@/content/site";
import "./globals.css";

// The hero headline is the LCP element, so it gets its own 3 KB cut of Bodoni Moda (just
// the letters of the name, see scripts/subset-hero-font.mjs), preloaded, with a
// hand-tuned Times fallback (see "Bodoni Hero Fallback" in globals.css; next/font can't derive
// one from an 11-glyph subset). The full family is not preloaded: nothing above the fold needs it.
const bodoniHero = localFont({
  src: "../fonts/BodoniModa-hero.woff2",
  weight: "500",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
  variable: "--font-bodoni-hero",
});
const bodoni = Bodoni_Moda({ subsets: ["latin"], axes: ["opsz"], display: "swap", preload: false, variable: "--font-bodoni" });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "600"], display: "swap", variable: "--font-plex-sans" });
// Fall back to real monospace faces with the same 0.6em advance (not next/font's adjusted
// Arial), so labels wrap identically before and after the webfont arrives.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Menlo", "Roboto Mono", "DejaVu Sans Mono", "Courier New", "monospace"],
  variable: "--font-plex-mono",
});

const title = `${site.name} — Video editor, designer & developer`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "profile", url: site.url, siteName: site.name, title, description: site.description, locale: "en_US" },
  twitter: { card: "summary_large_image", title, description: site.description },
};

export const viewport: Viewport = { themeColor: "#0d1b2a", colorScheme: "dark" };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      image: `${site.url}/img/portrait-3.webp`,
      jobTitle: "Creative technologist",
      description: site.description,
      email: `mailto:${site.contact.email}`,
      telephone: site.contact.phoneHref.replace("tel:", ""),
      address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
      knowsAbout: ["Video editing", "Graphic design", "Brand identity", "Web development", "App development", "Robotics"],
      sameAs: [site.links.linkedin, site.links.facebook, site.links.upwork, site.links.fiverr],
      worksFor: { "@id": `${site.agency.url}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${site.agency.url}/#organization`,
      name: site.agency.name,
      url: site.agency.url,
      description: site.agency.description,
      founder: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoniHero.variable} ${bodoni.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
