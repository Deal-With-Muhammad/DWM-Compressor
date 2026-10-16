// Single source of truth for the home page's SEO copy. The visible "How to",
// feature list and FAQ (components/AboutContent.jsx) and the JSON-LD (app/page.jsx)
// both read from here (landing pages live in lib/pages.js), so the structured
// data always matches what's on the page.
// Keep every claim accurate to what the code in lib/engines.js actually does.

export const SITE_URL = "https://compressor.dealwithmuhammad.com";
export const SITE_NAME = "DWM Compressor";

export const TITLE = "Compress PDF, Images & Video Online Free | DWM Compressor";
export const DESCRIPTION =
  "Compress PDF to 100KB, 200KB or any size, shrink images, convert HEIC to JPG and compress video — free, in your browser. No uploads, no sign-up.";
export const TAGLINE = "Compress PDFs, images & video — privately, in your browser";

export const AUTHOR = {
  name: "Muhammad Ahmad",
  url: "https://www.dealwithmuhammad.com",
  email: "me@dealwithmuhammad.com",
  jobTitle: "Web & Mobile App Developer",
  location: "Kuala Lumpur, Malaysia",
  caseStudy: "https://www.dealwithmuhammad.com/work/dwm-compressor",
  github: "https://github.com/Deal-With-Muhammad",
  linkedin: "https://www.linkedin.com/in/muhammad-ahmad-7009b8248/",
  instagram: "https://www.instagram.com/dealwithmuhammad/",
};

// Sibling DWM tools. `name` is the brand (used by llms.txt); `label` is the
// descriptive anchor text used for links in the footer.
export const SISTER_TOOLS = [
  {
    name: "DWM Downloader",
    label: "Free video downloader",
    url: "https://downloader.dealwithmuhammad.com",
    blurb: "Download videos from YouTube, Instagram, TikTok and more",
  },
  {
    name: "DWM QR",
    label: "QR code generator",
    url: "https://qr.dealwithmuhammad.com",
    blurb: "Custom QR codes with logos, colours, templates and expiry",
  },
  {
    name: "DWM BG Remover",
    label: "Background remover",
    url: "https://bgremove.dealwithmuhammad.com",
    blurb: "Remove image backgrounds with AI, right in your browser",
  },
  {
    name: "DWM IP",
    label: "What is my IP",
    url: "https://ip.dealwithmuhammad.com",
    blurb: "See your public IP address, location and ISP",
  },
  {
    name: "DWM Email Checker",
    label: "Email checker",
    url: "https://emailcheck.dealwithmuhammad.com",
    blurb: "Check if an email address exists before you send",
  },
  {
    name: "Progress 2026",
    label: "Year progress bar",
    url: "https://progress.dealwithmuhammad.com",
    blurb: "How much of the year has gone, live",
  },
];

export const KEYWORDS = [
  "compress PDF",
  "compress PDF online free",
  "PDF compressor",
  "reduce PDF size",
  "reduce PDF size without uploading",
  "compress PDF to 100KB",
  "compress PDF to 200KB",
  "compress PDF to 500KB",
  "compress PDF to 1MB",
  "private PDF compressor",
  "compress image online",
  "image compressor",
  "compress image to 100KB",
  "compress JPEG to 50KB",
  "HEIC to JPG",
  "convert HEIC to JPG",
  "compress video online free",
  "video compressor",
  "images to PDF",
  "PDF to JPG",
  "DWM Compressor",
  "Muhammad Ahmad",
];

export const H1 = "Compress PDF, Images & Video Online";
export const ANSWER =
  "A free online compressor that shrinks PDFs (to a target size such as 100 KB), images and videos right in your browser — your files are never uploaded. No sign-up, no watermark and no file-size limit.";

export const USE_CASES = [
  "Getting a PDF, photo or signature under the size limit of a job, exam, university or visa portal.",
  "Sending scans, photos or clips by email, WhatsApp or Discord when they're too big to attach.",
  "Opening iPhone HEIC photos on Windows or uploading them where only JPG is accepted.",
  "Shrinking images for a website, and phone videos to save storage.",
];

