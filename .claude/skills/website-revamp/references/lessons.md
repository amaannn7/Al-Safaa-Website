# Lessons from the reference build

Concrete findings, grouped so you can jump to what you need. Each is something
that cost time or a client complaint the first time round.

Contents: data patterns · Next.js 16 · CSS and design · mobile menu · reviews · assets and licences · tooling traps

## Data patterns that worked
- `src/config/site.ts`: every phone, WhatsApp number, address, social link, partner ID. Mark unconfirmed values with a `NEEDS CONFIRMATION` comment and keep a matching checklist item.
- One typed data file per content type (`packages.ts`, `destinations.ts`, `services.ts`, `testimonials.ts`). Include a `source` string on each record ("flyalsafaa.com/hajj-2027, revised 10 Aug 2026") so a future audit can trace it.
- Package fields that earned their keep: `status` (draft/published/cancelled), `availability` (open/limited/sold-out/unknown), `departure`/`return` (`YYYY-MM-DD` or null), `prices[]` with `kind` (adult/child/infant) so "from" price ignores child fares, `stays[]`, `highlights[]`, `itinerary[]`, `inclusions`, `exclusions`, `notices`, optional `flyer`, `cardTitle`, `seasonHref`.
- Every page, the sitemap, the structured data and the home page list read the same array. Adding a package is one edit.
- Optional data (reviews, gallery) that is empty should make its section disappear, not show an empty box. A gallery page can be gated on a minimum count and return 404 until then.
- Do not compute marketing figures that age ("29 years"). Do not print "per person" if the source never said it.

## Next.js 16 (Cache Components) gotchas
- Read `node_modules/next/dist/docs/` first. `cacheComponents: true` and `partialPrefetching: true` are on by default in new apps.
- `new Date()` in a component is an error. Wrap "today" in one `"use cache"` + `cacheLife("hours")` function (see `date-logic.md`).
- `PageProps<"/hajj/[slug]">` / `LayoutProps` are global types generated during `next build`; plain `tsc` fails on them before the first build. Ignore that error or build first.
- `generateStaticParams` must return at least one param; return a sentinel (`[{slug:"none"}]`) when empty and let the page `notFound()`. `dynamicParams` is not supported.
- `middleware` is now `proxy.ts` (`export function proxy`). Use it to turn unknown slugs into a real **404 status** (`NextResponse.rewrite(new URL("/not-found/", url), { status: 404 })`); otherwise unknown dynamic URLs stream a 200 with noindex.
- Redirects: `permanent: true` emits 308. Use `statusCode: 301` for SEO migrations. `trailingSlash: true` also redirects `/about` to `/about/` with 308.
- `images.qualities` now defaults to `[75]`; list the values you use.
- Metadata files in `app/`: `icon.png`, `apple-icon.png`, `opengraph-image.jpg` (+ `.alt.txt`), `robots.ts`, `sitemap.ts`. A `favicon.ico` must contain **RGBA** PNG frames or the build fails ("The PNG is not in RGBA format"). Converting a JPEG gives RGB.
- Staging safety: `robots.ts` and `metadata.robots` both `noindex` unless `NEXT_PUBLIC_ALLOW_INDEXING=true`.
- JSON-LD: serialise with `.replace(/</g, "\\u003c")`. Use TouristTrip/Offer for packages, TravelAgency for the business, BreadcrumbList, VideoObject. Only emit `availability` the client has stated.
- `lucide-react` v1 has no brand icons (Facebook etc.): write small inline SVGs.
- Fonts: `next/font/google` for Google fonts. For a CDN font, `<link rel="stylesheet">` in `<head>` plus a fallback `@font-face` using `size-adjust`, `ascent-override`, `descent-override`, `line-gap-override` computed from the font's `hhea` table and its width ratio against Arial. That took layout shift to 0 and restored Lighthouse performance from 84 to 95.
- LCP: if the headline is the LCP element, never fade it in from `visibility:hidden`. Animate only `transform` on the LCP element (`data-hero-rise`), and keep the decorative items on `visibility`/opacity. Lighthouse jumped from 86 to 97.
- Reduced motion and no-JS: set a `.js` class in `<head>` before paint; only hide hero items under `html.js` and `prefers-reduced-motion: no-preference`, with a CSS fallback that reveals them after 2.5s.

