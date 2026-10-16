import type { Metadata } from "next";
import Image from "next/image";
import { packages } from "@/data/packages";
import { videos } from "@/data/media";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { FinalCta } from "@/components/sections/final-cta";
import { PackageListItem } from "@/components/packages/package-list-item";
import { YouTubeLite } from "@/components/media/youtube-lite";
import { WhatsAppButton } from "@/components/ui/button";
import { listablePackages } from "@/lib/packages";
import { topicEnquiry } from "@/lib/contact";
import { getTodayInColombo } from "@/lib/today";

export const metadata: Metadata = {
  title: "Umrah Packages from Sri Lanka",
  description:
    "Group Umrah packages from Colombo with Al-Safaa Travels & Tours — accommodation within walking distance of the Harams, Sri Lankan food, city tours of Makkah and Madinah, air ticket and visa, and an experienced guide.",
  alternates: { canonical: "/umrah/" },
  openGraph: { url: "/umrah/", images: [{ url: "/images/photos/madinah-golden-hour.jpg" }] },
};

const umrahMessage = topicEnquiry("your upcoming Umrah departures");

/** From the inclusions of the agency's current Umrah package. */
const arranged = [
  { title: "Air ticket & visa", body: "Flights from Colombo and your Umrah visa, arranged together." },
  { title: "Close to the Harams", body: "Accommodation in Makkah and Madinah within walking distance of Masjid al-Haram and Masjid an-Nabawi." },
  { title: "Luxury bus transport", body: "Comfortable group transport throughout your time in Saudi Arabia." },
  { title: "Sri Lankan food", body: "Familiar meals, so you feel at home while you are far from it." },
  { title: "City tours", body: "Guided visits in both Makkah and Madinah." },
  { title: "An experienced guide", body: "Someone beside the group who knows each rite and every route." },
];

export default async function UmrahPage() {
  const today = await getTodayInColombo();
  const list = listablePackages(packages, today, "umrah");
  const umrahVideo = videos.find((v) => v.topic === "umrah");

  return (
    <>
      <PageHero
        eyebrow="Umrah packages"
        title={
          <>
            Umrah, <em className="text-gold-400">thoughtfully</em> arranged.
          </>
        }
        lede="The lesser pilgrimage, open to pilgrims throughout the year. Travel with an Al-Safaa group from Colombo, with every arrangement taken care of, from your visa to your hotel near the Haram."
        image={{ src: "/images/photos/madinah-courtyard.jpg", alt: "The minarets and arcades of Masjid an-Nabawi in Madinah" }}
        crumbs={[{ name: "Umrah", path: "/umrah/" }]}
      >
        <WhatsAppButton message={umrahMessage} size="lg">
          Umrah enquiry
        </WhatsAppButton>
      </PageHero>

      <section aria-labelledby="arranged" className="py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal>
              What we arrange
            </p>
            <h2 id="arranged" className="display display-md mt-4" data-reveal>
              Everything taken care of, from Colombo and back.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted" data-reveal>
              Our Umrah groups are planned so you can give your time to worship. These are the arrangements included in our
              Umrah packages; each departure lists its exact inclusions.
            </p>
            <div className="arch relative mt-12 hidden aspect-[3/4] max-w-xs lg:block" data-reveal-image>
              <Image src="/images/photos/madinah-minarets.jpg" alt="Minarets of Masjid an-Nabawi rising into the sky" fill sizes="320px" className="object-cover" />
            </div>
          </div>
          <ul className="grid gap-px self-start overflow-hidden rounded-[1.5rem] border hairline bg-[color-mix(in_oklab,var(--color-ink-900)_14%,transparent)] sm:grid-cols-2 lg:col-span-7" data-reveal-group>
            {arranged.map((a, i) => (
              <li key={a.title} className="bg-sand-50 p-8">
                <span className="text-[0.75rem] font-bold text-gold-700 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-4 text-[1.85rem] leading-tight">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{a.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="departures" className="border-t hairline bg-sand-200/60 py-24 lg:py-32">
        <div className="shell">
          <SectionHeading
            eyebrow="Upcoming Umrah departures"
            title={<span id="departures">Join our next group.</span>}
            lede="Prices are per person, by room sharing. Child and infant fares are listed on each package."
          />
          <div className="mt-20 space-y-28">
            {list.map((p, i) => (
              <PackageListItem key={p.slug} pkg={p} today={today} flip={i % 2 === 1} />
            ))}
          </div>

          <div
            className="on-dark grain mt-24 flex flex-col items-start gap-8 rounded-[1.75rem] bg-ink-900 p-8 text-white sm:p-12 md:flex-row md:items-center md:justify-between"
            data-reveal
          >
            <div>
              <p className="eyebrow">{list.length ? "Looking for different dates?" : "New departures coming soon"}</p>
              <p className="display mt-3 text-[2.25rem] leading-tight">
                {list.length ? "Ask us about our next Umrah groups." : "Our next Umrah dates are being arranged."}
              </p>
              <p className="mt-3 max-w-xl text-mist">
                New Umrah departures are announced on WhatsApp and our social channels first. Message us and we&apos;ll keep you
                informed.
              </p>
            </div>
            <WhatsAppButton message={umrahMessage} size="lg">
              Ask about dates
            </WhatsAppButton>
          </div>
        </div>
      </section>

      {umrahVideo && (
        <section aria-labelledby="umrah-talk" className="py-24 lg:py-32">
          <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5" data-reveal>
              <p className="eyebrow">Preparing for Umrah</p>
              <h2 id="umrah-talk" className="display display-md mt-4">
                Umrah bayan{umrahVideo.speaker ? ` with ${umrahVideo.speaker}` : ""}.
              </h2>
              <p className="mt-5 leading-relaxed text-muted">
                A talk for pilgrims preparing for Umrah{umrahVideo.language ? `, in ${umrahVideo.language}` : ""}, from the
                Al-Safaa YouTube channel.
              </p>
            </div>
            <div className="lg:col-span-7" data-reveal>
              <YouTubeLite id={umrahVideo.id} title={umrahVideo.title} />
            </div>
          </div>
        </section>
      )}

      <FinalCta
        title="Plan your Umrah with us."
        message={umrahMessage}
        image={{ src: "/images/photos/madinah-golden-hour.jpg", alt: "Masjid an-Nabawi in warm evening light" }}
      />
    </>
  );
}