// Honest "why use this one" — strengths and the real trade-offs.
export const WHY = {
  pros: [
    "Your files never leave your device — everything runs in your browser with pdf.js, pdf-lib and ffmpeg.wasm.",
    "Free, with no account, no watermark, no paid tier and no daily limit.",
    "Compress PDFs and images to an exact target size in KB or MB.",
    "No file-size cap; batch as many files as you like and download them as one ZIP.",
    "PDFs, images, iPhone HEIC photos and video in one place, on any device.",
  ],
  cons: [
    "PDF compression redraws each page as an image, so text is no longer selectable. Server-based compressors such as Smallpdf or iLovePDF optimise the existing PDF and usually keep text selectable — a better fit if you need that and the file isn't sensitive.",
    "Speed depends on your device. Video encoding in the browser is slower than desktop apps such as HandBrake.",
    "It's focused on compressing and converting — there's no merge, OCR or PDF-to-Word.",
  ],
};

export const HOW_TO_STEPS = [
  {
    name: "Add your PDF",
    text: "Open the PDF tab and drop one or more PDF files onto the page, click to browse, or paste them with Ctrl / ⌘ + V.",
  },
  {
    name: "Choose how much to compress",
    text: "Pick “By quality” and drag the slider (60% is a good balance), or pick “Target size” and type a size such as 200 KB or 1 MB. Set the resolution to Low, Medium or High.",
  },
  {
    name: "Compress and download",
    text: "Click Compress. Each file is processed on your own device, then you can download them one by one or all together as a ZIP.",
  },
];

export const FEATURES = [
  {
    key: "pdf",
    title: "Compress PDF",
    text: "By quality or to a target size in KB or MB, at low, medium or high resolution. Best for scanned and image-heavy PDFs.",
  },
  {
    key: "image",
    title: "Compress images",
    text: "JPG, PNG, WebP and iPhone HEIC photos — by quality or target size, optionally resized to 2000px or 1280px, saved as JPG or WebP.",
  },
  {
    key: "video",
    title: "Compress video",
    text: "MP4, MOV, MKV, AVI, WebM and more, saved as MP4 (H.264) or WebM (VP9), with optional 720p or 480p downscaling.",
  },
  {
    key: "convert",
    title: "Convert files",
    text: "HEIC to JPG, images to JPG, PNG or WebP, many images into one PDF, and a PDF into JPG images (ZIP).",
  },
  {
    key: "pdftools",
    title: "PDF tools",
    text: "Pick and extract pages, add a password to a PDF, or remove a password you already know.",
  },
  {
    key: "extension",
    title: "Chrome extension",
    text: "A small extension that opens DWM Compressor from your toolbar or right-click menu.",
  },
];

// Short feature list for the WebApplication JSON-LD.
export const FEATURE_LIST = [
  "Compress PDF by quality or to a target file size (KB or MB)",
  "Compress JPG, PNG, WebP and HEIC images by quality or target size",
  "Compress video to MP4 (H.264) or WebM (VP9) with ffmpeg.wasm",
  "Convert HEIC to JPG, and images to JPG, PNG or WebP",
  "Combine images into one PDF; convert PDF pages to JPG images",
  "Extract PDF pages, add or remove a PDF password",
  "Batch processing with download-all as ZIP",
  "Runs entirely in the browser — files are never uploaded",
  "No file-size limit, no sign-up, no watermark",
];

