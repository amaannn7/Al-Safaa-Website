import { cacheLife } from "next/cache";
import { site } from "@/config/site";
import { testimonials } from "@/data/testimonials";

export interface DisplayReview {
  quote: string;
  name: string;
  profileUrl?: string;
  photo?: string;
  rating?: number;
  when?: string;
  context?: string;
  source: "Google" | "Direct";
  sourceUrl?: string;
}

export interface ReviewSummary {
  rating: number;
  count: number;
  url: string;
  /** true only when the figures come live from the Google Places API. */
  live?: boolean;
}

/**
 * Live Google reviews via the Places API (New): only when
 * GOOGLE_PLACES_API_KEY is set. Google returns at most 5 reviews; its terms
 * require showing the author attribution and linking back, which the
 * Reviews component does. Cached for a day.
 */
async function fetchGoogle(): Promise<{ summary: ReviewSummary; reviews: DisplayReview[] } | null> {
  "use cache";
  cacheLife("days");
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "places.rating,places.userRatingCount,places.googleMapsUri,places.reviews",
      },
      body: JSON.stringify({ textQuery: site.google.placeQuery, languageCode: "en" }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { places?: GooglePlace[] };
    const place = data.places?.[0];
    if (!place?.rating) return null;
    return {
      summary: { rating: place.rating, count: place.userRatingCount ?? 0, url: place.googleMapsUri ?? site.google.reviewsUrl, live: true },
      reviews: (place.reviews ?? [])
        .filter((r) => r.text?.text)
        .map((r) => ({
          quote: r.text!.text,
          name: r.authorAttribution?.displayName ?? "Google user",
          profileUrl: r.authorAttribution?.uri,
          photo: r.authorAttribution?.photoUri,
          rating: r.rating,
          when: r.relativePublishTimeDescription,
          source: "Google" as const,
          sourceUrl: r.googleMapsUri ?? place.googleMapsUri,
        })),
    };
  } catch {
    return null;
  }
}

type GooglePlace = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating?: number;
    text?: { text: string };
    relativePublishTimeDescription?: string;
    googleMapsUri?: string;
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  }[];
};

/** Curated testimonials first, then live Google reviews (if configured). */
export async function getReviews() {
  const google = await fetchGoogle();
  const curated: DisplayReview[] = testimonials.map((t) => ({
    quote: t.quote,
    name: t.name,
    rating: t.rating,
    when: t.date,
    context: t.context,
    source: t.source,
    sourceUrl: t.sourceUrl,
  }));
  const manual: ReviewSummary = { rating: site.google.rating, count: site.google.reviewCount, url: site.google.reviewsUrl };
  return { summary: google?.summary ?? manual, reviews: [...curated, ...(google?.reviews ?? [])] };
}
