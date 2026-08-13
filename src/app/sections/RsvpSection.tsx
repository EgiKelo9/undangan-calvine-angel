"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import RsvpForm from "@/components/RsvpForm";
import WishCard from "@/components/WishCard";
import { weddingData } from "@/lib/data";
import { WishEntry } from "@/types";

const ITEMS_PER_PAGE = 5;

export default function RsvpSection() {
  const { rsvp, ornaments } = weddingData;

  const [wishes, setWishes] = useState<WishEntry[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWishes = useCallback(async () => {
    try {
      const res = await fetch("/api/rsvp");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setWishes(json.data);
      }
    } catch (err) {
      // Fail silently; daftar ucapan tetap kosong
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  const handleSubmitSuccess = () => {
    setVisibleCount(ITEMS_PER_PAGE);
    fetchWishes();
  };

  const visibleWishes = wishes.slice(0, visibleCount);
  const hasMore = visibleCount < wishes.length;

  return (
    <section
      id="rsvp"
      className="relative w-full flex flex-col items-center p-6 md:p-8 lg:p-16 bg-bali-sand"
    >
      <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl w-full mx-auto gap-6 md:gap-8 text-center py-6">
        {/* Balinese Header */}
        <ScrollReveal animation="fade-in-down" className="w-32 md:w-40 lg:w-48 drop-shadow-xl">
          <div className="animate-float">
            <Image
              src={ornaments.balineseHeader4}
              alt="Balinese Header Ornament"
              width={320}
              height={80}
              priority
              className="w-full h-auto object-contain filter drop-shadow-md"
            />
          </div>
        </ScrollReveal>

        {/* Title */}
        <ScrollReveal animation="fade-in-up" delay={200} className="flex flex-col items-center justify-center space-y-2 sm:space-y-4 px-2">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-script text-bali-gold drop-shadow-[0_4px_16px_rgba(255,255,255,0.9)] py-1 leading-tight sm:leading-none">
            {rsvp.title}
          </h2>
        </ScrollReveal>

        {/* RSVP Form */}
        <ScrollReveal animation="fade-in-up" delay={200} className="w-full flex justify-center">
          <RsvpForm onSubmitSuccess={handleSubmitSuccess} />
        </ScrollReveal>

        {/* Divider */}
        <div className="w-full max-w-xl">
          <hr className="border-t-2 border-bali-gold/40 rounded-full" />
        </div>

        {/* Wish List */}
        <div className="flex flex-col w-full max-w-xl gap-4 text-left">
          {/* Count Header */}
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-serif font-semibold text-foreground/80">
                Memuat ucapan...
              </span>
            </div>
          ) : (wishes.length > 0) && (
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-serif font-semibold text-foreground/80">
                {isLoading ? "Memuat ucapan..." : `${wishes.length} Ucapan`}
              </span>
            </div>
          )}

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl bg-bali-gold/10 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Wish Cards */}
          {!isLoading && visibleWishes.length === 0 && (
            <p className="text-sm font-sans text-foreground/50 text-center">
              Belum ada ucapan. Jadilah yang pertama!
            </p>
          )}
          {!isLoading && visibleWishes.map((wish, i) => (
            <WishCard key={`${wish.timestamp}-${i}`} {...wish} />
          ))}

          {/* Load More Button */}
          {hasMore && !isLoading && (
            <button
              id="rsvp-load-more"
              onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
              className="mt-2 self-center px-8 py-3 rounded-full bg-bali-gold/5 border border-bali-gold/40 text-sm font-sans font-semibold text-bali-bronze hover:bg-bali-gold/10 hover:border-bali-gold/60 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Lihat Lebih Banyak
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