export const FAQS = [
  {
    q: "Is DWM Compressor free?",
    a: "Yes. Compressing and converting PDFs, images and videos is completely free — no sign-up, no watermark and no daily limit.",
  },
  {
    q: "Are my files uploaded to a server?",
    a: "No. Everything runs inside your browser with pdf.js, pdf-lib and ffmpeg.wasm (WebAssembly), so your files never leave your device. The site only counts anonymous page views; file names and contents are never sent anywhere.",
  },
  {
    q: "How do I compress a PDF to 100KB or 200KB?",
    a: "Open the PDF tab, choose “Target size”, type 100 or 200 and select KB, then click Compress. DWM Compressor automatically finds the highest quality that fits under your target. If a long or very detailed PDF can't get that small, you get the smallest version it could make — set Resolution to Low and try again.",
  },
  {
    q: "Does compressing a PDF reduce its quality?",
    a: "It can, a little. Each page is re-rendered as an image at the quality and resolution you choose, which gives big savings on scanned and image-heavy PDFs. Because pages become images, text is no longer selectable or searchable, and text-only PDFs may not shrink much. 60% quality at Medium resolution is a good balance; raise either for sharper pages.",
  },
  {
    q: "Can I convert HEIC to JPG?",
    a: "Yes. Open the Convert tab, choose Images, then JPG (or PNG or WebP), and add your iPhone .heic or .heif photos. They're decoded right in your browser. You can also combine photos into a single PDF, or compress HEIC photos to JPG in the Images tab.",
  },
  {
    q: "Is there a file-size limit?",
    a: "No. DWM Compressor doesn't limit file size or the number of files. Because everything runs on your device, the only limit is your browser's memory — very large files, such as multi-gigabyte videos, may not fit.",
  },
  {
    q: "Does it work on my phone?",
    a: "Yes. It works in modern browsers on iPhone, Android, tablets and computers, and you can add it to your home screen like an app. Large videos take longer on phones because all the work happens on the device.",
  },
  {
    q: "How do I reduce a PDF's size without losing much quality?",
    a: "Use “By quality” at 75–80% with High resolution — pages stay sharp while scanned and image-heavy PDFs still shrink a lot. For the smallest file, lower the quality or choose Low resolution. Text-only PDFs exported from Word or Google Docs are often already small and may not shrink.",
  },
  {
    q: "How is this different from Smallpdf or iLovePDF?",
    a: "Those are established services with many more PDF tools, and they process your file on their servers. DWM Compressor runs entirely in your browser, so files never leave your device, and it has no account, paid tier or daily limit. The trade-off is that it turns PDF pages into images, so text isn't selectable afterwards.",
  },
  {
    q: "Can I compress a JPEG to 50KB or 100KB?",
    a: "Yes. In the Images tab choose “Target size”, type 50 or 100 and select KB. It lowers the JPEG quality first and only shrinks the dimensions if it has to. PNG and HEIC photos work too.",
  },
  {
    q: "Who made DWM Compressor?",
    a: "DWM Compressor was built by Muhammad Ahmad, a web and mobile app developer in Kuala Lumpur, Malaysia. You can see more of his work at dealwithmuhammad.com or email me@dealwithmuhammad.com.",
  },
];

/* ---------- JSON-LD ---------- */

const PERSON_ID = "https://www.dealwithmuhammad.com/#person";

export const PERSON = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: AUTHOR.name,
  url: AUTHOR.url,
  jobTitle: AUTHOR.jobTitle,
  address: { "@type": "PostalAddress", addressLocality: "Kuala Lumpur", addressCountry: "MY" },
  sameAs: [AUTHOR.github, AUTHOR.linkedin, AUTHOR.instagram],
};

function webApplication({ id, name, url, image, description, dateModified, featureList }) {
  return {
    "@type": "WebApplication",
    "@id": id,
    name,
    url,
    description,
    image,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires a modern browser with JavaScript and WebAssembly.",
    inLanguage: "en",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList,
    dateModified,
    author: PERSON,
    creator: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

function faqPage(id, faqs) {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function howTo({ id, name, description, steps, url }) {
  return {
    "@type": "HowTo",
    "@id": id,
    name,
    description,
    tool: { "@type": "HowToTool", name: SITE_NAME },
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url,
    })),
  };
}

export function buildJsonLd({ dateModified }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      PERSON,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description: DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      webApplication({
        id: `${SITE_URL}/#app`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/opengraph-image`,
        description:
          "A free online tool that compresses PDFs (by quality or to a target size), compresses and converts images including HEIC, and compresses video — entirely in the browser, so files are never uploaded.",
        dateModified,
        featureList: FEATURE_LIST,
      }),
      howTo({
        id: `${SITE_URL}/#how-to`,
        name: "How to compress a PDF",
        description:
          "Compress a PDF by quality or to a target size such as 100 KB, 200 KB or 1 MB, without uploading it.",
        steps: HOW_TO_STEPS,
        url: `${SITE_URL}/#how-to`,
      }),
      faqPage(`${SITE_URL}/#faq`, FAQS),
    ],
  };
}

// JSON-LD for a keyword landing page (lib/pages.js).
export function buildLandingJsonLd(page) {
  const url = `${SITE_URL}/${page.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      PERSON,
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: page.h1, item: url },
        ],
      },
      webApplication({
        id: `${url}#app`,
        name: `${page.h1} — ${SITE_NAME}`,
        url,
        image: `${url}/opengraph-image`,
        description: page.description,
        dateModified: page.updated,
        featureList: FEATURE_LIST,
      }),
      howTo({
        id: `${url}#how-to`,
        name: page.howToTitle,
        description: page.answer,
        steps: page.steps,
        url: `${url}#how-to`,
      }),
      faqPage(`${url}#faq`, page.faqs),
    ],
  };
}

// JSON for a <script type="application/ld+json">, with "<" escaped so the
// payload can never close the script tag early.
export function jsonLdString(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
