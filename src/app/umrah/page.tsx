import type { Metadata } from "next";
import { packages } from "@/data/packages";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { PackageListItem } from "@/components/packages/package-list-item";
import { WhatsAppButton } from "@/components/ui/button";
import { listablePackages } from "@/lib/packages";
import { topicEnquiry } from "@/lib/contact";
import { getTodayInColombo } from "@/lib/today";

export const metadata: Metadata = {
  title: "Umrah Packages",
  description:
    "Umrah group tours from Colombo with Al-Safaa Travels & Tours. An affordable Umrah experience with comfortable accommodation and essential services.",
  alternates: { canonical: "/umrah/" },
  openGraph: { url: "/umrah/", images: [{ url: "/images/photos/madinah-golden-hour.jpg" }] },
};

const umrahMessage = topicEnquiry("your Umrah packages");

export default async function UmrahPage() {
  const today = await getTodayInColombo();
  const list = listablePackages(packages, today, "umrah");

  return (
    <>
      <PageHero
        compact
        eyebrow="Upcoming group tours"
        title="Umrah"
        image={{ src: "/images/photos/madinah-courtyard.jpg", alt: "The minarets and arcades of Masjid an-Nabawi in Madinah" }}
        crumbs={[{ name: "Umrah", path: "/umrah/" }]}
      >
        <WhatsAppButton message={umrahMessage} size="lg">
          WhatsApp us
        </WhatsAppButton>
      </PageHero>

      <section aria-labelledby="umrah-tours" className="py-24 lg:py-32">
        <div className="shell">
          <h2 id="umrah-tours" className="sr-only">
            Upcoming group tours
          </h2>
          {list.length ? (
            <div className="space-y-28">
              {list.map((p, i) => (
                <PackageListItem key={p.slug} pkg={p} today={today} flip={i % 2 === 1} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border hairline p-10 text-center" data-reveal>
              <p className="display text-3xl">There are no Umrah group tours scheduled right now.</p>
              <WhatsAppButton message={umrahMessage} className="mt-8 h-auto min-h-12 max-w-full whitespace-normal py-3 text-center">
                Get in touch with us for more info
              </WhatsAppButton>
            </div>
          )}
        </div>
      </section>

      <FinalCta message={umrahMessage} image={{ src: "/images/photos/madinah-golden-hour.jpg", alt: "Masjid an-Nabawi in warm evening light" }} />
    </>
  );
}
