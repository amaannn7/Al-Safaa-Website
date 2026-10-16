import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Legacy } from "@/components/home/legacy";
import { Upcoming } from "@/components/home/upcoming";
import { Pilgrimages } from "@/components/home/pilgrimages";
import { Featured } from "@/components/home/featured";
import { Why } from "@/components/home/why";
import { SaudiExperiences } from "@/components/home/saudi";
import { TravelServices } from "@/components/home/travel-services";
import { Reviews } from "@/components/sections/reviews";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: { absolute: "Al-Safaa Travels & Tours | Hajj & Umrah Packages from Sri Lanka since 1997" },
  description:
    "Hajj 2027 and Umrah group packages from Colombo, Sri Lanka. Trusted by pilgrims since 1997 — accommodation close to the Haram, comfortable transport and experienced guides.",
  alternates: { canonical: "/" },
  openGraph: { images: [{ url: "/images/photos/kaaba-mataf.jpg", alt: "The Kaaba at Masjid al-Haram" }] },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Legacy />
      <Upcoming />
      <Pilgrimages />
      <Featured />
      <Why />
      <Reviews />
      <SaudiExperiences />
      <TravelServices />
      <FinalCta />
    </>
  );
}
