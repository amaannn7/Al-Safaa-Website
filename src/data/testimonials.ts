/**
 * Curated, GENUINE testimonials only.
 *
 * Add a review here only when you can point to its source (a Google review,
 * a signed message from the pilgrim, etc.) and the reviewer has agreed to be
 * quoted. Quote verbatim: trimming with "…" is fine, rewording is not.
 * Spelling and punctuation stay exactly as the reviewer wrote them.
 *
 * While this list is empty (and GOOGLE_PLACES_API_KEY is not set) the home
 * page shows no reviews section at all.
 */
export interface Testimonial {
  quote: string;
  name: string;
  /** e.g. "Hajj 2025": only if the reviewer said so. */
  context?: string;
  /** Only when the exact date is known. Never estimate it. */
  date?: string;
  source: "Google" | "Direct";
  sourceUrl?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

/** Five Google reviews of the agency's Google Business Profile, supplied by the client from screenshots (Oct 2026). */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Alhamdulillah, I had the blessed opportunity to perform Hajj in the year 2026.\nI would like to sincerely express my heartfelt gratitude to Al Saffa Travels for their exceptional service throughout the journey. From the beginning to the completion of Hajj, their arrangements were well organized, comfortable, and highly reliable.\nThe guidance provided by the team was excellent and very clear, which made the entire pilgrimage smooth and peaceful. Their support at every stage gave us confidence and ease in performing the sacred rituals.\nMay Allah reward the entire team of Al Saffa Travels for their dedication and service, and grant them continued success in serving the guests of Allah.",
    name: "Mohamed Jawahar",
    context: "Hajj 2026",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "We’ve travelled with Al Safaa Travels before, which made choosing them again for Hajj an easy decision. From the preparation stage right through to the journey itself, everything was handled smoothly and professionally. Umar was always available to assist, answer questions, and ensure everyone was comfortable and well looked after. While Ibrahim Moulavi was always there for guidance, support, and valuable advice throughout the journey.\nHaving a team you can rely on allows you to focus on your ibadah without worrying about the logistics. We are grateful for their efforts and would highly recommend Al Safaa Travels to anyone looking for a well-organised and supportive Hajj or Umrah experience.",
    name: "Fazeel Zaneek",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "Alhamdulillah, words cannot fully express our gratitude to Al Safaa for making our Hajj journey so smooth, memorable, and spiritually uplifting. From the moment we departed until the completion of our Hajj, every effort was made to ensure that we were comfortable, cared for, and able to focus on our worship without worry.\n\nA special and heartfelt thanks to Umar and Ibrahim Moulavi, whose dedication, patience, and sincere concern for every pilgrim went far beyond what was expected. No request was too small, no question went unanswered, and they were always there to guide, support, and reassure us every step of the way.\n\nPerforming Hajj is the journey of a lifetime, and having a team that genuinely cares makes all the difference. I wholeheartedly and confidently recommend Al Safaa to anyone considering Hajj or Umrah.\nMay Allah reward the entire team abundantly, accept their efforts, and place immense barakah in all that they do. Ameen.",
    name: "azka zaneek",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "My wife, my mother, and I recently performed Hajj with Al Safaa Travels, and we are extremely grateful for their exceptional service. Al Safaa provided excellent guidance throughout, making the entire pilgrimage smooth, well-organized, and spiritually fulfilling.\nFrom accommodations and transportation to the management of all religious rituals, everything was handled efficiently, which greatly eased our journey and allowed us to focus on our worship.\nWe highly recommend Al Safaa Travels to anyone planning Hajj or Umrah. Their professionalism, care, and dedication truly made a positive difference in our experience.",
    name: "Ahamed Rosheen",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "My wife and I had an excellent Hajj 2026 experience with Al Safaa Travels. The journey was well organized and stress free. Special thanks to Ibrahim Moulavi for his guidance and to Omar for ensuring every pilgrim was well cared for. I'd highly recommend Al Safaa travels for Hajj and Umrah services. May Allah reward your efforts. Aameen",
    name: "Afkar Mohamed",
    context: "Hajj 2026",
    source: "Google",
    rating: 5,
  },
];
