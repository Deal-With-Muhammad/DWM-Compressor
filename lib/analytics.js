// Privacy-friendly usage tracking. No file names or contents are ever sent —
// only anonymous counts of which tool was used. No-ops unless an analytics
// provider is configured via env (see components/Analytics.jsx).
export function track(event, params = {}) {
  try {
    if (typeof window === "undefined") return;
    if (typeof window.gtag === "function") window.gtag("event", event, params);
    if (typeof window.plausible === "function") window.plausible(event, { props: params });
  } catch (_) {
    /* analytics must never break the app */
  }
}

// Shared DWM visitor analytics (https://www.dealwithmuhammad.com/dwm.js, loaded
// in app/layout.jsx). Sends only the event name — lowercase kebab-case, ≤40
// chars, e.g. "compress-pdf". The script may be missing (ad blockers, local
// dev), so the call is always guarded.
export function trackEvent(name) {
  try {
    if (typeof window === "undefined" || !name) return;
    window.dwm?.(name);
  } catch (_) {
    /* analytics must never break the app */
  }
}
