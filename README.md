# Al-Safaa Travels & Tours: website

The website for [Al-Safaa Travels & Tours](https://flyalsafaa.com), Hajj and Umrah specialists in Colombo since 1997. It's an informational site whose job is to generate enquiries. Its content mirrors the previous WordPress site: nothing is added that the old site didn't say. There is no booking engine, database, CMS, login or payment. Visitors enquire by WhatsApp, phone or email.

**Stack:** Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · GSAP · Lucide · Vitest. Built for Vercel.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # date / package logic tests
npm run typecheck
npm run lint
npm run build && npm start
```

Node 24 or later.

## Where things live

| What | File |
|---|---|
| Phone numbers, WhatsApp, address, email, social links, Aviasales partner IDs | `src/config/site.ts` |
| **Every Hajj and Umrah package** (dates, prices, hotels, itinerary, inclusions) | `src/data/packages.ts` |
| Saudi destinations (home page) | `src/data/destinations.ts` |
| Flights partner line + Visit Sri Lanka copy | `src/data/services.ts` |
| Testimonials (genuine reviews only; section hidden while empty) | `src/data/testimonials.ts` |
| Photo credits | `src/data/credits.ts` |
| Date rules for "upcoming departures" | `src/lib/packages.ts` (tested in `packages.test.ts`) |

To update the site, edit the data file, commit and push. Vercel redeploys automatically. See [docs/02-maintaining-content.md](docs/02-maintaining-content.md) for worked examples.

## How "Upcoming departures" stays current

- Dates are stored as Sri Lanka calendar dates (`"2026-10-22"`). "Today" is worked out in the `Asia/Colombo` time zone.
- A departure is listed while its departure date is still in the future. From the departure day it's no longer advertised. Its page shows "group travelling" and then "completed".
- Draft and cancelled packages never appear. Packages without confirmed dates are listed as "Dates to be confirmed" but don't appear in the upcoming list.
- `getTodayInColombo()` (`src/lib/today.ts`) is cached with `cacheLife("hours")`. Every page that shows departures is regenerated in the background at least hourly, so an old departure drops off within an hour of midnight without a redeploy.
- To preview how the site will look on another date: `PREVIEW_TODAY=2027-05-03 npm run build && npm start`. Production ignores this setting.

## Environment variables

See `.env.example`. None are required for the site to work.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical domain. Defaults to `https://flyalsafaa.com`. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Set to `true` **only on the production launch**. Otherwise every page is `noindex` and `robots.txt` disallows crawling, so staging can't compete with the live site. |
| `GOOGLE_PLACES_API_KEY` | Optional. Shows live Google reviews (Places API, New). |
| `PREVIEW_TODAY` | Optional, non-production only. Previews the site as of a given date. |

## Docs

- [docs/01-audit-and-plan.md](docs/01-audit-and-plan.md): audit of the old site, items needing the client's confirmation, design direction and architecture
- [docs/02-maintaining-content.md](docs/02-maintaining-content.md): adding packages, reviews, photos and services
- [docs/03-launch-checklist.md](docs/03-launch-checklist.md): staging, domain switch, SEO migration, redirects and rollback
