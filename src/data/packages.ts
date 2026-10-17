import type { Highlight, ItineraryItem, TourPackage } from "./types";

/**
 * The single source of truth for every Hajj and Umrah package.
 *
 * The home page "Upcoming group tours", the Hajj 2027 and Umrah pages, the
 * package detail pages, the sitemap and structured data all read from this
 * array. To publish a new departure, add an entry here and redeploy.
 *
 * Wording is copied from the previous flyalsafaa.com site. Only add
 * information the agency has published or confirmed in writing.
 */

/* ------------------------------------------------------------------------ */
/* Hajj 2027: copied from flyalsafaa.com/hajj-2027/ (Aug 2026 revision).     */
/* Only change: the itinerary said "23 Day" / "15 Day" group; the packages   */
/* are 22 and 14 days.                                                       */
/* ------------------------------------------------------------------------ */

const hajj2027Summary =
  "Embark on a spiritually enriching Hajj journey with Al-Safaa Travels & Tours. Enjoy carefully arranged accommodation, comfortable transportation, dedicated group support, and reliable guidance throughout your pilgrimage allowing you to focus on your Ibadah with peace of mind.";

const hajj2027Inclusions = [
  "Accommodation in Makkah & Madinah",
  "Luxury transport in Saudi Arabia",
  "City tour, Makkah & Madina",
  "Full board, buffet meals",
  "B Category Mina tents",
  "Experienced guides",
  "Air ticket, visa & insurance",
];

const hajj2027Exclusions = ["Qurban (approx. 720 SAR)", "Additional tours (Taif, Jeddah)"];

const hajjDateNotice = "Dates are subject to adjustment by ±1 day based on changes in the Arabic calendar.";

