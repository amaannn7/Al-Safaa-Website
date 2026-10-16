"use client";

import { useEffect, useRef, useState } from "react";
import { Plane } from "lucide-react";
import { site } from "@/config/site";

/**
 * The agency's existing Aviasales (Travelpayouts) flight-search widget, same
 * partner marker as the old site. The third-party script is only loaded when
 * the widget scrolls near the viewport. A plain partner link is always shown
 * as a fallback.
 */
export function AviasalesWidget() {
  const host = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || el.dataset.loaded) return;
        el.dataset.loaded = "1";
        const s = document.createElement("script");
        s.src = site.aviasales.widgetSrc;
        s.async = true;
        s.charset = "utf-8";
        s.onload = () => setLoaded(true);
        el.appendChild(s);
        io.disconnect();
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <div ref={host} className="min-h-[220px] [&_iframe]:max-w-full" aria-label="Aviasales flight search" role="region">
        {!loaded && (
          <div className="flex h-[220px] items-center justify-center rounded-xl border border-dashed hairline text-sm text-muted">
            <Plane size={18} strokeWidth={1.5} className="mr-2 animate-pulse" aria-hidden />
            Loading flight search…
          </div>
        )}
      </div>
      <p className="mt-4 text-[0.8rem] text-muted">
        Search is provided by our partner Aviasales. Prefer to browse directly?{" "}
        <a href={site.aviasales.fallbackHref} target="_blank" rel="noopener noreferrer sponsored" className="font-semibold text-ink-800 underline underline-offset-4">
          Open Aviasales
        </a>
        .
      </p>
    </div>
  );
}
