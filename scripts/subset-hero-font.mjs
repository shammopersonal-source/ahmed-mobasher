// Cuts Bodoni Moda down to just the glyphs in the hero headline, at the one weight it
// uses, keeping the optical-size axis. The result is the only display font on the
// critical path; the full family loads separately for the rest of the site.
// Re-run (npm run subset-hero-font) if the name in src/content/site.ts ever changes.
import { readFileSync, writeFileSync } from "node:fs";
import subsetFont from "subset-font";

const SOURCE = "src/fonts/BodoniModa-latin.woff2"; // Google Fonts latin subset, OFL 1.1
const OUT = "src/fonts/BodoniModa-hero.woff2";
const WEIGHT = 500; // matches .display

const name = readFileSync("src/content/site.ts", "utf8").match(/name: "([^"]+)"/)[1];
const text = [...new Set(name.replace(/\s/g, ""))].join("");

const out = await subsetFont(readFileSync(SOURCE), text, { targetFormat: "woff2", variationAxes: { wght: WEIGHT } });
writeFileSync(OUT, out);
console.log(`"${text}" → ${OUT}: ${out.length} bytes (source ${readFileSync(SOURCE).length})`);
