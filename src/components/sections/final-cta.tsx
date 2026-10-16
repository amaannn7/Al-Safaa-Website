import Image from "next/image";
import { CallButton, LinkButton, WhatsAppButton } from "@/components/ui/button";
import { site } from "@/config/site";
import { generalEnquiry } from "@/lib/contact";

export function FinalCta({
  title = "Begin with a conversation.",
  body = "Tell us when you hope to travel and who will be joining you. We will walk you through the options — on WhatsApp, by phone, or in person at our Colombo office.",
  message = generalEnquiry,
  image = { src: "/images/photos/madinah-minarets.jpg", alt: "Minarets of Masjid an-Nabawi against a soft evening sky" },
}: {
  title?: string;
  body?: string;
  message?: string;
  image?: { src: string; alt: string };
}) {
  return (
    <section aria-labelledby="begin" className="on-dark relative isolate overflow-hidden bg-ink-950 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -inset-y-[10%] inset-x-0" data-parallax>
          <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-ink-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/50 to-transparent" />
      </div>
      <div className="shell py-28 lg:py-40">
        <div className="max-w-2xl">
          <p className="eyebrow" data-reveal>
            Enquire
          </p>
          <h2 id="begin" className="display display-lg mt-5" data-reveal>
            {title}
          </h2>
          <p className="lede mt-6 text-white/80" data-reveal>
            {body}
          </p>
          <div className="mt-10 flex flex-wrap gap-3" data-reveal>
            <WhatsAppButton message={message} size="lg">
              WhatsApp {site.contact.whatsapp.display}
            </WhatsAppButton>
            <CallButton e164={site.contact.phones[0].e164} variant="outline-light" size="lg" />
            <LinkButton href="/contact/" variant="text" size="lg" className="text-white" arrow>
              Visit us
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
