import { ArrowUpRight, Plane } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Flight comparison is a plain outbound link to the agency's Aviasales
 * partner page (same partner marker as before). No search or booking form
 * is embedded on this site.
 */
export function FlightsLink({ className }: { className?: string }) {
  return (
    <a
      href={site.aviasales.partnerHref}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={cn(
        "group flex items-center gap-5 rounded-[1.25rem] bg-sand-50 p-5 pr-6 transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgba(6,31,29,.5)]",
        className,
      )}
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink-900 text-gold-400">
        <Plane size={22} strokeWidth={1.6} aria-hidden />
      </span>
      <span className="flex-1">
        <span className="eyebrow block">Partner site</span>
        <span className="mt-1 block text-[1.35rem] font-medium tracking-tight">Compare flights on Aviasales</span>
      </span>
      <ArrowUpRight size={20} aria-hidden className="text-gold-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
