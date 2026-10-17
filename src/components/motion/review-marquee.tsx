import type { ReactNode } from "react";

/**
 * A slow, endless horizontal loop of review cards.
 *
 * - The cards are rendered twice and the track slides by exactly one copy
 *   (-50%), so the loop has no visible jump. The second copy is hidden from
 *   assistive tech and made inert so nothing is announced or focusable twice.
 * - Pauses while hovered, while anything inside has keyboard focus, and while
 *   a review is expanded (so touch visitors can read it without it moving).
 * - With "reduce motion" on, the animation is off and the row is a normal
 *   horizontally scrollable strip (see globals.css).
 * - Only transform is animated, so it stays on the compositor.
 */
export function ReviewMarquee({ children, footnote }: { children: ReactNode; footnote?: ReactNode }) {
  return (
    <div className="marquee mt-8" role="region" aria-label="Google reviews">
      <div className="marquee-viewport" tabIndex={0} aria-label="Reviews, scrollable with arrow keys when motion is reduced">
        <div className="marquee-track">
          <ul className="marquee-group">{children}</ul>
          <ul className="marquee-group" data-dup aria-hidden="true" inert>
            {children}
          </ul>
        </div>
      </div>
      {footnote && <div className="shell mt-4 meta text-mist-dim">{footnote}</div>}
    </div>
  );
}
