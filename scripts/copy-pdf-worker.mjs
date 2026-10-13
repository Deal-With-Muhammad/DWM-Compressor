// Stages runtime assets into /public so they can be served as static files.
// Runs automatically after `npm install` (see package.json "postinstall").
import { copyFileSync, mkdirSync, existsSync } from "fs";
import { dirname } from "path";

function copy(src, dest) {
  if (!existsSync(src)) {
    console.warn("[copy-assets] source missing, skipping:", src);
    return;
  }
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  console.log(`[copy-assets] ${src} -> ${dest}`);
}

// pdf.js worker
const pdfWorker = [
  "node_modules/pdfjs-dist/build/pdf.worker.min.js",
  "node_modules/pdfjs-dist/build/pdf.worker.js",
].find(existsSync);
if (pdfWorker) copy(pdfWorker, "public/pdf.worker.min.js");

// ffmpeg.wasm core (single-thread — no cross-origin isolation required)
copy("node_modules/@ffmpeg/core/dist/umd/ffmpeg-core.js", "public/ffmpeg/ffmpeg-core.js");
copy("node_modules/@ffmpeg/core/dist/umd/ffmpeg-core.wasm", "public/ffmpeg/ffmpeg-core.wasm");
