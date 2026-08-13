import ScrollReveal from "@/components/ScrollReveal";
import { weddingData } from "@/lib/data";

export default function QuoteSection() {
  const { quote } = weddingData;

  return (
    <section
      id="quote"
      className="relative w-full flex flex-col items-center p-6 md:p-8 lg:p-16 bg-bali-sand"
    >
      <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl w-full mx-auto gap-6 sm:gap-8 md:gap-10 lg:gap-12 text-center py-6">
        <ScrollReveal animation="fade-in-up" delay={200} className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 px-2">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-script text-bali-gold drop-shadow-[0_4px_16px_rgba(255,255,255,0.9)] py-1 leading-4 sm:leading-6">
            &#8221;
          </h2>
          <p className="text-base italic md:text-lg lg:text-xl font-serif font-semibold text-bali-bronze drop-shadow-sm">
            &ldquo;{quote.verse}&rdquo;
          </p>
          <p className="text-xs md:text-sm lg:text-base font-sans text-foreground/90 drop-shadow-sm">
            {quote.meaning}
          </p>
          <p className="text-xs md:text-sm lg:text-base font-sans text-foreground/70 drop-shadow-sm italic">
            {quote.source}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
