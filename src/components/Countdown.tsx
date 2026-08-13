"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  isoDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown({ isoDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set initial value pada client untuk menghindari hydration mismatch
    setTimeLeft(calculateTimeLeft(isoDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(isoDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [isoDate]);

  const units = [
    { value: timeLeft.days, label: "Hari" },
    { value: timeLeft.hours, label: "Jam" },
    { value: timeLeft.minutes, label: "Menit" },
    { value: timeLeft.seconds, label: "Detik" },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-bali-gold/40 rounded-2xl px-3 py-2.5 sm:px-5 sm:py-4 min-w-15 sm:min-w-19 shadow-lg">
            <span className="text-2xl sm:text-4xl font-mono font-bold text-bali-gold tabular-nums leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {pad(unit.value)}
            </span>
            <span className="text-[10px] sm:text-xs font-sans text-bali-sand/80 mt-1 tracking-widest uppercase">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-xl sm:text-3xl font-bold text-bali-gold/60 -mt-4 select-none">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
