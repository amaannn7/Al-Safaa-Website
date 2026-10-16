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

export const saudiIntro =
  "The Kingdom of Saudi Arabia, renowned for Hajj and Umrah, offers a diverse range of destinations beyond its religious significance — from pristine Red Sea beaches to ancient rock-cut heritage and one of the fastest-changing capitals in the world.";

export const destinations: Destination[] = [
  {
    slug: "alula",
    name: "AlUla",
    epithet: "Ancient rock and desert heritage",
    description:
      "The historic city of AlUla, with its ancient rock formations and archaeological wonders, invites travellers to delve into the rich cultural heritage of the region.",
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
      "Visitors can explore the pristine beaches of Umluj on the Red Sea coast, often referred to as the “Saudi Maldives”.",
  },
  {
    slug: "riyadh",
    name: "Riyadh",
    epithet: "A capital in transformation",
    description: "Experience the rapidly transforming, high-tech capital city of Riyadh.",
    image: {
      src: "/images/photos/riyadh-kingdom-centre.jpg",
      alt: "The Kingdom Centre tower in Riyadh against a pink evening sky",
      credit: "riyadh-kingdom-centre",
    },
  },
];
