import "./globals.css";
import { Providers } from "./providers";
import Analytics from "../components/Analytics";
import ServiceWorker from "../components/ServiceWorker";

export const metadata = {
  title: "DWM Compressor — compress & convert PDF, images & video",
  description:
    "Compress and convert PDFs, images and videos right in your browser. 100% private, no uploads, no file-size limits, no sign-up.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  applicationName: "DWM Compressor",
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
      </body>
    </html>
  );
}
