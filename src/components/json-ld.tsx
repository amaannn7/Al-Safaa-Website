import { site } from "@/config/site";

/** Renders schema.org structured data. `<` is escaped so the JSON can't close the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const agencyId = `${site.url}/#agency`;

export function agencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": agencyId,
    name: site.name,
    alternateName: "Al-Safaa",
    url: `${site.url}/`,
    logo: `${site.url}/images/brand/alsafaa-logo.png`,
    image: `${site.url}/images/photos/kaaba-mataf.jpg`,
    description: site.description,
    foundingDate: String(site.established),
    founder: [
      { "@type": "Person", name: "A.L.M Farook" },
      { "@type": "Person", name: "M.H.M Inaya Farook" },
    ],
    email: site.contact.email,
    telephone: `+${site.contact.phones[0].e164}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: "Colombo",
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng },
    hasMap: site.google.profileUrl,
    areaServed: "LK",
    sameAs: site.social.map((s) => s.href),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}
