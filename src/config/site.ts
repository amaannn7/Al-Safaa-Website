/**
 * Central business details. Every page, CTA and structured-data block reads
 * from here — change a number or address once and it updates site-wide.
 *
 * Items marked NEEDS CONFIRMATION conflict across the company's own published
 * material; see docs/01-audit-and-plan.md §2.
 */

export const site = {
  name: "Al-Safaa Travels & Tours",
  shortName: "Al-Safaa",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://flyalsafaa.com",
  established: 1997,
  /** "more than 3,000 travelers" — company-stated on the About page. */
  pilgrimsGuided: "3,000+",
  description:
    "Hajj and Umrah specialists in Colombo, Sri Lanka since 1997. Organised group pilgrimages with carefully chosen accommodation, transport and experienced guidance.",

  contact: {
    email: "info@flyalsafaa.com",
    /** NEEDS CONFIRMATION (C2): 2026 marketing uses 071 for "Call / WhatsApp for bookings". */
    whatsapp: { e164: "94717107887", display: "+94 71 710 7887" },
    phones: [
      { label: "Bookings · Call / WhatsApp", e164: "94717107887", display: "+94 71 710 7887" },
      { label: "Mobile", e164: "94727107887", display: "+94 72 710 7887" },
      { label: "Office", e164: "94112366566", display: "+94 11 236 6566" },
    ],
  },

  /** NEEDS CONFIRMATION (C1): footer used "26, Vajira Road"; Google profile + 2026 flyers use this. */
  address: {
    street: "26, R. A. De Mel Mawatha",
    locality: "Colombo 04",
    postalCode: "00400",
    country: "Sri Lanka",
    countryCode: "LK",
    geo: { lat: 6.8904911, lng: 79.8585629 },
  },

  google: {
    profileUrl:
      "https://www.google.com/maps/place/Al-Safaa+Travels+%26+Tours/@6.8904911,79.8585629,17z/data=!4m6!3m5!1s0x3ae25b063205efa1:0x889270e0ad49e3bc!8m2!3d6.8904911!4d79.8585629",
    reviewsUrl:
      "https://www.google.com/maps/place/Al-Safaa+Travels+%26+Tours/@6.8904911,79.8585629,17z/data=!4m8!3m7!1s0x3ae25b063205efa1:0x889270e0ad49e3bc!8m2!3d6.8904911!4d79.8585629!9m1!1b1",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Al-Safaa+Travels+%26+Tours,+26+R.+A.+De+Mel+Mawatha,+Colombo&ll=6.8904911,79.8585629&z=16&output=embed",
    /** Places API (New) place resource, used only when GOOGLE_PLACES_API_KEY is set. */
    placeQuery: "Al-Safaa Travels & Tours, 26 R. A. De Mel Mawatha, Colombo",
  },

  social: [
    { name: "Facebook", href: "https://www.facebook.com/flyalsafaa" },
    { name: "Instagram", href: "https://www.instagram.com/flyalsafaa/" },
    { name: "YouTube", href: "https://www.youtube.com/@flyalsafaa" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/flyalsafaa/" },
  ],

  leadership: {
    founders: "Mr. A.L.M Farook and Mrs. M.H.M Inaya Farook",
    current: "Mr. Omar Farook",
  },

  aviasales: {
    marker: "419143",
    trs: "217323",
    /** The partner search widget already used on the live home page. */
    widgetSrc:
      "https://tp.media/content?trs=217323&shmarker=419143&show_hotels=false&powered_by=false&locale=en_us&currency=usd&searchUrl=www.aviasales.com%2Fsearch&color_button=%230C3D38&color_icons=%23C8963E&dark=%23082826&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%230C3D38&border_radius=6&no_labels=&plain=true&promo_id=7879&campaign_id=100",
    fallbackHref: "https://www.aviasales.com/?marker=419143",
  },
} as const;

export const timeZone = "Asia/Colombo";

export const mainNav = [
  { href: "/hajj/", label: "Hajj" },
  { href: "/umrah/", label: "Umrah" },
  { href: "/saudi-tours/", label: "Saudi Tours" },
  { href: "/services/", label: "Services" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
] as const;
