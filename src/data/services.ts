import type { Image } from "./types";

/**
 * Secondary travel services. Anything with `confirmed: false` is NOT shown on
 * the site: flip it to true once the agency confirms they offer it as a
 * standalone service.
 */
export interface Service {
  slug: string;
  title: string;
  summary: string;
  confirmed: boolean;
  /** How the visitor acts on it. */
  action: "aviasales" | "whatsapp" | "page";
  href?: string;
}

export const services: Service[] = [
  {
    slug: "flights",
    title: "Flight comparison",
    summary:
      "Our partner Aviasales lets you compare cheap flights from over 1000 airlines worldwide. Absolutely no hidden fees or markups!",
    confirmed: true,
    action: "aviasales",
  },
  {
    slug: "visit-sri-lanka",
    title: "Visit Sri Lanka",
    summary: "The Paradise Island.",
    confirmed: true,
    action: "page",
    href: "/services/#visit-sri-lanka",
  },
  {
    slug: "visa",
    title: "Visa assistance",
    summary: "Help preparing visa applications for Saudi Arabia.",
    // Visas are confirmed only as part of Hajj/Umrah packages.
    confirmed: false,
    action: "whatsapp",
  },
  {
    slug: "hotels",
    title: "Hotel arrangements",
    summary: "Hotel arrangements in Makkah, Madinah and beyond.",
    confirmed: false,
    action: "whatsapp",
  },
  {
    slug: "haramain-train",
    title: "Haramain train",
    summary: "Tickets on the high-speed rail between Makkah, Jeddah and Madinah.",
    confirmed: false,
    action: "whatsapp",
  },
  {
    slug: "extended-stays",
    title: "Extended stays",
    summary: "Extend your stay before or after a group departure.",
    confirmed: false,
    action: "whatsapp",
  },
];

export const confirmedServices = services.filter((s) => s.confirmed);

/** Visit Sri Lanka: copied verbatim from flyalsafaa.com/services/. */
export const sriLanka = {
  title: "The Paradise Island",
  heading: "Why sri lanka?",
  intro:
    "Sri Lanka is a perfect holiday destination, offering a mix of stunning natural landscapes, rich cultural heritage, and Halal-friendly services. Travelers can relax on pristine beaches, explore lush tea plantations, and experience thrilling safaris with exotic wildlife. The island's historic sites, like Sigiriya and Anuradhapura, showcase a fascinating blend of ancient cultures, while Colombo provides modern luxuries, from shopping to fine dining with Halal options. With its welcoming atmosphere and diverse attractions, Sri Lanka promises an unforgettable journey for all visitors.",
  hero: {
    src: "/images/existing/sri-lanka-nine-arch.jpg",
    alt: "A red train crossing the Nine Arch Bridge in Sri Lanka's misty hill country",
  } satisfies Image,
  themes: [
    {
      title: "Architectural Heritage",
      body: "Sri Lanka boasts a fascinating mix of architectural styles, reflecting its rich cultural history influenced by Buddhism, Hinduism, Islam, and European colonization. One of the most iconic landmarks is the Jami Ul-Alfar Mosque, commonly known as the Red Mosque, in Colombo's bustling Fort area. Built in 1908, this striking structure features a unique blend of Indo-Saracenic design with red-and-white candy-striped patterns that captivate visitors. The mosque not only serves as a place of worship but is also a testament to the country's Islamic heritage and multicultural identity, making it a must-visit site for architecture and history enthusiasts alike.",
      image: { src: "/images/existing/fort-red-mosque.jpg", alt: "The red-and-white striped Jami Ul-Alfar Mosque in Colombo" },
    },
    {
      title: "Pristine Beaches",
      body: "Sri Lanka is renowned for its stunning beaches, each offering a unique experience for travelers. On the southwest coast, you'll find popular spots like Bentota and Unawatuna, where palm-fringed shores meet warm, turquoise waters, ideal for relaxation, snorkeling, and diving. The eastern coast, especially around Arugam Bay, is a surfer's paradise, drawing enthusiasts from around the world. The island's beaches are complemented by vibrant coral reefs, picturesque sunsets, and tranquil lagoons, making Sri Lanka a dream destination for beach lovers.",
      image: { src: "/images/existing/beach.jpg", alt: "A palm-fringed beach on Sri Lanka's coast" },
    },
    {
      title: "Hill Country",
      body: "The Hill Country of Sri Lanka is a breathtaking region filled with misty mountains, lush tea plantations, and scenic train rides. Places like Nuwara Eliya, Ella, and Kandy are famous for their cool climate, stunning waterfalls, and expansive greenery, providing a refreshing contrast to the tropical lowlands. Travelers can explore historic tea estates, enjoy panoramic viewpoints like Lipton's Seat, and visit the sacred Temple of the Tooth in Kandy. The Hill Country's natural beauty and cultural sites make it a peaceful retreat and a highlight of any trip to Sri Lanka.",
      image: { src: "/images/existing/hill-country-sri-lanka.jpg", alt: "Tea plantations across Sri Lanka's green hill country" },
    },
    {
      title: "Warm Hospitality",
      body: "Sri Lanka's people are often recognized for their warm smiles and welcoming nature, making visitors feel at home from the moment they arrive. Known for their genuine friendliness, locals are eager to share their culture, offer travel tips, and even invite travelers to experience traditional Sri Lankan hospitality. This kindness is reflected in everyday interactions, whether in bustling cities or remote villages. The warmth and openness of Sri Lankans add a special charm to the travel experience, making it easy for visitors to connect with the island on a personal level.",
      image: { src: "/images/existing/people.jpg", alt: "Two smiling Sri Lankan women" },
    },
  ],
};
