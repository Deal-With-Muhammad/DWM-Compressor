"use client";

import { useEffect, useState } from "react";
import { formatBytes, getSavedBytes } from "../lib/utils";
import { useCountUp } from "./useCountUp";
import { IconCompress } from "./icons";

// A running "you've saved X so far" badge, persisted across visits.
export default function SavedTotal() {
  const [total, setTotal] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTotal(getSavedBytes());
    const onUpd = (e) => setTotal(typeof e.detail === "number" ? e.detail : getSavedBytes());
    window.addEventListener("dwm-saved-updated", onUpd);
    return () => window.removeEventListener("dwm-saved-updated", onUpd);
  }, []);

  const animated = useCountUp(total, 900);

  if (!mounted || total <= 0) return null;

  return (
    <div className="mt-4 flex justify-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-1.5 text-sm font-medium text-success-600">
        <IconCompress size={15} />
        You've saved <span className="font-bold tabular-nums">{formatBytes(animated)}</span> so far 🎉
      </div>
    </div>
  );
}
