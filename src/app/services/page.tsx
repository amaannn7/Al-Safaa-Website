import type { Metadata } from "next";
import Image from "next/image";
import { confirmedServices, sriLanka } from "@/data/services";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { FlightsLink } from "@/components/media/flights-link";
import { cn } from "@/lib/cn";

/**
 * /services/ keeps the old "Visit Sri Lanka" URL and its content, plus the
 * flight-comparison partner link that was on the old home page.
 */
export const metadata: Metadata = {
  title: "Visit Sri Lanka",
  description:
    "Sri Lanka is a perfect holiday destination, offering a mix of stunning natural landscapes, rich cultural heritage, and Halal-friendly services.",
  alternates: { canonical: "/services/" },
  openGraph: { url: "/services/", images: [{ url: sriLanka.hero.src }] },
};

export default function ServicesPage() {
  const flights = confirmedServices.find((s) => s.slug === "flights");

  return (
    <>
      <PageHero
        compact
        eyebrow="Visit Sri Lanka"
        title={sriLanka.title}
        image={sriLanka.hero}
        crumbs={[{ name: "Visit Sri Lanka", path: "/services/" }]}
      />

      <section id="visit-sri-lanka" aria-labelledby="sl-title" className="scroll-mt-24 py-24 lg:py-32">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <h2 id="sl-title" className="display display-md lg:col-span-4" data-reveal>
              {sriLanka.heading}
            </h2>
            <p className="lede text-muted lg:col-span-8" data-reveal>
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
                  <h3 className="display text-[2.25rem] leading-tight">{t.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{t.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="flights" aria-labelledby="flights-title" className="scroll-mt-24 border-t hairline bg-sand-200/70 py-24 lg:py-28">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6" data-reveal>
            <h2 id="flights-title" className="display display-md">
              Find cheap flight tickets easily
            </h2>
            {flights && <p className="lede mt-6 text-muted">{flights.summary}</p>}
          </div>
          <div className="lg:col-span-6" data-reveal>
            <FlightsLink />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
