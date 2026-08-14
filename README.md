# <img src="https://tl-dr.store/icon.svg" height="40" style="vertical-align: middle; pointer-events: none;">tl;dr

*AI-Powered Text Summarizer*

[Homepage](https://tl-dr.store/) · [Chrome](https://tl-dr.store/chrome) · [Firefox](https://tl-dr.store/firefox)

---

## What is tl;dr?

tl;dr (too long; didn't read) is a browser extension that puts AI-powered summarization at your fingertips. Whether you're reading a lengthy article, a packed inbox, or just need the gist of a document, tl;dr delivers concise, readable summaries instantly without leaving the page.

---

## Features

### Core Experience
- One-Click Summaries — Click the toolbar icon, get a summary instantly
- Right-Click Any Text — Select text, right-click, and choose "tl;dr this"
- Full-Page or Selection — Summarize entire pages or just what you highlight
- Stays in Your Browser — No copy-pasting, no tab switching

### AI & Intelligence
- Multiple AI Models — Uses Groq (llama-3.1-8b-instant), OpenAI (gpt-oss-20b), and Google Gemini via GCP
- 6 Summary Styles — Skimmer, Researcher, Analyst, Teenager, Critique, Executive
- 11 Languages — English, Arabic, Spanish, Italian, French, Dutch, German, Russian, Greek, Japanese, Chinese
- RTL Support — Arabic and Hebrew auto-detect right-to-left text

### Customization
- Font Size Control — 8-24px, adjustable anytime
- Dark Mode — Automatically adapts to your system theme
- Persistent Preferences — Your settings stay synced

### Productivity
- Copy to Clipboard — One-click copy of any summary
- Email Task Extraction — Scans emails and extracts actionable tasks
- Works on Any Page — News, blogs, docs, emails, PDFs

---

## Installation

### Chrome / Chromium
[Add to Chrome](https://tl-dr.store/chrome)

Works with Edge, Brave, Opera, Vivaldi, and all Chromium-based browsers

### Firefox
[Add to Firefox](https://tl-dr.store/firefox)

---

## How to Use

1. Install from your browser's store
2. Click the tl;dr icon in your toolbar
3. Read your summary instantly
4. Right-click any text for on-demand summaries
5. Customize your tone and language in settings

---

## How It Works

1. Extract — The extension reads the page content or your selection
2. Send — Text is sent to the backend API
3. Process — Google Apps Script routes the request to the appropriate AI model
4. Summarize — AI generates the summary (Groq, OpenAI, or Gemini)
5. Display — The summary appears in your sidebar in milliseconds

All processing happens in real-time. No data is stored or logged.

---

## Technology Stack

### Extension
- Manifest V3 — Modern browser extension standard
- Chrome Extension APIs — Side panel, context menus, storage
- Firefox Add-on APIs — Sidebar action, content scripts

### Backend
- Google Apps Script — Serverless API gateway and routing
- Groq — Ultra-fast inference with llama-3.1-8b-instant
- OpenAI — gpt-oss-20b model
- Google Gemini — Via Google Cloud Platform

### Frontend
- HTML5 + CSS3 — Clean, responsive UI
- Vanilla JavaScript — No frameworks, lightweight
- Material Symbols — Icons

---

## Project Structure

```
/
├── index.html              # Landing page
├── main.css                # Website styles
├── print.css               # Print styles
├── icon.svg                # Extension icon
├── manifest.webmanifest    # PWA manifest
│
├── extension/              # Browser extension
│   ├── manifest.json       # Extension manifest
│   ├── tldr-bg.js          # Background service worker
│   ├── tldr-content.js     # Page text extraction
│   ├── tldr-panel.html     # Sidebar UI
│   ├── tldr-panel.js       # Sidebar logic
│   ├── tldr-panel.css      # Sidebar styles
│   ├── tldr-options.html   # Settings page
│   ├── tldr-options.js     # Settings logic
│   ├── tldr-options.css    # Settings styles
│   ├── tldr-translations.js # 11 languages
│   └── icons/              # 32/38/48/128px icons
│
├── docs/                   # Legal pages
│   ├── privacy.html
│   └── terms.html
│
└── README.md               # This file
```

---

## Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 109+ | Full |
| Firefox | 109+ | Full |
| Edge | 109+ | Full |
| Brave | 109+ | Full |
| Opera | 109+ | Full |
| Vivaldi | 109+ | Full |

---

## Privacy

- No data stored — All processing is real-time
- No analytics — No tracking, no cookies
- No logging — Your text isn't saved anywhere
- See our privacy policy — https://tl-dr.store/privacy.html

---

## Support & Feedback

- Website: https://tl-dr.store/
- Email: info@tl-dr.store
- Buy me a coffee: https://paypal.me/skabajah

---

## License

Copyright (c) 2026 Shadi Kabajah. All rights reserved.

This is proprietary software. You may not copy, modify, distribute, or reverse-engineer this software without explicit permission.

---

## Author

**Shadi Kabajah**
- Website: https://skabajah.github.io/
- LinkedIn: https://linkedin.com/in/skabajah

---

## Version

**5.3** — Released 2026-06-19

---

*Made for people who don't have time to read everything.*