"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Chip, Progress } from "@heroui/react";
import { addSavedBytes, downloadBlob, downloadZip, formatBytes, formatTime, uid } from "../lib/utils";
import { track, trackEvent } from "../lib/analytics";
import { IconCheck, IconClock, IconClose, IconDownload, IconTrash, IconUpload } from "./icons";

const GLASS = "border border-default-200/60 bg-content1/50 backdrop-blur-xl";

const FUN_MESSAGES = [
  "Squeezing the pixels…",
  "Vacuum-packing your file…",
  "Folding the bytes neatly…",
  "Teaching electrons to diet…",
  "Politely asking it to shrink…",
  "Making it travel-size…",
  "Compressing with love…",
];

function StatusDot({ status }) {
  const map = {
    queued: "bg-default-300",
    processing: "bg-primary animate-pulse",
    done: "bg-success",
    error: "bg-danger",
  };
  return <span className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${map[status] || "bg-default-300"}`} />;
}

export default function Workspace({
  accept,
  multiple = true,
  initialOptions = {},
  renderOptions,
  runner,
  actionLabel = "Compress",
  emptyTitle = "Drop files here or click to browse",
  emptyHint = "Add as many as you like",
  note,
  isActive = false,
  // Analytics event fired once per successful run (e.g. "compress-pdf").
  // A string, or a function of the current options.
  event,
}) {
  const [items, setItems] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [options, setOptions] = useState(initialOptions);
  const [running, setRunning] = useState(false);
  const [globalStatus, setGlobalStatus] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [funMsg, setFunMsg] = useState("");

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const startRef = useRef(0);
  const outputsRef = useRef([]);
  outputsRef.current = outputs;

  const acceptStr = typeof accept === "function" ? accept(options) : accept;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      outputsRef.current.forEach((o) => o.url && URL.revokeObjectURL(o.url));
    };
  }, []);

  // Cheeky rotating messages while working.
  useEffect(() => {
    if (!running) {
      setFunMsg("");
      return;
    }
    let i = Math.floor(performance.now()) % FUN_MESSAGES.length;
    setFunMsg(FUN_MESSAGES[i]);
    const id = setInterval(() => {
      i = (i + 1) % FUN_MESSAGES.length;
      setFunMsg(FUN_MESSAGES[i]);
    }, 1600);
    return () => clearInterval(id);
  }, [running]);

  const revokeOutputs = () => {
    outputsRef.current.forEach((o) => o.url && URL.revokeObjectURL(o.url));
  };

  const addFiles = useCallback((fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    setItems((prev) => {
      const existing = new Set(prev.map((i) => i.file.name + i.file.size));
      const next = [...prev];
      for (const f of files) {
        const key = f.name + f.size;
        if (existing.has(key)) continue;
        existing.add(key);
        next.push({ id: uid(), file: f, status: "queued", progress: 0, error: "" });
      }
      return next;
    });
  }, []);

  // Paste from clipboard (Ctrl/⌘+V) — only the visible tab reacts.
  useEffect(() => {
    if (!isActive) return;
    const onPaste = (e) => {
      if (running) return;
      const files = [];
      const items = e.clipboardData?.items || [];
      for (const it of items) {
        if (it.kind === "file") {
          const f = it.getAsFile();
          if (!f) continue;
          const ext = f.name?.match(/\.([a-z0-9]+)$/i)?.[1] || (f.type.split("/")[1] || "png");
          const named =
            f.name && f.name !== "image.png"
              ? f
              : new File([f], `pasted-${Date.now()}.${ext}`, { type: f.type });
          files.push(named);
        }
      }
      if (files.length) {
        e.preventDefault();
        addFiles(files);
      }
    };
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, [isActive, running, addFiles]);

  const removeItem = (id) => {
    if (running) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearAll = () => {
    if (running) return;
    revokeOutputs();
    setItems([]);
    setOutputs([]);
    setGlobalStatus("");
    setElapsed(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  const setItemStatus = (id, patch) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  const setItemProgress = (id, p) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, progress: p } : i)));
  const addOutput = (out) => {
    const url = URL.createObjectURL(out.blob);
    if (out.sourceSize && out.size < out.sourceSize) addSavedBytes(out.sourceSize - out.size);
    setOutputs((prev) => [...prev, { ...out, url }]);
  };

  const run = useCallback(async () => {
    if (running || !items.length) return;
    revokeOutputs();
    setOutputs([]);
    setRunning(true);
    setGlobalStatus("");
    startRef.current = performance.now();
    setElapsed(0);
    timerRef.current = setInterval(
      () => setElapsed((performance.now() - startRef.current) / 1000),
      100
    );
    setItems((prev) => prev.map((i) => ({ ...i, status: "queued", progress: 0, error: "" })));

    // Count successful outputs so the analytics event only fires when at least
    // one file actually came out (runners swallow per-file errors).
    let produced = 0;
    const countedAddOutput = (out) => {
      produced += 1;
      addOutput(out);
    };

    try {
      await runner(items, {
        options,
        setItemStatus,
        setItemProgress,
        addOutput: countedAddOutput,
        setGlobalStatus,
      });
      track("process", { tool: actionLabel, files: items.length });
      if (produced > 0) trackEvent(typeof event === "function" ? event(options) : event);
    } catch (e) {
      console.error(e);
      setGlobalStatus(`Error: ${e?.message || "something went wrong"}`);
    } finally {
      if (timerRef.current) clearInterval(timerRef.current);
      setElapsed((performance.now() - startRef.current) / 1000);
      setRunning(false);
    }
  }, [items, options, runner, running, event]);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (running) return;
    addFiles(e.dataTransfer.files);
  };

  const totalIn = useMemo(() => items.reduce((a, i) => a + i.file.size, 0), [items]);
  const totalOut = useMemo(() => outputs.reduce((a, o) => a + o.size, 0), [outputs]);
  const totalSaved = totalIn > 0 && totalOut > 0 ? (1 - totalOut / totalIn) * 100 : null;
  const zipName = `dwm-${actionLabel.toLowerCase()}-output.zip`;

  return (
    <div className="flex flex-col gap-4">
      {/* Options */}
      {renderOptions && (
        <div className={`rounded-2xl p-4 ${GLASS}`}>{renderOptions(options, setOptions, running)}</div>
      )}

      {/* Dropzone */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => !running && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !running) inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!running) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={[
          "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-5 py-9 text-center outline-none transition-colors",
          dragOver ? "border-primary bg-primary/10" : "border-default-300 bg-default-100/40 hover:border-primary/60",
          running ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        ].join(" ")}
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
          <IconUpload size={24} />
        </span>
        <span className="font-medium text-foreground">{emptyTitle}</span>
        <span className="text-xs text-default-500">{emptyHint}</span>
        <span className="mt-0.5 text-[11px] text-default-400">
          or paste from clipboard (Ctrl / ⌘ + V)
        </span>
        <input
          ref={inputRef}
          type="file"
          accept={acceptStr}
          multiple={multiple}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {note && <p className="px-1 text-[11px] leading-relaxed text-default-400">{note}</p>}

      {/* Queue */}
      {items.length > 0 && (
        <div className={`flex flex-col gap-2 rounded-2xl p-3 ${GLASS}`}>
          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-medium text-foreground">
              {items.length} file{items.length > 1 ? "s" : ""} · {formatBytes(totalIn)}
            </span>
            <Button
              size="sm"
              variant="light"
              color="danger"
              isDisabled={running}
              onPress={clearAll}
              startContent={<IconTrash size={15} />}
            >
              Clear all
            </Button>
          </div>
          <div className="flex max-h-56 flex-col gap-1.5 overflow-y-auto pr-1">
            {items.map((it) => (
              <div key={it.id} className="flex items-center gap-3 rounded-xl bg-default-100/60 px-3 py-2">
                <StatusDot status={it.status} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm text-foreground">{it.file.name}</div>
                  {it.status === "processing" ? (
                    <Progress
                      aria-label="progress"
                      size="sm"
                      className="mt-1"
                      value={Math.round((it.progress || 0) * 100)}
                      isIndeterminate={(it.progress || 0) === 0}
                      color="primary"
                    />
                  ) : (
                    <div className="text-xs text-default-500">
                      {it.status === "error" ? (
                        <span className="text-danger">{it.error || "Failed"}</span>
                      ) : (
                        formatBytes(it.file.size)
                      )}
                    </div>
                  )}
                </div>
                {!running && (
                  <button
                    onClick={() => removeItem(it.id)}
                    className="grid h-7 w-7 place-items-center rounded-full text-default-400 hover:bg-default-200/60 hover:text-danger"
                    aria-label="Remove file"
                  >
                    <IconClose size={15} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action */}
      <div className="flex items-center gap-3">
        <Button
          color="primary"
          size="lg"
          radius="full"
          className="flex-1 font-semibold"
          isLoading={running}
          isDisabled={running || items.length === 0}
          onPress={run}
        >
          {running
            ? "Working…"
            : items.length
            ? `${actionLabel} ${items.length} file${items.length === 1 ? "" : "s"}`
            : actionLabel}
        </Button>
        {(running || elapsed > 0) && (
          <div className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 font-mono text-sm tabular-nums text-foreground ${GLASS}`}>
            <IconClock size={15} /> {formatTime(elapsed)}
          </div>
        )}
      </div>

      {running && funMsg && (
        <p className="text-center text-xs italic text-default-400">{funMsg}</p>
      )}

      {globalStatus && (
        <div className={`rounded-xl px-4 py-2.5 text-sm text-default-600 ${GLASS}`}>{globalStatus}</div>
      )}

      {/* Outputs */}
      {outputs.length > 0 && (
        <div className={`flex flex-col gap-3 rounded-2xl p-4 ${GLASS}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Results</span>
              <Chip size="sm" variant="flat" color="success">
                {outputs.length} ready
              </Chip>
              {totalSaved != null && totalSaved > 0 && (
                <Chip size="sm" variant="flat" color="success">
                  −{totalSaved.toFixed(0)}% total
                </Chip>
              )}
            </div>
            <Button
              size="sm"
              color="success"
              variant="flat"
              radius="full"
              onPress={() => downloadZip(outputs, zipName)}
              startContent={<IconDownload size={15} />}
            >
              Download all (ZIP)
            </Button>
          </div>

          <div className="flex flex-col gap-1.5">
            {outputs.map((o) => {
              const saved =
                o.sourceSize && o.size < o.sourceSize ? (1 - o.size / o.sourceSize) * 100 : null;
              return (
                <div key={o.id + o.name} className="flex flex-col gap-2 rounded-xl bg-default-100/60 px-3 py-2.5">
                  <div className="flex items-center gap-3">
                    <span className="text-success">
                      <IconCheck size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm text-foreground">{o.name}</div>
                      <div className="text-xs text-default-500">
                        {formatBytes(o.size)}
                        {o.sourceSize ? ` · was ${formatBytes(o.sourceSize)}` : ""}
                      </div>
                    </div>
                    {saved != null && saved > 0 && (
                      <Chip size="sm" variant="flat" color="success">
                        −{saved.toFixed(0)}%
                      </Chip>
                    )}
                    <Button
                      size="sm"
                      variant="flat"
                      radius="full"
                      onPress={() => downloadBlob(o.blob, o.name)}
                      startContent={<IconDownload size={15} />}
                    >
                      Download
                    </Button>
                  </div>
                  {o.sourceSize && o.size < o.sourceSize && (
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-default-200">
                      <div
                        className="dwm-shrink h-full rounded-full bg-success"
                        style={{ "--to": `${Math.max(5, Math.min(100, (o.size / o.sourceSize) * 100))}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
