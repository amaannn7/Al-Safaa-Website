import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { videos } from "@/data/media";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { YouTubeLite } from "@/components/media/youtube-lite";
import { JsonLd } from "@/components/json-ld";
import { formatDate } from "@/lib/format";
import type { IsoDate } from "@/data/types";

export const metadata: Metadata = {
  title: "Preparing for Hajj & Umrah — Talks and Resources",
  description:
    "Hajj and Umrah preparation talks from Al-Safaa Travels & Tours, including bayans by Moulavi I.L.M Ibrahim in Tamil, plus links to official Saudi and Sri Lankan pilgrimage authorities.",
  alternates: { canonical: "/resources/" },
  openGraph: { url: "/resources/", images: [{ url: "/images/photos/madinah-umbrellas.jpg" }] },
};

/**
 * Rules change — so instead of restating visa or health requirements, this
 * page points to the authorities that publish them. Links checked 17 Oct 2026.
 */
const official = [
  { name: "Ministry of Hajj and Umrah", country: "Saudi Arabia", href: "https://www.haj.gov.sa/en", note: "Official guidance for pilgrims" },
  { name: "Nusuk", country: "Saudi Arabia", href: "https://www.nusuk.sa/", note: "The official platform for Umrah and visiting the Holy Sites" },
  { name: "Saudi visa platform", country: "Saudi Arabia", href: "https://visa.mofa.gov.sa/", note: "Ministry of Foreign Affairs visa services" },
  { name: "Department of Muslim Religious and Cultural Affairs", country: "Sri Lanka", href: "https://www.muslimaffairs.gov.lk/", note: "Hajj announcements for Sri Lankan pilgrims" },
  { name: "Department of Immigration and Emigration", country: "Sri Lanka", href: "https://www.immigration.gov.lk/", note: "Passports and travel documents" },
];

/** From the agency's own published package terms. */
const essentials = [
  "Your passport must be valid for at least 6 months from your return date.",
  "A booking is confirmed only once the advance payment is received.",
  "Air tickets and visas are non-refundable.",
  "Hajj dates may shift by ±1 day according to the Islamic (Hijri) calendar.",
];

export default function ResourcesPage() {
  const [lead, ...rest] = videos;
  return (
    <>
      <PageHero
        compact
        eyebrow="Resources"
        title={
          <>
            Preparing for your <em className="text-gold-400">journey</em>.
          </>
        }
        lede="Talks from our Hajj and Umrah programmes, the essentials from our package terms, and the official sources to check before you travel."
        image={{ src: "/images/photos/madinah-umbrellas.jpg", alt: "The courtyard of Masjid an-Nabawi at sunset" }}
        crumbs={[{ name: "Resources", path: "/resources/" }]}
      />

      <section aria-labelledby="talks" className="py-24 lg:py-32">
        <div className="shell">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow">Talks &amp; bayans</p>
            <h2 id="talks" className="display display-md mt-4">
              Understand each rite before you leave.
            </h2>
            <p className="mt-5 text-muted">From the Al-Safaa YouTube channel. Videos load only when you press play.</p>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7" data-reveal>
              <YouTubeLite id={lead.id} title={lead.title} />
              <VideoMeta v={lead} />
            </div>
            <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1" data-reveal-group>
              {rest.map((v) => (
                <li key={v.id} className="grid gap-4 lg:grid-cols-[11rem_1fr] lg:items-start">
                  <YouTubeLite id={v.id} title={v.title} compact />
                  <div>
                    <h3 className="font-semibold leading-snug">{v.title}</h3>
                    <VideoMeta v={v} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="essentials" className="border-t hairline bg-sand-200/60 py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow">Before you book</p>
            <h2 id="essentials" className="display display-md mt-4">
              The essentials, from our package terms.
            </h2>
          </div>
          <ol className="border-t hairline lg:col-span-7" data-reveal-group>
            {essentials.map((e, i) => (
              <li key={e} className="grid grid-cols-[3rem_1fr] gap-4 border-b hairline py-6">
                <span className="display text-[1.8rem] leading-none text-gold-700">{i + 1}</span>
                <span className="text-[1.05rem] leading-relaxed">{e}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="official" className="py-24 lg:py-32">
        <div className="shell">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow">Official sources</p>
            <h2 id="official" className="display display-md mt-4">
              Requirements change. Always check the authorities.
            </h2>
            <p className="mt-5 text-muted">
              Visa, health and travel requirements for Hajj and Umrah are set by the Saudi and Sri Lankan authorities and can
              change from season to season. Check the official sources below, and ask us if anything is unclear.
            </p>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border hairline bg-[color-mix(in_oklab,var(--color-ink-900)_14%,transparent)] md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {official.map((o) => (
              <li key={o.href} className="bg-sand-50">
                <a href={o.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col p-8">
                  <span className="text-[0.7rem] font-bold tracking-[0.2em] text-gold-700 uppercase">{o.country}</span>
                  <span className="display mt-3 text-[1.7rem] leading-tight group-hover:text-ink-700">{o.name}</span>
                  <span className="mt-2 text-sm text-muted">{o.note}</span>
                  <span className="mt-auto flex items-center gap-1.5 pt-6 text-[0.8rem] font-semibold text-ink-700">
                    {new URL(o.href).hostname.replace("www.", "")} <ExternalLink size={13} aria-hidden />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta title="Questions before you travel?" />

      <JsonLd
        data={videos.map((v) => ({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: v.title,
          description: `${v.title}${v.speaker ? ` by ${v.speaker}` : ""}${v.language ? ` (${v.language})` : ""} — Al-Safaa Travels & Tours`,
          thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
          uploadDate: v.published,
          embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
          contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
        }))}
      />
    </>
  );
}

function VideoMeta({ v }: { v: (typeof videos)[number] }) {
  return (
    <p className="mt-2 text-sm text-muted">
      {[v.speaker, v.language, formatDate(v.published as IsoDate, { month: "short" })].filter(Boolean).join(" · ")}
    </p>
  );
}
