import { Bell } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/button";
import { topicEnquiry } from "@/lib/contact";

/** Shown in "Upcoming group tours" when no departure is scheduled. */
export function EmptyBoard() {
  return (
    <div className="flex flex-col items-start gap-6 border-y border-white/12 py-12 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-4">
        <Bell size={22} strokeWidth={1.5} className="mt-1 shrink-0 text-gold-400" aria-hidden />
        <div>
          <p className="display text-3xl text-white">There are no group tours scheduled right now.</p>
          <p className="mt-2 max-w-xl text-mist">Get in touch with us for more info.</p>
        </div>
      </div>
      <WhatsAppButton message={topicEnquiry("your next Hajj and Umrah group tours")}>WhatsApp us</WhatsAppButton>
    </div>
  );
}
