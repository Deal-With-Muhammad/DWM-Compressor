"use client";

import { useRef, useState } from "react";
import { Button, Progress } from "@heroui/react";
import { extractPdfPages, getPdfPageThumbnails } from "../lib/engines";
import { downloadBlob } from "../lib/utils";
import { IconCheck, IconClose, IconDownload, IconUpload } from "./icons";

export default function PagePicker() {
  const [file, setFile] = useState(null);
  const [thumbs, setThumbs] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const reset = () => {
    setThumbs([]);
    setSelected(new Set());
    setProgress(0);
    setError("");
    setPreview(null);
  };

  const loadFile = async (f) => {
    if (!f) return;
    if (f.type !== "application/pdf" && !/\.pdf$/i.test(f.name)) {
      setError("Please choose a PDF file.");
      return;
    }
    reset();
    setFile(f);
    setLoading(true);
    try {
      const { thumbs } = await getPdfPageThumbnails(f, { scale: 0.5 }, (p) =>
        setProgress(Math.round(p * 100))
      );
      setThumbs(thumbs);
      setSelected(new Set(thumbs.map((t) => t.index))); // select all by default
    } catch (e) {
      console.error(e);
      setError("Couldn't read that PDF.");
    } finally {
      setLoading(false);
    }
  };

  const toggle = (i) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };
  const selectAll = () => setSelected(new Set(thumbs.map((t) => t.index)));
  const clearAll = () => setSelected(new Set());

  const exportSelected = async () => {
    if (!file || selected.size === 0) return;
    setBusy(true);
    setError("");
    try {
      const pages = [...selected].sort((a, b) => a - b);
      const { blob, name } = await extractPdfPages(file, pages);
      downloadBlob(blob, name);
    } catch (e) {
      console.error(e);
      setError("Export failed.");
    } finally {
      setBusy(false);
    }
  };

  const startOver = () => {
    reset();
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-4">
      {!file || thumbs.length === 0 ? (
        <>
          <div
            role="button"
            tabIndex={0}
            onClick={() => !loading && inputRef.current?.click()}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !loading) inputRef.current?.click();
            }}
            className={[
              "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-default-300 bg-default-100/40 px-5 py-10 text-center transition-colors hover:border-primary/60",
              loading ? "cursor-wait opacity-70" : "cursor-pointer",
            ].join(" ")}
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
              <IconUpload size={24} />
            </span>
            <span className="font-medium text-foreground">Drop a PDF here or click to browse</span>
            <span className="text-xs text-default-500">Pick the pages you want, then export</span>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(e) => loadFile(e.target.files?.[0])}
            />
          </div>
          {loading && (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-default-500">Reading pages… {progress}%</span>
              <Progress aria-label="Loading pages" size="sm" value={progress} color="primary" />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-medium text-foreground">
              {selected.size} of {thumbs.length} page{thumbs.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="flat" onPress={selectAll}>
                Select all
              </Button>
              <Button size="sm" variant="flat" onPress={clearAll}>
                Clear
              </Button>
              <Button size="sm" variant="light" color="danger" onPress={startOver}>
                New PDF
              </Button>
            </div>
          </div>

          <div className="grid max-h-[420px] grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
            {thumbs.map((t) => {
              const on = selected.has(t.index);
              return (
                <div
                  key={t.index}
                  onClick={() => toggle(t.index)}
                  className={[
                    "group relative cursor-pointer overflow-hidden rounded-lg border-2 bg-white transition-all",
                    on ? "border-primary ring-2 ring-primary/30" : "border-default-200 opacity-60 hover:opacity-100",
                  ].join(" ")}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.url} alt={`Page ${t.index}`} className="block w-full" />
                  <span className="absolute left-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    {t.index}
                  </span>
                  {on && (
                    <span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-white">
                      <IconCheck size={13} />
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreview(t);
                    }}
                    className="absolute bottom-1 right-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    Preview
                  </button>
                </div>
              );
            })}
          </div>

          <Button
            color="primary"
            size="lg"
            radius="full"
            className="font-semibold"
            isLoading={busy}
            isDisabled={busy || selected.size === 0}
            onPress={exportSelected}
            startContent={!busy ? <IconDownload size={18} /> : null}
          >
            {busy ? "Exporting…" : `Export ${selected.size} page${selected.size === 1 ? "" : "s"} as PDF`}
          </Button>
        </>
      )}

      {error && (
        <div className="rounded-xl border border-danger/40 bg-danger/10 px-4 py-2.5 text-sm text-danger">
          {error}
        </div>
      )}

      {/* Preview modal */}
      {preview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPreview(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw] overflow-auto rounded-xl bg-white shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview.url} alt={`Page ${preview.index}`} className="block max-h-[85vh] w-auto" />
          </div>
          <button
            onClick={() => setPreview(null)}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-black shadow-lg"
            aria-label="Close preview"
          >
            <IconClose size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
