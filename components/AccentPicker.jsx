"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "dwm_accent";

const ACCENTS = [
  { key: "indigo", label: "Indigo", primary: "244 76% 58%", fg: "0 0% 100%", dot: "#5b52e6" },
  { key: "blue", label: "Blue", primary: "212 100% 47%", fg: "0 0% 100%", dot: "#006fee" },
  { key: "emerald", label: "Emerald", primary: "160 84% 39%", fg: "0 0% 100%", dot: "#10b981" },
  { key: "rose", label: "Rose", primary: "347 89% 60%", fg: "0 0% 100%", dot: "#f43f5e" },
  { key: "amber", label: "Amber", primary: "38 92% 50%", fg: "0 0% 12%", dot: "#f59e0b" },
  { key: "violet", label: "Violet", primary: "258 90% 66%", fg: "0 0% 100%", dot: "#8b5cf6" },
];

function applyAccent(a) {
  const root = document.documentElement;
  root.style.setProperty("--heroui-primary", a.primary);
  root.style.setProperty("--heroui-primary-foreground", a.fg);
}

// One swatch button that opens a small palette, instead of a row of dots.
export default function AccentPicker() {
  const [active, setActive] = useState("indigo");
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    let key = "indigo";
    try {
      key = localStorage.getItem(STORAGE_KEY) || "indigo";
    } catch (_) {}
    const a = ACCENTS.find((x) => x.key === key) || ACCENTS[0];
    applyAccent(a);
    setActive(a.key);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (a) => {
    applyAccent(a);
    setActive(a.key);
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, a.key);
    } catch (_) {}
  };

  const current = ACCENTS.find((a) => a.key === active) || ACCENTS[0];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Accent color"
        aria-haspopup="true"
        aria-expanded={open}
        title="Accent color"
        className="grid h-10 w-10 place-items-center rounded-full border border-default-200/60 bg-content1/60 backdrop-blur-xl transition-colors hover:border-default-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span className="h-4 w-4 rounded-full" style={{ backgroundColor: current.dot }} />
      </button>

      {open && (
        <div
          role="group"
          aria-label="Choose accent color"
          className="dwm-pop absolute right-0 top-full z-50 mt-2 flex items-center gap-2 rounded-full border border-default-200/60 bg-content1/90 p-2 shadow-xl backdrop-blur-xl"
        >
          {ACCENTS.map((a) => (
            <button
              key={a.key}
              type="button"
              onClick={() => choose(a)}
              aria-label={a.label}
              aria-pressed={active === a.key}
              title={a.label}
              className={[
                "h-6 w-6 rounded-full transition-transform hover:scale-110 focus-visible:outline-none",
                active === a.key
                  ? "ring-2 ring-foreground ring-offset-2 ring-offset-content1"
                  : "focus-visible:ring-2 focus-visible:ring-foreground/60",
              ].join(" ")}
              style={{ backgroundColor: a.dot }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
