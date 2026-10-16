import { cacheLife } from "next/cache";
import type { IsoDate } from "@/data/types";
import { isoDateInZone } from "./packages";

/**
 * Today's date in Sri Lanka.
 *
 * Cached with the "hours" profile: any page that awaits this is regenerated
 * in the background at least hourly (and never served more than a day old),
 * so a departure drops off "Upcoming" within an hour of midnight in Colombo
 * without a redeploy.
 *
 * PREVIEW_TODAY=YYYY-MM-DD lets local and staging builds preview the site as
 * it will look on another date. It is ignored on Vercel production.
 */
export async function getTodayInColombo(): Promise<IsoDate> {
  "use cache";
  cacheLife("hours");
  const preview = process.env.PREVIEW_TODAY;
  if (preview && process.env.VERCEL_ENV !== "production" && /^\d{4}-\d{2}-\d{2}$/.test(preview)) {
    return preview as IsoDate;
  }
  return isoDateInZone(new Date());
}
