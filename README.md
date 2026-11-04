# DWM Compressor

**Live:** https://compressor.dealwithmuhammad.com

Compress PDFs (by quality or to a target size), compress and convert images
(including iPhone HEIC) and compress video **entirely in your browser** —
nothing is uploaded anywhere. No file-size limit, no sign-up.

Built with **Next.js** + **HeroUI** by [Muhammad Ahmad](https://www.dealwithmuhammad.com). [Read the case study](https://www.dealwithmuhammad.com/work/dwm-compressor).

<a href="https://compressor.dealwithmuhammad.com"><img src="https://www.dealwithmuhammad.com/work/covers/dwm-compressor.jpg" alt="DWM Compressor in a browser and on a phone"></a>

## What it can do

| Tab | What you get |
| --- | --- |
| PDF | Compress by quality or to a target size in KB or MB |
| Images | Compress JPG, PNG, WebP and HEIC, with a max size and JPG or WebP output |
| Video | Compress with ffmpeg.wasm, choose the strength and resolution, and save as MP4 or WebM |
| Convert | Images to PDF, JPG, PNG or WebP, and PDF pages to JPG images in a ZIP |
| PDF Tools | Select pages, protect with a password, or unlock |

It also takes several files at once, lets you paste from the clipboard, downloads everything as a ZIP, and installs as a PWA.

There are preset pages too: `/compress-pdf-to-100kb`, `/compress-image`, `/compress-jpeg-to-50kb`, `/heic-to-jpg` and `/compress-video`.

## How PDF compression works

Each page is re-rendered with pdf.js and re-encoded as a JPEG at your chosen
quality, then reassembled into a new PDF with `pdf-lib`. This gives big savings on
image-heavy / scanned PDFs. Because it converts pages to images, selectable text is
flattened into the page image.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000

### Build for production

```bash
npm run build
npm run start
```

`npm install` also copies the pdf.js worker and the ffmpeg core into `public/`.

## Chrome extension

`extension/` is a small Manifest V3 launcher that just opens the app. Its `APP_URL` in `background.js` and `popup.js` still points at `http://localhost:3000`, so change that to the live URL before publishing it.

## Notes on huge files

Everything runs locally in the browser, so there is no upload wait and no server —
but the whole file must fit in your device's memory. Multi-GB files can hit the
browser's per-tab memory limits. For true server-side multi-GB compression
(streaming upload + Ghostscript), that would be a separate backend.

## Analytics

- `app/layout.jsx` loads the shared tracker `https://www.dealwithmuhammad.com/dwm.js`
  (`data-site="compressor"`). It records pageviews and external-link clicks, and
  only tracks on `*.dealwithmuhammad.com`, so local dev is ignored.
- Custom events go through `trackEvent()` in `lib/analytics.js` (a guarded
  `window.dwm?.(name)`), fired once per successful run — never on failure, and
  never with file names or contents: `compress-pdf`, `compress-image`,
  `compress-video`, `convert-image`, `convert-pdf`, `protect-pdf`, `unlock-pdf`,
  `extract-pdf-pages`.
- `components/VisitCounter.jsx` (in the footer) shows the public visitor count from
  `https://www.dealwithmuhammad.com/api/views?site=compressor` and links to the live
  stats page. It renders nothing until the API reports `ready: true`.
- The optional GA4 / Plausible hooks in `components/Analytics.jsx` still work via env vars.

## SEO

- Copy lives in `lib/seo.js` (title, description, how-to steps, features, FAQ,
  JSON-LD). The visible guide (`components/AboutContent.jsx`) and the JSON-LD
  (`WebApplication`, `WebSite`, `Person`, `HowTo`, `FAQPage`) both read from it, so
  they stay in sync — keep the answers accurate to `lib/engines.js`.
- `app/opengraph-image.jsx` renders the 1200×630 share card at build time.
- `app/robots.js` (allows all crawlers, including AI search bots), `app/sitemap.js`,
  `public/manifest.webmanifest` and `public/llms.txt` (summary for AI assistants).
