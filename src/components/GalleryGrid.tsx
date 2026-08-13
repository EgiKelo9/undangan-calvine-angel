"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "@/types";

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + items.length) % items.length : null,
    );
  }, [items.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % items.length : null));
  }, [items.length]);

  if (items.length === 0) return null;

  const lightbox =
    mounted && lightboxIndex !== null
      ? createPortal(
          <div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/92 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 sm:left-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Image */}
            <div
              className="relative w-[90vw] h-[85vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[lightboxIndex].src}
                alt={items[lightboxIndex].alt}
                fill
                className="object-contain"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 sm:right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
              aria-label="Foto berikutnya"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
              aria-label="Tutup lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm font-sans tracking-wider select-none">
              {lightboxIndex + 1} / {items.length}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 w-full">
        {items.map((item, i) => (
          <button
            key={item.src}
            id={`gallery-item-${i}`}
            onClick={() => openLightbox(i)}
            className="relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl group cursor-pointer focus:outline-none focus:ring-2 focus:ring-bali-gold/50 focus:ring-offset-2"
            aria-label={`Buka foto: ${item.alt}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="400"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          </button>
        ))}
      </div>

      {lightbox}
    </>
  );
}
