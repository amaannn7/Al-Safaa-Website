import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { gallery, galleryIsPublished } from "@/data/gallery";
import { PageHero } from "@/components/sections/page-hero";
import { Reviews } from "@/components/sections/reviews";
import { FinalCta } from "@/components/sections/final-cta";

/**
 * Gallery & testimonials. Unpublished (404 + excluded from the sitemap and
 * navigation) until src/data/gallery.ts holds enough genuine, consented
 * photographs — see MIN_GALLERY_IMAGES.
 */
export const metadata: Metadata = {
  title: "Gallery & Testimonials",
  description: "Photographs from Al-Safaa Hajj and Umrah journeys, and what our pilgrims say about travelling with us.",
  alternates: { canonical: "/gallery/" },
};

export default function GalleryPage() {
  if (!galleryIsPublished) notFound();

  return (
    <>
      <PageHero
        compact
        eyebrow="Gallery & testimonials"
        title="Moments from our journeys."
        crumbs={[{ name: "Gallery", path: "/gallery/" }]}
        image={{ src: gallery[0].src, alt: gallery[0].alt }}
      />
      <section className="py-20 lg:py-28">
        <ul className="shell columns-1 gap-6 sm:columns-2 lg:columns-3" data-reveal-group>
          {gallery.map((g) => (
            <li key={g.src} className="mb-6 break-inside-avoid">
              <figure>
                <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="h-auto w-full rounded-[1.25rem]" />
                {(g.caption || g.year) && (
                  <figcaption className="mt-3 text-sm text-muted">{[g.caption, g.year].filter(Boolean).join(" · ")}</figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>
      </section>
      <Reviews />
      <FinalCta />
    </>
  );
}
