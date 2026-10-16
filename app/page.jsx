import App from "../components/App";
import AboutContent from "../components/AboutContent";
import Footer from "../components/Footer";
import { ANSWER, H1, buildJsonLd, jsonLdString } from "../lib/seo";
import { HOME_UPDATED } from "../lib/pages";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(buildJsonLd({ dateModified: HOME_UPDATED })) }}
      />

      {/* Soft solid accent discs behind the frosted-glass panels (no gradients). */}
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative">
        <main>
          <App heading={H1} answer={ANSWER} />
          <AboutContent
            intro={
              <>
                <strong className="font-semibold text-foreground">DWM Compressor</strong> is a free
                online tool that compresses PDFs, images and videos right in your browser. Files are
                processed on your own device with pdf.js, pdf-lib and ffmpeg.wasm — nothing is
                uploaded, there&apos;s no file-size limit and no sign-up.
              </>
            }
          />
        </main>
        <Footer />
      </div>
    </div>
  );
}