## CSS and design
- **Contrast first.** Compute ratios before choosing tokens. A brand gold (#C8963E) on warm white is 2.5:1 (fails). Use a deeper gold (#8A6420 or darker, 5:1+) for text on light backgrounds; gold buttons take dark ink text (6.5:1), not white (2.7:1).
- **One small-text scale, defined once.** Four classes were enough: `.eyebrow` and `.label` (12px, bold, caps, 0.18em), `.action` (13px, bold, caps, 0.14em), `.meta` (13px sentence case). Nothing under 12px. Check with `qa-typeaudit.mjs`; the audit's "uppercase labels grouped by size/weight/tracking" list should have 1 to 3 rows.
- **Side-by-side blocks must reserve the same height.** A date block with an extra "in 5 days" line on one side pushed the pair out of line. Reserve the line (`invisible`) on both, and show a countdown only where it is meaningful (departure, never return).
- **Grids follow item count.** A 3-column grid with 2 items leaves an empty cell. Derive columns from `items.length`.
- **Same thing, one style.** Hotel rows, date formats, distance units (`150m`), place spellings (Madinah), capitalisation of page names (Privacy Policy), and CTA wording should be uniform. Sweep the rendered text for variants before launch.
- Spelling: pick the client's variant (they used American "travelers", "organized"). Keep verbatim reviews untouched.
- Tailwind v4: `@custom-variant on-dark (&:where(.on-dark, .on-dark *))` is handy for dark sections; arbitrary breakpoints `min-[380px]:`; short-screen variants `[@media(max-height:700px)]:`.
- Accordions: native `<details>` works with no JS. Rotate the "+" **icon** inside the circle, not the circle (a rotated square box is ~40% wider and caused overflow at 320px).
- Accessible touches that axe caught: `role="img"` on a span with `aria-label` (star ratings); `tabIndex={0}` on a scrollable region; heading order (use an `sr-only` h2 rather than skipping a level); `inert` on closed menus.
- Dividers and cards: `divide-y` colour needs the same hairline token on children (Tailwind v4 defaults to `currentColor`).
- Poster/flyer sections: group packages by season so one poster serves both packages and disappears only when all have departed.

## Mobile menu that tested well
- Header: logo, a round gold WhatsApp icon button, and a clearly labelled **Menu / Close** pill whose two lines morph into a cross. Solid dark pill once the header turns solid.
- Panel: floating rounded card under the header over a dimmed, blurred page; links stagger in; current page marked with a dot; WhatsApp + Call side by side, then number, address, social icons. No numbering, no full-screen black slab.
- Behaviour to test (23 checks in the reference): closed menu is `inert` and `visibility:hidden`; opening locks scroll and moves focus into the menu (after ~60ms, since the panel is still invisible on frame 1); Tab is trapped in header + menu; Esc closes and returns focus to the button; tapping the dim layer closes; choosing a link closes and unlocks scroll; resizing to desktop closes; fits without scrolling at 320x640, 360x640, 375x667, 390x844 (320x568 may scroll inside the panel; acceptable).
- At 320px: shrink the logo (`w-[124px]` under 380px) or the Menu pill is cut off. Stack the address above the social icons under 380px.
- `backdrop-filter` on a closed overlay can cost paint time: make it `invisible` (not just opacity 0) when closed.

## Photos under text
- **Do not tint photos with the brand colour.** A dark-teal wash (flat 70% sheet plus two gradients) made every photo look green and muted; the client asked for the photos to be "properly visible". Use neutral black gradients that are strong only behind the text (bottom and left), leave the rest of the picture untouched, and remove film-grain layers over photos.
- Readability then has to be earned, not assumed: add a soft `text-shadow` halo class for text on photos, a light neutral layer on phones only (text covers more of the picture), a lighter gold for small labels on photos, and a top gradient for breadcrumbs in short heroes.
- axe cannot measure contrast over images. `scripts/qa-photo-contrast.mjs` samples the real pixels. The first pass found 27 failing text runs; two rounds of tuning took it to 0. When writing such a tool, convert CSS colours with a 1x1 canvas (modern `color(srgb ...)` / `oklab()` strings break naive regexes and make white text read as black).

## Improving low-resolution photos (AI upscaling)
- Only upscale what is actually small. Audit pixel sizes first (`sips -g pixelWidth -g pixelHeight`); here 4 old-site photos were 644x402 and everything else was 1400px+.
- Prefer a **faithful** model for real photos of real places and people (Real-ESRGAN x4plus, Topaz Gigapixel, Photoshop Super Resolution). Creative/diffusion upscalers (Magnific, Clarity) invent detail: acceptable for AI art, wrong for faces, landmarks, logos, text, and anything a client must be able to stand behind as "the real thing".
- Running Real-ESRGAN locally on a Mac: the 2022 `realesrgan-ncnn-vulkan` binary exits silently on Apple Silicon (no Vulkan). Use PyTorch with the `spandrel` loader in a throwaway venv, `RealESRGAN_x4plus.pth` on the `mps` device, 128px tiles with 16px overlap (about 6 s per image on an M4).
- Do not ship the raw 4x output: on small, already-compressed JPEGs it looks painted (flat foliage, posterised stripes, waxy skin). Upscale 4x, then **downscale to 2x** (what a retina screen needs) and blend 80% AI / 20% plain enlargement. Check 100% crops side by side before replacing anything; keep originals in git.
- Never generate (text-to-image) pictures of the Kaaba, Masjid al-Haram/an-Nabawi, pilgrims, hotels or the client's own groups and present them as real: it misleads visitors and is disrespectful in a religious context. Use real photos from the client, or licensed stock with credits.

## Reviews and the marquee
- Show reviews as independent cards (a shared-background grid leaves an empty panel for some counts). With 3+ reviews, a full-bleed marquee: render the list twice, animate `translateX(-50%)`, mark the copy `aria-hidden` + `inert`.
- Pause on hover, on keyboard focus (`:has(:focus-visible)`, so a mouse click does not freeze it), and while a card is expanded (`:has([aria-expanded=true])`), which is what makes it usable on touch with no pause button. A visible Pause button was removed at the client's request; offer it back if accessibility matters to them.
- Long reviews: clamp to ~4 lines with an in-place **Read more / Show less**, measured with `scrollHeight > clientHeight` so the toggle only appears when text is actually cut. Keep the full text in the DOM.
- Reduced motion: no animation, plain horizontally scrollable strip, hide the duplicate list.
- A rating summary typed in config (rating + count) is acceptable if labelled as copied from the profile with a date; show "live" attribution only when API data is really used.

## Assets and licences
- Unsplash serves a proof-of-work "not a bot" page to scripts. A real headless Chrome clears it after a few seconds when visiting one photo at a time. Then `/photos/<id>/download?force=true` from the page gives the full file; the file name carries the photographer slug. Confirm each photo is not "Unsplash+". Record photographer + link in a credits file.
- You cannot reliably view photos you cannot open: judge from titles/descriptions, then look at the rendered screenshots, and tell the client the picks were chosen that way.
- YouTube: take IDs from the channel feed (`/feeds/videos.xml?channel_id=`), but the feed lists `<yt:videoId>` before `<title>`, so pairs are easy to shift by one. Verify each ID and title with `https://www.youtube.com/oembed?url=...&format=json`.
- Load videos on click only (`youtube-nocookie.com`).
- Google Maps/Search show a "limited view" or "unusual traffic" page to automation. That is a boundary, not a puzzle: ask for screenshots/pasted text.
- Favicon: the old site's exact file is the safe answer; rebuilding "the same icon" from a larger original cost a revert.
- Contact-form on the old site: if dropped, say so in the report (the site then relies on WhatsApp/phone/email).

## Tooling traps
- zsh: `for pair in "a b"; do set -- $pair` does not split; use `set -- ${=pair}`. `grep --include=*.ts` errors when the glob is unmatched.
- Tall full-page screenshots get downscaled when viewed. Capture in 900-1800px chunks. Scroll through the page first so scroll-reveal animations have fired, or use `reducedMotion: "reduce"`. Hide the fixed header/floating button in section shots.
- Playwright refuses to click a moving element ("not stable"): hover the marquee first (it pauses), as a real user would.
- Lighthouse varies: one 84 was noise (3 reruns: 94). Read the LCP element and layout-shift sources from the JSON before changing anything.
- Killing a background `next start` reports "failed, exit 144"; that is expected.
- Rebuild without `PREVIEW_TODAY` before restarting the server you leave running for the client.
- `.env*` in `.gitignore` also ignores `.env.example`; add `!.env.example`.
- Commits: end with the attribution line the harness specifies at that moment (it can change mid-session).
