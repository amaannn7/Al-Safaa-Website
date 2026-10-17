import Image from "next/image";
import { destinations, saudiIntro } from "@/data/destinations";
import { WhatsAppButton } from "@/components/ui/button";
import { topicEnquiry } from "@/lib/contact";
import { cn } from "@/lib/cn";

export function SaudiExperiences() {
  return (
    <section id="saudi" aria-labelledby="saudi-title" className="border-t hairline py-24 lg:py-36">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal>
            <h2 id="saudi-title" className="display display-lg">
              Explore Saudi Arabia
            </h2>
          </div>
          <p className="lede text-muted lg:col-span-5" data-reveal>
            {saudiIntro}
          </p>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-3 md:items-start" data-reveal-group>
          {destinations.map((d, i) => (
            <li key={d.slug} className={cn(i === 1 && "md:mt-24")}>
              <DestinationTile d={d} />
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap items-center gap-6">
          <WhatsAppButton message={topicEnquiry("Saudi Arabia tours")}>Get in touch with us for more info</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

function DestinationTile({ d }: { d: (typeof destinations)[number] }) {
  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-ink-800">
        {d.image ? (
          <Image
            src={d.image.src}
            alt={d.image.alt}
            fill
            sizes="(min-width: 768px) 30vw, 100vw"
            className="object-cover transition-transform duration-[1.4s] ease-(--ease-premium) group-hover:scale-[1.05]"
          />
        ) : (
          // No licensed photograph of this destination yet: a typographic tile
          // rather than a misleading stand-in image.
          <div className="on-dark grain absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_110%,#1d5e56_0%,#0c3d38_45%,#082826_100%)]">
            <svg aria-hidden viewBox="0 0 400 120" className="absolute inset-x-0 bottom-[22%] w-full text-gold-500/40" fill="none" stroke="currentColor">
              <path d="M0 60 C 60 40, 120 80, 200 60 S 340 40, 400 60" />
              <path d="M0 80 C 60 60, 120 100, 200 80 S 340 60, 400 80" opacity=".6" />
              <path d="M0 100 C 60 80, 120 120, 200 100 S 340 80, 400 100" opacity=".35" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-7 text-white">
          <p className="label text-gold-400">{d.epithet}</p>
          <h3 className="display mt-2 text-[2.75rem] leading-none">{d.name}</h3>
        </div>
      </div>
      <p className="mt-5 leading-relaxed text-muted">{d.description}</p>
    </article>
  );
}
