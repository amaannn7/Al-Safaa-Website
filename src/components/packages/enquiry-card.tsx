import type { IsoDate, TourPackage } from "@/data/types";
import { CallButton, WhatsAppButton } from "@/components/ui/button";
import { site } from "@/config/site";
import { canEnquire, phaseOf } from "@/lib/packages";
import { formatDate } from "@/lib/format";
import { packageEnquiry } from "@/lib/contact";
import { FromPrice, StatusPill } from "./bits";

/** Sticky summary + CTAs on package detail pages. */
export function EnquiryCard({ pkg, today }: { pkg: TourPackage; today: IsoDate }) {
  const phase = phaseOf(pkg, today);
  return (
    <div className="on-dark grain overflow-hidden rounded-[1.5rem] bg-ink-900 p-7 text-white shadow-[0_30px_60px_-30px_rgba(6,31,29,.6)] sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <span className="eyebrow">{pkg.season}</span>
        <StatusPill pkg={pkg} today={today} />
      </div>
      <FromPrice pkg={pkg} size="lg" className="mt-6" />
      <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-white/12 pt-6 text-sm">
        <div>
          <dt className="text-mist-dim">Departure</dt>
          <dd className="mt-1 font-semibold">{pkg.departure ? formatDate(pkg.departure, { month: "short" }) : "To be confirmed"}</dd>
        </div>
        <div>
          <dt className="text-mist-dim">Return</dt>
          <dd className="mt-1 font-semibold">{pkg.return ? formatDate(pkg.return, { month: "short" }) : "To be confirmed"}</dd>
        </div>
        <div>
          <dt className="text-mist-dim">Duration</dt>
          <dd className="mt-1 font-semibold">{pkg.durationDays} days</dd>
        </div>
        {pkg.flight && (
          <div>
            <dt className="text-mist-dim">Airline</dt>
            <dd className="mt-1 font-semibold">{pkg.flight.airline}</dd>
          </div>
        )}
      </dl>

      {canEnquire(pkg, today) ? (
        <div className="mt-8 grid gap-3">
          <WhatsAppButton message={packageEnquiry(pkg)} size="lg" className="w-full">
            Enquire on WhatsApp
          </WhatsAppButton>
          <CallButton e164={site.contact.phones[0].e164} variant="outline-light" size="lg" className="w-full">
            Call {site.contact.phones[0].display}
          </CallButton>
          <p className="mt-2 text-center text-[0.8rem] text-mist-dim">
            Your message is prefilled with this package — just press send.
          </p>
        </div>
      ) : (
        <p className="mt-8 rounded-xl bg-white/6 p-4 text-sm text-mist">
          {phase === "completed"
            ? "This journey has been completed. See our current departures below."
            : phase === "travelling"
              ? "This group is currently travelling. See our other departures below."
              : "This departure is fully booked. Ask us about the next one."}
        </p>
      )}
    </div>
  );
}
