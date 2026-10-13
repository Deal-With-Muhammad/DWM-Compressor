import { baseName, extOf } from "./utils";

/* ------------------------------------------------------------------ *
 * PDF — re-render each page and re-encode as JPEG, then rebuild.
 * ------------------------------------------------------------------ */
async function loadPdfjs() {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
  return pdfjsLib;
}

export async function compressPdf(file, opts = {}, onProgress) {
  const { quality = 0.6, scale = 1.5 } = opts;
  const pdfjsLib = await loadPdfjs();
  const { PDFDocument } = await import("@cantoo/pdf-lib");

  const data = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const total = pdf.numPages;
  const outDoc = await PDFDocument.create();

  for (let i = 1; i <= total; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;

    const blob = await new Promise((r) => canvas.toBlob(r, "image/jpeg", quality));
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const img = await outDoc.embedJpg(bytes);
    const outPage = outDoc.addPage([canvas.width, canvas.height]);
    outPage.drawImage(img, { x: 0, y: 0, width: canvas.width, height: canvas.height });

    canvas.width = 0;
    canvas.height = 0;
    page.cleanup();
    onProgress?.(i / total);
    await new Promise((r) => setTimeout(r, 0));
  }

  const outBytes = await outDoc.save();
  return {
    blob: new Blob([outBytes], { type: "application/pdf" }),
    name: `${baseName(file.name)}-compressed.pdf`,
  };
}

/* ------------------------------------------------------------------ *
 * IMAGES — draw to a canvas (optionally downscaled) and re-encode.
 * ------------------------------------------------------------------ */

// Decode a file to an ImageBitmap. HEIC/HEIF (iPhone photos) are decoded
// with heic2any first, since browsers usually can't decode them natively.
export function isHeic(file) {
  return /image\/hei[cf]/i.test(file.type) || /\.(heic|heif)$/i.test(file.name);
}

async function fileToBitmapSource(file) {
  if (isHeic(file)) {
    const heic2any = (await import("heic2any")).default;
    const converted = await heic2any({ blob: file, toType: "image/png" });
    const blob = Array.isArray(converted) ? converted[0] : converted;
    return createImageBitmap(blob);
  }
  return createImageBitmap(file);
}

export async function compressImage(file, opts = {}, onProgress) {
  const { quality = 0.7, maxDimension = 0, format = "image/jpeg" } = opts;
  onProgress?.(0.1);
  const bitmap = await fileToBitmapSource(file);
  let width = bitmap.width;
  let height = bitmap.height;
  if (maxDimension && Math.max(width, height) > maxDimension) {
    const r = maxDimension / Math.max(width, height);
    width = Math.max(1, Math.round(width * r));
    height = Math.max(1, Math.round(height * r));
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (format === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();
  onProgress?.(0.6);
  const blob = await new Promise((r) => canvas.toBlob(r, format, quality));
  onProgress?.(1);
  const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
  return { blob, name: `${baseName(file.name)}-compressed.${ext}` };
}

export async function convertImage(file, opts = {}, onProgress) {
  const { format = "image/jpeg", quality = 0.92 } = opts;
  const res = await compressImage(file, { quality, maxDimension: 0, format }, onProgress);
  const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
  return { blob: res.blob, name: `${baseName(file.name)}.${ext}` };
}

/* ------------------------------------------------------------------ *
 * CONVERT — PDF -> images (zip), images -> single PDF.
 * ------------------------------------------------------------------ */
export async function pdfToImagesZip(file, opts = {}, onProgress) {
  const { quality = 0.85, scale = 2 } = opts;
  const pdfjsLib = await loadPdfjs();
  const JSZip = (await import("jszip")).default;
  const data = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const zip = new JSZip();
  const base = baseName(file.name);

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;
    const blob = await new Promise((r) => canvas.toBlob(r, "image/jpeg", quality));
    zip.file(`${base}-page-${String(i).padStart(3, "0")}.jpg`, blob);
    canvas.width = 0;
    canvas.height = 0;
    page.cleanup();
    onProgress?.(i / pdf.numPages);
    await new Promise((r) => setTimeout(r, 0));
  }

  const blob = await zip.generateAsync({ type: "blob", compression: "STORE" });
  return { blob, name: `${base}-images.zip` };
}

export async function imagesToPdf(files, opts = {}, onProgress) {
  const { PDFDocument } = await import("@cantoo/pdf-lib");
  const doc = await PDFDocument.create();

  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const isPng = f.type === "image/png" || /\.png$/i.test(f.name);
    const isJpg = f.type === "image/jpeg" || /\.jpe?g$/i.test(f.name);
    let img;
    if (isPng) {
      img = await doc.embedPng(new Uint8Array(await f.arrayBuffer()));
    } else if (isJpg) {
      img = await doc.embedJpg(new Uint8Array(await f.arrayBuffer()));
    } else {
      // webp/gif/heic/etc -> rasterize to JPEG first
      const bitmap = await fileToBitmapSource(f);
      const c = document.createElement("canvas");
      c.width = bitmap.width;
      c.height = bitmap.height;
      const cx = c.getContext("2d");
      cx.fillStyle = "#ffffff";
      cx.fillRect(0, 0, c.width, c.height);
      cx.drawImage(bitmap, 0, 0);
      const jblob = await new Promise((r) => c.toBlob(r, "image/jpeg", 0.92));
      img = await doc.embedJpg(new Uint8Array(await jblob.arrayBuffer()));
      bitmap.close?.();
    }
    const page = doc.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    onProgress?.((i + 1) / files.length);
    await new Promise((r) => setTimeout(r, 0));
  }

  const out = await doc.save();
  return { blob: new Blob([out], { type: "application/pdf" }), name: "images-combined.pdf" };
}

