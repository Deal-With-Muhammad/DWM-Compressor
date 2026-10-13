"use client";

import { useEffect, useState } from "react";

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

export default function AccentPicker() {
  const [active, setActive] = useState("indigo");

  useEffect(() => {
    let key = "indigo";
    try {
      key = localStorage.getItem("dwm_accent") || "indigo";
    } catch (_) {}
    const a = ACCENTS.find((x) => x.key === key) || ACCENTS[0];
    applyAccent(a);
    setActive(a.key);
  }, []);

  const choose = (a) => {
    applyAccent(a);
    setActive(a.key);
    try {
      localStorage.setItem("dwm_accent", a.key);
    } catch (_) {}
  };

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Accent color">
      {ACCENTS.map((a) => (
        <button
          key={a.key}
          type="button"
          onClick={() => choose(a)}
          aria-label={a.label}
          title={a.label}
          className={[
            "h-5 w-5 rounded-full transition-transform hover:scale-110",
            active === a.key ? "ring-2 ring-foreground ring-offset-1 ring-offset-background" : "",
          ].join(" ")}
          style={{ backgroundColor: a.dot }}
        />
      ))}
    </div>
  );
}
