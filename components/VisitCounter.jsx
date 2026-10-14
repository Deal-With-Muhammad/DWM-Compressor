"use client";

import { useEffect, useState } from "react";
import { IconEye } from "./icons";

const API_URL = "https://www.dealwithmuhammad.com/api/views?site=compressor";
const STATS_URL = "https://www.dealwithmuhammad.com/stats/compressor";

const nf = new Intl.NumberFormat("en");

// Public visitor counter from the shared DWM analytics. Fetches once on mount
// and renders nothing until the stats are ready — or at all, if the request
// fails or is blocked. Sits at the very end of the page so appearing late
// never shifts any other content.
export default function VisitCounter() {
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(API_URL, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.ready === true && Number.isFinite(data.visitors)) setVisitors(data.visitors);
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  if (visitors == null) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-default-400">
      <IconEye size={13} />
      <span>
        <span className="font-medium tabular-nums text-default-500">{nf.format(visitors)}</span>{" "}
        {visitors === 1 ? "visitor" : "visitors"}
      </span>
      <span aria-hidden="true">·</span>
      <a
        href={STATS_URL}
        target="_blank"
        rel="noopener"
        className="rounded-sm text-default-500 underline-offset-2 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        Live stats
      </a>
    </span>
  );
}
