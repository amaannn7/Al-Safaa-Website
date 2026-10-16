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
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/30 to-transparent" />
      </div>

      <div className="shell relative w-full pt-40 pb-12 md:pb-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow" data-hero-item>
              Hajj &amp; Umrah from Sri Lanka · Since {site.established}
            </p>
            <h1 className="display display-xl mt-6">
              <span className="block" data-hero-item>
                Your sacred journey,
              </span>
              <span className="block" data-hero-item>
                in <em className="text-gold-400">trusted</em> hands.
              </span>
            </h1>
            <p className="lede mt-7 max-w-xl text-white/80" data-hero-rise>
              Group pilgrimages arranged with care: accommodation close to the Haram, comfortable transport and experienced
              guidance, so your heart can stay with your ibadah.
            </p>
            <div className="mt-10 flex flex-wrap gap-3" data-hero-item>
              <LinkButton href="/hajj/" size="lg" arrow>
                Explore Hajj packages
              </LinkButton>
              <LinkButton href="/umrah/" size="lg" variant="outline-light" arrow>
                Explore Umrah packages
              </LinkButton>
            </div>
          </div>

          {next && next.departure && next.return && (
            <div className="lg:col-span-4 lg:justify-self-end" data-hero-item>
              <Link
                href={packageHref(next)}
                className="group block w-full max-w-sm border-t border-white/25 pt-5 transition-colors hover:border-gold-400 lg:w-80"
              >
                <span className="flex items-center justify-between text-[0.7rem] font-bold tracking-[0.22em] text-gold-400 uppercase">
                  Next group departure
                  <ArrowUpRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="display mt-3 block text-[1.9rem] leading-tight">{next.title}</span>
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
