/* --------------------------------------------------------------------------
   One-off script: rasterize brand/alpha-mark.svg to high-resolution PNG
   variants using sharp (already a Next.js dependency).

   Run with:   node brand/generate-logo.mjs

   Outputs to brand/:
     alpha-mark-2048.png   · 2048 × 2048 · sage tile on transparent canvas
     alpha-mark-1024.png   · 1024 × 1024
     alpha-mark-512.png    · 512  × 512   (good for social avatars)
     alpha-mark-256.png    · 256  × 256
-------------------------------------------------------------------------- */

import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "alpha-mark.svg");

const SIZES = [2048, 1024, 512, 256];

const svgBuf = await readFile(SRC);

for (const size of SIZES) {
  const out = join(HERE, `alpha-mark-${size}.png`);
  await sharp(svgBuf, { density: 300 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: false })
    .toFile(out);
  console.log(`✓ ${out}`);
}

console.log("\nDone. All PNGs use a transparent canvas around the rounded green tile.");
