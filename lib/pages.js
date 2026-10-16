// Keyword landing pages. Each one opens the same tool preset to its job (the
// right tab, target size and output format) and carries its own how-to, use
// cases and FAQ. app/[slug]/page.jsx renders them; the sitemap, footer and
// home page link to them. Every claim must match what lib/engines.js does.

// Fixed "last changed" dates for the sitemap and JSON-LD dateModified.
export const HOME_UPDATED = "2026-10-16";
export const UPDATED_LABEL = "Updated October 2026";

export const LANDING_PAGES = [
  {
    slug: "compress-pdf-to-100kb",
    updated: "2026-10-16",
    label: "Compress PDF to 100 KB",
    title: "Compress PDF to 100KB Online Free — No Upload | DWM Compressor",
    description:
      "Compress a PDF to under 100 KB for job, exam and visa portals. Free, in your browser — the file is never uploaded. No sign-up, no watermark.",
    h1: "Compress PDF to 100 KB",
    answer:
      "Drop your PDF below and click Compress — the target is already set to 100 KB, so the tool picks the highest quality that fits under it. Everything runs in your browser, so the document never leaves your device.",
    tab: "pdf",
    preset: { pdf: { mode: "target", targetValue: 100, targetUnit: "KB", scale: 1.0 } },
    howToTitle: "How to compress a PDF to 100 KB",
    steps: [
      {
        name: "Add your PDF",
        text: "Drop one or more PDFs onto the box above, click to browse, or paste with Ctrl / ⌘ + V. Each file is compressed to the target on its own.",
      },
      {
        name: "Check the target",
        text: "“Target size” is already set to 100 KB with Low resolution, which gives the best chance of fitting. Type 95 to leave a safety margin, or 200 / 500 for a looser limit.",
      },
      {
        name: "Compress and check the result",
        text: "Click Compress. The tool tries several quality levels and keeps the best one under 100 KB. Check the new size in the list, then download the file or all files as a ZIP.",
      },
    ],
    useCasesTitle: "When you need a PDF under 100 KB",
    useCases: [
      "Government job and exam application portals that cap certificates and ID scans at 100 KB.",
      "University admission, scholarship and visa forms with strict per-file upload limits.",
      "Bank, insurance and HR onboarding forms that reject anything larger.",
      "Email or messaging when a small one- or two-page scan is all you need to send.",
    ],
    tipsTitle: "Tips for getting under 100 KB",
    tips: [
      "Fewer pages make it much easier. Use PDF Tools → Select pages to keep only the pages the portal asks for, then compress.",
      "100 KB is roughly 30–50 KB per page for a two- or three-page scan, so multi-page colour scans will look soft. One or two pages usually stays readable.",
      "Portals differ on what “100 KB” means. This tool counts 1 KB as 1,024 bytes, so 100 KB = 102,400 bytes. If a portal counts 100,000 bytes, set the target to 95 KB.",
      "If your PDF is typed text exported from Word or Google Docs, it may already be small. Re-rendering pages as images can make a text-only PDF bigger, so check the size first.",
    ],
    faqs: [
      {
        q: "Can every PDF be compressed to 100 KB?",
        a: "Not always. Short scans and one-page certificates usually fit. Long or very detailed colour PDFs may not get that small; in that case you get the smallest version the tool could make. Extract only the pages you need and try again.",
      },
      {
        q: "Does 100 KB here mean 100,000 or 102,400 bytes?",
        a: "102,400 bytes — the tool counts 1 KB as 1,024 bytes. If a portal rejects the file as too big, set the target to 95 KB to stay safely under either definition.",
      },
      {
        q: "Will the text in my PDF stay selectable?",
        a: "No. To reach small sizes, each page is redrawn as a JPEG image and rebuilt into a new PDF, so text becomes part of the image and can't be selected or searched. It still looks the same on screen and in print.",
      },
      {
        q: "Is it safe for ID cards and certificates?",
        a: "Yes. The PDF is processed by pdf.js and pdf-lib inside your browser and is never uploaded to a server.",
      },
      {
        q: "Can I compress several PDFs to 100 KB at once?",
        a: "Yes. Add as many PDFs as you like — each one is compressed to the target separately, and you can download them one by one or all together as a ZIP.",
      },
      {
        q: "How do I compress a PDF to 200 KB or 500 KB instead?",
        a: "Change the number in the Target size box to 200 or 500 (or switch to MB for 1 MB, 2 MB and so on) and click Compress. For larger targets you can also set Resolution back to Medium or High for sharper pages.",
      },
    ],
  },
  {
    slug: "compress-image",
    updated: "2026-10-16",
    label: "Compress images (JPG, PNG, WebP, HEIC)",
    title: "Compress Image Online Free — JPG, PNG, WebP, HEIC | DWM Compressor",
    description:
      "Compress JPG, PNG, WebP and iPhone HEIC images online for free. Batch compress and resize in your browser — no upload, no sign-up, no watermark.",
    h1: "Compress Images Online",
    answer:
      "Add JPG, PNG, WebP or iPhone HEIC photos below, pick a quality and an optional maximum size, and click Compress. Images are re-encoded as JPG or WebP right in your browser — nothing is uploaded.",
    tab: "image",
    preset: { image: { mode: "quality", quality: 0.7, maxDimension: 2000, format: "image/jpeg" } },
    howToTitle: "How to compress an image",
    steps: [
      {
        name: "Add your images",
        text: "Drop photos onto the box above, click to browse, or paste a screenshot with Ctrl / ⌘ + V. Add as many as you like — they're processed one after another.",
      },
      {
        name: "Choose quality and size",
        text: "Quality starts at 70% and Max size at 2000px, which suits most phone photos. Lower the quality for smaller files, pick 1280px for email and chat, or switch to “Target size” to hit a limit such as 200 KB.",
      },
      {
        name: "Pick a format and compress",
        text: "Choose JPG (works everywhere) or WebP (smaller, keeps transparency), click Compress, then download each image or all of them as a ZIP.",
      },
    ],
    useCasesTitle: "What people compress images for",
    useCases: [
      "Making a website or blog load faster without hand-tuning every photo.",
      "Sending photos by email or chat when the attachment is too large.",
      "Upload forms with a size cap, such as profile pictures and document photos.",
      "Freeing up storage by shrinking big phone photos to 2000px.",
    ],
    tipsTitle: "Good to know",
    tips: [
      "Resizing saves the most. A 4000px phone photo shrunk to 2000px has a quarter of the pixels, so the file drops sharply before quality even matters.",
      "PNG with a transparent background: choose WebP to keep the transparency. JPG fills transparent areas with white.",
      "Images are re-encoded through a canvas, so camera EXIF metadata — including GPS location — is not copied to the compressed file.",
      "This tool always outputs JPG or WebP. If you need a PNG back, use the Convert tab.",
    ],
    faqs: [
      {
        q: "Does compressing an image reduce its quality?",
        a: "A little. JPG and WebP are lossy, but at 60–80% quality most photos look the same at normal viewing sizes. Lower the slider for smaller files and check the result before you send it.",
      },
      {
        q: "Which image formats can I compress?",
        a: "JPG, PNG, WebP and iPhone HEIC / HEIF photos, plus other formats your browser can open such as GIF or BMP. The compressed file is saved as JPG or WebP.",
      },
      {
        q: "Can I compress many images at once?",
        a: "Yes. There's no limit on the number of files. Add them all, click Compress once, and download the results individually or as a single ZIP.",
      },
      {
        q: "Are my photos uploaded?",
        a: "No. Images are decoded and re-encoded in your own browser, so they never leave your device.",
      },
      {
        q: "Does it remove location data from photos?",
        a: "Yes, as a side effect. The compressed image is drawn fresh from the pixels, so EXIF metadata such as GPS location, camera model and capture date is not carried over.",
      },
      {
        q: "Can I compress an image to an exact size like 100 KB?",
        a: "Yes. Switch “How to compress” to “Target size”, type 100 and choose KB. The tool lowers the quality first and shrinks the dimensions only if it has to.",
      },
    ],
  },
  {
    slug: "compress-jpeg-to-50kb",
    updated: "2026-10-16",
    label: "Compress JPEG to 50 KB",
    title: "Compress JPEG to 50KB Online Free — Photo & Signature | DWM Compressor",
    description:
      "Compress a JPG, PNG or HEIC photo to under 50 KB for application forms, passport photos and signatures. Free, private, in your browser — no upload.",
    h1: "Compress JPEG to 50 KB",
    answer:
      "Add your photo or signature below and click Compress — the target is already set to 50 KB, so the tool finds the best quality that fits, shrinking the dimensions only if it has to. The image never leaves your browser.",
    tab: "image",
    preset: { image: { mode: "target", targetValue: 50, targetUnit: "KB", maxDimension: 1280, format: "image/jpeg" } },
    howToTitle: "How to compress a JPEG to 50 KB",
    steps: [
      {
        name: "Add your photo",
        text: "Drop a JPG, PNG, WebP or iPhone HEIC image onto the box above, click to browse, or paste it with Ctrl / ⌘ + V.",
      },
      {
        name: "Keep the 50 KB target",
        text: "“Target size” is set to 50 KB, Max size to 1280px and the output to JPG. Change the number for 20 KB, 30 KB or 100 KB limits, or type 48 to leave a small safety margin.",
      },
      {
        name: "Compress and download",
        text: "Click Compress. The tool searches for the highest JPEG quality under 50 KB; if even low quality is too big, it scales the image down step by step until it fits. Download the result.",
      },
    ],
    useCasesTitle: "Where a 50 KB limit usually comes up",
    useCases: [
      "Photo and signature uploads on government job, exam and university application forms.",
      "Passport, visa and ID application portals with small file limits.",
      "Profile pictures on sites that reject large images.",
      "Attaching a scan or photo to a form that caps each file at 50 KB.",
    ],
    tipsTitle: "Tips for application photos",
    tips: [
      "Many forms also require exact pixel dimensions (for example 200 × 230 px). This tool only limits the file size; crop or resize to the required dimensions first if the form asks for them.",
      "Signatures compress well: sign in dark ink on white paper and crop tightly before compressing.",
      "This tool counts 1 KB as 1,024 bytes, so 50 KB = 51,200 bytes. If a portal counts 50,000 bytes, set the target to 48 KB.",
      "PNG and HEIC photos are converted to JPG automatically, which most forms prefer.",
    ],
    faqs: [
      {
        q: "How does it get the image under 50 KB?",
        a: "It re-encodes the JPEG at different quality levels to find the highest one that fits. If no quality level is small enough, it reduces the width and height by 20% and tries again, up to several times.",
      },
      {
        q: "Can I upload a PNG or iPhone HEIC and get a 50 KB JPG?",
        a: "Yes. PNG, WebP and HEIC / HEIF photos are decoded in your browser and saved as JPG. Transparent areas become white.",
      },
      {
        q: "Will it change my photo's dimensions?",
        a: "Max size is preset to 1280px, so bigger photos are first scaled to fit 1280px on their longest side. If the photo still won't fit under 50 KB, it's scaled down a little more. The aspect ratio is always kept. Choose “Original” to keep the full size, but large phone photos may then not reach 50 KB.",
      },
      {
        q: "Is it safe to compress ID photos and signatures here?",
        a: "Yes. Processing happens on your device, in your browser — the image is never uploaded to a server.",
      },
      {
        q: "How do I compress to 20 KB or 100 KB instead?",
        a: "Type 20 or 100 into the Target size box and click Compress. Very small targets like 10–20 KB work best on small photos or signatures.",
      },
    ],
  },
  {
    slug: "heic-to-jpg",
    updated: "2026-10-16",
    label: "HEIC to JPG converter",
    title: "HEIC to JPG Converter Online Free — No Upload | DWM Compressor",
    description:
      "Convert iPhone HEIC photos to JPG for free, in your browser. Batch convert and download as a ZIP — no upload, no sign-up, no photo limit.",
    h1: "Convert HEIC to JPG",
    answer:
      "Drop your iPhone .heic or .heif photos below and click Convert — they're decoded and saved as JPG right in your browser, so your photos are never uploaded. Convert as many as you like and download them all as a ZIP.",
    tab: "convert",
    preset: { convert: { source: "images", target: "image/jpeg", quality: 0.9 } },
    howToTitle: "How to convert HEIC to JPG",
    steps: [
      {
        name: "Add your HEIC photos",
        text: "Drop .heic or .heif files onto the box above or click to browse. AirDrop or copy them from your iPhone to your computer first, or pick them straight from Photos on the phone.",
      },
      {
        name: "Check the format and quality",
        text: "“Convert to” is already set to JPG at 90% quality, which looks the same as the original for almost every photo. Choose PNG or WebP instead if you need them.",
      },
      {
        name: "Convert and download",
        text: "Click Convert. Each photo is decoded in your browser, which can take a few seconds per photo. Download them one by one or all together as a ZIP.",
      },
    ],
    useCasesTitle: "Why convert HEIC to JPG",
    useCases: [
      "Opening iPhone photos on Windows PCs or older software that doesn't read HEIC.",
      "Uploading photos to websites and forms that only accept JPG or PNG.",
      "Sharing photos with people on devices that can't open HEIC.",
      "Combining iPhone photos into one PDF — choose PDF under “Convert to”.",
    ],
    tipsTitle: "Good to know",
    tips: [
      "A JPG is usually larger than the HEIC it came from — HEIC is a more efficient format. To keep files small, convert in the Images tab with a target size instead.",
      "Photo metadata such as the capture date and location is not copied to the JPG.",
      "For Live Photos, the still photo is converted; the motion clip is a separate file.",
      "To make your iPhone shoot JPG from now on: Settings → Camera → Formats → Most Compatible.",
    ],
    faqs: [
      {
        q: "Are my photos uploaded to a server?",
        a: "No. HEIC photos are decoded with heic2any (a browser build of the libheif decoder) inside your browser, then saved as JPG on your device. Nothing is sent anywhere.",
      },
      {
        q: "How many HEIC photos can I convert at once?",
        a: "There's no limit on the number of photos. Large batches simply take longer because each photo is decoded on your device; download them all as a ZIP when they're done.",
      },
      {
        q: "Does converting HEIC to JPG lose quality?",
        a: "Very little. At the default 90% quality the difference is hard to see. Raise the slider for maximum quality or lower it for smaller files.",
      },
      {
        q: "Why is the JPG bigger than my HEIC file?",
        a: "HEIC is a more efficient format — the same photo is often around half the size as HEIC — so it takes more space as a JPG. If size matters, use the Images tab and set a target size or lower quality.",
      },
      {
        q: "Can I convert HEIC to PNG or PDF?",
        a: "Yes. Under “Convert to”, choose PNG or WebP for images, or PDF to combine all your photos into a single PDF with one photo per page.",
      },
      {
        q: "Does it work on iPhone and Android?",
        a: "Yes, in modern mobile browsers. Pick photos straight from your library — the conversion happens on the phone itself.",
      },
    ],
  },
  {
    slug: "compress-video",
    updated: "2026-10-16",
    label: "Compress video online",
    title: "Compress Video Online Free — MP4, MOV, No Watermark | DWM Compressor",
    description:
      "Compress MP4, MOV, MKV and other videos online for free, in your browser with ffmpeg. No upload, no watermark, no sign-up. Save as MP4 or WebM.",
    h1: "Compress Video Online",
    answer:
      "Drop a video below and click Compress — it's re-encoded to a smaller MP4 (H.264) or WebM (VP9) with ffmpeg running inside your browser, so the video is never uploaded and gets no watermark.",
    tab: "video",
    preset: { video: { crf: 28, scale: 0, format: "mp4" } },
    howToTitle: "How to compress a video",
    steps: [
      {
        name: "Add your video",
        text: "Drop an MP4, MOV, MKV, AVI, WebM or other video onto the box above, or click to browse. The first time, the video engine (~31 MB) downloads once and is then reused.",
      },
      {
        name: "Choose strength and resolution",
        text: "Compression strength starts at CRF 28, a good balance for phone clips. Move it up for smaller files, and pick 720p or 480p to shrink 1080p and 4K videos much further.",
      },
      {
        name: "Compress and download",
        text: "Leave “Convert to” on MP4 so it plays everywhere, click Compress and keep the tab open while it works. Download the smaller video when it's done.",
      },
    ],
    useCasesTitle: "What people compress videos for",
    useCases: [
      "Sending a clip by email, WhatsApp or Discord when it's over the attachment limit.",
      "Uploading a recording to a form, LMS or support ticket with a size cap.",
      "Converting MOV videos from an iPhone to MP4 that plays on any device.",
      "Shrinking screen recordings and phone videos to save storage.",
    ],
    tipsTitle: "Good to know",
    tips: [
      "Resolution makes the biggest difference: a 4K or 1080p clip saved at 720p is far smaller, and still looks fine on a phone screen.",
      "There's no exact target-size option for video. For a hard limit such as 25 MB, try 720p with CRF 30–32 and check the result.",
      "Encoding runs on your device's processor in a single thread, so it's slower than desktop apps such as HandBrake — best for phone clips and short videos. Keep the tab open until it finishes.",
      "WebM (VP9) usually makes smaller files than MP4 but takes longer to encode, and some apps and iPhones don't play it.",
    ],
    faqs: [
      {
        q: "Is it really free with no watermark?",
        a: "Yes. There's no watermark, no account and no paid tier. The output is exactly what ffmpeg produces from your settings.",
      },
      {
        q: "Is my video uploaded?",
        a: "No. ffmpeg.wasm runs inside your browser and reads the file straight from your device. The only download is the video engine itself, the first time you use it.",
      },
      {
        q: "Which video formats can I compress?",
        a: "MP4, MOV, MKV, AVI, WebM, M4V, 3GP, FLV, WMV, MPEG / MPG, TS, M2TS, OGV and most other formats ffmpeg can read. The output is MP4 (H.264 + AAC audio) or WebM (VP9 + Opus audio).",
      },
      {
        q: "What does CRF mean?",
        a: "CRF (Constant Rate Factor) sets how hard the video is compressed. Higher numbers give smaller files with lower quality; lower numbers keep more detail. 23–28 looks good for most clips.",
      },
      {
        q: "Is there a file-size limit?",
        a: "The tool sets no limit, but the whole video has to fit in your browser's memory. Clips of a few hundred MB are usually fine on a computer; multi-gigabyte files may fail, especially on phones.",
      },
      {
        q: "Why is it slow on my phone?",
        a: "All the encoding happens on your device instead of a server. Phones have less processing power, so long videos take a while. A computer is faster, and choosing 720p or 480p speeds things up too.",
      },
    ],
  },
];

export function getLandingPage(slug) {
  return LANDING_PAGES.find((p) => p.slug === slug);
}
