import App from "../components/App";
import AboutContent from "../components/AboutContent";
import Footer from "../components/Footer";
import { buildJsonLd, jsonLdString } from "../lib/seo";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(buildJsonLd()) }}
      />

      {/* Soft solid accent discs behind the frosted-glass panels (no gradients). */}
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative">
        <main>
          <App />
          <AboutContent />
        </main>
        <Footer />
      </div>
    </div>
  );
}
