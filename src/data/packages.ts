import type { Highlight, ItineraryItem, TourPackage } from "./types";

/**
 * The single source of truth for every Hajj and Umrah package.
 *
 * The home page "Upcoming group tours", the Hajj and Umrah listings, the
 * package detail pages, the sitemap and structured data all read from this
 * array. To publish a new departure, add an entry here and redeploy.
 *
 * Only copy information the agency has published or confirmed in writing.
 */

/* ------------------------------------------------------------------------ */
/* Hajj 2027 — content from flyalsafaa.com/hajj-2027/ (Aug 2026 revision)   */
/* ------------------------------------------------------------------------ */

const hajj2027Inclusions = [
  "Accommodation in Makkah & Madinah",
  "Luxury transport in Saudi Arabia",
  "City tour — Makkah & Madinah",
  "Full board — buffet meals",
  "B Category Mina tents",
  "Experienced guides",
  "Air ticket, visa & insurance",
];

const hajj2027Exclusions = ["Qurban (approx. 720 SAR)", "Additional tours (Taif, Jeddah)"];

const hajjDateNotice =
  "Dates are subject to adjustment by ±1 day based on changes in the Arabic calendar.";

const tents: Highlight = {
  title: "B Category tents in Mina",
  body: "Category B tents in Mina ensure a comfortable, well-equipped stay so pilgrims can focus on their ibadah.",
  list: [
    "Gypsum board tents",
    "Air conditioning",
    "Sofa beds",
    "Regular cleaning services",
    "Daily buffet meals",
    "Wi-Fi access",
    "Dedicated first aid clinic",
    "Dining halls",
    "Security cameras",
    "Shaded hallways",
    "Artificial grass pathways",
    "Spray fans for cooling",
  ],
};

const privateBus: Highlight = {
  title: "Private group bus",
  body: "An exclusive private bus is arranged for the group during the Hajj days, eliminating long waits and overcrowding for timely, comfortable transport.",
};

const shuttleVan: Highlight = {
  title: "Shuttle van to the Haram",
  body: "A dedicated shuttle van serves pilgrims at the shifting hotel before Hajj — free, easy travel to Masjid al-Haram, maximising time in the Haram.",
};

const elafKinda: Highlight = {
  title: "Elaf Kinda Hotel",
  body: "The 5-star Elaf Kinda Hotel sits adjacent to the Clock Tower, just steps from Masjid al-Haram — with direct access to the Masjid, skipping multiple elevators or a long lobby walk. Stylish rooms, full-board buffet, truly hassle-free.",
};

/** The 14-day group joins on 10 May; everything from then on is shared. */
const hajj2027Shared: ItineraryItem[] = [
  { date: "2027-05-13", hijri: "7 Dhu al-Hijjah 1448", title: "Leave for Mina", detail: "The group departs for Mina to begin the Hajj rites, staying in Category B tents." },
  { date: "2027-05-14", hijri: "8 Dhu al-Hijjah 1448", title: "Mina to Arafat", detail: "The group travels from Mina to Arafat ahead of the Day of Arafah." },
  { date: "2027-05-15", hijri: "9 Dhu al-Hijjah 1448", title: "Day of Arafah", detail: "The central day of Hajj — the standing (wuquf) at Arafat." },
  { date: "2027-05-16", hijri: "10 Dhu al-Hijjah 1448", title: "Muzdalifah, then return to Mina", detail: "Overnight in Muzdalifah, then return to Mina to continue the Hajj rites." },
  { date: "2027-05-17", hijri: "11 Dhu al-Hijjah 1448", title: "Stay in Mina", detail: "Continued stay in Mina for the days of Tashreeq." },
  { date: "2027-05-18", hijri: "12 Dhu al-Hijjah 1448", title: "Return to Rea Bakhsh Hotel", detail: "The group returns from Mina to the Rea Bakhsh Hotel in Makkah." },
  { date: "2027-05-20", hijri: "14 Dhu al-Hijjah 1448", title: "Leave for Madinah", detail: "The group transfers to Madinah for the closing days of the journey, staying at Sham Province Hotel." },
  { date: "2027-05-23", hijri: "17 Dhu al-Hijjah 1448", title: "Departure to Sri Lanka", detail: "The journey concludes with the return flight to Sri Lanka." },
];

const hajjImage = {
  src: "/images/photos/pilgrims-ihram.jpg",
  alt: "Pilgrims in white ihram garments in the courtyard of Masjid al-Haram, with the Kaaba behind them",
  credit: "pilgrims-ihram",
};

const hajjFlyer = {
  src: "/images/existing/hajj-2027-flyer.jpg",
  alt: "Al-Safaa Hajj 2027 announcement for the 22 days and 14 days packages. Limited seats available.",
};

