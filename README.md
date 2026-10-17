# Shashank Profile

Production-ready profile webapp built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Add a new project

1. Create a new markdown file in `content/projects/`.
2. Include frontmatter fields:
   - `title`, `slug`, `type`, `tags`, `timeline`, `stack`, `featured`, `summary`, `links` (optional)
3. Write the project body with the sections you want shown on the detail page.

Example frontmatter:

```yaml
---
title: "My Project"
slug: "my-project"
type: "Independent"
tags:
  - "AI"
  - "Workflow"
timeline: "2025"
stack:
  - "FastAPI"
  - "Next.js"
featured: false
summary: "Short project summary."
links:
  - label: "GitHub"
    url: "https://github.com/example"
---
```

## Deploy on Vercel

1. Push the repository to GitHub.
2. Import the repo into Vercel.
3. Set the build command to `npm run build` and output to `.next`.
4. Deploy.

## Notes

- Update profile metadata and links in `content/site.json`.
- Replace `public/resume-shashank-shekhar.pdf` with the latest resume.

## Ask Alpha chat widget

A floating "Ask Alpha" button (`components/AskAlpha.tsx`, mounted in `app/layout.tsx`) opens a panel that embeds
`https://homelab.buildwithshashank.com/alpha/talk?embed=1&from=portfolio`. The iframe is mounted on first open.

- `NEXT_PUBLIC_ASK_ALPHA=false` (build time) removes the widget. Default is on.
- `NEXT_PUBLIC_ASK_ALPHA_URL` overrides the iframe URL (testing only).
- The homelab site must allow this origin in `frame-ancestors` (it does for buildwithshashank.com and www).
