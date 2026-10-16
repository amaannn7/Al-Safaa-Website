"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Click-to-load YouTube player. Nothing is requested from YouTube (no
 * cookies, no player JS) until the visitor presses play.
 */
export function YouTubeLite({ id, title, className, compact = false }: { id: string; title: string; className?: string; compact?: boolean }) {
  const [active, setActive] = useState(false);

  return (
    <div className={cn("relative aspect-video overflow-hidden bg-ink-950", compact ? "rounded-xl" : "rounded-[1.25rem]", className)}>
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 h-full w-full text-left"
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover opacity-80 transition-[transform,opacity] duration-700 ease-(--ease-premium) group-hover:scale-[1.03] group-hover:opacity-95"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className={cn("flex items-center justify-center rounded-full bg-gold-500", compact ? "h-12 w-12" : "h-20 w-20", " text-ink-950 shadow-[0_20px_40px_-12px_rgba(0,0,0,.6)] transition-transform duration-500 ease-(--ease-premium) group-hover:scale-110")}>
              <Play size={compact ? 18 : 26} fill="currentColor" className="ml-1" aria-hidden />
            </span>
          </span>
          {!compact && <span className="absolute inset-x-0 bottom-0 p-5 text-[0.95rem] font-semibold text-white sm:p-6">{title}</span>}
        </button>
      )}
    </div>
  );
}