/* ------------------------------------------------------------------------ */

export const packages: TourPackage[] = [
  {
    slug: "hajj-2027-22-days",
    type: "hajj",
    status: "published",
    availability: "limited",
    featured: true,
    title: "Hajj 2027 · 22 Days",
    season: "Hajj 2027",
    tagline: "The complete journey, beginning beside the Haram",
    summary:
      "Arrive in Makkah eight days before the Hajj rites and stay at the 5-star Elaf Kinda, steps from Masjid al-Haram, before moving with the group to Mina, Arafat and Muzdalifah and closing the journey in Madinah.",
    destination: "Makkah · Mina · Arafat · Madinah",
    departure: "2027-05-02",
    return: "2027-05-23",
    durationDays: 22,
    currency: "LKR",
    prices: [
      { label: "Standard", amount: 2_550_000 },
      { label: "Triple room", amount: 2_750_000 },
      { label: "Double room", amount: 2_950_000 },
    ],
    stays: [
      { city: "Makkah", hotel: "Elaf Kinda", stars: 5, duration: "9 days", note: "0 m from the Clock Tower", mapUrl: "https://maps.app.goo.gl/iVYar7Gui4uot7TU6" },
      { city: "Makkah", hotel: "Rea Bakhsh", duration: "5 days", note: "Shifting hotel, with shuttle to the Haram" },
      { city: "Madinah", hotel: "Sham Province", stars: 4, duration: "4 days", note: "Within 150 m, or similar" },
    ],
    highlights: [elafKinda, tents, privateBus, shuttleVan],
    itinerary: [
      { date: "2027-05-02", hijri: "25 Dhu al-Qa'dah 1448", title: "Arrival in Saudi Arabia", detail: "Pilgrims on the 22-day package arrive in Saudi Arabia and are transferred to Makkah." },
      { date: "2027-05-02", hijri: "25 Dhu al-Qa'dah 1448", title: "Check in at Elaf Kinda Hotel", detail: "Settle into the 5-star Elaf Kinda Hotel, steps from Masjid al-Haram." },
      { date: "2027-05-10", hijri: "4 Dhu al-Hijjah 1448", title: "Shift to Rea Bakhsh Hotel", detail: "The group transfers to the shifting hotel ahead of the Hajj days, with shuttle van service to the Haram. The 14-day group joins today." },
      ...hajj2027Shared,
    ],
    itineraryNote: hajjDateNotice,
    inclusions: hajj2027Inclusions,
    exclusions: hajj2027Exclusions,
    notices: [hajjDateNotice, "Limited seats available."],
    image: hajjImage,
    flyer: hajjFlyer,
    source: "https://flyalsafaa.com/hajj-2027/ (revised 10 Aug 2026); Hajj 2027 flyer (Sep 2026)",
  },
  {
    slug: "hajj-2027-14-days",
    type: "hajj",
    status: "published",
    availability: "limited",
    featured: true,
    title: "Hajj 2027 · 14 Days",
    season: "Hajj 2027",
    tagline: "A focused Hajj for those with less time away",
    summary:
      "Join the group in Makkah three days before the Hajj rites, perform Hajj together with the full Al-Safaa group, then spend the closing days in Madinah.",
    destination: "Makkah · Mina · Arafat · Madinah",
    departure: "2027-05-10",
    return: "2027-05-23",
    durationDays: 14,
    currency: "LKR",
    prices: [
      { label: "Standard", amount: 2_250_000 },
      { label: "Triple room", amount: 2_350_000 },
      { label: "Double room", amount: 2_550_000 },
    ],
    stays: [
      { city: "Makkah", hotel: "Rea Bakhsh", duration: "5 days", note: "With shuttle service to the Haram" },
      { city: "Madinah", hotel: "Sham Province", stars: 4, duration: "4 days", note: "Within 150 m, or similar" },
    ],
    highlights: [tents, privateBus, shuttleVan],
    itinerary: [
      { date: "2027-05-10", hijri: "4 Dhu al-Hijjah 1448", title: "Arrival in Saudi Arabia", detail: "Pilgrims on the 14-day package arrive and check in to Rea Bakhsh Hotel in Makkah." },
      ...hajj2027Shared,
    ],
    itineraryNote: hajjDateNotice,
    inclusions: hajj2027Inclusions,
    exclusions: hajj2027Exclusions,
    notices: [
      "This package does not include a stay at Elaf Kinda Hotel. For pilgrims' convenience, a dedicated van runs between the hotel and the Haram.",
      hajjDateNotice,
      "Limited seats available.",
    ],
    image: {
      src: "/images/photos/kaaba-crowd.jpg",
      alt: "Pilgrims performing tawaf around the Kaaba in Masjid al-Haram",
      credit: "kaaba-crowd",
    },
    flyer: hajjFlyer,
    source: "https://flyalsafaa.com/hajj-2027/ (revised 10 Aug 2026); Hajj 2027 flyer (Sep 2026)",
  },

  /* ---------------------------------------------------------------------- */
  /* Umrah — content from the home page popup "October Affordable Package"  */
  /* and the October 2026 flyer.                                             */
  /* ---------------------------------------------------------------------- */
  {
    slug: "umrah-october-2026",
    type: "umrah",
    status: "published",
    availability: "unknown",
    featured: true,
    title: "October Umrah 2026 · 10 Days",
    season: "Umrah · October 2026",
    tagline: "An affordable Umrah, Madinah first, with two Jumu'ahs",
    summary:
      "An excellent option for those looking for an affordable Umrah: comfortable accommodation within walking distance of both Harams and the essential services for a fulfilling journey. Arrive in Madinah first, then continue to Makkah.",
    destination: "Madinah · Makkah",
    departure: "2026-10-22",
    return: "2026-10-31",
    durationDays: 10,
    currency: "LKR",
    prices: [
      { label: "Shared room", amount: 395_000 },
      { label: "Triple room", amount: 435_000 },
      { label: "Double room", amount: 475_000 },
      { label: "Child", amount: 280_000, kind: "child", note: "Private rooms only" },
      { label: "Infant", amount: 100_000, kind: "infant" },
    ],
    stays: [
      { city: "Madinah", hotel: "Amjad Al Salam", duration: "3 nights", note: "150 m from Masjid an-Nabawi", mapUrl: "https://maps.app.goo.gl/fd8Van9zbKhixHjT8" },
      { city: "Makkah", hotel: "Muhajireen Al Hibba", duration: "6 nights", note: "550 m from Masjid al-Haram", mapUrl: "https://maps.app.goo.gl/h1EqrmCJVfxqHpoJ9" },
    ],
    flight: {
      airline: "Air Arabia",
      routing: "Colombo → Madinah · Taif → Colombo",
      notes: ["Madinah first", "Short transit, under 1 hour 30 minutes"],
    },
    facts: ["Two Jumu'ahs — one in Madinah, one in Makkah", "Walking distance to Masjid al-Haram and Masjid an-Nabawi"],
    highlights: [
      { title: "Walking distance", body: "Quality accommodation within walking distance of Masjid al-Haram and Masjid an-Nabawi." },
      { title: "Two Jumu'ahs", body: "Experience two blessed Jumu'ah prayers — one in Madinah and one in Makkah." },
      { title: "Madinah first", body: "Arrive via Madinah Airport and return from Taif Airport, conveniently located near Makkah." },
    ],
    itinerary: [
      { title: "Colombo to Madinah", detail: "Fly with Air Arabia, arriving in Madinah first, with a short transit of under 1 hour 30 minutes." },
      { title: "Three nights in Madinah", detail: "Stay at Amjad Al Salam, 150 m from Masjid an-Nabawi, with a city tour of Madinah." },
      { title: "Six nights in Makkah", detail: "Continue to Makkah for Umrah, staying at Muhajireen Al Hibba, 550 m from Masjid al-Haram, with a city tour of Makkah." },
      { title: "Taif to Colombo", detail: "Return to Sri Lanka from Taif Airport. The Taif tour itself is not included." },
    ],
    itineraryNote: "The journey outline follows the published package. A detailed day-by-day plan is shared with the group before departure.",
    inclusions: [
      "Accommodation in Makkah & Madinah",
      "Luxury bus transport in Saudi Arabia",
      "Sri Lankan food",
      "City tour — Makkah & Madinah",
      "Air ticket & visa",
      "Experienced guide",
    ],
    exclusions: ["Taif tour"],
    notices: [
      "Passport must be valid for 6 months from the return date.",
      "Tickets and visas are non-refundable.",
      "Child fares apply only to private rooms.",
      "Booking is confirmed only upon advance payment.",
    ],
    image: {
      src: "/images/photos/madinah-golden-hour.jpg",
      alt: "Masjid an-Nabawi in Madinah with its green dome and minarets in warm evening light",
      credit: "madinah-golden-hour",
    },
    flyer: {
      src: "/images/existing/umrah-october-2026-flyer.jpg",
      alt: "Al-Safaa October Umrah 2026 flyer: departure 22 October, return 31 October, Colombo–Madinah and Taif–Colombo.",
    },
    source: "flyalsafaa.com home page popup 'October Affordable Package'; October 2026 flyer (Sep 2026)",
  },
];
