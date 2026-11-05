// The words of the /privacy and /terms pages. Keep them true to what this site's code does.
// Each section body is a list of paragraphs (strings) and bullet lists (arrays).

export const LEGAL_UPDATED = "5 November 2026";

export const PRIVACY = {
  "path": "/privacy",
  "title": "Privacy Policy",
  "intro": "DWM Compressor works on your files inside your browser. They aren't uploaded. This page sets out exactly what stays on your device and the small amount that doesn't.",
  "description": "Exactly what stays on your device with DWM Compressor, what the site stores in your browser, and what the visit counter records.",
  "sections": [
    {
      "heading": "Who runs this site",
      "body": [
        "DWM Compressor (compressor.dealwithmuhammad.com) is run by me, Muhammad Ahmad, an individual based in Kuala Lumpur, Malaysia. It's a personal project, not a company, and there's no registered business behind it.",
        "You can reach me at me@dealwithmuhammad.com or on WhatsApp at +60 11-3986 5270."
      ]
    },
    {
      "heading": "What stays on your device",
      "body": [
        "All of your files and everything in them. The code has no upload step, and no file data is sent to my server or anyone else.",
        [
          "PDFs, images and videos you add, along with their file names and contents, are read and processed in your browser with pdf.js, pdf-lib and ffmpeg.wasm. Those tools load from this same site, not an outside service.",
          "That includes compressing, converting, protecting and unlocking PDFs, and extracting pages. A password you type to protect or unlock a PDF stays in your browser too.",
          "Finished files are created locally and held in the tab's memory until you save them or close the tab."
        ]
      ]
    },
    {
      "heading": "What's collected and why",
      "body": [
        "The only thing the site records is the visit counter:",
        [
          "Visit counts :: every page loads dwm.js, a small counter script from my portfolio site, www.dealwithmuhammad.com. It reports the page path (without the query string), where you came from (saved only as a source name, such as Google), any utm_source or ref tag in the link, the host and path of external links you click, and the name of certain actions: compressing, converting, protecting or unlocking a file, or extracting pages. Never file names, sizes or contents. That request also carries your IP address and browser details. My server uses them to make a one-way daily code, so you count once a day per site, and adds your browser, operating system, device type and country (from Vercel) to running totals. The IP address and browser string aren't saved with the totals."
        ],
        "The code has optional switches for Google Analytics and Plausible. They're turned off, and neither loads on the live site. If that changes, I'll update this page first.",
        "The optional Chrome extension only opens this website. It doesn't read your files or your browsing."
      ]
    },
    {
      "heading": "Who it's shared with",
      "body": [
        [
          "Vercel :: hosts the site. Like any web host it receives your IP address, browser details and the addresses you request, and it may keep request logs under its own policy. I can't turn that off, and I don't control how long Vercel keeps them.",
          "Upstash :: runs the Redis database that holds the visit counter's daily codes and totals. The database is in the United States."
        ],
        "I don't sell your data, and there are no ads or ad trackers on this site. Some of these providers are outside Malaysia, so your data may be handled in other countries, including the United States."
      ]
    },
    {
      "heading": "Cookies and browser storage",
      "body": [
        "My code sets no cookies. It keeps these in your browser:",
        [
          "dwm_total_saved_bytes :: the running total of space you've saved. It stays on your device.",
          "dwm_accent and theme :: your colour and light or dark mode.",
          "dwm:ignore :: only if you add ?dwm-ignore=1 to a link, which stops the visit counter in that browser (?dwm-ignore=0 turns it back on).",
          "A service worker and its cache (dwm-compressor-v1) :: stores the pages and scripts the site loads, so it can open offline. Your files aren't put in it."
        ],
        "You can clear all of this in your browser's site settings."
      ]
    },
    {
      "heading": "How long it's kept",
      "body": [
        [
          "Your files :: I never receive them.",
          "Browser storage :: stays until you clear it.",
          "Daily visitor codes :: expire after 2 days.",
          "Visit totals :: have no expiry date, and I keep them while the site runs. They're counts rather than records about a person, and they're public at https://www.dealwithmuhammad.com/stats/compressor.",
          "The counter's abuse limit :: uses your IP address in server memory for a one-minute window. It isn't written to a database, and it's gone when that server instance shuts down."
        ]
      ]
    },
    {
      "heading": "Security",
      "body": [
        "The site is served over HTTPS. Because your files never leave your device, how safe they are depends on your own device and browser. I hold no security certifications. No system is perfectly secure."
      ]
    },
    {
      "heading": "Your rights",
      "body": [
        "You can ask me for access to, correction of, or deletion of personal data I hold about you. Email me@dealwithmuhammad.com and I'll reply as soon as I can. I hold no files and no accounts, so the only data I could look at is the visit totals, which can't be tied to you.",
        "Malaysia's Personal Data Protection Act 2010 is the local law on personal data. If you're in the EU or UK, you also have rights under the GDPR, including the right to object to or restrict how your data is used, to ask for a copy in a portable format, and to complain to your data protection authority."
      ]
    },
    {
      "heading": "Children",
      "body": [
        "DWM Compressor isn't for children under 13, and I don't knowingly collect their data."
      ]
    },
    {
      "heading": "Changes to this policy",
      "body": [
        "If what the site does with data changes, I'll update this page and the date at the top."
      ]
    }
  ]
};

export const TERMS = {
  "path": "/terms",
  "title": "Terms of Use",
  "intro": "By using DWM Compressor you agree to these terms. They're short, and they're written by me, Muhammad Ahmad, an individual, not a company.",
  "description": "The rules for using DWM Compressor, a free in-browser PDF, image and video tool from Muhammad Ahmad.",
  "sections": [
    {
      "heading": "What this is",
      "body": [
        "DWM Compressor compresses PDFs, images and videos, converts images, and can protect, unlock and extract pages from PDFs, all in your browser."
      ]
    },
    {
      "heading": "Free, and provided as-is",
      "body": [
        "It's free, with no account and no ads. What it can handle depends on your device's memory. I run it on my own time, and I can change it, limit it or shut it down at any time."
      ]
    },
    {
      "heading": "Acceptable use",
      "body": [
        "Please use DWM Compressor lawfully. In particular, don't:",
        [
          "process files you don't have the right to use",
          "unlock a PDF unless it's yours or you have permission. The tool isn't for getting around someone else's protection",
          "use it for anything illegal, or to make material that harasses or harms anyone",
          "abuse the site, including scraping it or interfering with how it works"
        ],
        "You keep whatever rights you have in your files. I don't get any rights in them, because I never receive them."
      ]
    },
    {
      "heading": "Blocking abuse",
      "body": [
        "I can't see your files, but I can block access to the site for anyone abusing it, with or without notice."
      ]
    },
    {
      "heading": "No warranties, and limited liability",
      "body": [
        "Always keep your originals and check the result. PDF compression turns pages into images, so selectable text is flattened, and quality can drop. If you protect a PDF and forget the password, I can't recover it.",
        "I make no promises that the site will be accurate, available, secure or fit for any particular purpose. As far as the law allows, I'm not liable for any loss or damage that comes from using it or from being unable to use it. Nothing here limits liability that the law doesn't allow me to limit."
      ]
    },
    {
      "heading": "Governing law",
      "body": [
        "Malaysian law governs these terms. If the law where you live gives you rights that can't be taken away, you keep those rights."
      ]
    },
    {
      "heading": "Contact",
      "body": [
        "Questions about these terms: me@dealwithmuhammad.com or WhatsApp +60 11-3986 5270. I'm an individual in Kuala Lumpur, Malaysia, not a company."
      ]
    }
  ]
};
