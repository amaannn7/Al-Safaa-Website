import { timeZone } from "@/config/site";
import type { IsoDate, PackageType, TourPackage } from "@/data/types";

/**
 * Pure package logic. Nothing in this file reads the clock — callers pass in
 * `today` (a Sri Lanka calendar date) so the rules are easy to test and the
 * rendering layer decides how fresh "today" needs to be.
 */

/** The calendar date in Sri Lanka for a given instant, as "YYYY-MM-DD". */
export function isoDateInZone(instant: Date, zone: string = timeZone): IsoDate {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: zone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(instant) as IsoDate;
}

export function isPublic(p: TourPackage): boolean {
  return p.status === "published";
}

export type Phase = "upcoming" | "dates-tbc" | "travelling" | "completed";

/**
 * - upcoming:   departs after today
 * - travelling: departs today, or is between departure and return
 * - completed:  returned before today
 * A group is no longer advertised as "upcoming" from its departure day.
 */
export function phaseOf(p: TourPackage, today: IsoDate): Phase {
  if (!p.departure) return "dates-tbc";
  if (p.departure > today) return "upcoming";
  const end = p.return ?? p.departure;
  return end >= today ? "travelling" : "completed";
}

const byDepartureThenTitle = (a: TourPackage, b: TourPackage) =>
  (a.departure ?? "9999").localeCompare(b.departure ?? "9999") || a.title.localeCompare(b.title);

/**
 * Upcoming group departures: published, not cancelled, with a confirmed
 * departure date after today, nearest first.
 */
export function upcomingDepartures(
  all: readonly TourPackage[],
  today: IsoDate,
  opts: { type?: PackageType; limit?: number } = {},
): TourPackage[] {
  const list = all
    .filter(isPublic)
    .filter((p) => !opts.type || p.type === opts.type)
    .filter((p) => phaseOf(p, today) === "upcoming")
    .sort(byDepartureThenTitle);
  return opts.limit ? list.slice(0, opts.limit) : list;
}

/**
 * What a listing page shows: upcoming departures first (nearest first), then
 * published packages whose dates are still to be confirmed.
 */
export function listablePackages(all: readonly TourPackage[], today: IsoDate, type: PackageType): TourPackage[] {
  const ofType = all.filter((p) => isPublic(p) && p.type === type);
  const upcoming = ofType.filter((p) => phaseOf(p, today) === "upcoming").sort(byDepartureThenTitle);
  const tbc = ofType.filter((p) => phaseOf(p, today) === "dates-tbc").sort(byDepartureThenTitle);
  return [...upcoming, ...tbc];
}

export function findPackage(all: readonly TourPackage[], slug: string): TourPackage | undefined {
  return all.find((p) => p.slug === slug && isPublic(p));
}

/** Other public packages worth suggesting on a detail page. */
export function relatedPackages(all: readonly TourPackage[], current: TourPackage, today: IsoDate, limit = 2) {
  const others = all.filter((p) => p.slug !== current.slug && isPublic(p));
  const live = others.filter((p) => ["upcoming", "dates-tbc"].includes(phaseOf(p, today)));
  const sameType = live.filter((p) => p.type === current.type).sort(byDepartureThenTitle);
  const otherType = live.filter((p) => p.type !== current.type).sort(byDepartureThenTitle);
  return [...sameType, ...otherType].slice(0, limit);
}

export type AvailabilityLabel = { label: string; tone: "open" | "limited" | "closed" | "neutral" };

/** Never claims availability the agency hasn't stated. */
export function availabilityLabel(p: TourPackage, today: IsoDate): AvailabilityLabel | null {
  const phase = phaseOf(p, today);
  if (phase === "completed") return { label: "Completed", tone: "neutral" };
  if (phase === "travelling") return { label: "Group travelling", tone: "neutral" };
  if (p.availability === "sold-out") return { label: "Fully booked", tone: "closed" };
  if (p.availability === "limited") return { label: "Limited seats", tone: "limited" };
  if (p.availability === "open") return { label: "Seats available", tone: "open" };
  if (phase === "dates-tbc") return { label: "Dates to be confirmed", tone: "neutral" };
  return null;
}

export function canEnquire(p: TourPackage, today: IsoDate): boolean {
  const phase = phaseOf(p, today);
  return (phase === "upcoming" || phase === "dates-tbc") && p.availability !== "sold-out";
}

/** Lowest adult price — the honest "from" figure. */
export function startingPrice(p: TourPackage): number | null {
  const adult = p.prices.filter((t) => !t.kind || t.kind === "adult").map((t) => t.amount);
  return adult.length ? Math.min(...adult) : null;
}

/** Whole days from `today` until `date` (both Sri Lanka calendar dates). */
export function daysUntil(date: IsoDate, today: IsoDate): number {
  return Math.round((Date.parse(`${date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86_400_000);
}

/** Nights between two calendar dates. */
export function nightsBetween(from: IsoDate, to: IsoDate): number {
  return daysUntil(to, from);
}
