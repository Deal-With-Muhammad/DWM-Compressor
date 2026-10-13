# DWM PDF Compressor

A very simple, single-page app that compresses a PDF **entirely in your browser** —
nothing is uploaded anywhere.

Built with **Next.js** + **HeroUI**.

## How it works

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

## Notes on huge files

Everything runs locally in the browser, so there is no upload wait and no server —
but the whole file must fit in your device's memory. Multi-GB files can hit the
browser's per-tab memory limits. For true server-side multi-GB compression
(streaming upload + Ghostscript), that would be a separate backend.
# DWM-Compressor
