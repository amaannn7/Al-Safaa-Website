"use client";

import { useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

/**
 * A slow, endless horizontal loop of review cards.
 *
 * - The cards are rendered twice and the track slides by exactly one copy
 *   (-50%), so the loop has no visible jump. The second copy is hidden from
 *   assistive tech and made inert so nothing is announced or focusable twice.
 * - Pauses while hovered or focused, and with the visible Pause button
 *   (WCAG 2.2.2: moving content needs a way to stop it).
 * - With "reduce motion" on, the animation is off and the row is a normal
 *   horizontally scrollable strip (see globals.css).
 * - Only transform is animated, so it stays on the compositor.
 */
export function ReviewMarquee({ children, footnote }: { children: ReactNode; footnote?: ReactNode }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="marquee mt-14" data-paused={paused} role="region" aria-label="Google reviews">
      <div className="marquee-viewport" tabIndex={0} aria-label="Reviews, scrollable with arrow keys when motion is reduced">
        <div className="marquee-track">
          <ul className="marquee-group">{children}</ul>
          <ul className="marquee-group" data-dup aria-hidden="true" inert>
            {children}
          </ul>
        </div>
      </div>
      <div className="shell mt-6 flex items-center justify-between gap-4">
        <div className="text-[0.8rem] text-mist-dim">{footnote}</div>
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          aria-pressed={paused}
          className="marquee-pause inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-white/20 px-4 text-[0.8rem] font-semibold text-white transition-colors hover:border-white/60"
        >
          {paused ? <Play size={14} aria-hidden /> : <Pause size={14} aria-hidden />}
          {paused ? "Play" : "Pause"}
        </button>
      </div>
    </div>
  );
}
