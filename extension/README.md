# DWM Compressor — Chrome extension

A lightweight extension that opens the DWM Compressor app (toolbar button + right-click menu).

## Load it (developer mode)

1. Open `chrome://extensions` in Chrome/Edge/Brave.
2. Turn on **Developer mode** (top-right).
3. Click **Load unpacked** and select this `extension/` folder.
4. Pin the toolbar icon → click it → **Open DWM Compressor**.

## Before publishing

- Change `APP_URL` in **both** `background.js` and `popup.js` to your deployed URL
  (e.g. `https://your-domain.com`) once you have a domain.

## Next step (bigger project)

Right now the extension *opens* the web app. To make it compress files fully offline
*inside* the extension, the Next app would be exported as static files and bundled here,
with the manifest CSP set to allow WebAssembly (`wasm-unsafe-eval`). That's a follow-up.
