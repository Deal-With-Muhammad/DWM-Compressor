import {
  IconChevronDown,
  IconConvert,
  IconFile,
  IconImage,
  IconLock,
  IconPuzzle,
  IconVideo,
} from "./icons";
import { FAQS, FEATURES, HOW_TO_STEPS } from "../lib/seo";

// Server-rendered guide below the tool: how-to, feature list and FAQ. The same
// data feeds the HowTo / FAQPage JSON-LD in app/page.jsx.

const GLASS = "border border-default-200/60 bg-content1/50 backdrop-blur-xl";

const FEATURE_ICONS = {
  pdf: IconFile,
  image: IconImage,
  video: IconVideo,
  convert: IconConvert,
  pdftools: IconLock,
  extension: IconPuzzle,
};

function SectionTitle({ id, children }) {
  return (
    <h2 id={id} className="px-1 text-lg font-bold text-foreground">
      {children}
    </h2>
  );
}

export default function AboutContent() {
  return (
    <div className="mx-auto mt-12 flex w-full max-w-2xl flex-col gap-10">
      <p className="px-1 text-sm leading-relaxed text-default-500">
        <strong className="font-semibold text-foreground">DWM Compressor</strong> is a free online
        tool that compresses PDFs, images and videos right in your browser. Files are processed on
        your own device with pdf.js, pdf-lib and ffmpeg.wasm — nothing is uploaded, there&apos;s no
        file-size limit and no sign-up.
      </p>

      <section id="how-to" aria-labelledby="how-to-title" className="flex scroll-mt-6 flex-col gap-3">
        <SectionTitle id="how-to-title">How to compress a PDF</SectionTitle>
        <ol className={`flex flex-col gap-4 rounded-2xl p-4 sm:p-5 ${GLASS}`}>
          {HOW_TO_STEPS.map((s, i) => (
            <li key={s.name} className="flex gap-3">
              <span
                aria-hidden="true"
                className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary"
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-foreground">{s.name}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-default-500">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="features-title" className="flex flex-col gap-3">
        <SectionTitle id="features-title">What you can do</SectionTitle>
        <ul className="grid gap-2 sm:grid-cols-2">
          {FEATURES.map((f) => {
            const Icon = FEATURE_ICONS[f.key] || IconFile;
            return (
              <li key={f.title} className={`flex gap-3 rounded-2xl p-4 ${GLASS}`}>
                <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={17} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-default-500">{f.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="faq" aria-labelledby="faq-title" className="flex scroll-mt-6 flex-col gap-3">
        <SectionTitle id="faq-title">Frequently asked questions</SectionTitle>
        <div className={`divide-y divide-default-200/60 rounded-2xl ${GLASS}`}>
          {FAQS.map((f) => (
            <details key={f.q} className="group px-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg py-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
                <h3 className="text-sm font-medium text-foreground">{f.q}</h3>
                <span className="flex-shrink-0 text-default-400 transition-transform duration-200 group-open:rotate-180">
                  <IconChevronDown size={16} />
                </span>
              </summary>
              <p className="pb-4 text-sm leading-relaxed text-default-500">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
