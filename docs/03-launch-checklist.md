# Launch checklist

The live WordPress site stays untouched until the new site has been reviewed and approved. Work through this list in order.

## 1. Client confirmations (blocking)

- [x] **Address** (C1): confirmed as "26, Vajira Road, Colombo 04". Update the Google Business Profile, which still says R. A. De Mel Mawatha.
- [ ] **Primary WhatsApp** (C2): 071 710 7887 (2026 marketing) or 072 710 7887 (old floating button).
- [ ] **Brand palette** (C3): teal and gold interface, with the logo kept blue and orange, or reversed white on dark backgrounds as on the 2026 flyers.
- [ ] **Hajj itinerary labels** (C4): the old page said "23 Day" and "15 Day" groups; the new site says 22-day and 14-day.
- [ ] **Hajj "Standard" price** (C5): what room occupancy does it cover?
- [ ] **"3,000+ pilgrims"** and **"since 1997"**: still accurate?
- [ ] **Availability**: the October Umrah currently shows no seat label. Should it say "Limited seats" or "Fully booked"?
- [ ] **Image rights**: confirm the agency owns, or has licences for, the Sri Lanka photos in `public/images/existing/`.
- [ ] **Privacy policy**: now the relevant sections of the old policy, verbatim. Review it.
- [ ] **Reviews**: supply genuine testimonials, or a Google Places API key.
- [ ] **Opening hours**, if they should be shown.

## 2. Staging on Vercel

1. In Vercel, choose **Add New → Project** and import the GitHub repository `amaannn7/Al-Safaa-Website`. Framework is detected as Next.js, with no build settings needed.
2. Leave `NEXT_PUBLIC_ALLOW_INDEXING` unset. Staging is then `noindex`, and `robots.txt` blocks crawling.
3. Deploy. Share the `*.vercel.app` URL for review.
4. Review on a real phone: tap every WhatsApp and call button and check the prefilled messages.

## 3. Domain switch (launch day)

1. In Vercel, under **Project → Settings → Environment Variables (Production)**, set:
   - `NEXT_PUBLIC_ALLOW_INDEXING=true`
   - `NEXT_PUBLIC_SITE_URL=https://flyalsafaa.com`
   - optionally `GOOGLE_PLACES_API_KEY`
2. Redeploy production.
3. Under **Project → Settings → Domains**, add `flyalsafaa.com` and `www.flyalsafaa.com`. Set `www` to redirect to the apex domain, since the old site's canonical URLs used `https://flyalsafaa.com/`.
4. At the DNS provider, lower the TTL to 300 seconds a day before. Then point the records to the values Vercel shows (typically `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com`).
5. Keep the WordPress hosting running, without the domain, for at least 30 days for rollback. If email (`info@flyalsafaa.com`) is hosted with the same provider, **don't change the MX records**.

## 4. SEO migration

### URL map

`trailingSlash: true` keeps every existing URL identical.

| Old URL | New site |
|---|---|
| `/` | `/` (same) |
| `/hajj-2027/` | `/hajj-2027/` (same; all content preserved as HTML) |
| `/about/` | `/about/` (same) |
| `/contact/` | `/contact/` (same) |
| `/services/` (Visit Sri Lanka) | `/services/` (same; Sri Lanka content kept at `#visit-sri-lanka`) |
| `/maintenance-page/privacy-policy/` | 301 → `/privacy-policy/` |
| `/hello-world/`, `/sample-page/`, `/category/*`, `/feed/` | 301 → `/` |
| `/wp-sitemap.xml` | 301 → `/sitemap.xml` |

New pages: `/umrah/`, `/umrah/[package]/` and `/hajj/[package]/` (package detail pages). `/hajj/` redirects (temporarily) to `/hajj-2027/`.

### After launch

- [ ] Google Search Console: verify the domain property and submit `https://flyalsafaa.com/sitemap.xml`.
- [ ] Use URL Inspection on `/`, `/hajj-2027/` and `/umrah/`, and request indexing.
- [ ] Check that the legacy URLs above return 301 to the right page: `curl -I https://flyalsafaa.com/hello-world/`
- [ ] Validate structured data with Google's Rich Results Test on a package page.
- [ ] Update the Google Business Profile website link if needed, and change its address to "26, Vajira Road, Colombo 04" so it matches the site.
- [ ] Watch Search Console "Pages" and "404" reports for two to four weeks.

## 5. Rollback

If anything critical breaks after the switch:

1. **Fastest (minutes):** in Vercel → Deployments, choose the last good deployment and select **Promote to Production**.
2. **Full rollback:** set the DNS records back to the WordPress host's previous values. They're still live because the old hosting is kept for 30 days. With a 300-second TTL, most visitors switch back within minutes.
3. Neither step changes email.
