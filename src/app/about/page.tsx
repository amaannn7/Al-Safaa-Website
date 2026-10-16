import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in 1997 by Mr. A.L.M Farook and Mrs. M.H.M Inaya Farook, Al-Safaa Travels & Tours has guided more than 3,000 travelers on their spiritual journeys. Now under the leadership of Mr. Omar Farook.",
  alternates: { canonical: "/about/" },
  openGraph: { url: "/about/", images: [{ url: "/images/photos/makkah-city.jpg" }] },
};

/** Vision and mission: verbatim from the company's About page. */
const vision =
  "To be a global leader in providing exceptional and personalized travel experiences, while maintaining our legacy as the premier provider of Hajj and Umrah services, fostering a sense of trust, devotion, and unforgettable journeys for travelers worldwide.";
const mission =
  "Our mission is to offer seamless, spiritually fulfilling, and memorable travel experiences, ensuring the highest standards of service and care. We aim to expand our global reach by delivering diverse and enriching tourism opportunities, while continuing to uphold the values of trust, integrity, and dedication that have defined our Hajj and Umrah services for decades.";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Al-Safaa Travels & Tours"
        title="About us"
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
              Founded
            </p>
          </div>
          <div className="lg:col-span-8">
            <h2 id="story" className="display display-md" data-reveal>
              Founded in 1997 by {site.leadership.founders}.
            </h2>
            <div className="prose-calm lede mt-8 max-w-3xl text-muted" data-reveal>
              <p>
                Our company has been a trusted name in Hajj and Umrah services for over two decades. As pioneers in organizing
                group tours to the holy pilgrimage sites in Saudi Arabia, we have had the honor of guiding more than 3,000
                travelers on their spiritual journeys.
              </p>
              <p>
                Our reputation is built on a foundation of exceptional service, attention to detail, and a deep understanding of
                the needs of our clients. While we remain committed to providing world-class Hajj and Umrah experiences, we are
                proud to expand our offerings into global tourism, helping travelers explore destinations around the world.
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

      <FinalCta />
    </>
  );
}
