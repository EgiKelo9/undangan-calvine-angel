import { WishEntry } from "@/types";

function formatRelativeTime(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months > 0) return `${months} bulan yang lalu`;
  if (days > 0) return `${days} hari yang lalu`;
  if (hours > 0) return `${hours} jam yang lalu`;
  if (minutes > 0) return `${minutes} menit yang lalu`;
  return "Baru saja";
}

const BADGE_MAP: Record<string, { label: string; className: string }> = {
  Hadir: {
    label: "Hadir",
    className: "bg-green-500/15 text-green-700 border-green-500/30",
  },
  "Tidak Hadir": {
    label: "Tidak Hadir",
    className: "bg-red-500/15 text-red-700 border-red-500/30",
  },
  "Belum Konfirmasi": {
    label: "Belum Konfirmasi",
    className: "bg-amber-500/15 text-amber-700 border-amber-500/30",
  },
};

export default function WishCard({ name, message, attendance, timestamp }: WishEntry) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  const badge = BADGE_MAP[attendance] ?? BADGE_MAP["Belum Konfirmasi"];

  return (
    <div className="flex gap-3 sm:gap-4 w-full bg-white/50 backdrop-blur-sm border border-bali-gold/20 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-bali-gold/40 transition-all duration-300">
      {/* Avatar */}
      <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-bali-gold/20 border border-bali-gold/40 flex items-center justify-center">
        <span className="text-sm font-serif font-semibold text-bali-bronze">
          {initials || "?"}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-serif font-semibold text-foreground text-sm sm:text-base">
            {name}
          </span>
          <span
            className={`text-[10px] sm:text-xs font-sans font-medium px-2 py-0.5 rounded-full border ${badge.className}`}
          >
            {badge.label}
          </span>
        </div>
        <p className="text-[11px] sm:text-xs text-foreground/50 font-sans">
          {formatRelativeTime(timestamp)}
        </p>
        {message && message.trim() !== "" && (
          <p className="text-xs sm:text-sm font-sans text-foreground/80 leading-relaxed wrap-break-word">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
