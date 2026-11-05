import { SITE_URL } from "../lib/seo";
import { HOME_UPDATED, LANDING_PAGES } from "../lib/pages";

// Fixed dates (not `new Date()`) so lastModified only changes when a page does.
export default function sitemap() {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: HOME_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...LANDING_PAGES.map((p) => ({
      url: `${SITE_URL}/${p.slug}`,
      lastModified: p.updated,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    { url: `${SITE_URL}/privacy`, lastModified: "2026-11-05", changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: "2026-11-05", changeFrequency: "yearly", priority: 0.3 },
  ];
}
