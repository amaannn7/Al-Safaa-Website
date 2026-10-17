import Image from "next/image";
import { packages } from "@/data/packages";
import type { IsoDate, TourPackage } from "@/data/types";
import { EmptyBoard } from "@/components/packages/departure-board";
import { FromPrice, StatusPill, packageHref } from "@/components/packages/bits";
import { ArrowLink, WhatsAppButton } from "@/components/ui/button";
import { canEnquire, upcomingBySeason } from "@/lib/packages";
import { formatRange } from "@/lib/format";
import { packageEnquiry } from "@/lib/contact";
import { getTodayInColombo } from "@/lib/today";
import { cn } from "@/lib/cn";

/**
 * "Upcoming group tours": the agency's posters with their old-site titles
 * and descriptions. Reads the same package data as every other page; which
 * tours appear (and in what order) is decided by upcomingBySeason() against
 * today's date in Colombo, so a poster disappears after its departure.
 */
export async function Upcoming() {
  const today = await getTodayInColombo();
  const groups = upcomingBySeason(packages, today);

  return (
    <section id="departures" aria-labelledby="upcoming" className="on-dark grain bg-ink-900 py-24 text-white lg:py-32">
      <div className="shell">
        <h2 id="upcoming" className="display display-md mb-14" data-reveal>
          Upcoming group tours
        </h2>
        {groups.length === 0 ? (
          <EmptyBoard />
        ) : (
          <div className={cn("grid gap-16 lg:gap-12", groups.length > 1 && "lg:grid-cols-2")}>
            {groups.map((group) => (
              <TourCard key={group[0].season} group={group} today={today} single={groups.length === 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function TourCard({ group, today, single }: { group: TourPackage[]; today: IsoDate; single: boolean }) {
  const first = group[0];
  const href = first.seasonHref ?? packageHref(first);
  return (
    <article className={cn("flex min-w-0 flex-col gap-8", single && "lg:flex-row lg:items-center lg:gap-14")} data-reveal>
      {first.flyer && (
        <div className={cn("overflow-hidden rounded-[1.25rem] shadow-[0_30px_60px_-30px_rgba(0,0,0,.7)]", single ? "lg:w-[26rem] lg:shrink-0" : "mx-auto w-full max-w-[28rem]")}>
          <Image
            src={first.flyer.src}
            alt={first.flyer.alt}
            width={first.flyer.width}
            height={first.flyer.height}
            sizes="(min-width: 1024px) 28rem, 100vw"
            className="h-auto w-full"
          />
        </div>
      )}
      <div className={cn("min-w-0", !single && "mx-auto w-full max-w-[28rem]")}>
        <h3 className="display display-sm">{first.cardTitle ?? first.season}</h3>
        <p className="mt-4 leading-relaxed text-mist">{first.summary}</p>

        <ul className="mt-8 divide-y divide-white/12 border-y border-white/12">
          {group.map((p) => (
            <li key={p.slug} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5">
              <div>
                <p className="flex flex-wrap items-center gap-3 text-[1.05rem] font-medium">
                  {group.length > 1 ? `${p.durationDays} Days Package` : p.title}
                  <StatusPill pkg={p} today={today} />
                </p>
                {p.departure && p.return && <p className="mt-1 text-sm text-mist">{formatRange(p.departure, p.return)}</p>}
              </div>
              <FromPrice pkg={p} className="text-white [&_.display]:text-[1.6rem]" />
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          {group.some((p) => canEnquire(p, today)) && (
            <WhatsAppButton message={packageEnquiry(group[0])} label={`Enquire about ${first.cardTitle ?? first.season} on WhatsApp`}>
              Enquire
            </WhatsAppButton>
          )}
          <ArrowLink href={href} className="text-white">
            Learn More
          </ArrowLink>
        </div>
      </div>
    </article>
  );
}
