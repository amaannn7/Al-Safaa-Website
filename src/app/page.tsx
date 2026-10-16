import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Legacy } from "@/components/home/legacy";
import { Upcoming } from "@/components/home/upcoming";
import { SaudiExperiences } from "@/components/home/saudi";
import { TravelServices } from "@/components/home/travel-services";
import { Reviews } from "@/components/sections/reviews";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: { absolute: "Al-Safaa Travels & Tours | Hajj & Umrah Packages from Sri Lanka since 1997" },
  description:
    "Al-Safaa Travels & Tours, Colombo. Hajj 2027 and Umrah group tours. Trusted by thousands of pilgrims since 1997.",
  alternates: { canonical: "/" },
  openGraph: { images: [{ url: "/images/photos/kaaba-mataf.jpg", alt: "The Kaaba at Masjid al-Haram" }] },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Legacy />
      <Upcoming />
      <Reviews />
      <SaudiExperiences />
      <TravelServices />
      <FinalCta />
    </>
  );
}
