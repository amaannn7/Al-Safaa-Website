import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import type { Image as Img } from "@/data/types";
import { cn } from "@/lib/cn";

export type Crumb = { name: string; path: string };

/**
 * Hero for inner pages: full-bleed photograph under a deep-teal wash, copy
 * anchored bottom-left, breadcrumbs above the title.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  crumbs,
  children,
  aside,
  tall = false,
  compact = false,
  position = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  image?: Img;
  crumbs: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
  tall?: boolean;
  compact?: boolean;
  position?: string;
}) {
  return (
    <section className={cn("on-dark relative isolate overflow-hidden bg-ink-900 text-white", tall ? "min-h-[88svh]" : compact ? "min-h-[42svh]" : "min-h-[64svh]", "flex items-end")}>
      {image && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            quality={75}
            data-hero-media
            className="object-cover"
            style={{ objectPosition: position }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 from-0% via-black/55 via-45% to-black/10 to-90%" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 from-0% to-transparent to-35%" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 via-55% to-transparent" />
          <div className="absolute inset-0 bg-black/25 md:hidden" />
        </div>
      )}
      <div className={cn("shell relative w-full pt-36 pb-14 md:pb-20", image && "on-photo")}>
        <Breadcrumbs crumbs={crumbs} />
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className={aside ? "lg:col-span-8" : "lg:col-span-10"}>
            {eyebrow && (
              <p className="eyebrow" data-hero-item>
                {eyebrow}
              </p>
            )}
            <h1 className="display display-lg mt-5" data-hero-rise>
              {title}
            </h1>
            {lede && (
              <div className="lede mt-6 max-w-2xl text-white/80" data-hero-rise>
                {lede}
              </div>
            )}
            {children && (
              <div className="mt-9 flex flex-wrap gap-3" data-hero-item>
                {children}
              </div>
            )}
          </div>
          {aside && (
            <div className="lg:col-span-4" data-hero-item>
              {aside}
            </div>
          )}
        </div>
      </div>
      <span className="horizon absolute inset-x-0 bottom-0 opacity-70" data-horizon aria-hidden />
    </section>
  );
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <>
      <nav aria-label="Breadcrumb" data-hero-item>
        <ol className="flex flex-wrap items-center gap-1.5 meta font-semibold text-white/60">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={13} aria-hidden className="text-white/35" />}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-white/85">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="hover:text-white">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}
