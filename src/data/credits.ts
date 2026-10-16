/**
 * Photography credits. All photos below are used under the Unsplash License
 * (free for commercial use; attribution appreciated, not required — we credit
 * anyway). Verified and downloaded 17 Oct 2026. Images under /images/existing
 * came from the agency's own WordPress media library; confirm their licences
 * with the agency before launch (see docs/03-launch-checklist.md).
 */
export type Credit = { photographer: string; profile: string; photo: string; subject: string };

export const credits: Record<string, Credit> = {
  "kaaba-mataf": { photographer: "Sam Riz", profile: "https://unsplash.com/@itssamriz", photo: "https://unsplash.com/photos/ceNCWYqL8DY", subject: "The Kaaba, Masjid al-Haram" },
  "kaaba-crowd": { photographer: "Haidan", profile: "https://unsplash.com/@hydngallery", photo: "https://unsplash.com/photos/IAwnp88Fz8Y", subject: "Tawaf around the Kaaba" },
  "pilgrims-ihram": { photographer: "ibrahim uz", profile: "https://unsplash.com/@iuz_official", photo: "https://unsplash.com/photos/3Z3RvzpVAqM", subject: "Pilgrims in ihram, Makkah" },
  "haram-monochrome": { photographer: "Mohamed A. Elnaggar", profile: "https://unsplash.com/@mohamed213", photo: "https://unsplash.com/photos/pAaNmZ9z0Bg", subject: "Masjid al-Haram" },
  "makkah-clock-tower": { photographer: "Mohamed Fares", profile: "https://unsplash.com/@mohamadfares1", photo: "https://unsplash.com/photos/p1NeOn7DeDk", subject: "Abraj Al Bait clock, Makkah" },
  "makkah-city": { photographer: "Sikiru Salami", profile: "https://unsplash.com/@goodsalam", photo: "https://unsplash.com/photos/jZp68sRx2w4", subject: "Makkah" },
  "madinah-golden-hour": { photographer: "Sulthan Auliya", profile: "https://unsplash.com/@swafie", photo: "https://unsplash.com/photos/rzzS0_pMsD0", subject: "Masjid an-Nabawi, Madinah" },
  "madinah-green-dome": { photographer: "djonk creative", profile: "https://unsplash.com/@djonk_creative", photo: "https://unsplash.com/photos/AdZ68iA9X08", subject: "The Green Dome, Madinah" },
  "madinah-umbrellas": { photographer: "Haidan", profile: "https://unsplash.com/@hydngallery", photo: "https://unsplash.com/photos/RhkbHU14MoA", subject: "Courtyard of Masjid an-Nabawi" },
  "madinah-courtyard": { photographer: "A Miah", profile: "https://unsplash.com/@amiah137", photo: "https://unsplash.com/photos/hJXiPheKFus", subject: "Masjid an-Nabawi" },
  "madinah-minarets": { photographer: "Yasmine Arfaoui", profile: "https://unsplash.com/@yasmine_photo", photo: "https://unsplash.com/photos/qbvAboqHkBg", subject: "Minarets of Masjid an-Nabawi" },
  "alula-elephant-rock": { photographer: "Hatem Boukhit", profile: "https://unsplash.com/@boukhithatem", photo: "https://unsplash.com/photos/0nKLqQFGq2s", subject: "Elephant Rock, AlUla" },
  "alula-night": { photographer: "SALEH", profile: "https://unsplash.com/@shs3", photo: "https://unsplash.com/photos/2SxmcGYpG94", subject: "Night sky over AlUla" },
  "riyadh-kingdom-centre": { photographer: "Hala AlGhanim", profile: "https://unsplash.com/@hala097", photo: "https://unsplash.com/photos/f5ZB0LHwi0s", subject: "Kingdom Centre, Riyadh" },
  "saudi-desert": { photographer: "Rabah Al Shammary", profile: "https://unsplash.com/@rabah_shammary", photo: "https://unsplash.com/photos/7vOpzRF33Zo", subject: "Saudi desert" },
  "dates-and-coffee": { photographer: "L Photography", profile: "https://unsplash.com/@lphotohraphy", photo: "https://unsplash.com/photos/URncnSvN6Kw", subject: "Dates and Arabic coffee" },
};
