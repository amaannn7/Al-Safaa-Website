import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { packages } from "@/data/packages";
import { site } from "@/config/site";
import { upcomingDepartures, daysUntil } from "@/lib/packages";
import { formatRange } from "@/lib/format";
import { getTodayInColombo } from "@/lib/today";
import { packageHref, typeLabel } from "@/components/packages/bits";
import hero from "../../../public/images/photos/kaaba-mataf.jpg";

export async function Hero() {
  const today = await getTodayInColombo();
  const next = upcomingDepartures(packages, today, { limit: 1 })[0];

  return (
    <section className="on-dark relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink-950 text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src={hero}
          alt="Pilgrims performing tawaf around the Kaaba in the open courtyard of Masjid al-Haram, Makkah"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          quality={75}
          data-hero-media
          className="object-cover object-[50%_45%]"
        />
        {/* Neutral black shading only behind the text (bottom and left); the rest of the photo stays in its real colours. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 from-0% via-black/50 via-45% to-black/5 to-90%" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 via-55% to-transparent" />
        <div className="absolute inset-0 bg-black/25 md:hidden" />
      </div>

      <div className="on-photo shell relative w-full pt-40 pb-12 md:pb-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <p className="eyebrow" data-hero-item>
              Al-Safaa Travels &amp; Tours
            </p>
            <h1 className="display display-xl mt-6">
              <span className="block" data-hero-rise>
                Built on trust.
              </span>
              <span className="block" data-hero-rise>
                <em className="text-gold-400">Dedicated</em> to pilgrims.
              </span>
            </h1>
            <p className="lede mt-7 max-w-xl text-white/80" data-hero-rise>
              Trusted by thousands of pilgrims since {site.established}.
            </p>
            <div className="mt-10 flex flex-wrap gap-3" data-hero-item>
              <LinkButton href="/hajj-2027/" size="lg" arrow>
                Hajj 2027
              </LinkButton>
              <LinkButton href="/umrah/" size="lg" variant="outline-light" arrow>
                Umrah
              </LinkButton>
            </div>
          </div>

          {next && next.departure && next.return && (
            <div className="lg:col-span-3 lg:justify-self-end" data-hero-item>
              <Link
                href={packageHref(next)}
                className="group block w-full max-w-sm border-t border-white/25 pt-5 transition-colors hover:border-gold-400 lg:w-72"
              >
                <span className="flex items-center justify-between label text-gold-400">
                  Upcoming group tour
                  <ArrowUpRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="display mt-3 block text-[1.9rem] leading-tight text-balance">{next.title}</span>
                <span className="mt-2 block text-sm text-white/70">
                  {typeLabel[next.type]} · {formatRange(next.departure, next.return)}
                  {daysUntil(next.departure, today) <= 60 && <> · departs in {daysUntil(next.departure, today)} days</>}
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <span className="horizon absolute inset-x-0 bottom-0" data-horizon aria-hidden />
    </section>
  );
}
