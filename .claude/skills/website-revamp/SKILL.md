---
name: website-revamp
description: Rebuild or redesign an existing live website (WordPress, Elementor, Wix and similar) as a fast, modern Next.js site without losing its content, URLs or search ranking. Covers auditing the old site, content-parity rules, redirects and SEO migration, a distinctive design pass, date-driven "upcoming" content, WhatsApp/phone lead generation, and a full QA suite (links, overflow, accessibility, typography consistency, Lighthouse). Use this whenever the user wants to revamp, redesign, migrate, modernise or "rebuild" a business website, mentions an existing site URL to improve, wants it to look premium or less generic, or asks to check a site for inconsistencies, before launch, or on mobile. Also use for any Next.js marketing or brochure site where the client insists nothing be invented, even if they never say "revamp".
---

# Website revamp

A workflow for turning an existing business website into a better one without breaking what already works. It was distilled from a real Hajj/Umrah travel agency rebuild (WordPress to Next.js 16, 10 pages, lead-generation only) where the client corrected the work several times. Those corrections are the heart of this skill: they are the mistakes a capable but over-eager builder makes by default.

The tension to manage throughout: a revamp invites you to add (new sections, marketing copy, bonus pages, stock photos). The client usually wants the opposite: the same business, presented better. Default to **fidelity first, polish second.**

## Operating principles (and why)

1. **Content parity is the contract.** Unless told otherwise, the new site carries what the old site said, in the old site's words. New marketing lines, "why choose us" sections, extra pages and invented stats are the most common thing a client later asks you to remove. If a section has no source on the old site, either cut it or ask first. When you must change wording (spelling normalisation, a wrong label), record it so the client can review it. `scripts/content-trace.py` finds every line you wrote that the old site did not say.
2. **Never invent business facts.** Prices, dates, hotels, reviews, ratings, founders, certifications, opening hours, services. If it is missing, flag it. If the client's own material conflicts (two addresses, two phone numbers), list the conflict, pick the best-supported value as a placeholder, and ask. A wrong guess here is worse than a gap.
3. **Scope is a promise.** If the brief says "no booking engine / checkout / accounts / database", that includes things that merely look like booking: embedded flight-search forms, "Reserve your place" buttons, "Bookings open" banners. Enquiries go through WhatsApp, phone and email. Outbound partner links are fine; embedded transaction widgets are not.
4. **Look at the reference, then follow it.** If the client gives a design reference (Dribbble, Behance, a competitor), open the actual images and take its typography, density and tone from it. A designer's reference is the answer to "what font and feel"; ignoring it and picking your own taste produced the client's loudest complaint.
5. **Avoid the generic-AI look on purpose.** Clients can spot it instantly. Avoid the most common fonts (Inter, Instrument Serif, Playfair, Space Grotesk, Geist as a default), purple gradients, identical three-column icon cards, emoji as icons, glassmorphism everywhere, and decorative patterns used as wallpaper. Prefer one confident type family, real photography, and layouts with a point of view. When unsure, render 6 to 8 candidate fonts in the real headline and colours and look before choosing.
6. **Typography punctuation is part of copy.** Some clients ban em dashes outright. Ask early; then run `scripts/find-chars.py src docs` (grep cannot do this portably on macOS) and fix every hit, because dashes creep back in through code comments and date ranges. Rewrite the sentence (colon, comma, "to") instead of swapping in a hyphen.
7. **Verify, do not assume.** Every claim in your report should come from something you ran. Say plainly what you could not test (real phones, screen readers, Safari/Firefox).

## Workflow

Work in these phases; each ends with something concrete. Keep a short list of open questions as you go and show it to the user at the end of each phase, because a client's answers change later phases.

### 1. Ask the few questions that change everything
Read `references/client-questions.md` and ask the ones that are not already answered. At minimum: content parity or free rewrite? any banned punctuation or words? the design reference? what must never appear (booking, prices, etc.)? who owns the photos? is there a Google Business Profile / review source? which domain and host?

### 2. Audit the old site (read-only; never touch the live site)
Run `scripts/old-site-extract.py <url> <dir>`. It saves raw HTML + text for every sitemap URL, the URL inventory with dates, and the WordPress media library.
- Read the **raw HTML**, not just the text. Builders such as Elementor often inject prices, itineraries and tabs from inline JavaScript. grep the `.html` for `var `, `const ` and long arrays. On the Hajj build, the whole itinerary lived in a script block.
- Read all sitemaps, including users/authors (`/author/...` pages leak usernames and need a redirect).
- The media library often holds good images the live pages never show. Check dimensions.
- Note every conflict and every thing you cannot verify. Do not resolve silently.
- Write `docs/01-audit-and-plan.md`: sitemap, verified facts with sources, conflicts, what to keep / redesign / remove, what needs the client.

### 3. Plan the architecture and the URL map
- Next.js App Router, TypeScript, Tailwind, `trailingSlash: true` when the old URLs had slashes (WordPress does), so every indexed URL stays identical.
- Keep every valuable old URL, redirect (301) the rest, return real 404s for unknown slugs. Plan this before building; it is the SEO.
- One central config (phones, address, social, partner IDs) and one data file per content type. Pages read data; they never hard-code it. See `references/lessons.md` for the data patterns that worked.
- Read the framework's bundled docs first when the version is newer than you know (Next 16 shipped with `node_modules/next/dist/docs/`; its AGENTS.md says to read them). Cache Components, `proxy.ts`, generated `PageProps` types and stricter image defaults all differ from older versions.

