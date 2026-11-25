# Campra POS — Landing website (Next.js)

Next.js 16 (App Router, TypeScript). Static export, so it runs on any host (Netlify, Vercel, Cloudflare).

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
```

## Build for hosting
```bash
npm run build      # creates the `out/` folder
```
- **Netlify drag & drop:** drop the `out/` folder on Netlify ("Drop new files").
- **Netlify + GitHub (auto deploy):** push this folder to a GitHub repo and connect it in Netlify.
  `netlify.toml` already sets build command `npm run build` and publish folder `out`.

## Where to edit
| What | File |
|---|---|
| Brand name, WhatsApp, email, Play Store link, live demo link, stats, price per counter | `lib/config.ts` |
| All page copy: tabs, steps, features, portals, FAQ, testimonials | `lib/content.ts` |
| App screenshots (from the Figma Make POS) | `public/screens/*.webp` |
| Styles (design tokens at the top) | `app/globals.css` |

Stats and testimonials are placeholders — replace them before going public.

## Pages
`/` · `/about` · `/portals/[owner|cashier|auditor]` · `/features/[slug]` (14 modules) · `/faq` · `/privacy` · `/terms` 
