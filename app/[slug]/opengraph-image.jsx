import { OG_SIZE, renderOgImage } from "../../lib/og";
import { LANDING_PAGES, getLandingPage } from "../../lib/pages";

export const alt = "DWM Compressor — free, private file compression in your browser. By Muhammad Ahmad.";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return LANDING_PAGES.map((p) => ({ slug: p.slug }));
}

export default function OpengraphImage({ params }) {
  const page = getLandingPage(params.slug);
  return renderOgImage({
    headline: page?.h1 || "Compress PDFs, images & video",
    subline: "— free, in your browser",
    chips: ["No uploads", "No sign-up", "No watermark", "100% free"],
  });
}
