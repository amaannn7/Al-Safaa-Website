import type { Image } from "./types";

/**
 * Secondary travel services. Anything with `confirmed: false` is NOT shown on
 * the site — flip it to true once the agency confirms they offer it as a
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
      "Our partner Aviasales lets you compare and book cheap flights from over 1,000 airlines worldwide. Absolutely no hidden fees or markups.",
    confirmed: true,
    action: "aviasales",
  },
  {
    slug: "visit-sri-lanka",
    title: "Visit Sri Lanka",
    summary:
      "Beaches, hill country, heritage and Halal-friendly hospitality — we welcome travellers to the island we call home.",
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
    summary: "Hotel bookings in Makkah, Madinah and beyond.",
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

/** Visit Sri Lanka — copy preserved from flyalsafaa.com/services/. */
export const sriLanka = {
  title: "The Paradise Island",
  intro:
    "Sri Lanka is a perfect holiday destination, offering a mix of stunning natural landscapes, rich cultural heritage, and Halal-friendly services. Travellers can relax on pristine beaches, explore lush tea plantations, and experience thrilling safaris with exotic wildlife. The island's historic sites, like Sigiriya and Anuradhapura, showcase a fascinating blend of ancient cultures, while Colombo provides modern luxuries, from shopping to fine dining with Halal options.",
  hero: {
    src: "/images/existing/sri-lanka-nine-arch.jpg",
    alt: "A red train crossing the Nine Arch Bridge in Sri Lanka's misty hill country",
  } satisfies Image,
  themes: [
    {
      title: "Architectural heritage",
      body: "Sri Lanka boasts a fascinating mix of architectural styles, reflecting its rich cultural history influenced by Buddhism, Hinduism, Islam, and European colonisation. One of the most iconic landmarks is the Jami Ul-Alfar Mosque, commonly known as the Red Mosque, in Colombo's bustling Pettah area. Built in 1908, its striking Indo-Saracenic design with red-and-white candy-striped patterns is a testament to the country's Islamic heritage and multicultural identity.",
      image: { src: "/images/existing/fort-red-mosque.jpg", alt: "The red-and-white striped Jami Ul-Alfar Mosque in Colombo" },
    },
    {
      title: "Pristine beaches",
      body: "On the southwest coast, popular spots like Bentota and Unawatuna offer palm-fringed shores and warm, turquoise waters — ideal for relaxation, snorkelling and diving. The east coast around Arugam Bay is a surfer's paradise, complemented by coral reefs, picturesque sunsets and tranquil lagoons.",
      image: { src: "/images/existing/beach.jpg", alt: "A palm-fringed beach on Sri Lanka's coast" },
    },
    {
      title: "Hill country",
      body: "Misty mountains, lush tea plantations and scenic train rides. Nuwara Eliya, Ella and Kandy are famous for their cool climate, waterfalls and expansive greenery — with historic tea estates, panoramic viewpoints like Lipton's Seat, and the sacred Temple of the Tooth in Kandy.",
      image: { src: "/images/existing/hill-country-sri-lanka.jpg", alt: "Tea plantations across Sri Lanka's green hill country" },
    },
    {
      title: "Warm hospitality",
      body: "Sri Lankans are known for their warm smiles and welcoming nature, eager to share their culture, offer travel tips, and invite travellers to experience traditional hospitality — in bustling cities and remote villages alike.",
      image: { src: "/images/existing/people.jpg", alt: "Two smiling Sri Lankan women" },
    },
  ],
};