const tents: Highlight = {
  title: "B Category Tents",
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

const elafKinda: Highlight = {
  title: "Elaf Kinda Hotel",
  body: "The 5-star Elaf Kinda Hotel sits adjacent to the Clock Tower, just steps from Masjid Al Haram, with direct access to the Masjid, skipping multiple elevators or a long lobby walk. Stylish rooms, full-board buffet, truly hassle-free.",
};

const privateBus: Highlight = {
  title: "Private Bus",
  body: "An exclusive private bus is arranged for the group during the Hajj days, eliminating long waits and overcrowding for timely, comfortable transport.",
};

const shuttleVan: Highlight = {
  title: "Shuttle Van",
  body: "A dedicated shuttle van serves pilgrims at the shifting hotel before Hajj: free, easy travel to Masjid Al Haram for 3 days, maximizing time in the Haram.",
};

const hajj2027Timeline: ItineraryItem[] = [
  { date: "2027-05-02", hijri: "Dhu'l-Qi'dah 25, 1448 AH", title: "Arrival of 22 Day Package Group", detail: "Pilgrims on the 22-day package arrive in Saudi Arabia and are transferred to Makkah." },
  { date: "2027-05-02", hijri: "Dhu'l-Qi'dah 25, 1448 AH", title: "Check-In at Elaf Kinda Hotel", detail: "Settle into the 5-star Elaf Kinda Hotel, steps from Masjid Al Haram." },
  { date: "2027-05-10", hijri: "Dhu'l-Hijjah 04, 1448 AH", title: "Shift to Rea Bakhsh Hotel", detail: "Group transfers to the shifting hotel ahead of the Hajj days, with shuttle van service to the Haram." },
  { date: "2027-05-10", hijri: "Dhu'l-Hijjah 04, 1448 AH", title: "Arrival of 14 Day Package Group", detail: "Pilgrims on the 14-day package arrive and check in to Rea Bakhsh Hotel." },
  { date: "2027-05-13", hijri: "Dhu'l-Hijjah 07, 1448 AH", title: "Leave to Mina", detail: "Group departs for Mina to begin the Hajj rites, staying in Category B tents." },
  { date: "2027-05-14", hijri: "Dhu'l-Hijjah 08, 1448 AH", title: "Leave to Arafat from Mina", detail: "Group travels from Mina to Arafat ahead of the Day of Arafah." },
  { date: "2027-05-15", hijri: "Dhu'l-Hijjah 09, 1448 AH", title: "Arafat Day", detail: "The central day of Hajj: the standing (Wuquf) at Arafat." },
  { date: "2027-05-16", hijri: "Dhu'l-Hijjah 10, 1448 AH", title: "Stay in Muzdalifah and Return to Mina", detail: "Overnight in Muzdalifah, then return to Mina to continue the Hajj rites." },
  { date: "2027-05-17", hijri: "Dhu'l-Hijjah 11, 1448 AH", title: "Stay in Mina", detail: "Continued stay in Mina for the days of Tashreeq." },
  { date: "2027-05-18", hijri: "Dhu'l-Hijjah 12, 1448 AH", title: "Return to Hotel in Rea Baksh", detail: "Group returns from Mina to the Rea Bakhsh Hotel in Makkah." },
  { date: "2027-05-20", hijri: "Dhu'l-Hijjah 14, 1448 AH", title: "Leave to Medina", detail: "Group transfers to Madinah for the closing days of the journey, staying at Sham Province Hotel." },
  { date: "2027-05-23", hijri: "Dhu'l-Hijjah 17, 1448 AH", title: "Departure to Sri Lanka", detail: "Journey concludes with the return flight to Sri Lanka." },
];

const hajjFlyer = {
  src: "/images/existing/hajj-2027-flyer.jpg",
  alt: "Al-Safaa Hajj 2027 poster: Since 1997. Built on Trust. Dedicated to Pilgrims. Bookings now open, 22 days package and 14 days package. Limited seats available. Call now.",
  width: 1080,
  height: 1350,
};

/* ------------------------------------------------------------------------ */

export const packages: TourPackage[] = [
  {
    slug: "hajj-2027-22-days",
    type: "hajj",
    status: "published",
    availability: "limited",
    title: "Hajj 2027 · 22 Days",
    season: "Hajj 2027",
    tagline: "A Journey of Faith & Comfort",
    cardTitle: "Hajj 2027: A Journey of Faith & Comfort",
    seasonHref: "/hajj-2027/",
    flyer: hajjFlyer,
    summary: hajj2027Summary,
    destination: "Makkah · Madinah",
    departure: "2027-05-02",
    return: "2027-05-23",
    durationDays: 22,
    currency: "LKR",
    prices: [
      { label: "Standard", amount: 2_550_000 },
      { label: "Triple Room", amount: 2_750_000 },
      { label: "Double Room", amount: 2_950_000 },
    ],
    stays: [
      { city: "Makkah", hotel: "Elaf Kinda", stars: 5, duration: "9 days", note: "0m from Clock Tower", mapUrl: "https://maps.app.goo.gl/iVYar7Gui4uot7TU6" },
      { city: "Makkah", hotel: "Rea Bakhsh", duration: "5 days", note: "Shifting hotel, with shuttle" },
      { city: "Madinah", hotel: "Sham Province", stars: 4, duration: "4 days", note: "Within 150m or similar" },
    ],
    highlights: [tents, elafKinda, privateBus, shuttleVan],
    itinerary: hajj2027Timeline,
    itineraryNote: hajjDateNotice,
    inclusions: hajj2027Inclusions,
    exclusions: hajj2027Exclusions,
    notices: [hajjDateNotice, "Limited seats available."],
    image: {
      src: "/images/photos/pilgrims-ihram.jpg",
      alt: "Pilgrims in white ihram garments in the courtyard of Masjid al-Haram, with the Kaaba behind them",
      credit: "pilgrims-ihram",
    },
    source: "https://flyalsafaa.com/hajj-2027/ (revised 10 Aug 2026); Hajj 2027 flyer (Sep 2026)",
  },
  {
    slug: "hajj-2027-14-days",
    type: "hajj",
    status: "published",
    availability: "limited",
    title: "Hajj 2027 · 14 Days",
    season: "Hajj 2027",
    tagline: "A Journey of Faith & Comfort",
    cardTitle: "Hajj 2027: A Journey of Faith & Comfort",
    seasonHref: "/hajj-2027/",
    flyer: hajjFlyer,
    summary: hajj2027Summary,
    destination: "Makkah · Madinah",
    departure: "2027-05-10",
    return: "2027-05-23",
    durationDays: 14,
    currency: "LKR",
    prices: [
      { label: "Standard", amount: 2_250_000 },
      { label: "Triple Room", amount: 2_350_000 },
      { label: "Double Room", amount: 2_550_000 },
    ],
    stays: [
      { city: "Makkah", hotel: "Rea Bakhsh", duration: "5 days", note: "With shuttle service" },
      { city: "Madinah", hotel: "Sham Province", stars: 4, duration: "4 days", note: "Within 150m or similar" },
    ],
    highlights: [tents, privateBus, shuttleVan],
    // The 14-day group joins on 10 May and shares the rest of the itinerary.
    itinerary: hajj2027Timeline.filter((i) => i.date! >= "2027-05-10" && i.title !== "Shift to Rea Bakhsh Hotel"),
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
    source: "https://flyalsafaa.com/hajj-2027/ (revised 10 Aug 2026); Hajj 2027 flyer (Sep 2026)",
  },

  /* ---------------------------------------------------------------------- */
  /* Umrah: copied from the old home page ("An Affordable Umrah Package in  */
  /* October" card and its "October Affordable Package" popup) and the      */
  /* October 2026 flyer.                                                     */
  /* ---------------------------------------------------------------------- */
  {
    slug: "umrah-october-2026",
    type: "umrah",
    status: "published",
    availability: "unknown",
    title: "October 2026 Umrah · 10 Days",
    season: "Umrah · October 2026",
    tagline: "October Affordable Package",
    cardTitle: "An Affordable Umrah Package in October",
    flyer: {
      src: "/images/existing/umrah-october-2026-flyer.jpg",
      alt: "Al-Safaa October Umrah 2026 poster: departure 22 October 2026, return 31 October 2026, Colombo to Medina and Taif to Colombo. Walking distance, two Jummahs, Madinah first.",
      width: 1080,
      height: 1080,
    },
    summary:
      "This package offers an excellent option for those looking for an affordable Umrah experience, providing comfortable accommodation and essential services to ensure a fulfilling and spiritual journey in Saudi Arabia.",
    destination: "Madinah · Makkah",
    departure: "2026-10-22",
    return: "2026-10-31",
    durationDays: 10,
    currency: "LKR",
    prices: [
      { label: "Shared Room", amount: 395_000 },
      { label: "Triple Room", amount: 435_000 },
      { label: "Double Room", amount: 475_000 },
      { label: "Child", amount: 280_000, kind: "child" },
      { label: "Infant", amount: 100_000, kind: "infant" },
    ],
    stays: [
      { city: "Madinah", hotel: "Amjad Al Salam", duration: "3 nights", note: "150M", mapUrl: "https://maps.app.goo.gl/fd8Van9zbKhixHjT8" },
      { city: "Makkah", hotel: "Muhajireen Al Hibba", duration: "6 nights", note: "550M", mapUrl: "https://maps.app.goo.gl/h1EqrmCJVfxqHpoJ9" },
    ],
    flight: {
      airline: "Air Arabia",
      routing: "Colombo to Medina | Taif to Colombo",
      notes: ["Medina First", "Short transit under 1 hour 30 minutes.", "2 Jummahs [Makkah & Medina]"],
    },
    highlights: [
      { title: "Walking Distance", body: "Quality accommodations within walking distance of Masjid Al-Haram & Masjid An-Nabawi." },
      { title: "Two Jummahs", body: "Experience two blessed Jummah prayers, one in Madinah and one in Makkah." },
      { title: "Madinah First", body: "Arrive via Madinah Airport and return from Taif Airport, conveniently located near Makkah." },
    ],
    itinerary: [],
    inclusions: [
      "Accommodations in Makkah & Madinah",
      "Luxury Bus Transports in Saudi Arabia",
      "Sri Lankan Food",
      "City Tour Makkah & Medina",
      "Air Ticket & Visa",
      "Experienced Guide",
    ],
    exclusions: [],
    notices: [
      "Passport must be valid 6 months from return.",
      "Tickets & visas are non-refundable.",
      "Child fares apply only to private rooms.",
      "Taif tour not included in the Package.",
      "Booking is confirmed only upon advance payment.",
    ],
    image: {
      src: "/images/photos/madinah-golden-hour.jpg",
      alt: "Masjid an-Nabawi in Madinah with its green dome and minarets in warm evening light",
      credit: "madinah-golden-hour",
    },
    source: "flyalsafaa.com home page card + popup 'October Affordable Package'; October 2026 flyer (Sep 2026)",
  },
];
