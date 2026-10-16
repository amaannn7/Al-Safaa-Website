# Al-Safaa website: audit and rebuild plan

Audit date: 17 October 2026. Source: the live site at flyalsafaa.com (WordPress 6.6, Astra theme, Elementor 4.1), its sitemap, its media library, and its Google Business Profile.

## 1. What the live site contains today

### Sitemap (from `wp-sitemap.xml`)

| URL | Title | Last modified | Status |
|---|---|---|---|
| `/` | Al-Safaa – Travels & Tours | 2026-09-18 | Keep (home) |
| `/about/` | About us – Al-Safaa | 2024-09-27 | Keep |
| `/hajj-2027/` | Hajj 2027 – Al-Safaa | 2026-08-10 | **Keep this exact URL** (main SEO asset) |
| `/services/` | Visit sri lanka – Al-Safaa | 2024-11-11 | Keep URL; it becomes the Travel Services page |
| `/contact/` | Contact – Al-Safaa | 2024-10-06 | Keep |
| `/maintenance-page/privacy-policy/` | Privacy Policy | 2023-03-14 | 301 to `/privacy-policy/` |
| `/hello-world/` | WordPress default post | 2023-03-14 | 301 to `/`: default WordPress content, should not be indexed |
| `/sample-page/` | WordPress default page | 2023-03-14 | 301 to `/` |
| `/category/uncategorized/` | Empty category | n/a | 301 to `/` |

Navigation: Home · About us · Hajj 2027 · Visit Sri Lanka · Contact. There is no Umrah page.

### Verified business information (as published by the company)

| Item | Value | Source |
|---|---|---|
| Name | Al-Safaa Travels & Tours | Site, Google profile |
| Founded | 1997 | About page, Hajj 2027 page, 2026 flyers, privacy policy |
| Founders | Mr. A.L.M Farook and Mrs. M.H.M Inaya Farook | About page |
| Current leadership | Mr. Omar Farook | About page |
| Pilgrims guided | "more than 3,000 travelers" | About page |
| Email | info@flyalsafaa.com | Footer, contact page |
| Office phone | +94 11 236 6566 (published as "+94 112 366 566") | Footer |
| Mobile 1 | +94 71 710 7887 | Hajj 2027 page, both 2026 flyers, Google profile |
| Mobile 2 | +94 72 710 7887 | Site-wide floating WhatsApp button, contact page |
| Facebook | facebook.com/flyalsafaa | Footer |
| Instagram | instagram.com/flyalsafaa | Footer |
| YouTube | youtube.com/@flyalsafaa (6 videos, including Tamil Hajj and Umrah talks) | Contact page, verified via feed |
| LinkedIn | linkedin.com/company/flyalsafaa | Brief (page responds 200) |
| Google profile | "Al-Safaa Travels & Tours", Tour operator, rated 5.0, 26 R. A. De Mel Mawatha, Colombo 00400 | Google Maps, checked 17 Oct 2026 |
| Flights partner | Aviasales via Travelpayouts (marker `419143`, trs `217323`) | Home page widget |

### Packages on the live site

1. **Hajj 2027, 22 days.** 2–23 May 2027. Standard LKR 2,550,000 · Triple 2,750,000 · Double 2,950,000. Elaf Kinda 5★ (9 days), Rea Bakhsh shifting hotel (5 days), Sham Province 4★ Madinah (4 days). Full Hijri-dated itinerary, highlights, inclusions and exclusions.
2. **Hajj 2027, 14 days.** 10–23 May 2027. Standard LKR 2,250,000 · Triple 2,350,000 · Double 2,550,000. Rea Bakhsh (5 days) and Sham Province (4 days).
3. **October 2026 Umrah, 10 days.** 22–31 October 2026. Air Arabia, Madinah first, returning via Taif. Muhajireen Al Hibba (550 m) and Amjad Al Salam (150 m). Shared 395,000 · Triple 435,000 · Double 475,000 · Child 280,000 · Infant 100,000 LKR. **Departs five days after this audit.**
4. **October 2024 Umrah (Elaf Kinda).** Expired, but still embedded in a popup on every page. Remove it.

The Hajj 2027 itinerary and highlights were injected by JavaScript, so search engines may not have indexed them. The new site renders all of this as HTML.

## 2. Conflicts that need the client's confirmation

