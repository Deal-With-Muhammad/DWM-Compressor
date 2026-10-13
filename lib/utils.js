export function formatBytes(bytes) {
  if (!bytes || bytes <= 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(sizes.length - 1, Math.floor(Math.log(bytes) / Math.log(k)));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

export function formatTime(seconds) {
  if (seconds == null) return "—";
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}m ${s}s`;
}

let _counter = 0;
export function uid() {
  _counter += 1;
  return `f${_counter}_${Math.floor(performance.now())}`;
}

export function baseName(name) {
  return name.replace(/\.[^./\\]+$/, "");
}

export function extOf(name) {
  const m = name.match(/\.([a-z0-9]+)$/i);
  return m ? m[1].toLowerCase() : "";
}

const SAVED_KEY = "dwm_total_saved_bytes";

export function getSavedBytes() {
  try {
    return parseInt(localStorage.getItem(SAVED_KEY) || "0", 10) || 0;
  } catch (_) {
    return 0;
  }
}

export function addSavedBytes(delta) {
  try {
    if (!delta || delta <= 0) return getSavedBytes();
    const next = getSavedBytes() + Math.round(delta);
    localStorage.setItem(SAVED_KEY, String(next));
    window.dispatchEvent(new CustomEvent("dwm-saved-updated", { detail: next }));
    return next;
  } catch (_) {
    return 0;
  }
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export async function downloadZip(outputs, zipName = "compressed.zip", onProgress) {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  const seen = {};
  for (const out of outputs) {
    let name = out.name;
    // Avoid duplicate names inside the zip.
    if (seen[name]) {
      seen[name] += 1;
      const dot = name.lastIndexOf(".");
      name =
        dot > 0
          ? `${name.slice(0, dot)} (${seen[out.name]})${name.slice(dot)}`
          : `${name} (${seen[out.name]})`;
    } else {
      seen[name] = 1;
    }
    zip.file(name, out.blob);
  }
  const blob = await zip.generateAsync(
    { type: "blob", compression: "STORE" },
    (meta) => onProgress?.(meta.percent / 100)
  );
  downloadBlob(blob, zipName);
}
