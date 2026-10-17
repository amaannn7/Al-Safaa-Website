import { describe, expect, it } from "vitest";
import { packages as livePackages } from "@/data/packages";
import type { TourPackage } from "@/data/types";
import { formatRange } from "./format";
import { packageEnquiry, whatsappHref } from "./contact";
import {
  availabilityLabel,
  canEnquire,
  daysUntil,
  isoDateInZone,
  listablePackages,
  phaseOf,
  relatedPackages,
  startingPrice,
  upcomingBySeason,
  upcomingDepartures,
} from "./packages";

const base: TourPackage = {
  slug: "x",
  type: "umrah",
  status: "published",
  availability: "unknown",
  title: "X",
  season: "S",
  tagline: "",
  summary: "",
  destination: "",
  departure: "2026-10-22",
  return: "2026-10-31",
  durationDays: 10,
  currency: "LKR",
  prices: [{ label: "Shared", amount: 395_000 }],
  stays: [],
  highlights: [],
  itinerary: [],
  inclusions: [],
  exclusions: [],
  notices: [],
  image: { src: "/x.jpg", alt: "" },
  source: "test",
};
const pkg = (o: Partial<TourPackage>): TourPackage => ({ ...base, ...o });

describe("isoDateInZone (Asia/Colombo, UTC+5:30)", () => {
  it("rolls over at midnight Colombo time, not UTC", () => {
    // 18:29 UTC = 23:59 in Colombo
    expect(isoDateInZone(new Date("2026-10-21T18:29:00Z"))).toBe("2026-10-21");
    // 18:30 UTC = 00:00 next day in Colombo
    expect(isoDateInZone(new Date("2026-10-21T18:30:00Z"))).toBe("2026-10-22");
  });
  it("handles year boundaries", () => {
    expect(isoDateInZone(new Date("2026-12-31T19:00:00Z"))).toBe("2027-01-01");
  });
});

describe("phaseOf", () => {
  const p = pkg({ departure: "2026-10-22", return: "2026-10-31" });
  it("is upcoming until the day before departure", () => {
    expect(phaseOf(p, "2026-10-21")).toBe("upcoming");
  });
  it("stops being upcoming on the departure day", () => {
    expect(phaseOf(p, "2026-10-22")).toBe("travelling");
  });
  it("is travelling through the return day", () => {
    expect(phaseOf(p, "2026-10-31")).toBe("travelling");
  });
  it("is completed after the return day", () => {
    expect(phaseOf(p, "2026-11-01")).toBe("completed");
  });
  it("handles unconfirmed dates", () => {
    expect(phaseOf(pkg({ departure: null, return: null }), "2026-10-17")).toBe("dates-tbc");
  });
});

describe("upcomingDepartures", () => {
  const list = [
    pkg({ slug: "late", departure: "2027-05-10", return: "2027-05-23", type: "hajj" }),
    pkg({ slug: "soon", departure: "2026-10-22" }),
    pkg({ slug: "past", departure: "2024-10-24", return: "2024-11-02" }),
    pkg({ slug: "draft", status: "draft", departure: "2026-12-01" }),
    pkg({ slug: "cancelled", status: "cancelled", departure: "2026-11-15" }),
    pkg({ slug: "tbc", departure: null, return: null }),
    pkg({ slug: "mid", departure: "2027-05-02", return: "2027-05-23", type: "hajj" }),
  ];

  it("shows only published, future, dated departures, nearest first", () => {
    expect(upcomingDepartures(list, "2026-10-17").map((p) => p.slug)).toEqual(["soon", "mid", "late"]);
  });
  it("drops a departure on its departure day", () => {
    expect(upcomingDepartures(list, "2026-10-22").map((p) => p.slug)).toEqual(["mid", "late"]);
  });
  it("filters by type and limits", () => {
    expect(upcomingDepartures(list, "2026-10-17", { type: "hajj", limit: 1 }).map((p) => p.slug)).toEqual(["mid"]);
  });
  it("returns an empty list when nothing is upcoming", () => {
    expect(upcomingDepartures(list, "2028-01-01")).toEqual([]);
  });
  it("keeps sold-out departures visible (with an honest label)", () => {
    const sold = pkg({ slug: "sold", availability: "sold-out", departure: "2026-11-01" });
    expect(upcomingDepartures([sold], "2026-10-17")).toHaveLength(1);
    expect(availabilityLabel(sold, "2026-10-17")?.label).toBe("Fully booked");
    expect(canEnquire(sold, "2026-10-17")).toBe(false);
  });
});