/* ------------------------------------------------------------------ *
 * VIDEO — ffmpeg.wasm (single-thread core, self-hosted from /public).
 * ------------------------------------------------------------------ */
let _ffmpeg = null;
let _ffmpegLoading = null;
let _progressCb = null;

export function ffmpegReady() {
  return !!_ffmpeg;
}

export async function ensureFfmpeg(onStatus) {
  if (_ffmpeg) return _ffmpeg;
  if (_ffmpegLoading) return _ffmpegLoading;
  _ffmpegLoading = (async () => {
    onStatus?.("Loading video engine (~31 MB, first time only)…");
    const { FFmpeg } = await import("@ffmpeg/ffmpeg");
    const { toBlobURL } = await import("@ffmpeg/util");
    const ffmpeg = new FFmpeg();
    ffmpeg.on("progress", ({ progress }) => {
      if (_progressCb) _progressCb(Math.min(1, Math.max(0, progress)));
    });
    const base = "/ffmpeg";
    await ffmpeg.load({
      coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
    });
    _ffmpeg = ffmpeg;
    onStatus?.("");
    return ffmpeg;
  })();
  try {
    return await _ffmpegLoading;
  } finally {
    _ffmpegLoading = null;
  }
}

export async function compressVideo(file, opts = {}, onProgress, onStatus) {
  const { crf = 28, preset = "veryfast", scale = 0, format = "mp4" } = opts;
  const ffmpeg = await ensureFfmpeg(onStatus);
  const { fetchFile } = await import("@ffmpeg/util");

  const inExt = extOf(file.name) || "mp4";
  const input = `input.${inExt}`;
  const outExt = format === "webm" ? "webm" : "mp4";
  const output = `output.${outExt}`;

  onStatus?.("Reading file…");
  await ffmpeg.writeFile(input, await fetchFile(file));

  _progressCb = (p) => onProgress?.(p);
  onStatus?.("Transcoding…");
  const args = ["-i", input];
  if (scale && scale > 0) args.push("-vf", `scale=-2:${scale}`);
  if (outExt === "webm") {
    args.push("-c:v", "libvpx-vp9", "-crf", String(crf), "-b:v", "0", "-c:a", "libopus", output);
  } else {
    args.push("-c:v", "libx264", "-crf", String(crf), "-preset", preset, "-c:a", "aac", "-b:a", "128k", output);
  }

  try {
    await ffmpeg.exec(args);
    const data = await ffmpeg.readFile(output);
    const blob = new Blob([data.buffer], { type: outExt === "webm" ? "video/webm" : "video/mp4" });
    try {
      await ffmpeg.deleteFile(input);
      await ffmpeg.deleteFile(output);
    } catch (_) {}
    onProgress?.(1);
    onStatus?.("");
    return { blob, name: `${baseName(file.name)}-compressed.${outExt}` };
  } finally {
    _progressCb = null;
  }
}

