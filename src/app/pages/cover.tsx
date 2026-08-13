"use client";

import Image from "next/image";
import { Mail, MailOpen } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { weddingData } from "@/lib/data";

export default function Cover({ name, onOpen }: { name: string; onOpen: () => void; }) {
  const { cover, ornaments } = weddingData;

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-center items-center p-6 md:p-8 lg:p-16 overflow-hidden select-none">
      {/* Background Image */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src={cover.bgImage}
          alt={`Cover ${cover.subtitle} ${cover.title}`}
          fill
          priority
          className="object-cover h-auto grayscale brightness-50 animate-zoom-slow pointer-events-none"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/35 to-black/75 -z-10 pointer-events-none" />

      {/* Main Content Container */}
      <section className="relative z-10 flex flex-col items-center justify-center max-w-5xl w-full mx-auto gap-6 sm:gap-8 md:gap-10 lg:gap-12 text-center py-6">
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
            {cover.subtitle}
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-script text-bali-gold drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] py-1 leading-tight sm:leading-none">
            {cover.title}
          </h1>
        </ScrollReveal>

        {/* Guest Invitation Card */}
        <ScrollReveal animation="fade-in-up" delay={400} className="w-full max-w-xs sm:max-w-md">
          <div className="w-full bg-bali-dark/50 backdrop-blur-md border border-bali-gold/30 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-3 hover:border-bali-gold/50 transition-all duration-300">
            <p className="text-xs sm:text-sm font-sans tracking-widest text-bali-sand/80 font-light">
              {cover.cardLabel}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-bali-gold capitalize tracking-wide wrap-break-word drop-shadow-md py-1 border-b border-bali-gold/20 pb-3">
              {name || cover.defaultGuestName}
            </h2>
            <p className="text-xs sm:text-sm font-sans font-light text-bali-sand/90 pt-1">
              {cover.invitationText}
            </p>
          </div>
        </ScrollReveal>

        {/* CTA Open Invitation Button */}
        <ScrollReveal animation="fade-in-up" delay={500}>
          <button
            onClick={onOpen}
            className="group relative inline-flex items-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 bg-linear-to-r from-bali-gold via-[#D4AF37] to-bali-gold text-bali-dark font-sans font-bold text-sm sm:text-base rounded-full shadow-lg shadow-bali-gold/25 hover:shadow-bali-gold/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-bali-gold/60 animate-pulse-glow focus:outline-none focus:ring-2 focus:ring-bali-gold/50"
          >
            <Mail className="w-5 h-5 block group-hover:hidden transition-transform duration-300 group-hover:scale-110 text-bali-dark" />
            <MailOpen className="w-5 h-5 hidden group-hover:block transition-transform duration-300 group-hover:scale-110 text-bali-dark -translate-y-0.5" />
            <span>{cover.buttonText}</span>
          </button>
        </ScrollReveal>
      </section>
    </main>
  );
}