### 4. Gather assets honestly
- Logo: use the official file; never redraw. Make a reversed version for dark backgrounds only if the brand already does so.
- Images: prefer the client's own. For stock, use licences you can verify (Unsplash) and keep a credits file. Never use a photo of a place you cannot confirm is that place; a plain typographic tile beats a misleading image. If the client later supplies one, add it and add its source to the launch checklist.
- Fonts: check the licence. Some free fonts (Fontshare/ITF) forbid redistributing files in a public repo; load them from the foundry's CDN instead and add a metric-matched fallback font to avoid layout shift. Mention the CDN in the privacy policy.
- Reviews: never write, paraphrase or "tidy" them. Ask the client to paste or screenshot genuine reviews, then type them verbatim (spelling included), with no invented dates. Google blocks scrapers; do not try to defeat that.

### 5. Build, in this order
Config and data, then the date/price logic with unit tests, then layout primitives (header, footer, buttons, section heading), then pages from most to least important. Commit and push after each meaningful step; the client may be watching the repo.
- Make the small-text scale explicit from the start (see `references/lessons.md`). Ad-hoc `text-[0.72rem]` values multiplying across components is how a site ends up with a dozen near-identical label styles.
- Motion: GSAP only where it earns its place; always respect `prefers-reduced-motion`; content must be visible with JS off. Animate `opacity`/`transform`, never `visibility`, on below-the-fold content (it removes it from the accessibility tree).
- Anything that "moves" (a marquee) needs a way to stop it that does not rely on hover: pause while any item is expanded or focused.
- If something is date-driven, read `references/date-logic.md`.

### 6. QA properly (this is where trust is won)
Do not report QA you did not run. Run the toolkit below on a **production build** (`next build && next start`), not the dev server, and look at the screenshots yourself at phone width. Numbers catch what eyes miss; eyes catch what numbers miss.

| What | How |
|---|---|
| Types, lint, unit tests, build | `tsc --noEmit`, `eslint`, `vitest run`, `next build` |
| Every page loads; broken anchors; external links | `scripts/qa-crawl.mjs [--check-external]` |
| Sideways scrolling and console errors at 320/390/768/1024/1440 | `scripts/qa-overflow.mjs` |
| SEO basics, WhatsApp/tel format, JSON-LD, axe accessibility, reduced-motion and no-JS visibility | `scripts/qa-a11y-seo.mjs` |
| Typography consistency (sizes, tracking, text under 12px) | `scripts/qa-typeaudit.mjs --width=390` |
| Text readable over photos (axe cannot test this) | `scripts/qa-photo-contrast.mjs` |
| Nothing added beyond the old site | `qa-pagetext.mjs` then `scripts/content-trace.py` |
| Spelling/naming consistency across pages | sweep the rendered text for variants (Madinah/Medina, UK/US spelling, `150m`/`150M`, Title vs sentence case) |
| Date logic | build with `PREVIEW_TODAY` set to the day a tour leaves, and to a date after all of them |
| Performance | Lighthouse (mobile) on 2 or 3 pages; run it 3 times before believing a drop |
| Interactions | scripted: menu open/close/Esc/focus trap, accordions, floating buttons, expanded/collapsed text |

Setup for the scripts is in `scripts/README.md` (they find Playwright and axe via two env vars, so they work from any folder).

Look at screenshots at phone width, one page at a time, **at 2x zoom for headers and hero areas**. Real bugs found this way on the reference build: two side-by-side dates at different heights because only one had a countdown line; an empty grey cell in a 3-column grid holding 2 items; a rotated square icon widening the page by 2px at 320px; a menu that fit on 390px but not 320px; a hero headline hidden until JS ran (slow LCP).

### 7. Launch pack
Write `docs/03-launch-checklist.md` (client confirmations, staging on the host, domain switch with a lowered DNS TTL, the URL redirect map, Search Console steps, rollback in two levels), a content-editing guide with worked examples, and a README. Keep staging `noindex` (robots + meta) until a single env var flips it on at launch, so the new site cannot compete with the live one. Do not change the live domain; the old site stays up for 30 days.

## Reporting back

End each message with: what changed, what you verified (numbers), what you could not verify, what needs the client. Keep it short; do not claim a check you skipped. When the client asks "is X there?" or "where did you get Y?", check the files before answering, because your memory of a long session is the least reliable source.

## Pitfalls worth remembering (details in `references/lessons.md`)
- Do not "improve" the client's wording to match your taste; match their spelling variant (American vs British) site-wide, except inside verbatim reviews.
- A client saying "keep the old favicon / logo / poster" means the exact old asset. Restore it from git rather than re-creating a lookalike.
- Posters and flyers have the old address/wording baked into the image. Flag it; do not silently drop or silently keep it.
- When the user redirects you mid-task ("no, how we had it"), stop, restore the previous state first, then discuss.
- zsh does not word-split `$var` in `for pair in "a b"; do set -- $pair` (use `${=pair}`), and `grep --include` globs fail when unmatched: quote them or use plain `grep -rn pattern dir`.
