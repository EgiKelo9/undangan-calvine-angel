import Image from "next/image";
import { MapPin } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
// import EventCard from "@/components/EventCard";
import EventTimelineCard from "@/components/EventTimelineCard";
import { weddingData } from "@/lib/data";

export default function EventSection() {
  const { eventSection, ornaments } = weddingData;
  const { venue, leftSchedule, rightSchedule } = eventSection;

  return (
    <section
      id="event"
      className="relative w-full flex flex-col items-center p-6 md:p-8 lg:p-16"
    >
      {/* Background Floral Image */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src={ornaments.floralBackground}
          alt="Floral Background"
          fill
          priority
          className="object-cover h-auto w-full grayscale brightness-50 animate-zoom-slow pointer-events-none opacity-5"
        />
      </div>

      {/* Content Container */}
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
            {eventSection.title}
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-serif font-semibold text-foreground/90 drop-shadow-sm">
            {eventSection.description}
          </p>
        </ScrollReveal>

        {/* Address */}
        <ScrollReveal animation="fade-in-up" delay={200} className="w-full">
          <a
            href={venue.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-start gap-3 group px-4 py-3 rounded-xl bg-bali-sand/50 border border-bali-gold/30 hover:bg-bali-bronze/10 transition-colors duration-300"
          >
            <MapPin className="w-5 h-5 text-bali-gold shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm sm:text-base md:text-lg font-sans text-foreground/80 text-left">
              {venue.address}
            </span>
          </a>
        </ScrollReveal>

        {/* Google Maps Embed */}
        <ScrollReveal animation="fade-in-up" delay={300} className="w-full">
          <div className="w-full overflow-hidden rounded-2xl shadow-2xl border border-bali-gold/20">
            <iframe
              src={venue.mapsEmbedUrl}
              title="Lokasi Acara Pernikahan"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-72 sm:h-80 md:h-96"
            />
          </div>
        </ScrollReveal>

        {/* Konfigurasi Sebelumnya: Event Cards Grid (Di-comment sesuai instruksi) */}
        {/* 
        <ScrollReveal animation="fade-in-up" delay={400} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
            <EventCard {...leftSchedule} />
            <EventCard {...rightSchedule} />
          </div>
        </ScrollReveal>
        */}

        {/* Konfigurasi Baru: EventTimelineCard (Format 2 Kolom Bersisian) */}
        <ScrollReveal animation="fade-in-up" delay={400} className="w-full">
          <EventTimelineCard
            date={leftSchedule.date || "Jumat, 09 Oktober 2026"}
            leftSchedule={leftSchedule}
            rightSchedule={rightSchedule}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