/* ------------------------------------------------------------------ *
 * COMPRESS TO A TARGET SIZE
 * ------------------------------------------------------------------ */
export async function compressImageToTarget(file, opts = {}, onProgress) {
  const { targetBytes, format = "image/jpeg", maxDimension = 0 } = opts;
  onProgress?.(0.05);
  const bitmap = await fileToBitmapSource(file);
  let w = bitmap.width;
  let h = bitmap.height;
  if (maxDimension && Math.max(w, h) > maxDimension) {
    const r = maxDimension / Math.max(w, h);
    w = Math.round(w * r);
    h = Math.round(h * r);
  }
  const render = (ww, hh, q) => {
    const c = document.createElement("canvas");
    c.width = ww;
    c.height = hh;
    const x = c.getContext("2d");
    if (format === "image/jpeg") {
      x.fillStyle = "#ffffff";
      x.fillRect(0, 0, ww, hh);
    }
    x.drawImage(bitmap, 0, 0, ww, hh);
    return new Promise((res) => c.toBlob(res, format, q));
  };

  let best = null;
  for (let attempt = 0; attempt < 6 && !best; attempt++) {
    let lo = 0.08;
    let hi = 0.95;
    for (let i = 0; i < 7; i++) {
      const q = (lo + hi) / 2;
      const blob = await render(w, h, q);
      if (blob.size <= targetBytes) {
        best = blob;
        lo = q;
      } else {
        hi = q;
      }
      onProgress?.(Math.min(0.95, (attempt * 7 + i) / 42));
    }
    if (!best) {
      w = Math.max(80, Math.round(w * 0.8));
      h = Math.max(80, Math.round(h * 0.8));
    }
  }
  if (!best) best = await render(w, h, 0.08);
  bitmap.close?.();
  onProgress?.(1);
  const ext = format === "image/webp" ? "webp" : "jpg";
  return { blob: best, name: `${baseName(file.name)}-small.${ext}` };
}

export async function compressPdfToTarget(file, opts = {}, onProgress) {
  const { targetBytes, scale = 1.5 } = opts;
  const pdfjsLib = await loadPdfjs();
  const { PDFDocument } = await import("@cantoo/pdf-lib");
  const data = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const total = pdf.numPages;

  const canvases = [];
  for (let i = 1; i <= total; i++) {
    const page = await pdf.getPage(i);
    const vp = page.getViewport({ scale });
    const c = document.createElement("canvas");
    c.width = Math.floor(vp.width);
    c.height = Math.floor(vp.height);
    const x = c.getContext("2d");
    x.fillStyle = "#ffffff";
    x.fillRect(0, 0, c.width, c.height);
    await page.render({ canvasContext: x, viewport: vp }).promise;
    canvases.push(c);
    page.cleanup();
    onProgress?.((i / total) * 0.5);
    await new Promise((r) => setTimeout(r, 0));
  }

  const buildAt = async (q) => {
    const doc = await PDFDocument.create();
    for (const c of canvases) {
      const blob = await new Promise((res) => c.toBlob(res, "image/jpeg", q));
      const img = await doc.embedJpg(new Uint8Array(await blob.arrayBuffer()));
      const p = doc.addPage([c.width, c.height]);
      p.drawImage(img, { x: 0, y: 0, width: c.width, height: c.height });
    }
    const bytes = await doc.save();
    return new Blob([bytes], { type: "application/pdf" });
  };

  let lo = 0.15;
  let hi = 0.9;
  let best = null;
  for (let i = 0; i < 6; i++) {
    const q = (lo + hi) / 2;
    const blob = await buildAt(q);
    if (blob.size <= targetBytes) {
      best = blob;
      lo = q;
    } else {
      hi = q;
    }
    onProgress?.(0.5 + (i / 6) * 0.5);
  }
  if (!best) best = await buildAt(0.15);
  onProgress?.(1);
  return { blob: best, name: `${baseName(file.name)}-small.pdf` };
}

