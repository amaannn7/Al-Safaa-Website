import type { Metadata } from "next";
import Image from "next/image";
import { confirmedServices, sriLanka } from "@/data/services";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { AviasalesWidget } from "@/components/media/aviasales-widget";
import { WhatsAppButton } from "@/components/ui/button";
import { topicEnquiry } from "@/lib/contact";
import { cn } from "@/lib/cn";

/**
 * /services/ — keeps the old "Visit Sri Lanka" URL and content, and adds the
 * agency's flight-comparison partnership. Further services appear here once
 * confirmed in src/data/services.ts.
 */
export const metadata: Metadata = {
  title: "Travel Services — Flights & Visit Sri Lanka",
  description:
    "Compare and book cheap flights from over 1,000 airlines with our partner Aviasales, and discover Sri Lanka — beaches, hill country, heritage and Halal-friendly hospitality — with Al-Safaa Travels & Tours.",
  alternates: { canonical: "/services/" },
  openGraph: { url: "/services/", images: [{ url: sriLanka.hero.src }] },
};

export default function ServicesPage() {
  const flights = confirmedServices.find((s) => s.slug === "flights");
  const extra = confirmedServices.filter((s) => !["flights", "visit-sri-lanka"].includes(s.slug));

  return (
    <>
      <PageHero
        eyebrow="Travel services"
        title={
          <>
            Flights, and the island <em className="text-gold-400">we call home</em>.
          </>
        }
        lede="Beyond Hajj and Umrah, we help travellers find good fares and discover Sri Lanka."
        image={sriLanka.hero}
        crumbs={[{ name: "Travel services", path: "/services/" }]}
      />

      <section id="flights" aria-labelledby="flights-title" className="scroll-mt-24 py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow">Flight comparison</p>
            <h2 id="flights-title" className="display display-md mt-4">
              Find cheap flight tickets easily.
            </h2>
            {flights && <p className="lede mt-6 text-muted">{flights.summary}</p>}
          </div>
          <div className="rounded-[1.5rem] bg-sand-50 p-5 shadow-[0_30px_60px_-40px_rgba(6,31,29,.5)] sm:p-8 lg:col-span-7" data-reveal>
            <AviasalesWidget />
          </div>
        </div>
      </section>

      {extra.length > 0 && (
        <section aria-label="More services" className="border-t hairline py-20">
          <ul className="shell grid gap-8 md:grid-cols-3">
            {extra.map((s) => (
              <li key={s.slug} data-reveal>
                <h2 className="display text-3xl">{s.title}</h2>
                <p className="mt-3 text-muted">{s.summary}</p>
                <WhatsAppButton message={topicEnquiry(s.title.toLowerCase())} variant="ink" size="sm" className="mt-5">
                  Enquire
                </WhatsAppButton>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section id="visit-sri-lanka" aria-labelledby="sl-title" className="on-dark grain scroll-mt-24 bg-ink-900 py-24 text-white lg:py-32">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6" data-reveal>
              <p className="eyebrow">Visit Sri Lanka</p>
              <h2 id="sl-title" className="display display-lg mt-4">
                {sriLanka.title}
              </h2>
            </div>
            <p className="lede text-mist lg:col-span-6" data-reveal>
              {sriLanka.intro}
            </p>
          </div>

          <div className="mt-20 space-y-20 lg:space-y-28">
            {sriLanka.themes.map((t, i) => (
              <article key={t.title} className="grid gap-10 md:grid-cols-12 md:items-center">
                <div className={cn("md:col-span-6 lg:col-span-5", i % 2 === 1 && "md:order-2 lg:col-start-8")}>
                  <div className="relative aspect-[644/402] overflow-hidden rounded-[1.25rem]" data-reveal-image>
                    <Image src={t.image.src} alt={t.image.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                  </div>
                </div>
                <div className={cn("md:col-span-6", i % 2 === 0 ? "lg:col-start-7" : "md:order-1 lg:col-start-1")} data-reveal>
                  <span className="text-[0.75rem] font-bold text-gold-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-3 text-[2.5rem] leading-tight">{t.title}</h3>
                  <p className="mt-4 leading-relaxed text-mist">{t.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 flex flex-col items-start gap-6 border-t border-white/12 pt-12 md:flex-row md:items-center md:justify-between" data-reveal>
            <p className="display text-[2rem] leading-tight">Planning a visit to Sri Lanka?</p>
            <WhatsAppButton message={topicEnquiry("a holiday in Sri Lanka")}>Talk to us</WhatsAppButton>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
