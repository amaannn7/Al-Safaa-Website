import type { IsoDate, TourPackage } from "@/data/types";
import { availabilityLabel, daysUntil, phaseOf, startingPrice } from "@/lib/packages";
import { dateParts, formatAmount } from "@/lib/format";
import { cn } from "@/lib/cn";

export const typeLabel = { hajj: "Hajj", umrah: "Umrah", tour: "Tour" } as const;

export function packageHref(p: Pick<TourPackage, "type" | "slug">) {
  return `/${p.type}/${p.slug}/`;
}

export function DateBlock({ date, today, className }: { date: IsoDate | null; today?: IsoDate; className?: string }) {
  if (!date)
    return (
      <div className={cn("leading-none", className)}>
        <span className="display text-3xl">TBC</span>
        <span className="mt-2 block text-[0.7rem] font-bold tracking-[0.2em] uppercase opacity-70">Dates to follow</span>
      </div>
    );
  const d = dateParts(date);
  const days = today ? daysUntil(date, today) : null;
  return (
    <div className={cn("leading-none", className)}>
      <span className="display block text-[3.4rem] tabular-nums">{d.day}</span>
      <span className="mt-1 block text-[0.72rem] font-bold tracking-[0.2em] uppercase">
        {d.month} {d.year}
      </span>
      {days !== null && days > 0 && days <= 60 && (
        <span className="mt-2 block text-[0.75rem] font-semibold opacity-70">
          in {days} day{days === 1 ? "" : "s"}
        </span>
      )}
    </div>
  );
}

export function StatusPill({ pkg, today, className }: { pkg: TourPackage; today: IsoDate; className?: string }) {
  const s = availabilityLabel(pkg, today);
  if (!s) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.72rem] font-bold tracking-[0.08em] uppercase",
        s.tone === "limited" && "bg-gold-500/15 text-gold-800 on-dark:text-gold-400",
        s.tone === "open" && "bg-ink-600/12 text-ink-700 on-dark:bg-white/10 on-dark:text-white",
        s.tone === "closed" && "bg-ink-900/8 text-muted line-through decoration-1 on-dark:bg-white/8 on-dark:text-mist-dim",
        s.tone === "neutral" && "bg-ink-900/6 text-muted on-dark:bg-white/8 on-dark:text-mist",
        className,
      )}
    >
      {s.tone === "limited" && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />}
      {s.label}
    </span>
  );
}

export function FromPrice({ pkg, className, size = "md" }: { pkg: TourPackage; className?: string; size?: "md" | "lg" }) {
  const from = startingPrice(pkg);
  if (from === null) return <span className={className}>Price on request</span>;
  return (
    <span className={cn("block leading-none", className)}>
      <span className="block text-[0.7rem] font-bold tracking-[0.2em] uppercase opacity-70">From {pkg.currency}</span>
      <span className={cn("display mt-1.5 block tabular-nums", size === "lg" ? "text-5xl" : "text-[2rem]")}>{formatAmount(from)}</span>
    </span>
  );
}

export function TypeTag({ pkg, className }: { pkg: TourPackage; className?: string }) {
  return (
    <span className={cn("text-[0.7rem] font-bold tracking-[0.22em] uppercase text-gold-700 on-dark:text-gold-400", className)}>
      {typeLabel[pkg.type]}
    </span>
  );
}

export function isBookable(pkg: TourPackage, today: IsoDate) {
  const phase = phaseOf(pkg, today);
  return phase === "upcoming" || phase === "dates-tbc";
}
