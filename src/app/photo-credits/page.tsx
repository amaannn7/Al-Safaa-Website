import type { Metadata } from "next";
import { credits } from "@/data/credits";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Photo Credits",
  description: "Credits for the photography used on the Al-Safaa Travels & Tours website.",
  alternates: { canonical: "/photo-credits/" },
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <>
      <PageHero compact eyebrow="With thanks" title="Photo credits" crumbs={[{ name: "Photo credits", path: "/photo-credits/" }]} />
      <section className="shell py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-muted">
            Photographs of Makkah, Madinah and Saudi Arabia are used under the{" "}
            <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="underline">
              Unsplash License
            </a>
            . Sri Lanka photographs and promotional artwork were supplied by Al-Safaa Travels &amp; Tours.
          </p>
          <ul className="mt-10 divide-y hairline border-y hairline">
            {Object.values(credits).map((c) => (
              <li key={c.photo} className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-baseline">
                <a href={c.photo} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-gold-700">
                  {c.subject}
                </a>
                <span className="text-sm text-muted">
                  Photo by{" "}
                  <a href={c.profile} target="_blank" rel="noopener noreferrer" className="underline">
                    {c.photographer}
                  </a>{" "}
                  on Unsplash
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
