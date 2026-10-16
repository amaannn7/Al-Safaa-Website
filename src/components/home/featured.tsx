import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { packages } from "@/data/packages";
import type { IsoDate, TourPackage } from "@/data/types";
import { ArrowLink } from "@/components/ui/button";
import { StatusPill, packageHref } from "@/components/packages/bits";
import { phaseOf, startingPrice } from "@/lib/packages";
import { formatAmount, formatRange } from "@/lib/format";
import { getTodayInColombo } from "@/lib/today";
import { cn } from "@/lib/cn";

/** Season artwork for the spreads; falls back to the first package's image. */
const seasonArt: Record<string, { src: string; alt: string; href?: string; intro: string }> = {
  "Hajj 2027": {
    src: "/images/photos/kaaba-crowd.jpg",
    alt: "Thousands of pilgrims in white circling the Kaaba",
    href: "/hajj-2027/",
    intro: "Two ways to perform Hajj with Al-Safaa in May 2027 — both travelling with the full group through Mina, Arafat and Muzdalifah.",
  },
  "Umrah · October 2026": {
    src: "/images/photos/madinah-umbrellas.jpg",
    alt: "The shaded courtyard of Masjid an-Nabawi at sunset, its great umbrellas open",
    intro: "An affordable ten-day Umrah with two Jumu'ahs, beginning in Madinah.",
  },
};

/** Featured packages, grouped into one editorial spread per season. */
export async function Featured() {
  const today = await getTodayInColombo();
  const live = packages.filter(
    (p) => p.status === "published" && p.featured && ["upcoming", "dates-tbc"].includes(phaseOf(p, today)),
  );
  const seasons = [...new Set(live.map((p) => p.season))].map((season) => ({
    season,
    items: live.filter((p) => p.season === season),
  }));
  if (!seasons.length) return null;

  return (
    <section aria-labelledby="featured" className="bg-sand-200/70 py-24 lg:py-36">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
          <div>
            <p className="eyebrow">Featured journeys</p>
            <h2 id="featured" className="display display-md mt-4">
              Packages, clearly laid out.
            </h2>
          </div>
          <p className="max-w-sm text-muted">Every price, hotel and date below comes straight from our current package details.</p>
        </div>

        <div className="mt-20 space-y-28 lg:space-y-36">
          {seasons.map((s, i) => (
            <Spread key={s.season} season={s.season} items={s.items} today={today} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Spread({ season, items, today, flip }: { season: string; items: TourPackage[]; today: IsoDate; flip: boolean }) {
  const art = seasonArt[season] ?? { src: items[0].image.src, alt: items[0].image.alt, intro: items[0].summary };
  const href = art.href ?? packageHref(items[0]);
  return (
    <article className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
      <div className={cn("relative lg:col-span-7", flip && "lg:order-2")}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]" data-reveal-image>
          <div className="absolute -inset-y-[8%] inset-x-0" data-parallax>
            <Image src={art.src} alt={art.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
          </div>
        </div>
      </div>
      <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
        <p className="eyebrow" data-reveal>
          {season}
        </p>
        <h3 className="display display-md mt-4" data-reveal>
          <Link href={href} className="hover:text-ink-700">
            {season.replace(" · ", " — ")}
          </Link>
        </h3>
        <p className="mt-5 leading-relaxed text-muted" data-reveal>
          {art.intro}
        </p>

        <ul className="mt-10 border-t hairline" data-reveal-group>
          {items.map((p) => {
            const from = startingPrice(p);
            return (
              <li key={p.slug} className="border-b hairline">
                <Link href={packageHref(p)} className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-6">
                  <span>
                    <span className="flex flex-wrap items-center gap-3">
                      <span className="display text-[1.65rem] leading-tight">{p.durationDays} days</span>
                      <StatusPill pkg={p} today={today} />
                    </span>
                    <span className="mt-1.5 block text-sm text-muted">
                      {p.departure && p.return ? formatRange(p.departure, p.return) : "Dates to be confirmed"} ·{" "}
                      {p.stays.map((st) => st.hotel).join(", ")}
                    </span>
                  </span>
                  <span className="flex items-center gap-4 text-right">
                    {from && (
                      <span className="block leading-none">
                        <span className="block text-[0.65rem] font-bold tracking-[0.2em] text-muted uppercase">From LKR</span>
                        <span className="display mt-1 block text-[1.6rem] tabular-nums">{formatAmount(from)}</span>
                      </span>
                    )}
                    <ArrowUpRight
                      size={18}
                      aria-hidden
                      className="shrink-0 text-gold-700 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <ArrowLink href={href} className="mt-8 text-ink-900">
          {items.length > 1 ? "Compare packages" : "View package"}
        </ArrowLink>
      </div>
    </article>
  );
}
