import type { IsoDate } from "@/data/types";

const UTC = "UTC";

/** Parse a calendar date without letting the server's time zone shift it. */
function asUtc(date: IsoDate) {
  return new Date(`${date}T00:00:00Z`);
}

/** "22 October 2026" */
export function formatDate(date: IsoDate, opts: { month?: "long" | "short"; year?: boolean } = {}) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: UTC,
    day: "numeric",
    month: opts.month ?? "long",
    ...(opts.year === false ? {} : { year: "numeric" }),
  }).format(asUtc(date));
}

/** { day: "22", month: "Oct", year: "2026", weekday: "Thursday" } — for date blocks. */
export function dateParts(date: IsoDate) {
  const d = asUtc(date);
  const f = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-GB", { timeZone: UTC, ...o }).format(d);
  return { day: f({ day: "2-digit" }), month: f({ month: "short" }), year: f({ year: "numeric" }), weekday: f({ weekday: "long" }) };
}

/** "22 – 31 Oct 2026" or "28 Apr – 3 May 2027" */
export function formatRange(from: IsoDate, to: IsoDate) {
  const a = asUtc(from);
  const b = asUtc(to);
  const sameYear = a.getUTCFullYear() === b.getUTCFullYear();
  const sameMonth = sameYear && a.getUTCMonth() === b.getUTCMonth();
  const fmt = (d: Date, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-GB", { timeZone: UTC, ...o }).format(d);
  if (sameMonth) return `${fmt(a, { day: "numeric" })} – ${fmt(b, { day: "numeric", month: "short", year: "numeric" })}`;
  if (sameYear) return `${fmt(a, { day: "numeric", month: "short" })} – ${fmt(b, { day: "numeric", month: "short", year: "numeric" })}`;
  return `${fmt(a, { day: "numeric", month: "short", year: "numeric" })} – ${fmt(b, { day: "numeric", month: "short", year: "numeric" })}`;
}

/** "LKR 2,550,000" */
export function formatPrice(amount: number, currency = "LKR") {
  return `${currency} ${new Intl.NumberFormat("en-LK", { maximumFractionDigits: 0 }).format(amount)}`;
}

export function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-LK", { maximumFractionDigits: 0 }).format(amount);
}
