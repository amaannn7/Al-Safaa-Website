import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/ui/button";

const journeys = [
  {
    href: "/hajj/",
    eyebrow: "The fifth pillar",
    title: "Hajj",
    body: "A duty once in a lifetime for every Muslim who is able. We take care of the arrangements across Makkah, Mina, Arafat, Muzdalifah and Madinah, so every step of the journey is in experienced hands.",
    cta: "Hajj packages",
    image: {
      src: "/images/photos/pilgrims-ihram.jpg",
      alt: "Pilgrims in white ihram walking across the courtyard of Masjid al-Haram",
    },
  },
  {
    href: "/umrah/",
    eyebrow: "The lesser pilgrimage",
    title: "Umrah",
    body: "Open to pilgrims throughout the year. We arrange group Umrah journeys with accommodation within walking distance of the Harams, Sri Lankan food, city tours and an experienced guide.",
    cta: "Umrah packages",
    image: {
      src: "/images/photos/madinah-green-dome.jpg",
      alt: "The Green Dome and minarets of Masjid an-Nabawi in Madinah under a clear sky",
    },
  },
];

export function Pilgrimages() {
  return (
    <section aria-labelledby="journeys" className="border-t hairline py-24 lg:py-36">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12" data-reveal>
          <p className="eyebrow lg:col-span-4">Two journeys, one devotion</p>
          <h2 id="journeys" className="display display-md lg:col-span-8">
            Whether it is your first Hajj or a return to the Haram, we plan each step with the care it deserves.
          </h2>
        </div>

        <div className="mt-20 grid gap-20 md:grid-cols-2 md:gap-10 lg:gap-20">
          {journeys.map((j, i) => (
            <article key={j.href} className={i === 1 ? "md:mt-32" : undefined}>
              <Link href={j.href} className="group block" aria-label={`${j.title} packages`}>
                <div className="arch relative aspect-[4/5]" data-reveal-image>
                  <Image
                    src={j.image.src}
                    alt={j.image.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-(--ease-premium) group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                  <span className="display absolute bottom-6 left-8 text-[clamp(4rem,9vw,7.5rem)] leading-none text-white">{j.title}</span>
                </div>
              </Link>
              <div className="mt-8 max-w-md" data-reveal>
                <p className="eyebrow">{j.eyebrow}</p>
                <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">{j.body}</p>
                <ArrowLink href={j.href} className="mt-6 text-ink-900">
                  {j.cta}
                </ArrowLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
