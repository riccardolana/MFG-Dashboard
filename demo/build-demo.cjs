#!/usr/bin/env node
/*
 * build-demo.cjs — Rebuilds a single self-contained demo HTML from the live `web/` frontend.
 *
 * The deployed Strategy Map (Cloud Run) is served from ../web. That app already runs without a
 * backend: boot.js fetches /api/strategy and falls back to the bundled data-fallback.js. This
 * script produces a fully static, single-file version for quick sharing (no server, no link):
 *   - inlines styles.css, icons.js, data-fallback.js, app.js
 *   - drops boot.js (no fetch) — data-fallback.js's top-level consts feed app.js directly
 *   - base64-inlines every image asset (brand logo, value-driver texture, hero art)
 * Re-run after changing anything under web/:  node demo/build-demo.cjs
 */
const fs = require("fs");
const path = require("path");

const WEB = path.resolve(__dirname, "..", "web");
const OUT = path.join(__dirname, "strategy-map-demo.html");

const read = (p) => fs.readFileSync(path.join(WEB, p), "utf8");

function dataUri(relPath) {
  const abs = path.join(WEB, relPath);
  const buf = fs.readFileSync(abs);
  const ext = path.extname(abs).toLowerCase();
  const mime = ext === ".svg" ? "image/svg+xml" : ext === ".png" ? "image/png"
    : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "application/octet-stream";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

// --- sources -----------------------------------------------------------------
let html = read("index.html");
const css = read("styles.css");
const iconsJs = read("icons.js");
const dataJs = read("data-fallback.js");
const appJs = read("app.js");

// --- assets ------------------------------------------------------------------
const BRAND = "assets/c4e3e7d430ce6972ca9ebf5f822d1d1a8b88b8ec.png";
const TEXTURE = "assets/value-driver-texture.png";

// Hero art lives in web/assets/figma; glob it so new shapes are picked up automatically.
const figmaDir = path.join(WEB, "assets", "figma");
const heroFiles = fs.readdirSync(figmaDir).filter((f) => f.startsWith("hero-"));
const ASSETS = {};
for (const f of heroFiles) ASSETS[f] = dataUri(path.join("assets", "figma", f));

// --- CSS: inline, swap texture url() for data URI ----------------------------
const cssInlined = css.split(`url("${TEXTURE}")`).join(`url("${dataUri(TEXTURE)}")`);

// --- app.js: rewrite hero img src to use the inlined ASSETS map ---------------
const ASSET_MAP_DECL = `const ASSETS = ${JSON.stringify(ASSETS)};\n`;
const appRewritten = ASSET_MAP_DECL + appJs.replace(
  'src="assets/figma/${s.src}"',
  'src="${ASSETS[s.src]}"'
);

// --- HTML assembly -----------------------------------------------------------
// 1. brand logo -> data URI
html = html.split(`assets/${BRAND.split("/").pop()}`).join(dataUri(BRAND));
// 2. <link rel="stylesheet" href="styles.css"> -> inline <style>
html = html.replace(
  '<link rel="stylesheet" href="styles.css">',
  `<style>\n${cssInlined}\n</style>`
);
// 3. replace the icons.js + boot.js script tags with inlined blocks (icons, data, app)
const inlinedScripts =
  `<script>\n${iconsJs}\n</script>\n` +
  `    <script>\n${dataJs}\n</script>\n` +
  `    <script>\n${appRewritten}\n</script>`;
html = html.replace(
  /<script src="icons.js"><\/script>\s*<script src="boot.js"><\/script>/,
  inlinedScripts
);

fs.writeFileSync(OUT, html);
const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`Wrote ${OUT} (${kb} KB, ${heroFiles.length} hero assets inlined)`);
