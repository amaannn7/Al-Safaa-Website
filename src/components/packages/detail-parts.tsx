import { Check, ExternalLink, Info, Minus, Plus } from "lucide-react";
import type { Highlight, ItineraryItem, Stay, TourPackage } from "@/data/types";
import { dateParts, formatAmount } from "@/lib/format";
import { cn } from "@/lib/cn";

/* ----------------------------------------------------------------------- */
/* Prices                                                                   */
/* ----------------------------------------------------------------------- */

export function PriceTable({ pkg }: { pkg: TourPackage }) {
  return (
    <div>
      <table className="w-full text-left">
        <caption className="sr-only">Prices per person in {pkg.currency}</caption>
        <thead>
          <tr className="text-[0.7rem] font-bold tracking-[0.2em] text-muted uppercase">
            <th scope="col" className="pb-3 font-bold">
              Room sharing
            </th>
            <th scope="col" className="pb-3 text-right font-bold">
              Per person ({pkg.currency})
            </th>
          </tr>
        </thead>
        <tbody>
          {pkg.prices.map((t) => (
            <tr key={t.label} className="border-t hairline">
              <th scope="row" className="py-4 pr-4 font-semibold">
                {t.label}
                {t.note && <span className="block text-[0.8rem] font-normal text-muted">{t.note}</span>}
              </th>
              <td className="display py-4 text-right text-[1.9rem] leading-none tabular-nums">{formatAmount(t.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {pkg.priceNote && <p className="mt-3 text-sm text-muted">{pkg.priceNote}</p>}
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Stays                                                                    */
/* ----------------------------------------------------------------------- */

export function StayList({ stays }: { stays: Stay[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border hairline bg-[color-mix(in_oklab,var(--color-ink-900)_14%,transparent)] sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
      {stays.map((s, i) => (
        <li key={`${s.hotel}-${i}`} className="flex flex-col bg-sand-50 p-6 lg:p-7">
          <span className="text-[0.7rem] font-bold tracking-[0.2em] text-gold-700 uppercase">
            {String(i + 1).padStart(2, "0")} · {s.city}
          </span>
          <span className="display mt-4 text-[1.9rem] leading-[1.05]">{s.hotel}</span>
          {s.stars ? (
            <span className="mt-2 text-sm tracking-[0.2em] text-gold-700" aria-label={`${s.stars} star hotel`}>
              {"★".repeat(s.stars)}
            </span>
          ) : null}
          <span className="mt-4 font-semibold">{s.duration}</span>
          {s.note && <span className="mt-1 text-[0.92rem] text-muted">{s.note}</span>}
          {s.mapUrl && (
            <a
              href={s.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.8rem] font-bold tracking-[0.12em] text-ink-700 uppercase hover:text-gold-700"
            >
              View on map <ExternalLink size={13} aria-hidden />
            </a>
          )}
        </li>
      ))}
    </ol>
  );
}

/* ----------------------------------------------------------------------- */
/* Itinerary — vertical timeline of native <details> (works without JS)     */
/* ----------------------------------------------------------------------- */

export function ItineraryTimeline({ items, note }: { items: ItineraryItem[]; note?: string }) {
  return (
    <div>
      <ol className="relative">
        <span aria-hidden className="absolute top-3 bottom-3 left-[0.4375rem] w-px bg-[color-mix(in_oklab,var(--color-gold-500)_45%,transparent)] md:left-[9.4375rem]" />
        {items.map((it, i) => {
          const d = it.date ? dateParts(it.date) : null;
          return (
            <li key={`${it.title}-${i}`} className="relative grid gap-x-8 md:grid-cols-[8rem_1fr]" data-reveal>
              <div className="hidden pt-5 text-right md:block">
                {d ? (
                  <>
                    <span className="display block text-[1.6rem] leading-none tabular-nums">
                      {d.day} {d.month}
                    </span>
                    {it.hijri && <span className="mt-1 block text-[0.75rem] text-muted">{it.hijri}</span>}
                  </>
                ) : (
                  <span className="display block text-[1.6rem] leading-none text-gold-700">Stage {i + 1}</span>
                )}
              </div>
              <details className="group relative pl-9 md:pl-10" open={i === 0}>
                <summary className="flex items-start justify-between gap-6 border-b hairline py-5 transition-colors hover:text-ink-700">
                  {/* Inside <summary> so it stays visible while the item is closed */}
                  <span aria-hidden className="absolute top-[1.55rem] left-0 h-[0.9375rem] w-[0.9375rem] rounded-full border-2 border-gold-500 bg-sand-100 transition-colors group-open:bg-gold-500 md:-left-[0.4rem]" />
                  <span>
                    <span className="block text-[0.72rem] font-bold tracking-[0.18em] text-gold-700 uppercase md:hidden">
                      {d ? `${d.day} ${d.month} ${d.year}` : `Stage ${i + 1}`}
                      {it.hijri ? ` · ${it.hijri}` : ""}
                    </span>
                    <span className="mt-1 block text-[1.15rem] font-semibold md:mt-0">{it.title}</span>
                  </span>
                  <span className="chev mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border hairline transition-transform duration-300">
                    <Plus size={14} aria-hidden />
                  </span>
                </summary>
                <p className="details-body pt-4 pb-6 leading-relaxed text-muted">{it.detail}</p>
              </details>
            </li>
          );
        })}
      </ol>
      {note && (
        <p className="mt-6 flex gap-2 text-sm text-muted md:pl-[10rem]">
          <Info size={16} strokeWidth={1.6} className="mt-0.5 shrink-0 text-gold-700" aria-hidden />
          {note}
        </p>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Highlights                                                               */
/* ----------------------------------------------------------------------- */

export function HighlightList({ items, dark = false }: { items: Highlight[]; dark?: boolean }) {
  return (
    <div className={cn("border-t", dark ? "border-white/12" : "hairline")}>
      {items.map((h, i) => (
        <details key={h.title} className={cn("group border-b", dark ? "border-white/12" : "hairline")} open={i === 0}>
          <summary className="flex items-center justify-between gap-6 py-6">
            <span className="flex items-baseline gap-5">
              <span className={cn("text-[0.75rem] font-bold tabular-nums", dark ? "text-gold-400" : "text-gold-700")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display text-[1.75rem] leading-tight sm:text-[2rem]">{h.title}</span>
            </span>
            <span className={cn("chev inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-transform duration-300", dark ? "border-white/20" : "hairline")}>
              <Plus size={16} aria-hidden />
            </span>
          </summary>
          <div className="details-body pb-8 pl-10 sm:pl-11">
            <p className={cn("max-w-2xl leading-relaxed", dark ? "text-mist" : "text-muted")}>{h.body}</p>
            {h.list && (
              <ul className="mt-5 grid max-w-2xl gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {h.list.map((x) => (
                  <li key={x} className="flex items-start gap-2.5 text-[0.95rem]">
                    <Check size={16} strokeWidth={2} className={cn("mt-0.5 shrink-0", dark ? "text-gold-400" : "text-gold-700")} aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Inclusions / exclusions                                                  */
/* ----------------------------------------------------------------------- */

export function IncludesExcludes({ pkg }: { pkg: TourPackage }) {
  return (
    <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
      <div data-reveal>
        <h3 className="eyebrow">Package includes</h3>
        <ul className="mt-5 divide-y hairline border-y hairline">
          {pkg.inclusions.map((x) => (
            <li key={x} className="flex items-start gap-3 py-3.5">
              <Check size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-gold-700" aria-hidden />
              {x}
            </li>
          ))}
        </ul>
      </div>
      {pkg.exclusions.length > 0 && (
        <div data-reveal>
          <h3 className="eyebrow text-muted!">Not included</h3>
          <ul className="mt-5 divide-y hairline border-y hairline">
            {pkg.exclusions.map((x) => (
              <li key={x} className="flex items-start gap-3 py-3.5 text-muted">
                <Minus size={18} strokeWidth={2} className="mt-0.5 shrink-0" aria-hidden />
                {x}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function Notices({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <aside aria-label="Important information" className="rounded-[1.25rem] border border-gold-500/40 bg-gold-500/[0.07] p-6 sm:p-8" data-reveal>
      <h3 className="flex items-center gap-2 eyebrow">
        <Info size={15} strokeWidth={2} aria-hidden /> Important information
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((n) => (
          <li key={n} className="flex gap-3 leading-relaxed">
            <span aria-hidden className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-gold-700" />
            {n}
          </li>
        ))}
      </ul>
    </aside>
  );
}
