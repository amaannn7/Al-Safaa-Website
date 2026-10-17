"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * A review's text, clamped to a few lines with a "Read more" toggle.
 * The full text is always in the page (CSS clamps it, nothing is cut), and
 * the toggle only appears when the text is actually longer than the clamp.
 */
export function ReviewText({ text, large = false }: { text: string; large?: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      if (!expanded) setOverflowing(el.scrollHeight > el.clientHeight + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [expanded, text]);

  return (
    <>
      <blockquote className={cn("mt-3 leading-relaxed", large ? "display text-[1.5rem] leading-snug" : "text-[0.95rem] text-white/90")}>
        <p ref={ref} className={cn("whitespace-pre-line", !expanded && "line-clamp-4")}>
          “{text}”
        </p>
      </blockquote>
      {(overflowing || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-2 self-start action text-gold-400 underline-offset-4 hover:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </>
  );
}
