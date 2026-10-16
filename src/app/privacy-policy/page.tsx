import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy of Al-Safaa Travels & Tours, a travel agent based in Sri Lanka operating since 1997, specializing in Hajj & Umrah pilgrimage and middle eastern tours.",
  alternates: { canonical: "/privacy-policy/" },
};

/**
 * The sections of the previous site's privacy policy that still apply,
 * verbatim. Sections about comments, logins and media uploads were dropped
 * because this site has none of those features.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero compact eyebrow="Legal" title="Privacy Policy" crumbs={[{ name: "Privacy Policy", path: "/privacy-policy/" }]} />
      <article className="shell py-20 lg:py-28">
        <div className="mx-auto max-w-3xl space-y-12 text-[1.05rem] leading-relaxed text-body [&_h2]:display [&_h2]:text-[2rem] [&_h2]:leading-tight [&_p]:mt-4">
          <section>
            <h2>Who we are</h2>
            <p>
              We are a travel agent based in Sri Lanka and been operating since 1997, specializing in the field of Hajj &amp; Umrah
              pilgrimage and middle eastern tours.
            </p>
          </section>

          <section>
            <h2>Embedded content from other websites</h2>
            <p>
              Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from
              other websites behaves in the exact same way as if the visitor has visited the other website.
            </p>
            <p>
              These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your
              interaction with that embedded content, including tracking your interaction with the embedded content if you have
              an account and are logged in to that website.
            </p>
          </section>

          <section>
            <h2>Who we share your data with</h2>
            <p>
              We strictly don&apos;t share your data with any other organization except with the government institutions that is
              required by law.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
