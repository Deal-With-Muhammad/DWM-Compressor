import "./globals.css";
import Script from "next/script";
import { Providers } from "./providers";
import Analytics from "../components/Analytics";
import ServiceWorker from "../components/ServiceWorker";
import { AUTHOR, DESCRIPTION, KEYWORDS, SITE_NAME, SITE_URL, TITLE } from "../lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: KEYWORDS,
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  category: "Utilities",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // og:image / twitter:image come from app/opengraph-image.jsx.
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export const viewport = {
  themeColor: "#4f46e5",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
        <ServiceWorker />
        <Analytics />
        {/* Shared DWM visitor analytics (pageviews + window.dwm(event)). Only
            tracks on *.dealwithmuhammad.com, so local dev is ignored. */}
        <Script
          src="https://www.dealwithmuhammad.com/dwm.js"
          data-site="compressor"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
