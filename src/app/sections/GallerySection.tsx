import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import GalleryGrid from "@/components/GalleryGrid";
import { weddingData } from "@/lib/data";

export default function GallerySection() {
  const { gallery, ornaments } = weddingData;

  return (
    <section
      id="gallery"
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
            {gallery.title}
          </h2>
        </ScrollReveal>

        {/* Gallery Grid */}
        <ScrollReveal animation="fade-in-up" delay={200} className="w-full">
          <GalleryGrid items={gallery.items} />
        </ScrollReveal>
      </div>
    </section>
  );
}
