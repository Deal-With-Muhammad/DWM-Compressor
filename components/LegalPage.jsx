import Link from "next/link";
import AccentPicker from "./AccentPicker";
import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";
import { BrandMark } from "./icons";
import { LEGAL_UPDATED } from "../lib/legal";

const GLASS = "border border-default-200/60 bg-content1/50 backdrop-blur-xl";
const LINK_CLASS =
  "underline underline-offset-2 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
const STRONG_CLASS = "font-semibold text-foreground";
const TEXT_CLASS = "mt-2 text-sm leading-relaxed text-default-500";
const LIST_CLASS = "mt-2 flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-default-500";

const LINKS = /(me@dealwithmuhammad\.com|\+60 11-3986 5270|https?:\/\/[^\s),]*[^\s),.])/g;

/** Plain text with the contact details and web addresses turned into links. */
function Rich({ text }) {
  return (
    <>
      {text.split(LINKS).map((part, i) => {
        if (i % 2 === 0) return part;
        const href = part.startsWith("me@")
          ? `mailto:${part}`
          : part.startsWith("+60")
            ? "https://wa.me/601139865270"
            : part;
        return (
          <a key={part + i} className={LINK_CLASS} href={href}>
            {part}
          </a>
        );
      })}
    </>
  );
}

/** "Label :: text" shows the label in bold. */
function Item({ text }) {
  const split = text.indexOf(" :: ");
  if (split < 0) return <Rich text={text} />;
  return (
    <>
      <strong className={STRONG_CLASS}>{text.slice(0, split)}:</strong>{" "}
      <Rich text={text.slice(split + 4)} />
    </>
  );
}

function Body({ body }) {
  return (
    <>
      {body.map((block) =>
        typeof block === "string" ? (
          <p key={block.slice(0, 40)} className={TEXT_CLASS}>
            <Rich text={block} />
          </p>
        ) : (
          <ul key={block[0].slice(0, 40)} className={LIST_CLASS}>
            {block.map((item) => (
              <li key={item.slice(0, 40)}>
                <Item text={item} />
              </li>
            ))}
          </ul>
        ),
      )}
    </>
  );
}

// The shared layout of /privacy and /terms: the site's header and footer around plain text.
export default function LegalPage({ doc }) {
  const other =
    doc.path === "/privacy"
      ? { href: "/terms", label: "Terms of Use" }
      : { href: "/privacy", label: "Privacy Policy" };
  return (
    <div className="relative min-h-screen w-full overflow-hidden px-4 py-8 sm:py-12">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-2xl">
        <header className="mb-6 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="block h-9 w-9 flex-shrink-0 overflow-hidden rounded-xl shadow-lg shadow-[#e2533b]/30">
              <BrandMark size={36} />
            </span>
            <span className="truncate text-sm font-semibold text-foreground">DWM Compressor</span>
          </Link>
          <div className="flex flex-shrink-0 items-center gap-2">
            <AccentPicker />
            <ThemeToggle />
            <dwm-apps current="compressor"></dwm-apps>
          </div>
        </header>

        <main>
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
            {doc.title}
          </h1>
          <p className="mt-1 text-xs text-default-400">Last updated {LEGAL_UPDATED}</p>
          {doc.intro ? (
            <p className="mt-3 text-sm leading-relaxed text-default-500">{doc.intro}</p>
          ) : null}
          <div className="mt-6 flex flex-col gap-3">
            {doc.sections.map((s) => (
              <section key={s.heading} className={`rounded-2xl p-4 sm:p-5 ${GLASS}`}>
                <h2 className="text-base font-bold leading-tight text-foreground">{s.heading}</h2>
                <Body body={s.body} />
              </section>
            ))}
          </div>
          <p className="mt-5 px-1 text-xs text-default-400">
            See also the{" "}
            <Link className={LINK_CLASS} href={other.href}>
              {other.label}
            </Link>
            .
          </p>
        </main>
        <Footer />
      </div>
    </div>
  );
}
