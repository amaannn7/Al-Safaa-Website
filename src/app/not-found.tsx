import { LinkButton, WhatsAppButton } from "@/components/ui/button";
import { generalEnquiry } from "@/lib/contact";

export default function NotFound() {
  return (
    <section className="on-dark grain flex min-h-[80svh] items-center bg-ink-900 text-white">
      <div className="shell pt-32 pb-20">
        <p className="eyebrow">Page not found</p>
        <h1 className="display display-lg mt-5 max-w-3xl">This page has moved on, but your journey hasn&apos;t.</h1>
        <p className="lede mt-6 max-w-xl text-mist">
          The page you were looking for doesn&apos;t exist. Our current Hajj and Umrah packages are just a click away.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <LinkButton href="/" arrow>
            Go to the home page
          </LinkButton>
          <LinkButton href="/hajj/" variant="outline-light">
            Hajj packages
          </LinkButton>
          <LinkButton href="/umrah/" variant="outline-light">
            Umrah packages
          </LinkButton>
          <WhatsAppButton message={generalEnquiry} variant="text" className="text-white">
            Ask us on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
