# 10 Downing Street — Franchise Landing Page

A high-fidelity franchise opportunity landing page for **10 Downing Street**, India's most enduring British pub brand since 1992.

## Overview

Built as a static site using HTML, CSS, and vanilla JavaScript, bundled with Parcel. Features include:

- Full-page hero with brand identity and franchise headline
- Franchise facts, network, and success stories sections
- Enquiry form with client-side validation wired to Google Forms
- Responsive layout across desktop and mobile

## Project Structure

```
10D-street/
├── public/           # Static assets (images, fonts)
├── src/
│   ├── index.html    # Main markup
│   ├── css/
│   │   ├── global.css
│   │   └── index.css
│   └── js/
│       └── main.js   # Form validation & submission logic
├── dist/             # Build output (gitignored)
├── vercel.json       # Vercel deployment config
└── package.json
```

## Getting Started

```bash
npm install
npm start       # Dev server at localhost:1234
npm run build   # Production build → dist/
```

## Deployment

Deployed on **Vercel** — any push to `main` triggers an automatic production deploy.

Live URL: https://10d-street.vercel.app

## Author

**Parth R**
Organisation: **Aarkay Mediaworks**
