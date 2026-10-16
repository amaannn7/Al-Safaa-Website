import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/config/site";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { ArrowLink } from "@/components/ui/button";
import { YouTubeIcon } from "@/components/icons";
import { getTodayInColombo } from "@/lib/today";

export const metadata: Metadata = {
  title: "About Us — Hajj & Umrah Specialists since 1997",
  description:
    "Founded in 1997 by Mr. A.L.M Farook and Mrs. M.H.M Inaya Farook, Al-Safaa Travels & Tours has guided more than 3,000 pilgrims to the holy sites. Now led by Mr. Omar Farook.",
  alternates: { canonical: "/about/" },
  openGraph: { url: "/about/", images: [{ url: "/images/photos/makkah-city.jpg" }] },
};

/** Vision and mission — verbatim from the company's About page. */
const vision =
  "To be a global leader in providing exceptional and personalized travel experiences, while maintaining our legacy as the premier provider of Hajj and Umrah services, fostering a sense of trust, devotion, and unforgettable journeys for travelers worldwide.";
const mission =
  "Our mission is to offer seamless, spiritually fulfilling, and memorable travel experiences, ensuring the highest standards of service and care. We aim to expand our global reach by delivering diverse and enriching tourism opportunities, while continuing to uphold the values of trust, integrity, and dedication that have defined our Hajj and Umrah services for decades.";

export default async function AboutPage() {
  const years = Number((await getTodayInColombo()).slice(0, 4)) - site.established;

  return (
    <>
      <PageHero
        eyebrow={`About Al-Safaa · Since ${site.established}`}
        title={
          <>
            A trusted name in Hajj &amp; Umrah, <em className="text-gold-400">for {years} years</em>.
          </>
        }
        image={{ src: "/images/photos/makkah-city.jpg", alt: "The Abraj Al Bait clock tower and hotels of central Makkah" }}
        crumbs={[{ name: "About", path: "/about/" }]}
      />

      <section aria-labelledby="story" className="py-24 lg:py-36">
        <div className="shell grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow" data-reveal>
              Our story
            </p>
            <p className="display mt-6 text-[7rem] leading-none text-gold-700 tabular-nums lg:text-[9rem]" data-reveal>
              1997
            </p>
            <p className="mt-2 text-muted" data-reveal>
              Founded in Colombo
            </p>
          </div>
          <div className="lg:col-span-8">
            <h2 id="story" className="display display-md" data-reveal>
              Founded in 1997 by {site.leadership.founders}.
            </h2>
            <div className="prose-calm lede mt-8 max-w-3xl text-muted" data-reveal>
              <p>
                Our company has been a trusted name in Hajj and Umrah services for over two decades. As pioneers in organising
                group tours to the holy pilgrimage sites in Saudi Arabia, we have had the honour of guiding more than 3,000
                travellers on their spiritual journeys.
              </p>
              <p>
                Our reputation is built on a foundation of exceptional service, attention to detail, and a deep understanding of
                the needs of our clients. While we remain committed to providing world-class Hajj and Umrah experiences, we are
                proud to expand our offerings into global tourism, helping travellers explore destinations around the world.
              </p>
              <p>
                Now under the leadership of {site.leadership.current}, we continue to uphold the values and traditions
                established by our founders, ensuring that every journey, whether spiritual or worldly, is memorable and
                fulfilling.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Then and now" className="pb-24 lg:pb-36">
        <div className="shell grid gap-6 md:grid-cols-2">
          <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] md:aspect-[4/5]" data-reveal-image>
            <Image src="/images/photos/haram-monochrome.jpg" alt="Masjid al-Haram in black and white" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/85 to-transparent p-8 pt-24 text-white">
              <span className="eyebrow on-dark block">Then</span>
              <span className="display mt-2 block text-[2rem] leading-tight">Pioneers in organising group tours to the holy sites.</span>
            </figcaption>
          </figure>
          <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] md:mt-24" data-reveal-image>
            <Image src="/images/photos/madinah-umbrellas.jpg" alt="The courtyard of Masjid an-Nabawi at sunset" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/85 to-transparent p-8 pt-24 text-white">
              <span className="eyebrow on-dark block">Now</span>
              <span className="display mt-2 block text-[2rem] leading-tight">{site.pilgrimsGuided} pilgrims guided, now led by {site.leadership.current}.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-label="Vision and mission" className="on-dark grain bg-ink-900 py-24 text-white lg:py-36">
        <div className="shell grid gap-16 lg:grid-cols-2 lg:gap-24">
          {[
            { k: "Our vision", v: vision },
            { k: "Our mission", v: mission },
          ].map((b) => (
            <div key={b.k} data-reveal>
              <p className="eyebrow">{b.k}</p>
              <span className="horizon mt-6 w-24" aria-hidden />
              <p className="display mt-8 text-[1.75rem] leading-snug sm:text-[2.1rem]">{b.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="values" className="py-24 lg:py-32">
        <div className="shell">
          <p className="eyebrow" data-reveal>
            What guides us
          </p>
          <ul id="values" className="mt-8 grid border-t hairline md:grid-cols-3" data-reveal-group>
            {["Trust", "Integrity", "Dedication"].map((v, i) => (
              <li key={v} className="border-b hairline py-10 md:border-r md:border-b-0 md:px-10 md:first:pl-0 md:last:border-r-0">
                <span className="text-[0.75rem] font-bold text-gold-700 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="display mt-3 block text-[3.5rem] leading-none">{v}</span>
              </li>
            ))}
          </ul>
          <div className="mt-16 flex flex-wrap items-center gap-8" data-reveal>
            <ArrowLink href="/resources/" className="text-ink-900">
              Our Hajj &amp; Umrah talks
            </ArrowLink>
            <a href="https://www.youtube.com/@flyalsafaa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[0.8rem] font-bold tracking-[0.16em] text-ink-900 uppercase hover:text-gold-700">
              <YouTubeIcon size={18} /> Al-Safaa on YouTube
            </a>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