/* ------------------------------------------------------------------ *
 * PROTECT / UNLOCK
 * ------------------------------------------------------------------ */
export async function protectPdf(file, opts = {}, onProgress) {
  const password = (opts.password || "").trim();
  if (!password) throw new Error("Type a password to protect the PDF.");
  const { PDFDocument } = await import("@cantoo/pdf-lib");
  onProgress?.(0.2);
  const doc = await PDFDocument.load(new Uint8Array(await file.arrayBuffer()), {
    ignoreEncryption: true,
  });
  onProgress?.(0.5);
  doc.encrypt({ userPassword: password, ownerPassword: password });
  const bytes = await doc.save();
  onProgress?.(1);
  return { blob: new Blob([bytes], { type: "application/pdf" }), name: `${baseName(file.name)}-protected.pdf` };
}

export async function unlockPdf(file, opts = {}, onProgress) {
  const password = opts.password || "";
  const { PDFDocument } = await import("@cantoo/pdf-lib");
  onProgress?.(0.2);
  let src;
  try {
    src = await PDFDocument.load(new Uint8Array(await file.arrayBuffer()), { password });
  } catch (e) {
    throw new Error("Wrong password, or this PDF can't be unlocked.");
  }
  onProgress?.(0.5);
  // Copy the (now-decrypted) pages into a fresh document so the password is
  // fully removed — saving the loaded doc directly would keep its encryption.
  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, src.getPageIndices());
  pages.forEach((p) => out.addPage(p));
  onProgress?.(0.8);
  const bytes = await out.save();
  onProgress?.(1);
  return { blob: new Blob([bytes], { type: "application/pdf" }), name: `${baseName(file.name)}-unlocked.pdf` };
}

/* ------------------------------------------------------------------ *
 * PAGE PICKER — thumbnails + extract selected pages
 * ------------------------------------------------------------------ */
export async function getPdfPageThumbnails(file, opts = {}, onProgress) {
  const { scale = 0.45 } = opts;
  const pdfjsLib = await loadPdfjs();
  const data = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const total = pdf.numPages;
  const thumbs = [];
  for (let i = 1; i <= total; i++) {
    const page = await pdf.getPage(i);
    const vp = page.getViewport({ scale });
    const c = document.createElement("canvas");
    c.width = Math.floor(vp.width);
    c.height = Math.floor(vp.height);
    const x = c.getContext("2d");
    x.fillStyle = "#ffffff";
    x.fillRect(0, 0, c.width, c.height);
    await page.render({ canvasContext: x, viewport: vp }).promise;
    thumbs.push({ index: i, url: c.toDataURL("image/jpeg", 0.72) });
    c.width = 0;
    c.height = 0;
    page.cleanup();
    onProgress?.(i / total);
    await new Promise((r) => setTimeout(r, 0));
  }
  return { total, thumbs };
}

export async function extractPdfPages(file, pages, onProgress) {
  const { PDFDocument } = await import("@cantoo/pdf-lib");
  onProgress?.(0.2);
  const src = await PDFDocument.load(new Uint8Array(await file.arrayBuffer()), {
    ignoreEncryption: true,
  });
  const out = await PDFDocument.create();
  const count = src.getPageCount();
  const idxs = pages.map((p) => p - 1).filter((i) => i >= 0 && i < count);
  const copied = await out.copyPages(src, idxs);
  copied.forEach((p) => out.addPage(p));
  onProgress?.(0.8);
  const bytes = await out.save();
  onProgress?.(1);
  return { blob: new Blob([bytes], { type: "application/pdf" }), name: `${baseName(file.name)}-pages.pdf` };
}
