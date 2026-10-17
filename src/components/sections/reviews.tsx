import Image from "next/image";
import { Star } from "lucide-react";
import { getReviews, type DisplayReview } from "@/lib/reviews";
import { cn } from "@/lib/cn";

/**
 * Testimonials. Shows only genuine reviews (curated list or live Google
 * Places data), and renders nothing until there are some.
 */
export async function Reviews() {
  const { summary, reviews } = await getReviews();
  // No genuine reviews yet: show nothing rather than an empty section.
  if (reviews.length === 0) return null;
  const shown = reviews.slice(0, 6);

  return (
    <section aria-labelledby="voices" className="on-dark grain bg-ink-800 py-24 text-white lg:py-32">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div data-reveal>
            <p className="eyebrow">Google reviews</p>
            <h2 id="voices" className="display display-md mt-4 max-w-2xl">
              What our pilgrims say
            </h2>
          </div>
          {summary && (
            <a href={summary.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4" data-reveal>
              <span className="display text-6xl tabular-nums">{summary.rating.toFixed(1)}</span>
              <span className="text-sm text-mist">
                <Stars rating={summary.rating} />
                <span className="mt-1 block">
                  {summary.count} review{summary.count === 1 ? "" : "s"} on Google
                </span>
              </span>
            </a>
          )}
        </div>
        {/* Separate cards (no shared background), so any number of reviews looks complete. */}
        <ul
          className={cn(
            "mt-14",
            shown.length === 1 && "max-w-3xl",
            shown.length === 2 && "grid gap-5 md:grid-cols-2",
            // Reviews differ a lot in length: flow them in columns so every card keeps its own height.
            shown.length >= 3 && "gap-5 md:columns-2 lg:columns-3",
          )}
          data-reveal-group
        >
          {shown.map((r, i) => (
            <ReviewCard key={`${r.name}-${i}`} review={r} large={shown.length === 1} masonry={shown.length >= 3} />
          ))}
        </ul>
        <p className="mt-6 text-[0.8rem] text-mist-dim">
          Reviews are shown as written by the reviewer.{summary?.live ? " Live reviews provided by Google." : ""}
        </p>
      </div>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span role="img" className="flex gap-0.5 text-gold-400" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={14} fill={n <= Math.round(rating) ? "currentColor" : "none"} strokeWidth={1.5} aria-hidden />
      ))}
    </span>
  );
}

function ReviewCard({ review: r, large, masonry }: { review: DisplayReview; large?: boolean; masonry?: boolean }) {
  return (
    <li className={cn("flex break-inside-avoid flex-col rounded-[1.25rem] border border-white/12 bg-white/[0.04] p-7 sm:p-8", masonry && "mb-5")}>
      {r.rating && <Stars rating={r.rating} />}
      <blockquote className={cn("mt-5 leading-relaxed", large ? "display text-[1.75rem] leading-snug" : "text-[1rem] text-white/90")}>
        <p className="whitespace-pre-line">“{r.quote}”</p>
      </blockquote>
      <footer className="mt-auto flex items-center gap-3 pt-8 text-sm">
        {r.photo && <Image src={r.photo} alt="" width={36} height={36} className="rounded-full" />}
        <span>
          {r.profileUrl ? (
            <a href={r.profileUrl} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-gold-400">
              {r.name}
            </a>
          ) : (
            <span className="font-semibold">{r.name}</span>
          )}
          <span className="block text-mist-dim">
            {[r.context, r.when, r.source === "Google" ? "Google review" : null].filter(Boolean).join(" · ")}
          </span>
        </span>
      </footer>
    </li>
  );
}
