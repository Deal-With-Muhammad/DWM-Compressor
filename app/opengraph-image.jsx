import { DEFAULT_CHIPS, OG_SIZE, renderOgImage } from "../lib/og";

export const alt =
  "DWM Compressor — Compress PDFs, images & video, privately, in your browser. By Muhammad Ahmad.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    headline: "Compress PDFs, images & video",
    subline: "— privately, in your browser",
    chips: DEFAULT_CHIPS,
  });
}
