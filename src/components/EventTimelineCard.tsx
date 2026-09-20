"use client";

import { Clock } from "lucide-react";
import { EventTimelineCardProps } from "@/types";

export default function EventTimelineCard({
  date,
  leftSchedule,
  rightSchedule,
  className = "",
}: EventTimelineCardProps) {
  // Resolve primary header date (Hari, Tanggal)
  const displayDate =
    date ||
    leftSchedule?.date ||
    rightSchedule?.date ||
    "Jumat, 09 Oktober 2026";

  return (
    <div
      className={`flex flex-col gap-5 w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-bali-gold/30 rounded-2xl p-4 sm:p-6 shadow-2xl hover:border-bali-gold/55 hover:bg-white/15 transition-all duration-300 text-center ${className}`}
    >
      {/* ─── Hari, Tanggal ─── */}
      <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-bali-gold drop-shadow-sm">
        {displayDate}
      </h3>

      {/* ─── Divider ─── */}
      <div className="h-px bg-bali-gold/50 rounded-full" />

      {/* ─── 2 Kolom Bersisian: leftSchedule & rightSchedule ─── */}
      <div className="relative grid grid-cols-2 gap-4 w-full">
        {/* Garis Pembagi Tengah Presisi */}
        <div className="absolute left-1/2 top-1 bottom-1 w-px -translate-x-1/2 bg-bali-gold/30" />

        {/* Kolom Kiri: leftSchedule */}
        <div className="flex flex-col gap-3 items-center px-1">
          <h4 className="text-xl sm:text-2xl font-serif font-semibold text-bali-bronze drop-shadow-sm">
            {leftSchedule?.title || "Prosesi"}
          </h4>
          {leftSchedule?.date && leftSchedule.date !== displayDate && (
            <p className="text-base sm:text-lg font-serif font-semibold text-bali-bronze">
              {leftSchedule.date}
            </p>
          )}
          {(leftSchedule?.timeStart || leftSchedule?.timeEnd) && (
            <div className="flex items-center justify-center gap-1 text-sm sm:text-base font-sans">
              <Clock className="w-4 h-4 text-bali-gold shrink-0" />
              <span className="text-foreground/90 text-xs md:text-sm">
                {leftSchedule.timeStart} – {leftSchedule.timeEnd} WITA
              </span>
            </div>
          )}
        </div>

        {/* Kolom Kanan: rightSchedule */}
        <div className="flex flex-col gap-3 items-center px-1">
          <h4 className="text-xl sm:text-2xl font-serif font-semibold text-bali-bronze drop-shadow-sm">
            {rightSchedule?.title || "Resepsi"}
          </h4>
          {rightSchedule?.date && rightSchedule.date !== displayDate && (
            <p className="text-base sm:text-lg font-serif font-semibold text-bali-bronze">
              {rightSchedule.date}
            </p>
          )}
          {(rightSchedule?.timeStart || rightSchedule?.timeEnd) && (
            <div className="flex items-center justify-center gap-1 text-sm sm:text-base font-sans">
              <Clock className="w-4 h-4 text-bali-gold shrink-0" />
              <span className="text-foreground/90 text-xs md:text-sm">
                {rightSchedule.timeStart} – {rightSchedule.timeEnd} WITA
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
