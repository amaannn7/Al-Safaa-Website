import type { Metadata } from "next";
import Image from "next/image";
import { packages } from "@/data/packages";
import { videos } from "@/data/media";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { FinalCta } from "@/components/sections/final-cta";
import { PackageListItem } from "@/components/packages/package-list-item";
import { YouTubeLite } from "@/components/media/youtube-lite";
import { ArrowLink, LinkButton, WhatsAppButton } from "@/components/ui/button";
import { listablePackages } from "@/lib/packages";
import { topicEnquiry } from "@/lib/contact";
import { getTodayInColombo } from "@/lib/today";

export const metadata: Metadata = {
  title: "Hajj Packages from Sri Lanka",
  description:
    "Group Hajj packages from Colombo with Al-Safaa Travels & Tours. Hajj 2027 — 22 and 14 day packages with Elaf Kinda, Rea Bakhsh and Sham Province hotels, B Category Mina tents and experienced guides.",
  alternates: { canonical: "/hajj/" },
  openGraph: { url: "/hajj/", images: [{ url: "/images/photos/kaaba-crowd.jpg" }] },
};

const hajjMessage = topicEnquiry("your Hajj packages");

export default async function HajjPage() {
  const today = await getTodayInColombo();
  const list = listablePackages(packages, today, "hajj");
  const hajjVideos = videos.filter((v) => v.topic === "hajj").slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow="Hajj packages"
        title={
          <>
            Hajj, with people who <em className="text-gold-400">know the way</em>.
          </>
        }
        lede="Group Hajj from Colombo, arranged in detail from Makkah to Mina, Arafat, Muzdalifah and Madinah, with Al-Safaa beside you since 1997."
        image={{ src: "/images/photos/kaaba-crowd.jpg", alt: "Pilgrims circling the Kaaba in Masjid al-Haram" }}
        crumbs={[{ name: "Hajj", path: "/hajj/" }]}
        aside={<Talbiyah />}
      >
        <WhatsAppButton message={hajjMessage} size="lg">
          Hajj enquiry
        </WhatsAppButton>
        <LinkButton href="/hajj-2027/" variant="outline-light" size="lg" arrow>
          Hajj 2027 overview
        </LinkButton>
      </PageHero>

      <section aria-labelledby="packages" className="py-24 lg:py-32">
        <div className="shell">
          <SectionHeading
            eyebrow="Current packages"
            title={<span id="packages">Choose your Hajj journey.</span>}
            lede="Each package travels with the full Al-Safaa group through the days of Hajj. Prices are per person, by room sharing."
          />
          <div className="mt-20 space-y-28 lg:space-y-36">
            {list.length ? (
              list.map((p, i) => <PackageListItem key={p.slug} pkg={p} today={today} flip={i % 2 === 1} />)
            ) : (
              <div className="rounded-[1.5rem] border hairline p-10 text-center">
                <p className="display text-3xl">Our next Hajj packages are being prepared.</p>
                <p className="mx-auto mt-3 max-w-lg text-muted">Message us to be among the first to hear when the next packages are announced.</p>
                <WhatsAppButton message={hajjMessage} className="mt-8">
                  Notify me
                </WhatsAppButton>
              </div>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="prepare" className="on-dark grain bg-ink-900 py-24 text-white lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">Preparing for Hajj</p>
            <h2 id="prepare" className="display display-md mt-4">
              Understand each rite before you leave.
            </h2>
            <p className="mt-6 leading-relaxed text-mist">
              Talks from our Hajj programmes, shared on the Al-Safaa YouTube channel for pilgrims and their families.
            </p>
            <ArrowLink href="/resources/" className="mt-8 text-white">
              All resources
            </ArrowLink>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8" data-reveal-group>
            {hajjVideos.map((v) => (
              <div key={v.id}>
                <YouTubeLite id={v.id} title={v.title} />
                <p className="mt-3 text-sm text-mist-dim">
                  {[v.speaker, v.language].filter(Boolean).join(" · ") || "Al-Safaa Travels & Tours"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]" data-reveal-image>
            <Image src="/images/photos/makkah-clock-tower.jpg" alt="The Abraj Al Bait clock tower above Masjid al-Haram in Makkah" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div data-reveal>
            <p className="eyebrow">Hajj 2027 · May 2027</p>
            <h2 className="display display-md mt-4">Compare both Hajj 2027 packages side by side.</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-muted">
              Dates, hotels, room prices, the full day-by-day itinerary and what&apos;s included — on one page.
            </p>
            <LinkButton href="/hajj-2027/" variant="ink" className="mt-8" arrow>
              Hajj 2027 overview
            </LinkButton>
          </div>
        </div>
      </section>

      <FinalCta title="Your Hajj begins with a conversation." message={hajjMessage} />
    </>
  );
}

/** The opening of the Talbiyah — verified text, shown with transliteration and meaning. */
function Talbiyah() {
  return (
    <figure className="border-l border-gold-500/50 pl-6">
      <p lang="ar" dir="rtl" className="text-right text-[2rem] leading-[1.6] text-gold-300">
        لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ
      </p>
      <figcaption className="mt-3 text-sm text-white/70">
        <span className="block italic">Labbayk Allāhumma labbayk</span>
        <span className="block">“Here I am, O Allah, here I am.” — the opening of the Talbiyah</span>
      </figcaption>
    </figure>
  );
}
