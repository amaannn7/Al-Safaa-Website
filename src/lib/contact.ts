import { site } from "@/config/site";
import type { TourPackage } from "@/data/types";
import { formatRange } from "./format";

export function whatsappHref(message?: string, e164: string = site.contact.whatsapp.e164) {
  const base = `https://wa.me/${e164}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telHref(e164: string) {
  return `tel:+${e164}`;
}

export const generalEnquiry =
  "Assalamu Alaikum, I would like to enquire about your Hajj and Umrah packages. Could you please share more details?";

export function packageEnquiry(p: Pick<TourPackage, "title" | "departure" | "return">) {
  const dates = p.departure && p.return ? ` (${formatRange(p.departure, p.return)})` : "";
  return `Assalamu Alaikum, I would like to enquire about the ${p.title} package${dates}. Could you please share more details?`;
}

export function topicEnquiry(topic: string) {
  return `Assalamu Alaikum, I would like to enquire about ${topic}. Could you please share more details?`;
}
