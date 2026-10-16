import type { Metadata } from "next";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { PageHero } from "@/components/sections/page-hero";
import { WhatsAppIcon, socialIcons } from "@/components/icons";
import { WhatsAppButton } from "@/components/ui/button";
import { generalEnquiry, telHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact Al-Safaa Travels & Tours in Colombo. WhatsApp ${site.contact.whatsapp.display}, call ${site.contact.phones[2].display} or email ${site.contact.email}. Visit us at ${site.address.street}, ${site.address.locality}.`,
  alternates: { canonical: "/contact/" },
  openGraph: { url: "/contact/", images: [{ url: "/images/photos/dates-and-coffee.jpg" }] },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Contact"
        title="Get in touch with us"
        image={{ src: "/images/photos/dates-and-coffee.jpg", alt: "Dates and an Arabic coffee pot" }}
        crumbs={[{ name: "Contact", path: "/contact/" }]}
      />

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-5">
            {/* WhatsApp: primary */}
            <div className="on-dark grain rounded-[1.5rem] bg-ink-900 p-8 text-white sm:p-10" data-reveal>
              <WhatsAppIcon size={28} className="text-gold-400" />
              <h2 className="display mt-6 text-[2.4rem] leading-tight">We&apos;re on WhatsApp!</h2>
              <WhatsAppButton message={generalEnquiry} size="lg" className="mt-8 w-full sm:w-auto">
                {site.contact.whatsapp.display}
              </WhatsAppButton>
            </div>

            <div data-reveal>
              <h2 className="eyebrow">Call Us</h2>
              <ul className="mt-4 divide-y hairline border-y hairline">
                {site.contact.phones.map((p) => (
                  <li key={p.e164}>
                    <a href={telHref(p.e164)} className="group flex items-center justify-between gap-4 py-5">
                      <span>
                        <span className="display block text-[1.9rem] leading-none tabular-nums group-hover:text-ink-700">{p.display}</span>
                        <span className="mt-1.5 block text-sm text-muted">{p.label}</span>
                      </span>
                      <Phone size={18} strokeWidth={1.6} className="text-gold-700" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-10 sm:grid-cols-2" data-reveal>
              <div>
                <h2 className="eyebrow">Email Us</h2>
                <a href={`mailto:${site.contact.email}`} className="mt-4 flex items-center gap-2 font-semibold hover:text-gold-700">
                  <Mail size={17} strokeWidth={1.6} aria-hidden /> {site.contact.email}
                </a>
              </div>
              <div>
                <h2 className="eyebrow">Follow Us</h2>
                <ul className="mt-4 flex gap-2">
                  {site.social.map((s) => {
                    const Icon = socialIcons[s.name];
                    return (
                      <li key={s.name}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Al-Safaa on ${s.name}`}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border hairline transition-colors hover:border-gold-500 hover:text-gold-700"
                        >
                          <Icon size={17} />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7" data-reveal>
            <h2 className="eyebrow">Address</h2>
            <address className="mt-4 flex items-start gap-3 not-italic">
              <MapPin size={20} strokeWidth={1.6} className="mt-1.5 shrink-0 text-gold-700" aria-hidden />
              <span className="display text-[2rem] leading-tight">
                {site.address.street}, {site.address.locality}, {site.address.country}
              </span>
            </address>
            <div className="mt-8 overflow-hidden rounded-[1.5rem] border hairline bg-sand-200">
              <iframe
                title="Map showing the Al-Safaa Travels & Tours office in Colombo"
                src={site.google.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[4/3] w-full border-0 lg:aspect-[5/4]"
              />
            </div>
            <a
              href={site.google.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[0.8rem] font-bold tracking-[0.14em] text-ink-800 uppercase hover:text-gold-700"
            >
              Open in Google Maps <ExternalLink size={14} aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
