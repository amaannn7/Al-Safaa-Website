import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { WhatsAppIcon, socialIcons } from "@/components/icons";
import { site } from "@/config/site";
import { galleryIsPublished } from "@/data/gallery";
import { generalEnquiry, telHref, whatsappHref } from "@/lib/contact";
import { getTodayInColombo } from "@/lib/today";

const columns = [
  {
    title: "Pilgrimage",
    links: [
      { href: "/hajj/", label: "Hajj packages" },
      { href: "/hajj-2027/", label: "Hajj 2027" },
      { href: "/umrah/", label: "Umrah packages" },
      { href: "/resources/", label: "Preparing for your journey" },
    ],
  },
  {
    title: "Travel",
    links: [
      { href: "/saudi-tours/", label: "Saudi Arabia tours" },
      { href: "/services/", label: "Flights & travel services" },
      { href: "/services/#visit-sri-lanka", label: "Visit Sri Lanka" },
    ],
  },
  {
    title: "Al-Safaa",
    links: [
      { href: "/about/", label: "About us" },
      ...(galleryIsPublished ? [{ href: "/gallery/", label: "Gallery & testimonials" }] : []),
      { href: "/contact/", label: "Contact" },
    ],
  },
];

export async function Footer() {
  const year = (await getTodayInColombo()).slice(0, 4);

  return (
    <footer className="on-dark grain bg-ink-950 text-mist">
      <div className="shell pt-20 pb-10 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo reversed className="w-[176px]!" />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed">
              Hajj and Umrah specialists in Colombo since {site.established}. Founded by {site.leadership.founders}, and
              today led by {site.leadership.current}.
            </p>
            <ul className="mt-8 flex gap-2" aria-label="Social media">
              {site.social.map((s) => {
                const Icon = socialIcons[s.name];
                return (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Al-Safaa on ${s.name}`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold-400 hover:text-gold-400"
                    >
                      <Icon size={17} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="eyebrow">{col.title}</h2>
                <ul className="mt-5 space-y-3 text-[0.95rem]">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="link-draw text-white/85 hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow">Visit or call</h2>
            <address className="mt-5 space-y-4 text-[0.95rem] not-italic">
              <a href={site.google.profileUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-white/85 hover:text-white">
                <MapPin size={17} strokeWidth={1.6} className="mt-0.5 shrink-0 text-gold-400" aria-hidden />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.locality}, {site.address.country}
                </span>
              </a>
              {site.contact.phones.map((p) => (
                <a key={p.e164} href={telHref(p.e164)} className="flex gap-3 text-white/85 hover:text-white">
                  <Phone size={17} strokeWidth={1.6} className="mt-0.5 shrink-0 text-gold-400" aria-hidden />
                  <span>
                    {p.display}
                    <span className="block text-xs text-mist-dim">{p.label}</span>
                  </span>
                </a>
              ))}
              <a href={`mailto:${site.contact.email}`} className="flex gap-3 text-white/85 hover:text-white">
                <Mail size={17} strokeWidth={1.6} className="mt-0.5 shrink-0 text-gold-400" aria-hidden />
                {site.contact.email}
              </a>
              <a
                href={whatsappHref(generalEnquiry)}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                className="flex gap-3 text-white/85 hover:text-white"
              >
                <WhatsAppIcon size={17} className="mt-0.5 shrink-0 text-gold-400" />
                WhatsApp {site.contact.whatsapp.display}
              </a>
            </address>
          </div>
        </div>

        <span className="horizon mt-16 opacity-60" aria-hidden />
        <div className="mt-8 flex flex-col gap-4 text-[0.8rem] text-mist-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy-policy/" className="hover:text-white">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/photo-credits/" className="hover:text-white">
                Photo credits
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
