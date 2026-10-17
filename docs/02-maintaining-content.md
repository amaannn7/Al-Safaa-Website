# Maintaining content

All content lives in TypeScript files under `src/data/`. Edit a file, commit and push, and Vercel publishes the change within a couple of minutes. If anything is mistyped, the build fails and the live site doesn't change.

**Ground rule:** publish only information the agency has confirmed. Never estimate a price, hotel or date.

## Add a new package

Open `src/data/packages.ts` and add an entry to the `packages` array. The quickest way is to copy an existing package of the same type and change it. The fields:

```ts
{
  slug: "umrah-december-2026",        // becomes /umrah/umrah-december-2026/: never change it once published
  type: "umrah",                      // "hajj" or "umrah"
  status: "published",                // "draft" (hidden) · "published" · "cancelled" (hidden everywhere)
  availability: "open",               // "open" · "limited" · "sold-out" · "unknown" (shows no label)
  title: "December Umrah 2026 · 12 Days",
  season: "Umrah · December 2026",    // packages with the same season are grouped together
  tagline: "…",
  summary: "…",
  destination: "Madinah · Makkah",
  departure: "2026-12-10",            // YYYY-MM-DD, or null if not confirmed yet
  return: "2026-12-21",
  durationDays: 12,                   // inclusive of both dates (the tests check this)
  currency: "LKR",
  prices: [
    { label: "Quad room", amount: 450000 },
    { label: "Child", amount: 300000, kind: "child", note: "Private rooms only" },
  ],
  stays: [{ city: "Madinah", hotel: "…", duration: "4 nights", note: "200 m from Masjid an-Nabawi" }],
  highlights: [{ title: "…", body: "…" }],
  itinerary: [{ title: "…", detail: "…" }],   // add `date: "2026-12-10"` to show it as a dated timeline
  inclusions: ["…"],
  exclusions: ["…"],
  notices: ["Passport must be valid for 6 months from the return date."],
  flyer: { src: "/images/existing/my-poster.jpg", alt: "Describe the poster", width: 1080, height: 1350 },   // optional poster shown in "Upcoming group tours"
  cardTitle: "Title shown above the poster",                                                                       // optional
  image: { src: "/images/photos/madinah-green-dome.jpg", alt: "Describe the photo for screen readers", credit: "madinah-green-dome" },
  source: "Where this information came from (flyer, WhatsApp from Omar, …)",
}
```

Then run `npm test`. It checks that slugs are unique, dates are in order and durations match the dates.

The new package appears automatically on:

- the home page "Upcoming group tours" (posters first; packages of the same `season` share one poster) and hero "next departure"
- the Hajj 2027 page (Hajj) or the Umrah page (Umrah)
- its own detail page, the sitemap and the structured data

**No other file needs editing.**

### Mark a departure as fully booked

Set `availability: "sold-out"`. The package stays visible as "Fully booked" and the WhatsApp enquiry button is hidden.

### Cancel a departure

Set `status: "cancelled"`. It disappears everywhere and its page returns a 404.

### Old departures

Nothing to do. A package drops off the upcoming lists on its departure day. Its page stays online marked "completed", which keeps it useful for search engines. Remove it from the file whenever you like. Optionally, add a redirect in `next.config.ts` from its URL to `/hajj/` or `/umrah/`.

## Photos

1. Put the image in `public/images/photos/` as a JPEG about 2400 px wide. Next.js converts it to AVIF/WebP and resizes it automatically.
2. Always write a meaningful `alt` text.
3. If it's a licensed stock photo, record the photographer in `src/data/credits.ts`.
4. Only use photographs of identifiable pilgrims with their permission.

## Testimonials

The "5.0 · 70 reviews on Google" figure above the cards is typed in `src/config/site.ts` (`google.rating`, `google.reviewCount`). Update it when the numbers on your Google profile change.

Add **genuine** reviews to `src/data/testimonials.ts`, quoted word for word with the reviewer's name, date and source. The reviews section appears on the home page as soon as the list has entries.

Alternatively, set `GOOGLE_PLACES_API_KEY` in Vercel to show up to five live Google reviews (Google requires the attribution that the component already shows). Create the key in Google Cloud and restrict it to the **Places API (New)**.

## Services

`src/data/services.ts` lists visa assistance, hotels, Haramain train and extended stays with `confirmed: false`. Once the agency confirms it offers one on its own (not only as part of a package), set it to `true` and it appears on `/services/`.

## Contact details

Every phone number, the WhatsApp number, address and email are in `src/config/site.ts`, used site-wide.
