import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BedDouble, CalendarDays } from "lucide-react";
import { packages } from "@/data/packages";
import type { IsoDate, TourPackage } from "@/data/types";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { HighlightList, IncludesExcludes, ItineraryTimeline } from "@/components/packages/detail-parts";
import { StatusPill, packageHref } from "@/components/packages/bits";
import { ArrowLink, CallButton, WhatsAppButton } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/config/site";
import { canEnquire } from "@/lib/packages";
import { formatAmount, formatDate } from "@/lib/format";
import { packageEnquiry, topicEnquiry } from "@/lib/contact";
import { getTodayInColombo } from "@/lib/today";

/**
 * The Hajj 2027 season page. This URL (/hajj-2027/) is the old site's most
 * valuable page, so it keeps its address and all of its content — now as
 * real, indexable HTML instead of script-injected widgets.
 */

export const metadata: Metadata = {
  title: "Hajj 2027 Packages from Sri Lanka — 22 & 14 Days",
  description:
    "Hajj 2027 with Al-Safaa Travels & Tours, Colombo. 22-day package (2–23 May 2027) from LKR 2,550,000 with Elaf Kinda 5★, and 14-day package (10–23 May 2027) from LKR 2,250,000. Full itinerary, hotels, inclusions and B Category Mina tents.",
  alternates: { canonical: "/hajj-2027/" },
  openGraph: {
    url: "/hajj-2027/",
    title: "Hajj 2027 — 22 & 14 Day Packages | Al-Safaa Travels & Tours",
    images: [{ url: "/images/existing/hajj-2027-flyer.jpg", alt: "Hajj 2027 bookings now open" }],
  },
};

const SEASON = "Hajj 2027";

