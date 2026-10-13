"use client";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Workspace from "./Workspace";
import RangeSlider from "./RangeSlider";
import InfoTip from "./InfoTip";
import InstallButton from "./InstallButton";
import Segmented from "./Segmented";
import PdfToolsTab from "./PdfToolsTab";
import AccentPicker from "./AccentPicker";
import SavedTotal from "./SavedTotal";
import {
  IconCompress,
  IconConvert,
  IconFile,
  IconGithub,
  IconImage,
  IconLinkedin,
  IconLock,
  IconPuzzle,
  IconVideo,
} from "./icons";
import {
  compressImage,
  compressImageToTarget,
  compressPdf,
  compressPdfToTarget,
  compressVideo,
  convertImage,
  imagesToPdf,
  pdfToImagesZip,
} from "../lib/engines";

const GLASS = "border border-default-200/60 bg-content1/50 backdrop-blur-xl";

/* ---------- small building blocks ---------- */

function Field({ label, children, info }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="flex items-center gap-1.5 text-sm font-medium text-default-600">
        {label}
        {info && <InfoTip text={info} label={label} />}
      </span>
      {children}
    </div>
  );
}

function QualitySlider({ options, setOptions, disabled, label = "Image quality", info }) {
  return (
    <RangeSlider
      label={label}
      info={info}
      min={30}
      max={90}
      step={5}
      value={Math.round((options.quality ?? 0.6) * 100)}
      onChange={(v) => setOptions((s) => ({ ...s, quality: v / 100 }))}
      disabled={disabled}
      format={(v) => `${v}%`}
      hint="Drag to adjust — lower means a smaller file."
    />
  );
}

function toBytes(o) {
  const unit = o.targetUnit === "MB" ? 1024 * 1024 : 1024;
  return Math.max(1024, (o.targetValue || 1) * unit);
}

function ModeToggle({ options, setOptions, disabled }) {
  return (
    <Field label="How to compress">
      <Segmented
        value={options.mode || "quality"}
        onChange={(v) => setOptions((s) => ({ ...s, mode: v }))}
        disabled={disabled}
        options={[
          { value: "quality", label: "By quality" },
          { value: "target", label: "Target size" },
        ]}
      />
    </Field>
  );
}

function TargetInput({ options, setOptions, disabled }) {
  return (
    <Field
      label="Target size"
      info="We'll automatically pick the quality needed to get the file under this size."
    >
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          value={options.targetValue}
          disabled={disabled}
          onChange={(e) =>
            setOptions((s) => ({ ...s, targetValue: Math.max(1, Number(e.target.value) || 1) }))
          }
          className="h-9 w-20 rounded-lg border border-default-200 bg-default-100/60 px-2 text-sm text-foreground outline-none"
        />
        <Segmented
          value={options.targetUnit}
          onChange={(v) => setOptions((s) => ({ ...s, targetUnit: v }))}
          disabled={disabled}
          options={[
            { value: "KB", label: "KB" },
            { value: "MB", label: "MB" },
          ]}
        />
      </div>
    </Field>
  );
}

/* ---------- runners ---------- */

function perFile(processFn) {
  return async (items, ctx) => {
    for (const item of items) {
      ctx.setItemStatus(item.id, { status: "processing", progress: 0 });
      try {
        const { blob, name } = await processFn(
          item.file,
          ctx.options,
          (p) => ctx.setItemProgress(item.id, p),
          ctx.setGlobalStatus
        );
        ctx.addOutput({ id: item.id, name, blob, size: blob.size, sourceSize: item.file.size });
        ctx.setItemStatus(item.id, { status: "done", progress: 1 });
      } catch (e) {
        console.error(e);
        ctx.setItemStatus(item.id, { status: "error", error: e?.message || "Failed" });
      }
    }
  };
}

function perFileAdaptive(qualityFn, targetFn) {
  return (items, ctx) => {
    if ((ctx.options.mode || "quality") === "target") {
      const fn = (file, opts, onP, onS) =>
        targetFn(file, { ...opts, targetBytes: toBytes(opts) }, onP, onS);
      return perFile(fn)(items, ctx);
    }
    return perFile(qualityFn)(items, ctx);
  };
}

