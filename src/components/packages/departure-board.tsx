import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bell } from "lucide-react";
import type { IsoDate, TourPackage } from "@/data/types";
import { WhatsAppButton } from "@/components/ui/button";
import { canEnquire } from "@/lib/packages";
import { formatRange } from "@/lib/format";
import { packageEnquiry, topicEnquiry } from "@/lib/contact";
import { DateBlock, FromPrice, StatusPill, TypeTag, packageHref } from "./bits";

/**
 * Upcoming group departures, styled as a refined departures board.
 * Receives an already filtered + sorted list (see upcomingDepartures()).
 */
export function DepartureBoard({ items, today }: { items: TourPackage[]; today: IsoDate }) {
  if (items.length === 0) return <EmptyBoard />;

  return (
    <ol className="border-t border-white/12" data-reveal-group>
      {items.map((p) => (
        <li key={p.slug} className="group relative border-b border-white/12">
          <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-5 py-8 transition-colors duration-500 lg:grid-cols-[9rem_5rem_minmax(0,1fr)_11rem_auto] lg:items-center lg:gap-x-8 lg:py-9">
            <DateBlock date={p.departure} today={today} className="text-white" />

            <div className="relative hidden h-24 w-20 lg:block">
              <div className="arch absolute inset-0 bg-ink-800">
                <Image
                  src={p.image.src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover opacity-85 transition-[transform,opacity] duration-700 ease-(--ease-premium) group-hover:scale-110 group-hover:opacity-100"
                />
              </div>
            </div>

            <div className="col-span-2 min-w-0 sm:col-span-1 lg:col-span-1">
              <div className="flex flex-wrap items-center gap-3">
                <TypeTag pkg={p} />
                <StatusPill pkg={p} today={today} />
              </div>
              <h3 className="display mt-3 text-[1.85rem] leading-[1.05] text-white sm:text-[2.1rem]">
                <Link
                  href={packageHref(p)}
                  className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                >
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2 text-[0.95rem] text-mist">
                {p.destination}
                {p.departure && p.return && (
                  <>
                    <span className="mx-2 text-white/30">·</span>
                    {formatRange(p.departure, p.return)}
                  </>
                )}
                <span className="mx-2 text-white/30">·</span>
                {p.durationDays} days
              </p>
            </div>

            <FromPrice pkg={p} className="text-white" />

            <div className="relative z-10 col-span-2 flex flex-wrap items-center gap-3 lg:col-span-1 lg:justify-end">
              {canEnquire(p, today) && (
                <WhatsAppButton message={packageEnquiry(p)} size="sm" label={`Enquire about ${p.title} on WhatsApp`}>
                  Enquire
                </WhatsAppButton>
              )}
              <Link
                href={packageHref(p)}
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/25 px-4 text-[0.8125rem] font-semibold text-white transition-colors hover:border-white/70"
                aria-label={`View details of ${p.title}`}
                tabIndex={-1}
              >
                Details
                <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
          {/* Hover rule */}
          <span aria-hidden className="pointer-events-none absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-gold-500 transition-transform duration-700 ease-(--ease-premium) group-hover:scale-x-100" />
        </li>
      ))}
    </ol>
  );
}

function EmptyBoard() {
  return (
    <div className="flex flex-col items-start gap-6 border-y border-white/12 py-12 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-4">
        <Bell size={22} strokeWidth={1.5} className="mt-1 shrink-0 text-gold-400" aria-hidden />
        <div>
          <p className="display text-3xl text-white">New departures are being arranged.</p>
          <p className="mt-2 max-w-xl text-mist">
            There are no scheduled group departures at the moment. Message us and we&apos;ll let you know as soon as the next
            Hajj or Umrah dates are confirmed.
          </p>
        </div>
      </div>
      <WhatsAppButton message={topicEnquiry("your next Hajj and Umrah group departures")}>Notify me</WhatsAppButton>
    </div>
  );
}
