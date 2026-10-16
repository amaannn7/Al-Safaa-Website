import Image from "next/image";

/**
 * Each point is backed by the agency's own published material (About page,
 * package inclusions, YouTube programme). Don't add claims that aren't.
 */
const reasons = [
  {
    title: "Organised group journeys",
    body: "Pioneers in organising group tours to the holy sites since 1997. You travel with a group and a guide, not on your own.",
  },
  {
    title: "Accommodation close to the Haram",
    body: "From the 5-star Elaf Kinda beside the Clock Tower to hotels within walking distance of both Harams — chosen so less time is spent travelling and more in worship.",
  },
  {
    title: "Transport taken care of",
    body: "Luxury transport in Saudi Arabia, a private group bus during the Hajj days, and a shuttle van to the Haram from the shifting hotel.",
  },
  {
    title: "Food that feels like home",
    body: "Sri Lankan food on our Umrah journeys and full-board buffet meals during Hajj, including in the Mina tents.",
  },
  {
    title: "Guidance before and during",
    body: "Experienced guides travel with our groups, and our preparation talks and bayan programmes help pilgrims understand each rite before they leave.",
  },
  {
    title: "A team you can call",
    body: "Speak directly with our Colombo office by phone or WhatsApp, from your first question to your return home.",
  },
];

export function Why() {
  return (
    <section aria-labelledby="why" className="py-24 lg:py-36">
      <div className="shell grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow" data-reveal>
              Why Al-Safaa
            </p>
            <h2 id="why" className="display display-md mt-4" data-reveal>
              The details are ours to carry. The journey is yours.
            </h2>
            <div className="relative mt-12 hidden aspect-[4/5] max-w-sm overflow-hidden rounded-[1.75rem] lg:block" data-reveal-image>
              <Image
                src="/images/photos/dates-and-coffee.jpg"
                alt="Dates in a woven basket beside a brass Arabic coffee pot"
                fill
                sizes="380px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <ol className="border-t hairline lg:col-span-7">
          {reasons.map((r, i) => (
            <li key={r.title} className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b hairline py-9 sm:grid-cols-[5rem_1fr]" data-reveal>
              <span className="display text-[2.4rem] leading-none text-gold-700 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="display text-[1.9rem] leading-tight">{r.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">{r.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