const CONVERT_TARGETS = {
  images: [
    { value: "pdf", label: "PDF" },
    { value: "image/jpeg", label: "JPG" },
    { value: "image/png", label: "PNG" },
    { value: "image/webp", label: "WebP" },
  ],
  pdf: [{ value: "images-zip", label: "JPG images (ZIP)" }],
};

function describeConvert(o) {
  if (o.target === "pdf")
    return "All images are combined into one PDF (one image per page). iPhone .heic photos work too.";
  if (o.target === "images-zip")
    return "Each PDF becomes a ZIP of JPG images — one image per page.";
  const name = { "image/jpeg": "JPG", "image/png": "PNG", "image/webp": "WebP" }[o.target] || "";
  return `Each image is converted to ${name}. iPhone .heic / .heif photos are supported.`;
}

const convertRunner = async (items, ctx) => {
  const { target } = ctx.options;
  if (target === "pdf") {
    items.forEach((it) => ctx.setItemStatus(it.id, { status: "processing", progress: 0 }));
    try {
      const files = items.map((i) => i.file);
      const { blob, name } = await imagesToPdf(files, ctx.options, (p) =>
        items.forEach((it) => ctx.setItemProgress(it.id, p))
      );
      const totalSource = files.reduce((a, f) => a + f.size, 0);
      ctx.addOutput({ id: "combined", name, blob, size: blob.size, sourceSize: totalSource });
      items.forEach((it) => ctx.setItemStatus(it.id, { status: "done", progress: 1 }));
    } catch (e) {
      console.error(e);
      items.forEach((it) => ctx.setItemStatus(it.id, { status: "error", error: e?.message }));
    }
    return;
  }
  if (target === "images-zip") {
    await perFile(pdfToImagesZip)(items, ctx);
    return;
  }
  await perFile((file, opts, onP) => convertImage(file, { ...opts, format: target }, onP))(items, ctx);
};

/* ---------- tab definitions ---------- */

