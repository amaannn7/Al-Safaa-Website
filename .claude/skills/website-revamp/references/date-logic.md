# Date-driven content: reference implementation and tests

Use when a site lists "upcoming" departures/events/courses that must drop off
by themselves. This is the logic that worked (and was unit-tested) on the
Al-Safaa build. Adapt names; keep the rules.

## Rules
1. Store dates as plain calendar dates, `"2026-10-22"`. No times, no zone.
2. "Today" is the calendar date in the BUSINESS's time zone (`Asia/Colombo`), not the server's (UTC).
   `new Intl.DateTimeFormat("en-CA", { timeZone, year:"numeric", month:"2-digit", day:"2-digit" }).format(new Date())` gives `YYYY-MM-DD`.
3. Keep the logic pure: `upcoming(all, today)` takes `today` as an argument and never reads the clock. That is what makes it testable.
4. A departure stops being "upcoming" ON its departure day (from then: travelling, then completed).
5. Hide `draft` and `cancelled`. Keep sold-out visible with an honest label. Packages without dates go in a separate "dates to be confirmed" bucket.
6. Never invent availability: `availability: "unknown"` shows no label and emits no schema.org availability.
7. Group packages of one season (e.g. two Hajj packages) under one poster so a poster disappears only when ALL its packages have departed.

## Rendering without going stale (Next.js with Cache Components)
`new Date()` during render is an error. Wrap it in one cached function and reuse it everywhere:
```ts
export async function getToday(): Promise<IsoDate> {
  "use cache"; cacheLife("hours");
  return isoDateInZone(new Date());   // optional PREVIEW_TODAY override for non-production
}
```
Every page that awaits it is regenerated at least hourly, so a departure disappears within an hour of local midnight with no redeploy.

## Tests worth writing (Vitest, ~25 tests took 100ms)
- the zone boundary: 18:29 UTC vs 18:30 UTC for UTC+5:30 flips the date
- year boundary
- day before departure = upcoming; departure day = travelling; return day = travelling; day after = completed
- draft/cancelled hidden; TBC bucket; sorted nearest-first; limit works
- grouping by season, and a season's poster dropping off only after its last package departs
- data sanity: unique slugs, return >= departure, `durationDays` equals inclusive day count
- build the whole site with a PREVIEW_TODAY of the departure day and of a date after everything: the empty states must render

## Verify the real thing, not only the unit
`PREVIEW_TODAY=2026-10-22 npm run build && npm start`, then fetch the page and check which items appear. Do it for the day a departure leaves and for a date after all of them.
