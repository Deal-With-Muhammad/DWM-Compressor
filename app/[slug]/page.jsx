import { notFound } from "next/navigation";
import App from "../../components/App";
import AboutContent from "../../components/AboutContent";
import Footer from "../../components/Footer";
import { SITE_NAME, buildLandingJsonLd, jsonLdString } from "../../lib/seo";
import { LANDING_PAGES, getLandingPage } from "../../lib/pages";

// Keyword landing pages (see lib/pages.js). Only the listed slugs exist;
// anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const page = getLandingPage(params.slug);
  if (!page) return {};
  const path = `/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    // og:image / twitter:image come from ./opengraph-image.jsx.
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      title: page.title,
      description: page.description,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export default function LandingPage({ params }) {
  const page = getLandingPage(params.slug);
  if (!page) notFound();

  return (
    <div className="relative min-h-screen w-full overflow-hidden px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(buildLandingJsonLd(page)) }}
      />

      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative">
        <main>
          <App
            initialTab={page.tab}
            presets={page.preset}
            heading={page.h1}
            answer={page.answer}
            crumb={page.h1}
          />
          <AboutContent
            slug={page.slug}
            howToTitle={page.howToTitle}
            steps={page.steps}
            useCasesTitle={page.useCasesTitle}
            useCases={page.useCases}
            tipsTitle={page.tipsTitle}
            tips={page.tips}
            faqs={page.faqs}
          />
        </main>
        <Footer />
      </div>
    </div>
  );
}