const TABS = [
  {
    key: "pdf",
    label: "PDF",
    Icon: IconFile,
    props: {
      accept: "application/pdf,.pdf",
      actionLabel: "Compress",
      emptyTitle: "Drop PDF files here or click to browse",
      emptyHint: "Add as many PDFs as you like",
      initialOptions: { mode: "quality", quality: 0.6, scale: 1.5, targetValue: 5, targetUnit: "MB" },
      runner: perFileAdaptive(compressPdf, compressPdfToTarget),
      renderOptions: (o, set, disabled) => (
        <div className="flex flex-col gap-4">
          <ModeToggle options={o} setOptions={set} disabled={disabled} />
          {(o.mode || "quality") === "target" ? (
            <TargetInput options={o} setOptions={set} disabled={disabled} />
          ) : (
            <QualitySlider
              options={o}
              setOptions={set}
              disabled={disabled}
              info="How sharp the pages look after compressing. Lower = a smaller file but softer text and images. 60% is a good balance for scanned documents."
            />
          )}
          <Field
            label="Resolution"
            info="How many pixels each page is drawn at. Higher looks crisper but makes a bigger file."
          >
            <Segmented
              value={o.scale}
              onChange={(v) => set((s) => ({ ...s, scale: v }))}
              disabled={disabled}
              options={[
                { value: 1.0, label: "Low" },
                { value: 1.5, label: "Medium" },
                { value: 2.0, label: "High" },
              ]}
            />
          </Field>
        </div>
      ),
      note: "Pages are re-rendered as images — best for scanned or image-heavy PDFs.",
    },
  },
  {
    key: "image",
    label: "Images",
    Icon: IconImage,
    props: {
      accept: "image/*,.heic,.heif",
      actionLabel: "Compress",
      emptyTitle: "Drop images here or click to browse",
      emptyHint: "JPG, PNG, WebP, HEIC… add as many as you like",
      initialOptions: {
        mode: "quality",
        quality: 0.7,
        maxDimension: 0,
        format: "image/jpeg",
        targetValue: 500,
        targetUnit: "KB",
      },
      runner: perFileAdaptive(compressImage, compressImageToTarget),
      renderOptions: (o, set, disabled) => (
        <div className="flex flex-col gap-4">
          <ModeToggle options={o} setOptions={set} disabled={disabled} />
          {(o.mode || "quality") === "target" ? (
            <TargetInput options={o} setOptions={set} disabled={disabled} />
          ) : (
            <QualitySlider
              options={o}
              setOptions={set}
              disabled={disabled}
              info="How much detail to keep in each image. Lower = smaller file with a slightly softer look. Most photos still look great around 60–70%."
            />
          )}
          <Field
            label="Max size"
            info="The largest width or height (in pixels) the result can be. Big photos are shrunk to fit, which makes files much smaller. 'Original' keeps the full size."
          >
            <Segmented
              value={o.maxDimension}
              onChange={(v) => set((s) => ({ ...s, maxDimension: v }))}
              disabled={disabled}
              options={[
                { value: 0, label: "Original" },
                { value: 2000, label: "2000px" },
                { value: 1280, label: "1280px" },
              ]}
            />
          </Field>
          <Field label="Output format">
            <Segmented
              value={o.format}
              onChange={(v) => set((s) => ({ ...s, format: v }))}
              disabled={disabled}
              options={[
                { value: "image/jpeg", label: "JPG" },
                { value: "image/webp", label: "WebP" },
              ]}
            />
          </Field>
        </div>
      ),
      note: "iPhone .heic / .heif photos are supported — they're decoded automatically.",
    },
  },
  {
    key: "video",
    label: "Video",
    Icon: IconVideo,
    props: {
      accept: "video/*,.mp4,.mov,.mkv,.avi,.webm,.m4v,.3gp,.flv,.wmv,.mpeg,.mpg,.ts,.ogv,.m2ts",
      actionLabel: "Compress",
      emptyTitle: "Drop videos here or click to browse",
      emptyHint: "MP4, MOV, MKV, AVI, WebM, FLV, WMV…",
      initialOptions: { crf: 28, scale: 0, preset: "veryfast", format: "mp4" },
      runner: perFile(compressVideo),
      renderOptions: (o, set, disabled) => (
        <div className="flex flex-col gap-4">
          <RangeSlider
            label="Compression strength (CRF)"
            info="CRF controls how hard the video is compressed. Higher number = smaller file but lower quality; lower number = bigger file, better quality. 23–28 looks good for most clips."
            min={20}
            max={34}
            step={1}
            value={o.crf}
            onChange={(v) => set((s) => ({ ...s, crf: v }))}
            disabled={disabled}
            format={(v) => `CRF ${v}`}
            hint="Higher = smaller file, lower quality."
          />
          <Field label="Resolution">
            <Segmented
              value={o.scale}
              onChange={(v) => set((s) => ({ ...s, scale: v }))}
              disabled={disabled}
              options={[
                { value: 0, label: "Keep" },
                { value: 720, label: "720p" },
                { value: 480, label: "480p" },
              ]}
            />
          </Field>
          <Field
            label="Convert to"
            info="MP4 (H.264) plays everywhere. WebM (VP9) makes smaller files but takes longer to encode."
          >
            <Segmented
              value={o.format}
              onChange={(v) => set((s) => ({ ...s, format: v }))}
              disabled={disabled}
              options={[
                { value: "mp4", label: "MP4" },
                { value: "webm", label: "WebM" },
              ]}
            />
          </Field>
        </div>
      ),
      note: "Accepted inputs: MP4, MOV, MKV, AVI, WebM, M4V, 3GP, FLV, WMV, MPEG / MPG, TS, M2TS, OGV — and most other formats. Everything is transcoded to MP4 (H.264) or WebM (VP9) with ffmpeg in your browser; the engine downloads once (~31 MB). Best for phone clips and short videos — very large files can exceed the browser's memory.",
    },
  },
  {
    key: "convert",
    label: "Convert",
    Icon: IconConvert,
    props: {
      accept: (o) => (o.source === "pdf" ? "application/pdf,.pdf" : "image/*,.heic,.heif"),
      actionLabel: "Convert",
      emptyTitle: "Drop files here or click to browse",
      emptyHint: "Choose what you have and what to make, then add files",
      initialOptions: { source: "images", target: "pdf", quality: 0.85, scale: 2 },
      runner: convertRunner,
      renderOptions: (o, set, disabled) => {
        const targets = CONVERT_TARGETS[o.source] || [];
        const lossy = o.target === "image/jpeg" || o.target === "image/webp";
        return (
          <div className="flex flex-col gap-4">
            <Field
              label="What do you have?"
              info="Pick your source files. The list of things you can convert to updates automatically."
            >
              <Segmented
                value={o.source}
                onChange={(src) =>
                  set((s) => ({ ...s, source: src, target: CONVERT_TARGETS[src][0].value }))
                }
                disabled={disabled}
                options={[
                  { value: "images", label: "Images" },
                  { value: "pdf", label: "PDF" },
                ]}
              />
            </Field>
            <Field label="Convert to">
              <Segmented
                value={o.target}
                onChange={(v) => set((s) => ({ ...s, target: v }))}
                disabled={disabled}
                options={targets}
              />
            </Field>
            {lossy && (
              <QualitySlider
                options={o}
                setOptions={set}
                disabled={disabled}
                label="Quality"
                info="Only affects JPG and WebP. Lower = smaller file, slightly softer image."
              />
            )}
            <p className="px-1 text-xs text-default-400">{describeConvert(o)}</p>
          </div>
        );
      },
    },
  },
  {
    key: "pdftools",
    label: "PDF Tools",
    Icon: IconLock,
    render: (active) => <PdfToolsTab isActive={active} />,
  },
];