| # | Conflict | What the new site does for now |
|---|---|---|
| C1 | **Address.** The footer says "26, Vajira Road, Colombo 04". The Hajj 2027 page, both 2026 flyers and the Google profile say "26, R A De Mel Mawatha, Colombo 04". | **Resolved:** the client confirmed "26, Vajira Road, Colombo 04" (17 Oct 2026). The Google profile still shows R. A. De Mel Mawatha; update it to match. |
| C2 | **Primary WhatsApp number.** The floating button uses 072 710 7887. All 2026 marketing uses 071 710 7887 for "Call / WhatsApp for bookings". | 071 is the primary WhatsApp number and both mobiles are listed. One value in `src/config/site.ts`. |
| C3 | **Brand colours.** The logo is royal blue (#1D499F) and orange (#EFA00B). The brief and the Hajj 2027 page use deep teal (#0C3D38) with gold (#C8963E). | Teal and gold for the interface. The logo keeps its original colours on light backgrounds, and on dark backgrounds uses the reversed white version that the company's own 2026 flyers already use. |
| C4 | **Hajj itinerary labels.** The itinerary says "Arrival of 23 Day Package Group" and "15 Day Package Group", but the packages are 22 and 14 days (2–23 May and 10–23 May, inclusive). | Corrected to 22-day and 14-day. Please confirm. |
| C5 | **Hajj "Standard" price.** The Standard price doesn't say what room occupancy it covers (quad?). | Labelled "Standard" exactly as published. |
| C6 | **"Guide with over 30 years of experience"** appears only on the expired 2024 package. | Not used. "Experienced guides" is used instead. |
| C7 | **Rating.** Google shows 5.0, but logged-out access doesn't show the review count. | The site links to the Google profile but doesn't publish a number. |

### Small copy edits made during migration (please review)

- Itinerary labels "23 Day" and "15 Day" changed to 22-day and 14-day (C4).
- The Red Mosque (Jami Ul-Alfar) is described as being in Pettah, not "Fort". It stands on 2nd Cross Street, Pettah.
- Spelling and style fixes only, such as "Afordable" → "Affordable" and "Madina" → "Madinah". No facts, prices or dates were changed.

## 3. Things I could not verify, so they are not published

- **Google reviews.** Google restricts logged-out and automated access, so I couldn't read the reviews. **No testimonials have been written or paraphrased.** The site supports two compliant sources: (a) the Google Places API, enabled by setting `GOOGLE_PLACES_API_KEY` (Google requires its attribution, which the component shows); (b) a curated list in `src/data/testimonials.ts` for genuine reviews the client supplies, with name, date and source. Until one of these is filled, the home page shows a "Read our reviews on Google" link.
- **Standalone services**: visa assistance, hotel-only bookings, Haramain train tickets, extended stays. Visa and hotels are confirmed only as parts of packages. These services are in `src/data/services.ts` with `confirmed: false` and stay hidden until confirmed.
- **Jeddah and other Saudi destinations.** Only Umluj, Riyadh and AlUla appear on the live site, so only those are shown.
- **Opening hours.** The Google profile shows only "Opens 9 AM Mon". No hours are published.
- **Gallery photos of real groups.** None were supplied apart from one Mina photo of unknown origin. The Gallery page is built but returns 404 until `src/data/gallery.ts` has images with consent.
- **Day-by-day Umrah itinerary.** Not published by the company. The site shows only the stated stages (3 nights Madinah, then 6 nights Makkah).
- **Accreditations or licences** (for example, Sri Lanka Hajj Committee registration). None are claimed.

## 4. Problems with the current site

- Expired content: an October 2024 Umrah popup and a "Hajj 2025 Registration" form popup on every page.
- The "Hajj 2025 Registration" WPForms form has garbled labels ("a Passengers Name", "Holder? of Number").
- No meta descriptions, no Open Graph tags, no structured data. Titles are generic ("About us – Al-Safaa").
- Default WordPress pages are indexed (`/hello-world/`, `/sample-page/`).
- Images have no alt text. The Hajj 2027 flyer is a 1.6 MB PNG and is the home page's LCP image.
- Key package information is either inside images (flyers) or rendered by JavaScript.
- Heavy plugin load: Elementor, Popup Maker, WPForms, Travelpayouts, emoji script, and Astra starter-template scripts.
- No Umrah page. Typo "Afordable" on the home page. Emoji used as icons.
- The privacy policy is WordPress boilerplate about comments and Gravatar, which doesn't reflect how the site actually works.

## 4b. Scope decision (17 Oct 2026)

The client asked that the new site add **no information beyond the old website**. The site was cut back to match:

- **Pages:** Home, About us, Hajj 2027 (with the two package pages), Umrah (with its package page), Visit Sri Lanka (`/services/`), Contact, Privacy Policy. Removed: Resources/YouTube talks, Saudi Tours page, Gallery, Photo credits page, and the separate Hajj listing page (`/hajj/` now redirects to `/hajj-2027/`).
- **Copy:** headings and text are the old site's own wording (for example "Upcoming group tours", "Explore Saudi Arabia", "Find cheap flight tickets easily", "Get in touch with us for more info", "Tour Itinerary", "Package Highlights", "What's Covered"). Marketing lines written for the redesign were removed.
- **Kept, although not on the old site as text:** "Umrah" in the menu (the old Umrah package was only in a popup), the date and price layout, and links to the existing hotel maps.
- **No embedded booking or search widgets.** Flight comparison is a plain partner link.

## 5. Plan

### Keep
All verified facts above. The Hajj 2027 URL and its full content. The Aviasales partnership (same marker), now as a plain outbound link. The embedded flight-search form was removed at the client's request because the site must not contain booking functionality. The YouTube talks. The Visit Sri Lanka copy and photos. The founders' story, vision and mission.

### Redesign
The visual system, every layout, how packages are presented, the itinerary (accessible accordion timeline), navigation, and mobile.

### Improve
Real HTML for all package data. A single data source that feeds the home page, listings and detail pages. Date-aware upcoming departures. WhatsApp links with a prefilled message for each package. Structured data (TravelAgency, Trip/Offer, BreadcrumbList, VideoObject). Metadata on every page. Sitemap and robots.

### Remove
The expired 2024 package, the 2025 registration popup, default WordPress pages, emoji icons, and plugin bloat.

### Missing (needs the client)
Genuine reviews, group photos with consent, a team photo, opening hours, an answer on standalone services, and Umrah departures beyond October 2026.

## 6. Design direction: "Calm authority"

- **Feeling:** an established agency that has done this for decades. Quiet confidence, not travel-brochure excitement.
- **Palette:** deep teal ink (#082826 / #0C3D38) as the main surface, warm sand neutrals (#FAF6EC / #F1EADB), gold (#C8963E) as the single accent. The logo's royal blue appears only in the logo.
- **Type:** *Satoshi* (Indian Type Foundry) for everything, following the client's reference design: light weight with an italic accent for the hero statement, medium weight with tight tracking for headings, regular for body text. It loads from Fontshare's API because the ITF licence forbids putting the font files in a public repository. *Amiri* is used only for the one verified Arabic phrase (the opening of the Talbiyah, set right to left with its translation).
- **Signature motif:** the logo's swoosh and underline become a thin gold "horizon line" that draws in on scroll and divides sections. The other architectural cue is the arch of the Haram's colonnades, used as an image mask in a few places. No pattern wallpaper.
- **Layout:** editorial and asymmetric. Upcoming departures look like a refined departures board, not a card grid. Dates use large serif numerals.
- **Motion** (GSAP, following the motion-design skill's "Premium" personality: 350–600 ms, no overshoot, a single easing curve): hero text rises line by line, the horizon line draws in, images reveal from their mask, and the hero has light parallax. All of this is turned off when the visitor has requested reduced motion.

### Tooling decisions

- **GSAP skills** (`greensock/gsap-skills`, MIT): installed in `.claude/skills` (core, react, scrolltrigger, timeline, performance). Used.
- **Motion design skill** (`lottiefiles/motion-design-skill`, MIT): installed in `.claude/skills`. Used for timing and easing decisions.
- **Three.js skills** (`cloudai-x/threejs-skills`): reviewed but **not installed or used**. A 3D scene adds over 150 KB of JavaScript and no real value for a pilgrimage agency. Its README also points to a different repository (`pinkforest/threejs-playground`), which is a provenance red flag.
- **Lottie:** not used. No animation here needs vector playback, so CSS and GSAP are enough.
- **Website cloner template** (`JCodesMore/ai-website-cloner-template`, MIT): reviewed. Its goal is pixel-faithful cloning, which conflicts with the brief. I used the same approach (crawl, extract text and assets) with lighter scripts and didn't adopt the template.

### Architecture

- Next.js 16 App Router, TypeScript, Tailwind v4, Cache Components, `trailingSlash: true` so every existing URL stays the same.
- `src/config/site.ts` holds all business details. `src/data/packages.ts` holds every Hajj and Umrah package.
- `src/lib/packages.ts` provides pure date logic (Asia/Colombo time zone, tested with Vitest). `getTodayInColombo()` is cached with `cacheLife('hours')`, so pages that show departures regenerate at least hourly and never show a departed tour for long.
- No database, CMS, authentication, booking engine or contact form. Enquiries go through WhatsApp, phone and email.
