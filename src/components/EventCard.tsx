import { Clock, MapPin } from "lucide-react";
import { EventSchedule } from "@/types";

export default function EventCard({ title, date, timeStart, timeEnd, location }: EventSchedule) {
  return (
    <div className="flex flex-col gap-5 w-full bg-white/10 backdrop-blur-md border border-bali-gold/30 rounded-2xl p-6 sm:p-8 shadow-2xl hover:border-bali-gold/55 hover:bg-white/15 transition-all duration-300 text-center">
      <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-bali-gold drop-shadow-sm">
        {title}
      </h3>
      <div className="h-px bg-bali-gold/50 rounded-full" />
      <div className="flex flex-col gap-3 items-center">
        <p className="text-lg sm:text-xl font-serif font-semibold text-bali-bronze">
          {date}
        </p>
        <div className="flex items-center gap-2 text-sm sm:text-base font-sans">
          <Clock className="w-4 h-4 text-bali-gold shrink-0" />
          <span className="text-foreground/90 text-xs md:text-sm">
            {timeStart} – {timeEnd} WITA
          </span>
        </div>
        {/* <div className="flex items-start gap-2 text-sm sm:text-base font-sans">
          <MapPin className="w-4 h-4 text-bali-gold shrink-0 mt-0.5" />
          <span className="text-foreground/90 text-xs md:text-sm">
            {location}
          </span>
        </div> */}
      </div>
    </div>
  );
}