/* ---------- footer ---------- */

function Footer() {
  const link =
    "inline-flex items-center gap-2 rounded-full border border-default-200/60 bg-content1/50 px-4 py-2 text-sm font-medium text-default-600 backdrop-blur-xl transition-colors hover:border-primary/50 hover:text-foreground";
  return (
    <footer className="mt-7 flex flex-col items-center gap-3 pb-4">
      <div className="flex items-center gap-3">
        <a className={link} href="https://github.com/Deal-With-Muhammad" target="_blank" rel="noopener noreferrer">
          <IconGithub size={18} /> GitHub
        </a>
        <a
          className={link}
          href="https://www.linkedin.com/in/muhammad-ahmad-7009b8248/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconLinkedin size={18} /> LinkedIn
        </a>
        {/* Chrome extension — hidden on small screens (desktop-only feature) */}
        <a
          className={`${link} hidden sm:inline-flex`}
          href="https://github.com/Deal-With-Muhammad"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconPuzzle size={18} /> Chrome extension
        </a>
      </div>
      <p className="text-[11px] text-default-400">
        Built by Muhammad Ahmad · Everything runs locally in your browser
      </p>
    </footer>
  );
}

/* ---------- app ---------- */

export default function App() {
  const [activeKey, setActiveKey] = useState("pdf");

  return (
    <div className="mx-auto w-full max-w-2xl">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <IconCompress size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight text-foreground">DWM Compressor</h1>
            <p className="text-xs text-default-500">Compress &amp; convert files — private, in your browser</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AccentPicker />
          <InstallButton />
          <ThemeToggle />
        </div>
      </header>

      <div className={`rounded-3xl p-3 shadow-2xl sm:p-5 ${GLASS}`}>
        {/* Custom tab bar */}
        <div
          className={`flex gap-1 overflow-x-auto rounded-2xl p-1.5 ${GLASS}`}
          role="tablist"
          aria-label="Tools"
        >
          {TABS.map((t) => {
            const active = t.key === activeKey;
            const Icon = t.Icon;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={active}
                aria-label={t.label}
                onClick={() => setActiveKey(t.key)}
                className={[
                  "flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-2 py-2.5 text-sm font-semibold transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-default-500 hover:bg-default-100 hover:text-foreground",
                ].join(" ")}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Panels — only the active one is shown (display:none on the rest) */}
        <div className="pt-4">
          {TABS.map((t) => (
            <div key={t.key} className={t.key === activeKey ? "block" : "hidden"}>
              {t.render ? (
                t.render(t.key === activeKey)
              ) : (
                <Workspace {...t.props} isActive={t.key === activeKey} />
              )}
            </div>
          ))}
        </div>
      </div>

      <SavedTotal />

      <Footer />
    </div>
  );
}
