import Link from "next/link";
import {
  IconCheck,
  IconChevronDown,
  IconConvert,
  IconFile,
  IconImage,
  IconLock,
  IconPuzzle,
  IconVideo,
} from "./icons";
import { FAQS, FEATURES, HOW_TO_STEPS, USE_CASES, WHY } from "../lib/seo";
import { LANDING_PAGES, UPDATED_LABEL } from "../lib/pages";

// Server-rendered guide below the tool: how-to, use cases, an honest "why use
// this one", links to the task pages and the FAQ. With no props it renders the
// home page (data from lib/seo.js); landing pages pass their own copy from
// lib/pages.js. The same data feeds the HowTo / FAQPage JSON-LD.

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

function BulletList({ items }) {
  return (
    <ul className={`flex flex-col gap-2.5 rounded-2xl p-4 sm:p-5 ${GLASS}`}>
      {items.map((t) => (
        <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-default-500">
          <span aria-hidden="true" className="mt-0.5 flex-shrink-0 text-primary">
            <IconCheck size={16} />
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AboutContent({
  slug,
  intro,
  howToTitle = "How to compress a PDF",
  steps = HOW_TO_STEPS,
  useCasesTitle = "What people use it for",
  useCases = USE_CASES,
  tipsTitle,
  tips,
  faqs = FAQS,
  showFeatures = !slug,
}) {
  // Task pages to cross-link: the home page plus every landing page but this one.
  const related = [
    ...(slug ? [{ href: "/", label: "Compress PDF online" }] : []),
    ...LANDING_PAGES.filter((p) => p.slug !== slug).map((p) => ({ href: `/${p.slug}`, label: p.label })),
  ];

  return (
    <div className="mx-auto mt-12 flex w-full max-w-2xl flex-col gap-10">
      {intro && <p className="px-1 text-sm leading-relaxed text-default-500">{intro}</p>}

      <section id="how-to" aria-labelledby="how-to-title" className="flex scroll-mt-6 flex-col gap-3">
        <SectionTitle id="how-to-title">{howToTitle}</SectionTitle>
        <ol className={`flex flex-col gap-4 rounded-2xl p-4 sm:p-5 ${GLASS}`}>
          {steps.map((s, i) => (
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

      {tips && (
        <section aria-labelledby="tips-title" className="flex flex-col gap-3">
          <SectionTitle id="tips-title">{tipsTitle}</SectionTitle>
          <BulletList items={tips} />
        </section>
      )}

      <section aria-labelledby="use-cases-title" className="flex flex-col gap-3">
        <SectionTitle id="use-cases-title">{useCasesTitle}</SectionTitle>
        <BulletList items={useCases} />
      </section>

      {showFeatures && (
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
      )}

      <section aria-labelledby="why-title" className="flex flex-col gap-3">
        <SectionTitle id="why-title">Why use this compressor</SectionTitle>
        <BulletList items={WHY.pros} />
        <div className={`rounded-2xl p-4 sm:p-5 ${GLASS}`}>
          <h3 className="text-sm font-semibold text-foreground">Honest trade-offs</h3>
          <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-default-500">
            {WHY.cons.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <nav aria-labelledby="tasks-title" className="flex flex-col gap-3">
        <SectionTitle id="tasks-title">{slug ? "More ways to use it" : "Popular tasks"}</SectionTitle>
        <ul className="grid gap-2 sm:grid-cols-2">
          {related.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${GLASS}`}
              >
                {r.label}
                <span aria-hidden="true" className="-rotate-90 text-default-400">
                  <IconChevronDown size={15} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section id="faq" aria-labelledby="faq-title" className="flex scroll-mt-6 flex-col gap-3">
        <SectionTitle id="faq-title">Frequently asked questions</SectionTitle>
        <div className={`divide-y divide-default-200/60 rounded-2xl ${GLASS}`}>
          {faqs.map((f) => (
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
        <p className="px-1 text-xs text-default-400">{UPDATED_LABEL}</p>
      </section>
    </div>
  );
}
