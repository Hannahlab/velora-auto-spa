/**
 * One-time image optimization for public/ photos.
 *
 * - Resizes each photo to its largest rendered size on the page
 * - Converts to WebP (q78) — visually identical, a fraction of the bytes
 * - Moves the original .jpg files to assets-source/ (kept out of builds)
 *
 * Usage: bun scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { mkdir, readdir, rename, stat } from "fs/promises";
import path from "path";

const PUBLIC = "public";
const ORIGINALS = "assets-source";

// Max rendered width per image (px). Hero is full-bleed; the rest live in
// half-width panels or grid tiles, so 1280 is already 2x their layout width.
const MAX_WIDTH = {
  "hero.jpg": 1920,
  "interior-2.jpg": 1600,
};

const fmt = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

const files = (await readdir(PUBLIC)).filter((f) => f.endsWith(".jpg"));
if (files.length === 0) {
  console.log("No .jpg files in public/ — nothing to do.");
  process.exit(0);
}

await mkdir(ORIGINALS, { recursive: true });

let beforeTotal = 0;
let afterTotal = 0;

for (const file of files) {
  const src = path.join(PUBLIC, file);
  const dest = path.join(PUBLIC, file.replace(/\.jpg$/, ".webp"));

  const meta = await sharp(src).metadata();
  const out = await sharp(src)
    .resize({ width: MAX_WIDTH[file] ?? 1280, withoutEnlargement: true })
    .webp({ quality: 78, effort: 4 })
    .toFile(dest);

  const srcSize = (await stat(src)).size;
  beforeTotal += srcSize;
  afterTotal += out.size;

  console.log(
    `${file}  ${meta.width}x${meta.height} ${fmt(srcSize)}  →  ` +
      `${out.width}x${out.height} ${fmt(out.size)}  ` +
      `(-${Math.round((1 - out.size / srcSize) * 100)}%)`,
  );

  await rename(src, path.join(ORIGINALS, file));
}

console.log(
  `\nTotal: ${fmt(beforeTotal)} → ${fmt(afterTotal)} ` +
    `(-${Math.round((1 - afterTotal / beforeTotal) * 100)}%)`,
);
