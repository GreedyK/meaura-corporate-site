// Converts the supplied logo artwork (light artwork on a black background) into
// transparent PNGs. Alpha is recovered from pixel luminance, and the wordmark is
// recolored so it stays legible on the white base of the site.
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE = process.argv[2];
const OUT_DIR = path.join(process.cwd(), "public", "images");
const INK = [36, 35, 49];
const CONTENT_THRESHOLD = 20;

const { data, info } = await sharp(SOURCE)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const at = (x, y) => (y * width + x) * channels;
const level = (x, y) => {
  const i = at(x, y);
  return Math.max(data[i], data[i + 1], data[i + 2]);
};

const columnHasContent = [];
for (let x = 0; x < width; x++) {
  let found = false;
  for (let y = 0; y < height; y++) {
    if (level(x, y) > CONTENT_THRESHOLD) {
      found = true;
      break;
    }
  }
  columnHasContent.push(found);
}

const firstColumn = columnHasContent.indexOf(true);
const lastColumn = columnHasContent.lastIndexOf(true);

// The artwork is a symbol followed by a wordmark, separated by the widest gap.
let gapStart = -1;
let widestGap = { start: -1, end: -1, size: 0 };
for (let x = firstColumn; x <= lastColumn; x++) {
  if (!columnHasContent[x]) {
    if (gapStart < 0) gapStart = x;
  } else if (gapStart >= 0) {
    const size = x - gapStart;
    if (size > widestGap.size) widestGap = { start: gapStart, end: x, size };
    gapStart = -1;
  }
}
const markEnd = widestGap.size > 0 ? widestGap.end : lastColumn + 1;

let top = height;
let bottom = -1;
for (let y = 0; y < height; y++) {
  for (let x = firstColumn; x <= lastColumn; x++) {
    if (level(x, y) > CONTENT_THRESHOLD) {
      if (y < top) top = y;
      if (y > bottom) bottom = y;
      break;
    }
  }
}

function render({ wordmarkColor, markOnly }) {
  const out = Buffer.alloc(width * height * 4, 0);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = at(x, y);
      const o = (y * width + x) * 4;
      const max = Math.max(data[i], data[i + 1], data[i + 2]);
      if (max <= 4) continue;
      const isMark = x < markEnd;
      if (markOnly && !isMark) continue;

      if (isMark || !wordmarkColor) {
        // Recover the unpremultiplied color that was composited onto black.
        const scale = 255 / max;
        out[o] = Math.min(255, Math.round(data[i] * scale));
        out[o + 1] = Math.min(255, Math.round(data[i + 1] * scale));
        out[o + 2] = Math.min(255, Math.round(data[i + 2] * scale));
        out[o + 3] = max;
      } else {
        out[o] = wordmarkColor[0];
        out[o + 1] = wordmarkColor[1];
        out[o + 2] = wordmarkColor[2];
        out[o + 3] = Math.min(255, Math.round(max * 1.45));
      }
    }
  }
  return out;
}

async function save(name, pixels, box) {
  const file = path.join(OUT_DIR, name);
  await sharp(pixels, { raw: { width, height, channels: 4 } })
    .extract(box)
    .png({ compressionLevel: 9 })
    .toFile(file);
  const meta = await sharp(file).metadata();
  return `${name} ${meta.width}x${meta.height}`;
}

await mkdir(OUT_DIR, { recursive: true });

const fullBox = {
  left: firstColumn,
  top,
  width: lastColumn - firstColumn + 1,
  height: bottom - top + 1,
};
const markBox = {
  left: firstColumn,
  top,
  width: widestGap.start - firstColumn + 1,
  height: bottom - top + 1,
};

const report = [
  await save("logo.png", render({ wordmarkColor: INK }), fullBox),
  await save("logo-white.png", render({ wordmarkColor: [255, 255, 255] }), fullBox),
  await save("logo-mark.png", render({ markOnly: true }), markBox),
];

// Square symbol for the favicon. The artwork is wide, so the canvas is sized from
// its width to keep the symbol as large as a square icon allows.
const canvas = markBox.width + Math.round(markBox.width * 0.05) * 2;
await sharp({
  create: {
    width: canvas,
    height: canvas,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([{ input: path.join(OUT_DIR, "logo-mark.png"), gravity: "center" }])
  .resize(512, 512)
  .png({ compressionLevel: 9 })
  .toFile(path.join(process.cwd(), "app", "icon.png"));

// Social sharing card: the logo centered on the brand gradient.
const ogWidth = 1200;
const ogHeight = 630;
const background = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${ogWidth}" height="${ogHeight}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset=".45" stop-color="#eef7ff"/>
        <stop offset="1" stop-color="#f8ecff"/>
      </linearGradient>
      <radialGradient id="b" cx=".2" cy=".1" r=".8">
        <stop offset="0" stop-color="#bef3fe" stop-opacity=".85"/>
        <stop offset="1" stop-color="#bef3fe" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="p" cx=".85" cy=".9" r=".8">
        <stop offset="0" stop-color="#f1b0fe" stop-opacity=".8"/>
        <stop offset="1" stop-color="#f1b0fe" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${ogWidth}" height="${ogHeight}" fill="url(#g)"/>
    <rect width="${ogWidth}" height="${ogHeight}" fill="url(#b)"/>
    <rect width="${ogWidth}" height="${ogHeight}" fill="url(#p)"/>
  </svg>`
);
const ogLogo = await sharp(path.join(OUT_DIR, "logo.png"))
  .resize({ width: 760 })
  .toBuffer();
await sharp(background)
  .composite([{ input: ogLogo, gravity: "center" }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(process.cwd(), "app", "opengraph-image.png"));

console.log(
  [
    `source ${width}x${height}`,
    `mark columns ${firstColumn}-${widestGap.start}`,
    `gap ${widestGap.start}-${widestGap.end}`,
    ...report,
    "app/icon.png 512x512",
    `app/opengraph-image.png ${ogWidth}x${ogHeight}`,
  ].join("\n")
);
