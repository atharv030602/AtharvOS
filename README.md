# Atharv Mitkari — Portfolio

Personal portfolio: projects, skills, experience and contact.
Static site built with **React + Vite + TypeScript** (no server).

## Edit content

Everything on the page comes from **`src/data.ts`** — projects, skills,
experience, education and certifications. Change that file, push, and the
site redeploys. Files served as-is live in `public/` (resume, portrait,
certificate PDFs).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Deploy (Render, free static site)

New → Static Site → this repo. Settings come from `render.yaml`:

- Build command: `npm ci && npm run build`
- Publish directory: `dist`

Static sites on Render are served from a CDN and do not sleep.
