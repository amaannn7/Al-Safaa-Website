import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Plane } from "lucide-react";
import { packages } from "@/data/packages";
import type { IsoDate, PackageType, TourPackage } from "@/data/types";
import { PageHero } from "@/components/sections/page-hero";
import { CallButton, WhatsAppButton } from "@/components/ui/button";
import { JsonLd, agencyId } from "@/components/json-ld";
import { site } from "@/config/site";
import { canEnquire, phaseOf, relatedPackages, startingPrice } from "@/lib/packages";
import { formatDate, formatRange } from "@/lib/format";
import { packageEnquiry } from "@/lib/contact";
import { DateBlock, FromPrice, packageHref, typeLabel } from "./bits";
import { EnquiryCard } from "./enquiry-card";
import { HighlightList, IncludesExcludes, ItineraryTimeline, Notices, PriceTable, StayList } from "./detail-parts";

const listing = { hajj: { name: "Hajj", path: "/hajj/" }, umrah: { name: "Umrah", path: "/umrah/" }, tour: { name: "Saudi Tours", path: "/saudi-tours/" } } as const;

export function packageMetadata(pkg: TourPackage): Metadata {
  const dates = pkg.departure && pkg.return ? ` ${formatRange(pkg.departure, pkg.return)}.` : "";
  const from = startingPrice(pkg);
  const description = `${pkg.title} from Colombo with Al-Safaa Travels & Tours.${dates} ${pkg.stays.map((s) => s.hotel).join(", ")}.${from ? ` From ${pkg.currency} ${from.toLocaleString("en-LK")} per person.` : ""}`;
  const path = packageHref(pkg);
  return {
    title: `${pkg.title} Package from Sri Lanka`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${pkg.title} | Al-Safaa Travels & Tours`,
      description,
      url: path,
      images: [{ url: pkg.image.src, alt: pkg.image.alt }],
    },
  };
}

export function PackageDetail({ pkg, today }: { pkg: TourPackage; today: IsoDate }) {
  const phase = phaseOf(pkg, today);
  const related = relatedPackages(packages, pkg, today);
  const parent = listing[pkg.type];

  return (
    <>
      <PageHero
        tall
        eyebrow={pkg.season}
        title={pkg.title}
        lede={<p className="font-display text-[1.6rem] leading-snug text-white/90 italic">{pkg.tagline}</p>}
        image={pkg.image}
        crumbs={[parent, { name: pkg.title, path: packageHref(pkg) }]}
        aside={
          pkg.departure &&
          pkg.return && (
            <div className="flex items-end gap-6 border-l border-white/20 pl-6 lg:justify-self-end">
              <DateBlock date={pkg.departure} today={today} />
              <span className="mb-3 text-white/40">—</span>
              <DateBlock date={pkg.return} />
            </div>
          )
        }
      >
        {canEnquire(pkg, today) && (
          <>
            <WhatsAppButton message={packageEnquiry(pkg)} size="lg">
              Enquire on WhatsApp
            </WhatsAppButton>
            <CallButton e164={site.contact.phones[0].e164} variant="outline-light" size="lg" />
          </>
        )}
      </PageHero>

      {phase !== "upcoming" && phase !== "dates-tbc" && (
        <div className="bg-gold-500 text-ink-950">
          <p className="shell py-3 text-sm font-semibold">
            {phase === "completed" ? "This journey has been completed." : "This group is currently travelling."}{" "}
            <Link href={parent.path} className="underline underline-offset-4">
              See current {parent.name} departures
            </Link>
          </p>
        </div>
      )}

      <div className="shell grid gap-16 py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
        <div className="space-y-24 lg:col-span-8">
          {/* Overview */}
          <section aria-labelledby="overview">
            <p className="eyebrow" id="overview">
              Overview
            </p>
            <p className="display display-sm mt-5 max-w-3xl text-ink-900" data-reveal>
              {pkg.summary}
            </p>
            <dl className="mt-10 grid gap-6 border-t hairline pt-8 sm:grid-cols-3" data-reveal-group>
              <Fact label="Travel dates">{pkg.departure && pkg.return ? formatRange(pkg.departure, pkg.return) : "To be confirmed"}</Fact>
              <Fact label="Duration">{pkg.durationDays} days</Fact>
              <Fact label="Route">{pkg.destination}</Fact>
            </dl>
            {(pkg.flight || pkg.facts) && (
              <div className="mt-8 grid gap-6 rounded-[1.25rem] bg-sand-200/70 p-6 sm:grid-cols-2 sm:p-8" data-reveal>
                {pkg.flight && (
                  <div>
                    <p className="flex items-center gap-2 eyebrow">
                      <Plane size={14} strokeWidth={2} aria-hidden /> Flights
                    </p>
                    <p className="mt-3 font-semibold">{pkg.flight.airline}</p>
                    <p className="text-muted">{pkg.flight.routing}</p>
                    <ul className="mt-2 text-sm text-muted">
                      {pkg.flight.notes.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {pkg.facts && (
                  <ul className="space-y-3">
                    {pkg.facts.map((f) => (
                      <li key={f} className="display text-[1.35rem] leading-snug">
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </section>

          {/* Enquiry card appears inline on small screens */}
          <div className="lg:hidden">
            <EnquiryCard pkg={pkg} today={today} />
          </div>

          <section aria-labelledby="prices">
            <h2 id="prices" className="display display-md" data-reveal>
              Prices
            </h2>
            <p className="mt-3 text-muted" data-reveal>
              Per person, by room sharing.
            </p>
            <div className="mt-8" data-reveal>
              <PriceTable pkg={pkg} />
            </div>
          </section>

          <section aria-labelledby="stay">
            <h2 id="stay" className="display display-md" data-reveal>
              Where you&apos;ll stay
            </h2>
            <div className="mt-8">
              <StayList stays={pkg.stays} />
            </div>
          </section>

          <section aria-labelledby="itinerary">
            <h2 id="itinerary" className="display display-md" data-reveal>
              {pkg.itinerary.some((i) => i.date) ? "Day by day" : "Journey outline"}
            </h2>
            <div className="mt-10">
              <ItineraryTimeline items={pkg.itinerary} note={pkg.itineraryNote} />
            </div>
          </section>

          {pkg.highlights.length > 0 && (
            <section aria-labelledby="highlights">
              <h2 id="highlights" className="display display-md" data-reveal>
                Package highlights
              </h2>
              <div className="mt-8">
                <HighlightList items={pkg.highlights} />
              </div>
            </section>
          )}

          <section aria-labelledby="covered">
            <h2 id="covered" className="display display-md" data-reveal>
              What&apos;s covered
            </h2>
            <div className="mt-8">
              <IncludesExcludes pkg={pkg} />
            </div>
          </section>

          <Notices items={pkg.notices.filter((n) => n !== pkg.itineraryNote)} />

          {pkg.flyer && (
            <figure className="grid items-center gap-8 sm:grid-cols-[minmax(0,18rem)_1fr]" data-reveal>
              <div className="overflow-hidden rounded-xl shadow-[0_24px_50px_-28px_rgba(6,31,29,.6)]">
                <Image src={pkg.flyer.src} alt={pkg.flyer.alt} width={1080} height={1350} sizes="288px" className="h-auto w-full" />
              </div>
              <figcaption className="text-muted">
                <span className="eyebrow block">From our announcement</span>
                <span className="mt-3 block">The official flyer for this departure, as shared on our social channels.</span>
              </figcaption>
            </figure>
          )}
        </div>

        <aside className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-28">
            <EnquiryCard pkg={pkg} today={today} />
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="border-t hairline bg-sand-200/60 py-20 lg:py-24">
          <div className="shell">
            <h2 id="related" className="display display-md" data-reveal>
              You may also consider
            </h2>
            <ul className="mt-10 grid gap-8 md:grid-cols-2" data-reveal-group>
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={packageHref(r)} className="group grid grid-cols-[7rem_1fr] items-center gap-6 rounded-[1.5rem] bg-sand-50 p-4 pr-6 transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgba(6,31,29,.5)] sm:grid-cols-[9rem_1fr]">
                    <div className="arch relative aspect-[4/5]">
                      <Image src={r.image.src} alt="" fill sizes="144px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div>
                      <span className="eyebrow">{typeLabel[r.type]}</span>
                      <span className="display mt-2 block text-[1.75rem] leading-tight">{r.title}</span>
                      <span className="mt-2 block text-sm text-muted">
                        {r.departure && r.return ? formatRange(r.departure, r.return) : "Dates to be confirmed"}
                      </span>
                      <FromPrice pkg={r} className="mt-4 [&_.display]:text-2xl" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <JsonLd data={tripSchema(pkg, today)} />
    </>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[0.7rem] font-bold tracking-[0.2em] text-muted uppercase">{label}</dt>
      <dd className="mt-2 text-[1.05rem] font-semibold">{children}</dd>
    </div>
  );
}

function tripSchema(pkg: TourPackage, today: IsoDate) {
  const url = `${site.url}${packageHref(pkg)}`;
  const bookable = canEnquire(pkg, today);
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.summary,
    url,
    image: `${site.url}${pkg.image.src}`,
    touristType: pkg.type === "hajj" ? "Hajj pilgrims" : pkg.type === "umrah" ? "Umrah pilgrims" : "Travellers",
    provider: { "@id": agencyId },
    ...(pkg.departure ? { startDate: pkg.departure } : {}),
    ...(pkg.return ? { endDate: pkg.return } : {}),
    itinerary: {
      "@type": "ItemList",
      itemListElement: pkg.itinerary.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.date ? `${formatDate(it.date)} — ${it.title}` : it.title,
        description: it.detail,
      })),
    },
    offers: pkg.prices
      .filter((t) => !t.kind || t.kind === "adult")
      .map((t) => ({
        "@type": "Offer",
        name: t.label,
        price: t.amount,
        priceCurrency: pkg.currency,
        url,
        // Only state availability the agency has actually stated.
        ...(!bookable
          ? { availability: "https://schema.org/SoldOut" }
          : pkg.availability === "limited"
            ? { availability: "https://schema.org/LimitedAvailability" }
            : pkg.availability === "open"
              ? { availability: "https://schema.org/InStock" }
              : {}),
        seller: { "@id": agencyId },
      })),
  };
}

export function packageParams(type: PackageType) {
  return packages.filter((p) => p.type === type && p.status === "published").map((p) => ({ slug: p.slug }));
}
