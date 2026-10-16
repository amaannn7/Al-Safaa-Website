import Image from "next/image";
import Link from "next/link";
import { BedDouble, CalendarDays, Clock } from "lucide-react";
import type { IsoDate, TourPackage } from "@/data/types";
import { ArrowLink, WhatsAppButton } from "@/components/ui/button";
import { canEnquire } from "@/lib/packages";
import { formatDate } from "@/lib/format";
import { packageEnquiry } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { FromPrice, StatusPill, packageHref } from "./bits";

/**
 * A package on the Hajj / Umrah listing pages: an editorial spread with the
 * image in an arch, alternating sides.
 */
export function PackageListItem({ pkg, today, flip = false }: { pkg: TourPackage; today: IsoDate; flip?: boolean }) {
  const href = packageHref(pkg);
  return (
    <article className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className={cn("group relative block lg:col-span-5", flip && "lg:order-2")}
      >
        <div className="arch relative aspect-[4/5] bg-sand-200" data-reveal-image>
          <Image
            src={pkg.image.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] ease-(--ease-premium) group-hover:scale-[1.04]"
          />
        </div>
      </Link>

      <div className={cn("lg:col-span-7", flip && "lg:order-1")} data-reveal>
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow">{pkg.season}</span>
          <StatusPill pkg={pkg} today={today} />
        </div>
        <h3 className="display display-md mt-4">
          <Link href={href} className="hover:text-ink-700">
            {pkg.title}
          </Link>
        </h3>
        <p className="mt-3 font-display text-xl text-gold-700 italic">{pkg.tagline}</p>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">{pkg.summary}</p>

        <dl className="mt-8 grid gap-x-8 gap-y-5 border-y hairline py-6 sm:grid-cols-3">
          <Fact icon={<CalendarDays size={16} strokeWidth={1.6} />} label="Departure">
            {pkg.departure ? formatDate(pkg.departure, { month: "short" }) : "To be confirmed"}
          </Fact>
          <Fact icon={<CalendarDays size={16} strokeWidth={1.6} />} label="Return">
            {pkg.return ? formatDate(pkg.return, { month: "short" }) : "To be confirmed"}
          </Fact>
          <Fact icon={<Clock size={16} strokeWidth={1.6} />} label="Duration">
            {pkg.durationDays} days
          </Fact>
        </dl>

        <div className="mt-6">
          <p className="flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.2em] text-muted uppercase">
            <BedDouble size={15} strokeWidth={1.6} aria-hidden /> Accommodation
          </p>
          <ul className="mt-3 space-y-1.5">
            {pkg.stays.map((s) => (
              <li key={s.hotel} className="flex flex-wrap items-baseline gap-x-2 text-[0.95rem]">
                <span className="font-semibold">
                  {s.hotel}
                  {s.stars ? ` ${s.stars}★` : ""}
                </span>
                <span className="text-muted">
                  {s.city} · {s.duration}
                  {s.note ? ` · ${s.note}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {pkg.highlights.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {pkg.highlights.map((h) => (
              <li key={h.title} className="rounded-full border hairline px-3.5 py-1.5 text-[0.8rem] font-semibold">
                {h.title}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-9 flex flex-wrap items-center justify-between gap-6">
          <FromPrice pkg={pkg} />
          <div className="flex flex-wrap items-center gap-5">
            {canEnquire(pkg, today) && <WhatsAppButton message={packageEnquiry(pkg)}>Enquire on WhatsApp</WhatsAppButton>}
            <ArrowLink href={href} className="text-ink-900">
              View details
            </ArrowLink>
          </div>
        </div>
      </div>
    </article>
  );
}

function Fact({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.2em] text-muted uppercase">
        <span aria-hidden className="text-gold-700">
          {icon}
        </span>
        {label}
      </dt>
      <dd className="mt-1.5 text-[1.05rem] font-semibold">{children}</dd>
    </div>
  );
}
