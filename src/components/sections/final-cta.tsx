import Image from "next/image";
import { CallButton, LinkButton, WhatsAppButton } from "@/components/ui/button";
import { site } from "@/config/site";
import { generalEnquiry } from "@/lib/contact";

export function FinalCta({
  title = "Get in touch with us for more info",
  body,
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 via-55% to-black/10" />
      </div>
      <div className="shell py-28 lg:py-40">
        <div className="max-w-2xl">
          <h2 id="begin" className="display display-lg" data-reveal>
            {title}
          </h2>
          {body && (
            <p className="lede mt-6 text-white/80" data-reveal>
              {body}
            </p>
          )}
          <div className="mt-10 flex flex-wrap gap-3" data-reveal>
            <WhatsAppButton message={message} size="lg">
              WhatsApp {site.contact.whatsapp.display}
            </WhatsAppButton>
            <CallButton e164={site.contact.phones[0].e164} variant="outline-light" size="lg" />
            <LinkButton href="/contact/" variant="text" size="lg" className="text-white" arrow>
              Contact
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
