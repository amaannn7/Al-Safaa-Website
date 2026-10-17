import Image from "next/image";
import { ArrowLink } from "@/components/ui/button";
import { site } from "@/config/site";

/** Excerpt of the old About page. */
export function Legacy() {
  const stats = [
    { value: String(site.established), label: "Founded" },
    { value: site.pilgrimsGuided, label: "Travelers guided" },
  ];

  return (
    <section aria-labelledby="legacy" className="py-24 lg:py-36">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="relative lg:col-span-5">
          <div className="arch relative mx-auto aspect-[3/4] max-w-md lg:max-w-none" data-reveal-image>
            <Image
              src="/images/photos/haram-monochrome.jpg"
              alt="Masjid al-Haram in black and white, with pilgrims gathered around the Kaaba"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-16 lg:pl-8">
          <p className="eyebrow" data-reveal>
            About us
          </p>
          <h2 id="legacy" className="display display-md mt-5" data-reveal>
            A trusted name in Hajj and Umrah services.
          </h2>
          <div className="prose-calm lede mt-8 max-w-2xl text-muted" data-reveal>
            <p>
              Founded in 1997 by {site.leadership.founders}, our company has been a trusted name in Hajj and Umrah services
              for over two decades. As pioneers in organizing group tours to the holy pilgrimage sites in Saudi Arabia, we have
              had the honor of guiding more than 3,000 travelers on their spiritual journeys.
            </p>
            <p>
              Now under the leadership of {site.leadership.current}, we continue to uphold the values and traditions established
              by our founders.
            </p>
          </div>

          <dl className="mt-14 grid grid-cols-1 border-t hairline xs:grid-cols-2" data-reveal-group>
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col border-b hairline py-6 xs:border-b-0 xs:pr-6">
                <dt className="order-2 mt-2 block meta text-muted">{s.label}</dt>
                <dd className="display order-1 text-[3.25rem] leading-none text-ink-900 tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>

          <ArrowLink href="/about/" className="mt-10 text-ink-900">
            More about us
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
