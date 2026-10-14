import VisitCounter from "./VisitCounter";
import {
  IconArrowUpRight,
  IconGithub,
  IconGlobe,
  IconLinkedin,
  IconMail,
  IconPuzzle,
} from "./icons";
import { AUTHOR, SISTER_TOOLS } from "../lib/seo";

const GLASS = "border border-default-200/60 bg-content1/50 backdrop-blur-xl";

const textLink =
  "inline-flex items-center gap-1.5 rounded-sm text-default-500 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
const iconLink =
  "grid h-9 w-9 place-items-center rounded-full border border-default-200/60 bg-content1/50 text-default-500 backdrop-blur-xl transition-colors hover:border-primary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

export default function Footer() {
  return (
    <footer className="mx-auto mt-7 flex w-full max-w-2xl flex-col items-center gap-3 pb-4">
      <div
        className={`flex w-full flex-col items-center gap-3 rounded-2xl px-4 py-3.5 sm:flex-row sm:justify-between ${GLASS}`}
      >
        <div className="flex min-w-0 flex-col items-center gap-1 text-center sm:items-start sm:text-left">
          <p className="text-sm font-semibold text-foreground">
            Built by{" "}
            <a
              className="rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              href={AUTHOR.url}
              target="_blank"
              rel="author noopener"
            >
              {AUTHOR.name}
            </a>
          </p>
          <p className="text-xs text-default-500">
            Web &amp; mobile app developer in {AUTHOR.location}
          </p>
          <div className="mt-0.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:justify-start">
            <a className={textLink} href={AUTHOR.url} target="_blank" rel="noopener">
              <IconGlobe size={14} /> dealwithmuhammad.com
            </a>
            <a className={textLink} href={`mailto:${AUTHOR.email}`}>
              <IconMail size={14} /> {AUTHOR.email}
            </a>
            <a className={textLink} href={AUTHOR.caseStudy} target="_blank" rel="noopener">
              <IconArrowUpRight size={14} /> Case study
            </a>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          {/* Chrome extension — hidden on small screens (desktop-only feature) */}
          <a
            className="hidden h-9 items-center gap-1.5 whitespace-nowrap rounded-full border border-default-200/60 bg-content1/50 px-3.5 text-xs font-medium text-default-500 backdrop-blur-xl transition-colors hover:border-primary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:inline-flex"
            href={AUTHOR.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconPuzzle size={15} /> Chrome extension
          </a>
          <a
            className={iconLink}
            href={AUTHOR.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <IconGithub size={17} />
          </a>
          <a
            className={iconLink}
            href={AUTHOR.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <IconLinkedin size={17} />
          </a>
        </div>
      </div>

      <nav
        aria-label="More free tools by Muhammad Ahmad"
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs"
      >
        <span className="text-default-400">More free tools:</span>
        {SISTER_TOOLS.map((t) => (
          <a key={t.url} className={textLink} href={t.url} target="_blank" rel="noopener" title={t.blurb}>
            {t.name}
          </a>
        ))}
      </nav>

      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-default-400">
        <span>Everything runs locally in your browser</span>
        <VisitCounter />
      </div>
    </footer>
  );
}
