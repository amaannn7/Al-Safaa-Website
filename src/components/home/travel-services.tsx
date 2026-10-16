import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FlightsLink } from "@/components/media/flights-link";
import { confirmedServices, sriLanka } from "@/data/services";

export function TravelServices() {
  const flights = confirmedServices.find((s) => s.slug === "flights");
  return (
    <section aria-labelledby="flights" className="bg-sand-200/70 py-24 lg:py-32">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6" data-reveal>
          <p className="eyebrow">Flights &amp; travel</p>
          <h2 id="flights" className="display display-md mt-4">
            Find good fares, without hidden fees.
          </h2>
          {flights && <p className="lede mt-6 text-muted">{flights.summary}</p>}
        </div>
        <div className="grid gap-4 lg:col-span-6" data-reveal>
          <FlightsLink />
          <Link
            href="/services/#visit-sri-lanka"
            className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-5 rounded-[1.25rem] bg-sand-50 p-5 pr-6 transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgba(6,31,29,.5)]"
          >
            <span className="relative block h-14 w-14 overflow-hidden rounded-full">
              <Image src={sriLanka.hero.src} alt="" fill sizes="56px" className="object-cover" />
            </span>
            <span>
              <span className="eyebrow block">Visit Sri Lanka</span>
              <span className="mt-1 block text-[1.35rem] font-medium tracking-tight">{sriLanka.title}</span>
            </span>
            <ArrowUpRight size={20} aria-hidden className="text-gold-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
