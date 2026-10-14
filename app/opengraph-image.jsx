import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

// Social share card (also used for twitter:image). Statically generated at
// build time.

export const alt =
  "DWM Compressor — Compress PDFs, images & video, privately, in your browser. By Muhammad Ahmad.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Liberation Sans ships with pdfjs-dist (already a dependency), so no new
// font package is needed. Falls back to the built-in font if it's missing.
async function loadFonts() {
  const dir = join(process.cwd(), "node_modules/pdfjs-dist/standard_fonts");
  try {
    const [regular, bold] = await Promise.all([
      readFile(join(dir, "LiberationSans-Regular.ttf")),
      readFile(join(dir, "LiberationSans-Bold.ttf")),
    ]);
    return [
      { name: "Liberation Sans", data: regular, weight: 400, style: "normal" },
      { name: "Liberation Sans", data: bold, weight: 700, style: "normal" },
    ];
  } catch (_) {
    return undefined;
  }
}

const CHIPS = ["No uploads", "No sign-up", "No size limit", "HEIC to JPG", "100% free"];

export default async function OpengraphImage() {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#0b0f1a",
          color: "#ffffff",
          fontFamily: fonts ? "Liberation Sans" : undefined,
          position: "relative",
        }}
      >
        {/* Soft accent glows, echoing the blurred discs behind the app. */}
        <div
          style={{
            position: "absolute",
            left: -160,
            top: -180,
            width: 640,
            height: 640,
            borderRadius: 9999,
            backgroundImage: "radial-gradient(circle, rgba(79,70,229,0.45) 0%, rgba(79,70,229,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -200,
            bottom: -260,
            width: 720,
            height: 720,
            borderRadius: 9999,
            backgroundImage: "radial-gradient(circle, rgba(147,51,234,0.30) 0%, rgba(147,51,234,0) 70%)",
          }}
        />

        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 22,
              backgroundColor: "#4f46e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 40px rgba(79,70,229,0.45)",
            }}
          >
            <svg
              width="42"
              height="42"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="4 14 10 14 10 20" />
              <polyline points="20 10 14 10 14 4" />
              <line x1="14" y1="10" x2="21" y2="3" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: -0.5 }}>
            DWM Compressor
          </div>
        </div>

        {/* Value prop */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.08 }}>
            Compress PDFs, images &amp; video
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 66,
              fontWeight: 700,
              letterSpacing: -1.5,
              lineHeight: 1.08,
              color: "#a5b4fc",
            }}
          >
            — privately, in your browser
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 34 }}>
            {CHIPS.map((c) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  padding: "10px 22px",
                  borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.16)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "#cbd5e1",
                  fontSize: 24,
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Byline */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#94a3b8",
          }}
        >
          <div style={{ display: "flex" }}>by Muhammad Ahmad · dealwithmuhammad.com</div>
          <div style={{ display: "flex", color: "#a5b4fc" }}>compressor.dealwithmuhammad.com</div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
