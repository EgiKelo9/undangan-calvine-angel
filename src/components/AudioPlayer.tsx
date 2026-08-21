"use client";

import { useEffect, useRef, useState } from "react";
import { Disc3, VolumeX } from "lucide-react";
import { weddingData } from "@/lib/data";

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
}

export default function AudioPlayer({ autoPlayTrigger = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { audio } = weddingData;

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.warn("Audio autoplay blocked by browser policy:", error);
          setIsPlaying(false);
        });
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Failed to play audio:", error);
        });
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 select-none">
      <audio ref={audioRef} src={audio.src} loop preload="auto" />
      
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Jeda Musik" : "Putar Musik"}
        title={audio.title ? `${isPlaying ? "Jeda" : "Putar"} Musik - ${audio.title}` : (isPlaying ? "Jeda Musik" : "Putar Musik")}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-bali-dark/85 backdrop-blur-md border border-bali-gold/50 text-bali-gold shadow-xl shadow-black/40 hover:border-bali-gold hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {/* Animated outer ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-bali-gold/40 animate-ping pointer-events-none" />
        )}

        {isPlaying ? (
          <Disc3 className="w-6 h-6 sm:w-7 sm:h-7 animate-[spin_5s_linear_infinite] text-bali-gold" />
        ) : (
          <VolumeX className="w-6 h-6 sm:w-7 sm:h-7 text-bali-sand/60 group-hover:text-bali-gold transition-colors duration-300" />
        )}
      </button>
    </div>
  );
}
