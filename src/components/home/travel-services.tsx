import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AviasalesWidget } from "@/components/media/aviasales-widget";
import { confirmedServices, sriLanka } from "@/data/services";

export function TravelServices() {
  const flights = confirmedServices.find((s) => s.slug === "flights");
  return (
    <section aria-labelledby="flights" className="bg-sand-200/70 py-24 lg:py-32">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow">Flights &amp; travel</p>
          <h2 id="flights" className="display display-md mt-4">
            Find good fares, without hidden fees.
          </h2>
          {flights && <p className="lede mt-6 text-muted">{flights.summary}</p>}

          <Link
            href="/services/#visit-sri-lanka"
            className="group mt-12 grid grid-cols-[6rem_1fr_auto] items-center gap-5 rounded-[1.25rem] bg-sand-50 p-3 pr-6 transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgba(6,31,29,.5)]"
          >
            <span className="relative block aspect-square overflow-hidden rounded-[0.9rem]">
              <Image src={sriLanka.hero.src} alt="" fill sizes="96px" className="object-cover" />
            </span>
            <span>
              <span className="eyebrow block">Visit Sri Lanka</span>
              <span className="display mt-1 block text-2xl leading-tight">{sriLanka.title}</span>
            </span>
            <ArrowUpRight size={18} aria-hidden className="text-gold-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <div className="rounded-[1.5rem] bg-sand-50 p-5 shadow-[0_30px_60px_-40px_rgba(6,31,29,.5)] sm:p-8 lg:col-span-7" data-reveal>
          <AviasalesWidget />
        </div>
      </div>
    </section>
  );
}
