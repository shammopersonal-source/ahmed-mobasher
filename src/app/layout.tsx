import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import "./globals.css";

// Self-hosted Latin subsets (see src/fonts/README.md).
const cabinet = localFont({
  src: [
    { path: "../fonts/CabinetGrotesk-500-latin.woff2", weight: "500" },
    { path: "../fonts/CabinetGrotesk-700-latin.woff2", weight: "700" },
    { path: "../fonts/CabinetGrotesk-800-latin.woff2", weight: "800" },
  ],
  display: "swap",
  adjustFontFallback: "Arial",
  variable: "--font-cabinet",
});
// Small labels only, so it isn't preloaded.
const jetbrains = localFont({
  src: "../fonts/JetBrainsMono-latin.woff2",
  weight: "400 500",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["Menlo", "Roboto Mono", "DejaVu Sans Mono", "Courier New", "monospace"],
  variable: "--font-jetbrains",
});

const title = `${site.name} — Video editor, designer & developer`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
  },
  twitter: { card: "summary_large_image", title, description: site.description, images: ["/og.png"] },
};

export const viewport: Viewport = { themeColor: "#ede8dc" };

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
    <html lang="en" suppressHydrationWarning className={`${cabinet.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
