export type PackageType = "hajj" | "umrah" | "tour";

/** draft and cancelled packages are never shown publicly. */
export type PublishStatus = "draft" | "published" | "cancelled";

/** Only set "sold-out" / "limited" when the agency has said so. */
export type Availability = "open" | "limited" | "sold-out" | "unknown";

/** Calendar date in Sri Lanka, "YYYY-MM-DD". No times, no time zones. */
export type IsoDate = `${number}-${number}-${number}`;

export interface Image {
  src: string;
  alt: string;
  /** Key into src/data/credits.ts when the photo needs attribution. */
  credit?: string;
}

export interface PriceTier {
  label: string;
  amount: number;
  /** Child / infant fares are excluded from the "from" price. */
  kind?: "adult" | "child" | "infant";
  note?: string;
}

export interface Stay {
  city: "Makkah" | "Madinah" | "Mina";
  hotel: string;
  stars?: number;
  duration: string;
  note?: string;
  mapUrl?: string;
}

export interface ItineraryItem {
  date?: IsoDate;
  hijri?: string;
  title: string;
  detail: string;
}

export interface Highlight {
  title: string;
  body: string;
  list?: string[];
}

export interface TourPackage {
  slug: string;
  type: PackageType;
  status: PublishStatus;
  availability: Availability;

  title: string;
  /** e.g. "Hajj 2027": groups related packages together. */
  season: string;
  tagline: string;
  summary: string;
  destination: string;

  /** null when the agency has not confirmed dates yet. */
  departure: IsoDate | null;
  return: IsoDate | null;
  durationDays: number;

  currency: "LKR";
  prices: PriceTier[];
  priceNote?: string;

  stays: Stay[];
  flight?: { airline: string; routing: string; notes: string[] };
  facts?: string[];
  highlights: Highlight[];
  itinerary: ItineraryItem[];
  itineraryNote?: string;
  inclusions: string[];
  exclusions: string[];
  notices: string[];

  image: Image;
  /** The agency's own poster for this departure (shown on the home page). */
  flyer?: Image & { width: number; height: number };
  /** Title of the home page card, as on the old site. Defaults to `season`. */
  cardTitle?: string;
  /** Where "Learn More" goes when several packages share a season page. */
  seasonHref?: string;
  /** Where the information was taken from, for future audits. */
  source: string;
}
