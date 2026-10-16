/**
 * Curated, GENUINE testimonials only.
 *
 * Add a review here only when you can point to its source (a Google review,
 * a signed message from the pilgrim, etc.) and the reviewer has agreed to be
 * quoted. Quote verbatim — trimming with "…" is fine, rewording is not.
 *
 * When this list is empty and GOOGLE_PLACES_API_KEY is not set, the site
 * shows a link to the Google profile instead of a testimonial section.
 */
export interface Testimonial {
  quote: string;
  name: string;
  /** e.g. "Hajj 2025 pilgrim" — only if the reviewer said so. */
  context?: string;
  date: string;
  source: "Google" | "Direct";
  sourceUrl?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

export const testimonials: Testimonial[] = [];
