import { packages } from "@/data/packages";
import { DepartureBoard } from "@/components/packages/departure-board";
import { ArrowLink } from "@/components/ui/button";
import { upcomingDepartures } from "@/lib/packages";
import { getTodayInColombo } from "@/lib/today";

/**
 * Reads the same package data as the Hajj and Umrah pages; filtering and
 * ordering are handled by upcomingDepartures() against today's date in
 * Colombo, so nothing here is hardcoded.
 */
export async function Upcoming() {
  const today = await getTodayInColombo();
  const items = upcomingDepartures(packages, today, { limit: 5 });

  return (
    <section id="departures" aria-labelledby="upcoming" className="on-dark grain bg-ink-900 py-24 text-white lg:py-32">
      <div className="shell">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div data-reveal>
            <p className="eyebrow">Upcoming group departures</p>
            <h2 id="upcoming" className="display display-md mt-4 max-w-3xl">
              Travel together, with a group that knows the way.
            </h2>
          </div>
          <div className="flex gap-8" data-reveal>
            <ArrowLink href="/hajj/" className="text-white">
              Hajj
            </ArrowLink>
            <ArrowLink href="/umrah/" className="text-white">
              Umrah
            </ArrowLink>
          </div>
        </div>
        <DepartureBoard items={items} today={today} />
      </div>
    </section>
  );
}
