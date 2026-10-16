import Image from "next/image";
import { ExternalLink, Star } from "lucide-react";
import { site } from "@/config/site";
import { videos } from "@/data/media";
import { YouTubeLite } from "@/components/media/youtube-lite";
import { ArrowLink, buttonClass } from "@/components/ui/button";
import { getReviews, type DisplayReview } from "@/lib/reviews";
import { cn } from "@/lib/cn";

/**
 * Testimonials. Shows only genuine reviews (curated list or live Google
 * Places data). With neither available it points visitors to the Google
 * profile and features the agency's own Hajj guidance video instead.
 */
export async function Reviews() {
  const { summary, reviews } = await getReviews();
  const featuredVideo = videos[0];

  return (
    <section aria-labelledby="voices" className="on-dark grain bg-ink-800 py-24 text-white lg:py-32">
      <div className="shell">
        {reviews.length > 0 ? (
          <>
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div data-reveal>
                <p className="eyebrow">In their words</p>
                <h2 id="voices" className="display display-md mt-4 max-w-2xl">
                  What pilgrims say about travelling with us.
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
            <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] bg-white/10 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
              {reviews.slice(0, 6).map((r, i) => (
                <ReviewCard key={`${r.name}-${i}`} review={r} large={i === 0} />
              ))}
            </ul>
            <p className="mt-6 text-[0.8rem] text-mist-dim">
              Reviews are shown as written by the reviewer.{summary ? " Live reviews provided by Google." : ""}
            </p>
          </>
        ) : (
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5" data-reveal>
              <p className="eyebrow">In their words</p>
              <h2 id="voices" className="display display-md mt-4">
                Hear it from the pilgrims who travelled with us.
              </h2>
              <p className="lede mt-6 text-mist">
                Pilgrims who have travelled with Al-Safaa share their experiences on our Google profile. We would rather you
                read them in their own words.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <a href={site.google.reviewsUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("light")}>
                  Read our Google reviews
                  <ExternalLink size={15} aria-hidden />
                </a>
                <ArrowLink href="/resources/" className="text-white">
                  Guidance videos
                </ArrowLink>
              </div>
            </div>
            <div className="lg:col-span-7" data-reveal>
              <YouTubeLite id={featuredVideo.id} title={featuredVideo.title} />
              <p className="mt-4 text-[0.85rem] text-mist-dim">From the Al-Safaa YouTube channel.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5 text-gold-400" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={14} fill={n <= Math.round(rating) ? "currentColor" : "none"} strokeWidth={1.5} aria-hidden />
      ))}
    </span>
  );
}

function ReviewCard({ review: r, large }: { review: DisplayReview; large?: boolean }) {
  return (
    <li className={cn("flex flex-col bg-ink-800 p-8", large && "lg:row-span-2")}>
      {r.rating && <Stars rating={r.rating} />}
      <blockquote className={cn("mt-5 leading-relaxed", large ? "display text-[1.75rem] leading-snug" : "text-[1rem] text-white/90")}>
        <p className="line-clamp-[12]">“{r.quote}”</p>
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
