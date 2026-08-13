import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import BankCard from "@/components/BankCard";
import { weddingData } from "@/lib/data";

export default function GiftSection() {
  const { gift, ornaments } = weddingData;

  return (
    <section
      id="gift"
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
            {gift.title}
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-serif font-semibold text-foreground/90 drop-shadow-sm">
            {gift.description}
          </p>
        </ScrollReveal>

        {/* Bank Cards Grid */}
        <ScrollReveal animation="fade-in-up" delay={200} className="w-full">
          <div className={`grid gap-4 sm:gap-6 w-full ${
            gift.accounts.length === 1
              ? "grid-cols-1 max-w-sm mx-auto"
              : gift.accounts.length === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}>
            {gift.accounts.map((account) => (
              <BankCard key={`${account.bank}-${account.accountNumber}`} {...account} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
