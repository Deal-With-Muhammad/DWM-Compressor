"use client";

import { useEffect } from "react";

// Registers the service worker (only in production) so the app is installable
// and works offline after the first visit.
export default function ServiceWorker() {
  useEffect(() => {
    if (
      process.env.NODE_ENV === "production" &&
      typeof navigator !== "undefined" &&
      "serviceWorker" in navigator
    ) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}
