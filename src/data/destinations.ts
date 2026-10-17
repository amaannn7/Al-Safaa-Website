import type { Image } from "./types";

/**
 * Saudi Arabia destinations. Only destinations the agency already promotes on
 * flyalsafaa.com are listed. To add one (e.g. Jeddah), confirm with the agency
 * that they arrange it, then add an entry.
 */
export interface Destination {
  slug: string;
  name: string;
  epithet: string;
  description: string;
  image?: Image;
}

/** Verbatim from the old home page "Explore saudi arabia" section. */
export const saudiIntro =
  "The Kingdom of Saudi Arabia, renowned for Hajj and Umrah pilgrimages, offers a diverse range of tourist destinations beyond its religious significance. These destinations, along with many others, highlight Saudi Arabia's growing appeal as a dynamic and multifaceted travel destination.";

export const destinations: Destination[] = [
  {
    slug: "alula",
    name: "AlUla",
    epithet: "Historic city",
    description:
      "The historic city of Al Ula, with its ancient rock formations and archaeological wonders, invites travelers to delve into the rich cultural heritage of the region.",
    image: {
      src: "/images/photos/alula-elephant-rock.jpg",
      alt: "Elephant Rock, a natural sandstone arch in the desert near AlUla",
      credit: "alula-elephant-rock",
    },
  },
  {
    slug: "umluj",
    name: "Umluj",
    epithet: "The “Saudi Maldives”",
    description:
      "Visitors can explore the pristine beaches of Umluj, often referred to as the “Saudi Maldives.”",
    // Supplied by the client. Source and licence to be confirmed (see launch checklist).
    image: {
      src: "/images/photos/umluj.jpg",
      alt: "Aerial view of a ring of overwater villas around a turquoise lagoon on Saudi Arabia's Red Sea coast",
    },
  },
  {
    slug: "riyadh",
    name: "Riyadh",
    epithet: "High-tech city",
    description: "Experience the rapidly transforming high-tech city of Riyadh.",
    image: {
      src: "/images/photos/riyadh-kingdom-centre.jpg",
      alt: "The Kingdom Centre tower in Riyadh against a pink evening sky",
      credit: "riyadh-kingdom-centre",
    },
  },
];
