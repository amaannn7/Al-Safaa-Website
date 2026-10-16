import type { Metadata } from "next";
import Image from "next/image";
import { destinations, saudiIntro } from "@/data/destinations";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { WhatsAppButton } from "@/components/ui/button";
import { topicEnquiry } from "@/lib/contact";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Saudi Arabia Tours — AlUla, Umluj & Riyadh",
  description:
    "Explore Saudi Arabia beyond Hajj and Umrah with Al-Safaa Travels & Tours: the ancient heritage of AlUla, the Red Sea beaches of Umluj and the transforming capital, Riyadh.",
  alternates: { canonical: "/saudi-tours/" },
  openGraph: { url: "/saudi-tours/", images: [{ url: "/images/photos/alula-elephant-rock.jpg" }] },
};

export default function SaudiToursPage() {
  return (
    <>
      <PageHero
        eyebrow="Saudi Arabia tours"
        title={
          <>
            Saudi Arabia, <em className="text-gold-400">beyond</em> the pilgrimage.
          </>
        }
        lede={saudiIntro}
        image={{ src: "/images/photos/alula-night.jpg", alt: "A sandstone outcrop near AlUla beneath a star-filled night sky" }}
        crumbs={[{ name: "Saudi Tours", path: "/saudi-tours/" }]}
      >
        <WhatsAppButton message={topicEnquiry("a Saudi Arabia tour")} size="lg">
          Enquire about a tour
        </WhatsAppButton>
      </PageHero>

      <section aria-label="Destinations" className="py-24 lg:py-32">
        <div className="shell space-y-28 lg:space-y-36">
          {destinations.map((d, i) => (
            <article key={d.slug} id={d.slug} className="grid scroll-mt-28 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
              <div className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-2")}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-ink-800" data-reveal-image>
                  {d.image ? (
                    <div className="absolute -inset-y-[8%] inset-x-0" data-parallax>
                      <Image src={d.image.src} alt={d.image.alt} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
                    </div>
                  ) : (
                    <div className="on-dark grain absolute inset-0 flex items-end bg-[radial-gradient(120%_80%_at_80%_110%,#1d5e56_0%,#0c3d38_45%,#082826_100%)] p-10">
                      <svg aria-hidden viewBox="0 0 400 120" className="absolute inset-x-0 bottom-[30%] w-full text-gold-500/40" fill="none" stroke="currentColor">
                        <path d="M0 60 C 60 40, 120 80, 200 60 S 340 40, 400 60" />
                        <path d="M0 80 C 60 60, 120 100, 200 80 S 340 60, 400 80" opacity=".6" />
                        <path d="M0 100 C 60 80, 120 120, 200 100 S 340 80, 400 100" opacity=".35" />
                      </svg>
                      <span className="display relative text-[clamp(4rem,10vw,8rem)] leading-none text-white/90">{d.name}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-1")} data-reveal>
                <p className="eyebrow">{d.epithet}</p>
                <h2 className="display display-lg mt-4">{d.name}</h2>
                <p className="lede mt-6 text-muted">{d.description}</p>
                <WhatsAppButton message={topicEnquiry(`a tour to ${d.name}`)} variant="ink" className="mt-9">
                  Ask about {d.name}
                </WhatsAppButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t hairline bg-sand-200/60 py-20">
        <div className="shell max-w-4xl text-center" data-reveal>
          <p className="display display-sm">Get in touch with us for more information about tours to these destinations.</p>
          <p className="mt-4 text-muted">Tell us your dates and who is travelling, and we&apos;ll share what is possible.</p>
        </div>
      </section>

      <FinalCta
        title="Discover more of the Kingdom."
        message={topicEnquiry("a Saudi Arabia tour")}
        image={{ src: "/images/photos/saudi-desert.jpg", alt: "Sand dunes and mountains in the Saudi desert" }}
      />
    </>
  );
}
