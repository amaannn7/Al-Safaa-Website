import { LinkButton, WhatsAppButton } from "@/components/ui/button";
import { generalEnquiry } from "@/lib/contact";

export default function NotFound() {
  return (
    <section className="on-dark grain flex min-h-[80svh] items-center bg-ink-900 text-white">
      <div className="shell pt-32 pb-20">
        <p className="eyebrow">Page not found</p>
        <h1 className="display display-lg mt-5 max-w-3xl">This page doesn&apos;t exist.</h1>
        <div className="mt-10 flex flex-wrap gap-3">
          <LinkButton href="/" arrow>
            Home
          </LinkButton>
          <LinkButton href="/hajj-2027/" variant="outline-light">
            Hajj 2027
          </LinkButton>
          <LinkButton href="/umrah/" variant="outline-light">
            Umrah
          </LinkButton>
          <WhatsAppButton message={generalEnquiry} variant="text" className="text-white">
            WhatsApp us
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
