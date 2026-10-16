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
            <h2 id="upcoming" className="display display-md max-w-3xl">
              Upcoming group tours
            </h2>
          </div>
          <div className="flex gap-8" data-reveal>
            <ArrowLink href="/hajj-2027/" className="text-white">
              Hajj 2027
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
