"use client";

import HeroSection from "@/app/sections/HeroSection";
import PersonSection from "@/app/sections/PersonSection";
import QuoteSection from "@/app/sections/QuoteSection";
import EventSection from "@/app/sections/EventSection";
import GallerySection from "@/app/sections/GallerySection";
import GiftSection from "@/app/sections/GiftSection";
import RsvpSection from "@/app/sections/RsvpSection";
import FooterSection from "@/app/sections/FooterSection";

export default function Main() {
  return (
    <main className="w-full min-h-screen relative overflow-x-hidden">
      <HeroSection />
      <PersonSection />
      <QuoteSection />
      <EventSection />
      <GallerySection />
      <GiftSection />
      <RsvpSection />
      <FooterSection />
    </main>
  );
}