export default async function Hajj2027Page() {
  const today = await getTodayInColombo();
  const season = packages.filter((p) => p.season === SEASON && p.status === "published").sort((a, b) => b.durationDays - a.durationDays);
  if (!season.length) notFound();
  const full = season[0];

  return (
    <>
      <PageHero
        tall
        eyebrow="Trusted by thousands of pilgrims since 1997"
        title={
          <>
            Hajj <span className="text-gold-400">2027</span>
          </>
        }
        lede={<p className="text-[0.85rem] font-bold tracking-[0.2em] uppercase">5-Star Rated · Built on Trust · Known for Comfort</p>}
        image={{ src: "/images/photos/pilgrims-ihram.jpg", alt: "Pilgrims in white ihram in the courtyard of Masjid al-Haram" }}
        crumbs={[
          { name: "Hajj", path: "/hajj/" },
          { name: "Hajj 2027", path: "/hajj-2027/" },
        ]}
        aside={
          <p className="text-white/80 lg:text-right">
            Two packages · {season.map((p) => `${p.durationDays} days`).join(" & ")}
            <br />
            Bookings now open · Limited seats
          </p>
        }
      >
        <WhatsAppButton message={topicEnquiry("the Hajj 2027 packages")} size="lg">
          Reserve your place
        </WhatsAppButton>
        <CallButton e164={site.contact.phones[0].e164} variant="outline-light" size="lg">
          Call {site.contact.phones[0].display}
        </CallButton>
      </PageHero>

      {/* Packages, side by side */}
      <section aria-labelledby="compare" className="py-24 lg:py-32">
        <div className="shell">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow">The packages</p>
            <h2 id="compare" className="display display-md mt-4">
              Two ways to perform Hajj 2027 with Al-Safaa.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-2" data-reveal-group>
            {season.map((p, i) => (
              <PackageColumn key={p.slug} pkg={p} today={today} emphasis={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section aria-labelledby="itinerary" className="border-t hairline bg-sand-50 py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32" data-reveal>
              <p className="eyebrow">Tour itinerary</p>
              <h2 id="itinerary" className="display display-md mt-4">
                The journey, date by date.
              </h2>
              <p className="mt-5 leading-relaxed text-muted">
                The 22-day group arrives on 2 May; the 14-day group joins on 10 May, and both travel together from then on. Tap a
                date to see the day&apos;s plan.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ItineraryTimeline items={full.itinerary} note={full.itineraryNote} />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section aria-labelledby="highlights" className="on-dark grain bg-ink-900 py-24 text-white lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal>
              Package highlights
            </p>
            <h2 id="highlights" className="display display-md mt-4" data-reveal>
              Comfort where it matters most.
            </h2>
            <div className="relative mt-10 hidden aspect-[4/5] max-w-sm overflow-hidden rounded-[1.75rem] lg:block" data-reveal-image>
              <Image src="/images/photos/makkah-clock-tower.jpg" alt="The Abraj Al Bait clock tower, beside the Elaf Kinda hotel" fill sizes="380px" className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <HighlightList items={full.highlights} dark />
          </div>
        </div>
      </section>

      {/* Covered */}
      <section aria-labelledby="covered" className="py-24 lg:py-32">
        <div className="shell">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow">What&apos;s covered</p>
            <h2 id="covered" className="display display-md mt-4">
              Included in both Hajj 2027 packages.
            </h2>
          </div>
          <div className="mt-12">
            <IncludesExcludes pkg={full} />
          </div>

          <figure className="mt-24 grid items-center gap-10 md:grid-cols-[minmax(0,22rem)_1fr]" data-reveal>
            <div className="overflow-hidden rounded-xl shadow-[0_30px_60px_-30px_rgba(6,31,29,.6)]">
              <Image src="/images/existing/hajj-2027-flyer.jpg" alt="Al-Safaa Hajj 2027 — bookings now open. 22 days and 14 days packages. Limited seats available." width={1080} height={1350} sizes="352px" className="h-auto w-full" />
            </div>
            <figcaption>
              <p className="display display-sm">Reserve your place on the 2027 Hajj journey with Al-Safaa Travels &amp; Tours.</p>
              <p className="mt-4 text-muted">
                Call or WhatsApp {site.contact.whatsapp.display} · {site.address.street}, {site.address.locality}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <WhatsAppButton message={topicEnquiry("the Hajj 2027 packages")}>WhatsApp us</WhatsAppButton>
                <CallButton e164={site.contact.phones[0].e164} />
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      <FinalCta title="Limited seats. Let's talk soon." message={topicEnquiry("the Hajj 2027 packages")} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Hajj 2027 packages",
          itemListElement: season.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${site.url}${packageHref(p)}`,
            name: p.title,
          })),
        }}
      />
    </>
  );
}

function PackageColumn({ pkg, today, emphasis }: { pkg: TourPackage; today: IsoDate; emphasis: boolean }) {
  const [standard, ...others] = pkg.prices;
  return (
    <article
      className={
        emphasis
          ? "on-dark grain flex flex-col rounded-[1.75rem] bg-ink-900 p-8 text-white sm:p-10"
          : "flex flex-col rounded-[1.75rem] border hairline bg-sand-50 p-8 sm:p-10"
      }
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="display text-[2.6rem] leading-none">{pkg.durationDays} Days Package</h3>
        <StatusPill pkg={pkg} today={today} />
      </div>

      <div className="mt-8 border-t border-current/15 pt-6">
        <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase opacity-70">{standard.label} package</p>
        <p className="display mt-2 text-[3.5rem] leading-none tabular-nums">
          {formatAmount(standard.amount)} <span className="font-sans text-base tracking-wide opacity-70">LKR</span>
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[0.95rem]">
          {others.map((t) => (
            <li key={t.label}>
              <span className="opacity-70">{t.label}:</span> <span className="font-semibold">{formatAmount(t.amount)} LKR</span>
            </li>
          ))}
        </ul>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-current/15 pt-6">
        {[
          ["Departure", pkg.departure],
          ["Return", pkg.return],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.2em] uppercase opacity-70">
              <CalendarDays size={14} aria-hidden /> {k}
            </dt>
            <dd className="display mt-2 text-[1.75rem] leading-none">{v ? formatDate(v as IsoDate) : "TBC"}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 border-t border-current/15 pt-6">
        <p className="flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.2em] uppercase opacity-70">
          <BedDouble size={14} aria-hidden /> Stays
        </p>
        <ol className="mt-4 space-y-4">
          {pkg.stays.map((s) => (
            <li key={s.hotel} className="grid grid-cols-[4.5rem_1fr] gap-3">
              <span className="display text-[1.5rem] leading-none">{s.duration.replace(" days", "d")}</span>
              <span>
                <span className="font-semibold">
                  {s.hotel}
                  {s.stars ? ` ${s.stars}★` : ""}
                </span>
                <span className="block text-sm opacity-70">
                  {s.city} — {s.note}
                </span>
              </span>
            </li>
          ))}
        </ol>
        {pkg.notices
          .filter((n) => n.includes("Elaf Kinda"))
          .map((n) => (
            <p key={n} className="mt-6 rounded-xl bg-current/5 p-4 text-sm leading-relaxed">
              {n}
            </p>
          ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-5 pt-10">
        {canEnquire(pkg, today) && (
          <WhatsAppButton message={packageEnquiry(pkg)} variant={emphasis ? "gold" : "ink"}>
            Enquire
          </WhatsAppButton>
        )}
        <ArrowLink href={packageHref(pkg)}>Full details</ArrowLink>
      </div>
    </article>
  );
}

