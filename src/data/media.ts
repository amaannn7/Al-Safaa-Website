/**
 * Videos from the agency's own YouTube channel (youtube.com/@flyalsafaa),
 * taken from the channel feed on 17 Oct 2026. Embeds load only on click.
 */
export interface Video {
  id: string;
  title: string;
  published: string;
  language?: string;
  speaker?: string;
  topic: "hajj" | "umrah";
}

export const videos: Video[] = [
  { id: "SIEujsIihDU", title: "Hajj: The Journey of a Lifetime – Meaning, Purpose & How to Perform It", published: "2026-05-03", topic: "hajj" },
  { id: "7NAIIh39STI", title: "Hajj: Meaning, Purpose & How to Get Ready", published: "2025-05-09", language: "Tamil", speaker: "Moulavi I.L.M Ibrahim", topic: "hajj" },
  { id: "Tjl0BvWcGmQ", title: "The Importance of Hajj & How to Prepare", published: "2024-05-24", language: "Tamil", speaker: "Moulavi I.L.M Ibrahim", topic: "hajj" },
  { id: "aFN4hWO0PFc", title: "Umrah Bayan", published: "2024-01-31", language: "Tamil", speaker: "Moulavi I.L.M Ibrahim", topic: "umrah" },
  { id: "JtgPmN3mTYU", title: "Hajj 2023 – Bayan Programme", published: "2023-06-08", topic: "hajj" },
];
