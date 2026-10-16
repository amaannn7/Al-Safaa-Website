import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Al-Safaa Travels & Tours handles personal information on flyalsafaa.com.",
  alternates: { canonical: "/privacy-policy/" },
};

const UPDATED = "17 October 2026";

/**
 * Rewritten to describe how this site actually works (the previous policy was
 * WordPress boilerplate about comments and logins that no longer exist).
 * Have it reviewed by the agency before launch.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero compact eyebrow="Legal" title="Privacy policy" crumbs={[{ name: "Privacy policy", path: "/privacy-policy/" }]} />
      <article className="shell py-20 lg:py-28">
        <div className="mx-auto max-w-3xl space-y-12 text-[1.05rem] leading-relaxed text-body [&_h2]:display [&_h2]:text-[2rem] [&_h2]:leading-tight [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          <p className="text-sm text-muted">Last updated {UPDATED}</p>

          <section>
            <h2>Who we are</h2>
            <p>
              {site.name} is a travel agent based in Colombo, Sri Lanka, operating since {site.established} and specialising in
              Hajj and Umrah pilgrimages and Middle Eastern tours. Our office is at {site.address.street}, {site.address.locality},{" "}
              {site.address.country}. You can contact us at <a className="underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </p>
          </section>

          <section>
            <h2>What this website collects</h2>
            <p>
              This website does not have forms, user accounts or online payments, and we do not ask you to enter personal
              information here. We do not use advertising or analytics cookies.
            </p>
            <p>
              Like most websites, our hosting provider automatically processes basic technical information (such as your IP
              address, browser type and the pages requested) to deliver the site and keep it secure.
            </p>
          </section>

          <section>
            <h2>When you contact us</h2>
            <p>
              If you contact us by WhatsApp, phone or email, we receive the details you choose to share, such as your name, phone
              number and the message itself. We use this only to answer your enquiry and, if you travel with us, to arrange your
              travel — including passport, visa and flight details that the authorities and airlines require.
            </p>
            <p>
              WhatsApp messages are handled by WhatsApp (Meta) under its own privacy policy. Our WhatsApp buttons simply open a
              chat with a suggested first message, which you can edit before sending.
            </p>
          </section>

          <section>
            <h2>Content from other websites</h2>
            <p>Some pages include features provided by other companies:</p>
            <ul>
              <li>
                <strong>Flight comparison</strong> links take you to our partner Aviasales. Anything you do on their site is
                subject to Aviasales&apos; own terms and privacy policy.
              </li>
              <li>
                <strong>Videos</strong> are hosted on YouTube. Nothing is loaded from YouTube until you press play; the player
                then uses YouTube&apos;s privacy-enhanced mode.
              </li>
              <li>
                <strong>Maps</strong> on our contact page are provided by Google Maps.
              </li>
              <li>
                <strong>Fonts</strong> are delivered by Fontshare (Indian Type Foundry), which receives your IP address when
                the font files load.
              </li>
            </ul>
            <p>These services may collect data about you in the same way as if you visited their websites directly.</p>
          </section>

          <section>
            <h2>Who we share your data with</h2>
            <p>
              We strictly do not share your data with any other organisation, except with the government institutions where
              required by law, and with the airlines, hotels and authorities needed to arrange a journey you have arranged with us.
            </p>
          </section>

          <section>
            <h2>Your rights</h2>
            <p>
              You can ask us what personal information we hold about you, and ask us to correct or delete it, by emailing{" "}
              <a className="underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. We may need to keep some
              records for legal, administrative or security purposes.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
