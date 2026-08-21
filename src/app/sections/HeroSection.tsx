"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Countdown from "@/components/Countdown";
import { weddingData } from "@/lib/data";

export default function HeroSection() {
  const { hero, countdown, ornaments } = weddingData;
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % hero.bgImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [hero.bgImages.length]);

  const scrollToNext = () => {
    document.getElementById("person")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center p-6 md:p-8 lg:p-16 overflow-hidden select-none"
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {hero.bgImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Background Pernikahan ${index + 1}`}
            fill
            priority={index === 0}
            className={`object-cover h-auto grayscale brightness-50 animate-zoom-slow pointer-events-none transition-opacity duration-1000 ${
              index === currentBgIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/40 -z-10 pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-between max-w-5xl w-full h-full min-h-[80vh] mx-auto gap-6 sm:gap-8 md:gap-10 lg:gap-12 text-center py-6">
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Balinese Header */}
          <ScrollReveal animation="fade-in-down" className="w-48 sm:w-64 md:w-80 lg:w-96 max-w-[85vw] drop-shadow-xl">
            <div className="animate-float">
              <Image
                src={ornaments.balineseHeader1}
                alt="Balinese Header Ornament"
                width={400}
                height={100}
                priority
                className="w-full h-auto object-contain filter drop-shadow-md"
              />
            </div>
          </ScrollReveal>

          {/* Main Text */}
          <ScrollReveal animation="fade-in-up" delay={200} className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 px-2">
            <span className="text-sm md:text-base lg:text-lg font-serif font-semibold tracking-[0.25em] uppercase text-bali-sand/90 drop-shadow-sm">
              {hero.subtitle}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-script text-bali-gold drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] py-1 leading-tight sm:leading-none">
              {hero.title}
            </h1>
            <span className="text-sm md:text-base lg:text-lg font-sans font-semibold tracking-[0.25em] uppercase text-bali-sand/90 drop-shadow-sm">
              {hero.date}
            </span>
          </ScrollReveal>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Countdown */}
          <ScrollReveal animation="fade-in-up" delay={300}>
            <Countdown isoDate={countdown.isoDate} />
          </ScrollReveal>

          {/* CTA Button */}
          <ScrollReveal animation="fade-in-up" delay={500}>
            <button
              id="hero-cta"
              onClick={scrollToNext}
              className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
              aria-label="Lihat undangan"
            >
              <span className="text-sm font-sans font-semibold tracking-[0.2em] uppercase text-bali-sand/80 group-hover:text-bali-gold transition-colors duration-300">
                {hero.ctaButtonText}
              </span>
              <ChevronDown className="w-5 h-5 text-bali-gold/70 group-hover:text-bali-gold animate-bounce" />
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
