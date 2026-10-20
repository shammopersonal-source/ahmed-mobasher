# ahmedmobasher.online

Ahmed Mobasher's portfolio. Next.js (App Router) · TypeScript · Tailwind CSS v4.
Type: Cabinet Grotesk (Indian Type Foundry, via Fontshare) and JetBrains Mono for small
labels, both self-hosted (`src/fonts/`).

Sections: hero, About, Skills, Services, Reviews, Agency, Certificates (auto-scrolling
strip), Contact. A Work section was removed on 2026-10-20 (no recent projects to show). The hero portrait rotates through three photos and
tilts toward the cursor on desktop (flat on touch and with reduced motion).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Editing content

All copy lives in `src/content/` — components only lay it out.

| File | What it holds |
|---|---|
| `site.ts` | Name, contact details, links, agency, contact form options |
| `about.ts` | About text and quick facts |
| `skills.ts` | The four skill areas (tools and what he does); lists can grow |
| `services.ts` | The three services |
| `reviews.ts` | Client testimonials |
| `certificates.ts` | Certificates (image, story, details) |
| `nav.ts` | Navigation links |

Images: put the original in `legacy/` or embed it, run `npm run extract-assets` to write
AVIF + WebP to `public/img` and regenerate `src/content/assets.generated.ts`, then
reference it by name (e.g. in a project's `images`).

## Contact form

`POST /api/contact` sends through [Resend](https://resend.com). Set these in Vercel
(Project → Settings → Environment Variables), see `.env.example`:

- `RESEND_API_KEY` — required; without it the form answers "not configured yet" and
  offers the email address instead
- `CONTACT_TO` — where enquiries go (defaults to the address in `site.ts`)
- `CONTACT_FROM` — sender on a domain verified in Resend

The route validates input, has a honeypot and a minimum fill time, and rate-limits each
IP to 5 messages per 10 minutes (per server instance). It also accepts plain form posts,
so the form works with JavaScript off.

## Scripts

- `npm run extract-assets` — images from `legacy/` → `public/img`
- `node scripts/shoot.mjs <url> <out.png> <w> <h> <dpr> [--mobile] [--reduced-motion] [--no-js] [--to=id] [--click=id|css:sel] [--full]` — review screenshots via headless Chrome
