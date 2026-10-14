# ahmedmobasher.online — "The Cut"

Ahmed Mobasher's portfolio, built as an editing suite: a master timeline at the bottom
(a rail on the right on phones) is the main navigation, and each section enters with a
real edit (hard cut, J-cut, match cut, whip pan, cross dissolve, smash cut).

Next.js (App Router) · TypeScript · Tailwind CSS v4. No animation library; transitions
are CSS driven by a small scroll store (`src/lib/playhead.ts`).

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
| `story.ts` | The six Story scenes |
| `craft.ts` | The four effects (tools and parameters); parameter lists can grow |
| `projects.ts` | The media bin. **Add a project by appending to the array.** Optional `video`, `images`, `client`, `result`, `quoteId` |
| `reviews.ts` | Client notes |
| `certificates.ts` | End credits |
| `years.ts` | The only place career years live (timecode readout and ruler) |
| `sections.ts` | Section order, timeline tracks and transition names |

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
- `npm run subset-hero-font` — regenerate the hero headline's font subset if the name changes
- `node scripts/shoot.mjs <url> <out.png> <w> <h> <dpr> [--mobile] [--reduced-motion] [--no-js] [--to=id] [--click=id]` — review screenshots via headless Chrome
