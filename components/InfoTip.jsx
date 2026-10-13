"use client";

import { useEffect, useRef, useState } from "react";

// Small "i" button that shows a plain-English explanation on hover / tap.
export default function InfoTip({ text, label }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <span ref={ref} className="relative inline-flex align-middle">
      <button
        type="button"
        aria-label={label ? `What is ${label}?` : "More info"}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="grid h-[18px] w-[18px] place-items-center rounded-full border border-default-400 text-[11px] font-bold leading-none text-default-500 transition-colors hover:border-primary hover:text-primary"
      >
        i
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-60 max-w-[70vw] -translate-x-1/2 rounded-xl border border-default-200/60 bg-content1 p-3 text-xs font-normal normal-case leading-relaxed text-default-600 shadow-xl"
        >
          {text}
        </span>
      )}
    </span>
  );
}