describe("upcomingBySeason", () => {
  const list = [
    pkg({ slug: "h22", season: "Hajj 2027", type: "hajj", departure: "2027-05-02", return: "2027-05-23" }),
    pkg({ slug: "h14", season: "Hajj 2027", type: "hajj", departure: "2027-05-10", return: "2027-05-23" }),
    pkg({ slug: "oct", season: "Umrah Oct", departure: "2026-10-22" }),
    pkg({ slug: "old", season: "Umrah 2024", departure: "2024-10-24", return: "2024-11-02" }),
  ];
  it("groups packages of a season together, nearest season first", () => {
    expect(upcomingBySeason(list, "2026-10-17").map((g) => g.map((p) => p.slug))).toEqual([["oct"], ["h22", "h14"]]);
  });
  it("drops a season's poster once all its packages have departed", () => {
    expect(upcomingBySeason(list, "2026-10-22").map((g) => g.map((p) => p.slug))).toEqual([["h22", "h14"]]);
    expect(upcomingBySeason(list, "2027-05-02").map((g) => g.map((p) => p.slug))).toEqual([["h14"]]);
    expect(upcomingBySeason(list, "2027-06-01")).toEqual([]);
  });
});

describe("listablePackages", () => {
  it("lists upcoming first, then date-TBC, never completed", () => {
    const list = [
      pkg({ slug: "tbc", departure: null, return: null }),
      pkg({ slug: "past", departure: "2024-10-24", return: "2024-11-02" }),
      pkg({ slug: "soon", departure: "2026-10-22" }),
    ];
    expect(listablePackages(list, "2026-10-17", "umrah").map((p) => p.slug)).toEqual(["soon", "tbc"]);
  });
});

describe("availabilityLabel", () => {
  it("never invents availability", () => {
    expect(availabilityLabel(pkg({ availability: "unknown" }), "2026-10-17")).toBeNull();
  });
  it("labels limited seats only when stated", () => {
    expect(availabilityLabel(pkg({ availability: "limited" }), "2026-10-17")?.label).toBe("Limited seats");
  });
});

describe("pricing and enquiries", () => {
  it("uses the lowest adult fare as the starting price", () => {
    const p = pkg({
      prices: [
        { label: "Double", amount: 475_000 },
        { label: "Shared", amount: 395_000 },
        { label: "Child", amount: 280_000, kind: "child" },
        { label: "Infant", amount: 100_000, kind: "infant" },
      ],
    });
    expect(startingPrice(p)).toBe(395_000);
  });
  it("encodes package-specific WhatsApp messages", () => {
    const href = whatsappHref(packageEnquiry(pkg({ title: "Hajj 2027 · 22 Days", departure: "2027-05-02", return: "2027-05-23" })));
    expect(href.startsWith("https://wa.me/94717107887?text=")).toBe(true);
    const text = decodeURIComponent(href.split("?text=")[1]);
    expect(text).toBe(
      "Assalamu Alaikum, I would like to enquire about the Hajj 2027 · 22 Days package (2 to 23 May 2027). Could you please share more details?",
    );
    expect(href).not.toMatch(/[ &#]/);
  });
  it("formats ranges across months and years", () => {
    expect(formatRange("2026-10-22", "2026-10-31")).toBe("22 to 31 Oct 2026");
    expect(formatRange("2026-12-28", "2027-01-06")).toBe("28 Dec 2026 to 6 Jan 2027");
  });
  it("counts days between calendar dates", () => {
    expect(daysUntil("2026-10-22", "2026-10-17")).toBe(5);
  });
});

describe("live package data", () => {
  it("has unique slugs and consistent dates", () => {
    const slugs = livePackages.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const p of livePackages) {
      if (p.departure && p.return) expect(p.return >= p.departure).toBe(true);
      expect(p.image.alt.length).toBeGreaterThan(10);
      expect(p.prices.length).toBeGreaterThan(0);
    }
  });
  it("matches durations to inclusive dates", () => {
    for (const p of livePackages) {
      if (p.departure && p.return) expect(daysUntil(p.return, p.departure) + 1).toBe(p.durationDays);
    }
  });
  it("on 17 Oct 2026 shows October Umrah first, then the Hajj groups", () => {
    expect(upcomingDepartures(livePackages, "2026-10-17").map((p) => p.slug)).toEqual([
      "umrah-october-2026",
      "hajj-2027-22-days",
      "hajj-2027-14-days",
    ]);
  });
  it("suggests related packages that are still bookable", () => {
    const hajj22 = livePackages.find((p) => p.slug === "hajj-2027-22-days")!;
    expect(relatedPackages(livePackages, hajj22, "2026-10-23").map((p) => p.slug)).toEqual(["hajj-2027-14-days"]);
  });
});
