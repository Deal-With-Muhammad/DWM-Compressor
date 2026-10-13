"use client";

import Script from "next/script";

// Configure ONE of these later (after you buy a domain) by adding it to a
// `.env.local` file, then redeploy. Nothing loads until you do.
//
//   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX                 (Google Analytics 4)
//   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com    (Plausible — privacy-friendly)
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function Analytics() {
  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      {PLAUSIBLE_DOMAIN && (
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
