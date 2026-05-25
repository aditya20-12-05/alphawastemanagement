/* --------------------------------------------------------------------------
   Generate the Alpha · Waste Management wordmark logo as high-resolution
   PNGs. Mirrors the website's wordmark exactly: Fraunces serif for "Alpha",
   Inter bold-uppercase tracked for "Waste Management" perfectly centred
   below.

   Why this path:
   - Sharp + librsvg can't reliably resolve web fonts (no fontconfig in the
     Windows / git-bash environment).
   - Satori takes JSX + raw font buffers and produces an SVG with text
     converted to paths, so the font is locked in regardless of the host.
   - @resvg/resvg-js then rasterises the SVG to PNG at any scale.

   Run with:   node brand/generate-wordmark.mjs

   Outputs to brand/:
     alpha-wordmark-4000.png   · 4000×~1500 px master (print + large format)
     alpha-wordmark-2000.png   · half-resolution working size
     alpha-wordmark-1000.png   · web / signature size
     alpha-wordmark-500.png    · small / inline
-------------------------------------------------------------------------- */

import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));

/* Brand colour. Same lighter shade we used on the monogram — visible on
   light backgrounds, holds presence under a B&W print conversion. */
const GREEN = "#4A7C4E";

/* --- Font loading --------------------------------------------------------
   Pull the same families the website uses, directly from Google Fonts so
   the wordmark matches the on-screen rendering exactly. We grab Fraunces
   Regular (for "Alpha") and Inter Bold 700 (for "Waste Management"). */

async function loadFont(cssUrl, fontFamilyName) {
  /* Google's CSS API serves woff2 to modern browsers and TTF only to old
     ones. Satori's underlying opentype.js doesn't parse woff2, so we
     pretend to be IE9 — that's old enough to be served TTF. */
  const cssRes = await fetch(cssUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
    },
  });
  const css = await cssRes.text();
  // opentype.js (which satori uses) supports TTF, OTF, and WOFF. It does
  // *not* support WOFF2, so we accept anything except woff2.
  const match =
    css.match(/src:\s*url\(([^)]+)\)\s*format\(['"]?(?:truetype|opentype|woff)['"]?\)/) ||
    css.match(/url\((https?:\/\/[^)]+\.(?:ttf|otf|woff))\)/);
  if (!match) {
    throw new Error(
      `No usable font URL in CSS for ${fontFamilyName}. Got CSS:\n${css.slice(0, 500)}`
    );
  }
  const buf = await (await fetch(match[1])).arrayBuffer();
  return Buffer.from(buf);
}

console.log("Fetching fonts…");
const [fraunces, interBold] = await Promise.all([
  loadFont(
    "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&display=swap",
    "Fraunces"
  ),
  loadFont(
    "https://fonts.googleapis.com/css2?family=Inter:wght@800&display=swap",
    "Inter"
  ),
]);
console.log("Fonts ready.");

/* --- The wordmark JSX ----------------------------------------------------
   Layout intent:
     - "Alpha" in Fraunces, very large, dead centre.
     - "Waste Management" in Inter 800 uppercase, generous letter-spacing,
       perfectly centred below the descender of "Alpha".
     - Both lines share the same green; subtitle sits about a stroke-width
       below the wordmark.
   The container has no background — we'll emit a transparent PNG so the
   logo can be placed on any colour. */

const MASTER_WIDTH = 4000;
const MASTER_HEIGHT = 1500;

const jsx = {
  type: "div",
  props: {
    style: {
      width: MASTER_WIDTH,
      height: MASTER_HEIGHT,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      // No background — transparent canvas.
    },
    children: [
      // "Alpha"
      {
        type: "div",
        props: {
          style: {
            fontFamily: "Fraunces",
            fontSize: 760,
            fontWeight: 500,
            color: GREEN,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          },
          children: "Alpha",
        },
      },
      // "WASTE MANAGEMENT" — bold, uppercase, tracked, perfectly centred.
      {
        type: "div",
        props: {
          style: {
            marginTop: 56,
            fontFamily: "Inter",
            fontSize: 132,
            fontWeight: 800,
            textTransform: "uppercase",
            color: GREEN,
            letterSpacing: "0.38em",
            // Offset right by half the letter-spacing so the visual block
            // (which is shifted left by the trailing-spacing convention)
            // optically centres under "Alpha".
            paddingLeft: "0.38em",
            lineHeight: 1,
          },
          children: "Waste Management",
        },
      },
    ],
  },
};

console.log("Rendering SVG via satori…");
const svg = await satori(jsx, {
  width: MASTER_WIDTH,
  height: MASTER_HEIGHT,
  fonts: [
    { name: "Fraunces", data: fraunces, weight: 500, style: "normal" },
    { name: "Inter", data: interBold, weight: 800, style: "normal" },
  ],
});

console.log("Rasterising at four sizes…");
const SIZES = [4000, 2000, 1000, 500];

for (const w of SIZES) {
  const fitToWidth = w;
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: fitToWidth },
    background: "rgba(0,0,0,0)", // transparent canvas
  });
  const pngData = resvg.render().asPng();
  const out = join(HERE, `alpha-wordmark-${w}.png`);
  await writeFile(out, pngData);
  console.log(`  ✓ ${out}`);
}

// Also save the SVG source for vector editing.
await writeFile(join(HERE, "alpha-wordmark.svg"), svg);
console.log(`  ✓ ${join(HERE, "alpha-wordmark.svg")}`);

console.log("\nDone.");
