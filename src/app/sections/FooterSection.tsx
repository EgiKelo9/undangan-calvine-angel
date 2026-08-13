import Image from "next/image";
import { Sparkles } from "lucide-react";
import { weddingData } from "@/lib/data";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-1.37V9.1A6.33 6.33 0 0 0 4 15.42a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-4.28z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 2a10 10 0 0 0-8.625 15.08L2 22l5.068-1.328A10 10 0 1 0 12 2zm0 18a7.95 7.95 0 0 1-4.053-1.107l-.29-.173-3.01.789.802-2.934-.19-.302A7.96 7.96 0 1 1 12 20z" />
    </svg>
  );
}

export default function FooterSection() {
  const { footer, ornaments } = weddingData;

  return (
    <footer
      id="footer"
      className="relative w-full flex flex-col items-center justify-center px-6 py-12 md:py-16 bg-bali-bronze overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-5 text-center">
        {/* Ornament Image */}
        <div className="w-32 sm:w-40 md:w-48 opacity-60 mb-1">
          <Image
            src={ornaments.balineseHeader1}
            alt="Ornament"
            width={320}
            height={80}
            className="w-full h-auto object-contain filter brightness-200"
          />
        </div>

        {/* Karsaa - Digital Invitation */}
        <div className="flex items-center justify-center gap-2 text-bali-sand font-serif text-sm sm:text-base md:text-lg font-semibold tracking-wide">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-bali-gold shrink-0" />
          <span>
            {footer.brandName} - {footer.brandTagline}
          </span>
        </div>

        {/* Social media */}
        <div className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-1.5 text-xs sm:text-sm font-sans text-bali-sand/80">
          <a href="https://www.instagram.com/aryadanabaraja" className="flex items-center gap-1.5">
            <InstagramIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-bali-gold shrink-0" />
            <span>{footer.instagram}</span>
          </a>

          <span className="text-bali-gold/40 select-none">|</span>

          <a href="https://www.tiktok.com/@yayakgans" className="flex items-center gap-1.5">
            <TikTokIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-bali-gold shrink-0" />
            <span>{footer.tiktok}</span>
          </a>

          <span className="text-bali-gold/40 select-none">|</span>

          <a href="https://wa.me/628977289923" className="flex items-center gap-1.5">
            <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-bali-gold shrink-0" />
            <span>{footer.whatsapp}</span>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[11px] sm:text-xs font-sans text-bali-sand/50 tracking-wider">
          &copy; {footer.year} - Designed by {footer.designer}
        </p>
      </div>
    </footer>
  );
}
