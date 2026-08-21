import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { weddingData } from "@/lib/data";

export default function PersonSection() {
  const { greeting, couple, mepandes, ornaments } = weddingData;

  return (
    <section
      id="person"
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
      <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl w-full mx-auto gap-6 sm:gap-8 md:gap-10 lg:gap-12 text-center py-6">
        {/* Balinese Header */}
        <ScrollReveal animation="fade-in-down" className="w-32 sm:w-48 md:w-64 lg:w-80 max-w-[85vw] drop-shadow-xl">
          <div className="animate-float">
            <Image
              src={ornaments.balineseHeader2}
              alt="Balinese Header Ornament"
              width={320}
              height={80}
              priority
              className="w-full h-auto object-contain filter drop-shadow-md"
            />
          </div>
        </ScrollReveal>

        {/* Greeting */}
        <ScrollReveal animation="fade-in-up" delay={200} className="flex flex-col items-center justify-center space-y-2 sm:space-y-4 px-2">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-script text-bali-gold drop-shadow-[0_4px_16px_rgba(255,255,255,0.9)] py-1 leading-tight sm:leading-none">
            {greeting.title}
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-serif font-semibold text-foreground/90 drop-shadow-sm">
            {greeting.text}
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-in" delay={300} className="w-full max-w-md">
          <hr className="border-t-2 border-bali-gold/50 rounded-full" />
        </ScrollReveal>

        {/* Pawiwahan */}
        <div className="flex flex-col w-full items-center justify-center gap-8 lg:gap-12 px-2">
          <ScrollReveal animation="fade-in-up" delay={100}>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-bali-gold drop-shadow-[0_4px_16px_rgba(255,255,255,0.9)] py-1 leading-tight sm:leading-none text-center">
              Pawiwahan
            </h3>
          </ScrollReveal>

          {/* Groom */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center md:items-start gap-4 md:gap-8">
            <ScrollReveal animation="fade-in-down" delay={200} className="col-span-1 justify-self-center w-48 sm:w-64 md:w-80 lg:w-96 drop-shadow-xl">
              <div className="animate-float">
                <Image
                  src={couple.groom.photo}
                  alt={`Groom - ${couple.groom.nickName}`}
                  width={600}
                  height={600}
                  priority
                  className="w-full h-auto object-cover filter drop-shadow-md aspect-square"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-in-up" delay={300} className="col-span-1 justify-self-center text-center md:text-left flex flex-col items-center md:items-start gap-2 md:gap-4">
              <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-foreground drop-shadow-[0_4px_16px_rgba(255,255,255,0.9)] leading-tight sm:leading-none">
                {couple.groom.label}
              </h4>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-bali-bronze drop-shadow-sm">
                {couple.groom.fullName}
              </p>
              <p className="flex flex-col gap-1 items-center md:items-start text-sm sm:text-base lg:text-lg font-sans drop-shadow-sm">
                <span className="font-light text-foreground">{couple.groom.childRelation}</span>
                <span className="font-semibold text-bali-bronze">{couple.groom.fatherName}</span>
                <span className="font-semibold text-bali-bronze">{couple.groom.motherName}</span>
              </p>
              <p className="flex flex-col gap-2 items-center md:items-start text-sm sm:text-base lg:text-lg font-sans text-foreground/90 drop-shadow-sm text-center md:text-left">
                {couple.groom.address}
              </p>
            </ScrollReveal>
          </div>

          {/* Bride */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center md:items-start gap-4 md:gap-8">
            <ScrollReveal animation="fade-in-down" delay={200} className="col-span-1 md:order-2 justify-self-center w-48 sm:w-64 md:w-80 lg:w-96 drop-shadow-xl">
              <div className="animate-float">
                <Image
                  src={couple.bride.photo}
                  alt={`Bride - ${couple.bride.nickName}`}
                  width={600}
                  height={600}
                  priority
                  className="w-full h-auto object-cover filter drop-shadow-md aspect-square"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-in-up" delay={300} className="col-span-1 md:order-1 justify-self-center text-center md:text-right flex flex-col items-center md:items-end gap-2 md:gap-4">
              <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-foreground drop-shadow-[0_4px_16px_rgba(255,255,255,0.9)] leading-tight sm:leading-none">
                {couple.bride.label}
              </h4>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-bali-bronze drop-shadow-sm">
                {couple.bride.fullName}
              </p>
              <p className="flex flex-col gap-1 items-center md:items-end text-sm sm:text-base lg:text-lg font-sans drop-shadow-sm">
                <span className="font-light text-foreground">{couple.bride.childRelation}</span>
                <span className="font-semibold text-bali-bronze">{couple.bride.fatherName}</span>
                <span className="font-semibold text-bali-bronze">{couple.bride.motherName}</span>
              </p>
              <p className="flex flex-col gap-2 items-center md:items-end text-sm sm:text-base lg:text-lg font-sans text-foreground/90 drop-shadow-sm text-center md:text-right">
                {couple.bride.address}
              </p>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal animation="fade-in" delay={200} className="w-full max-w-md">
          <hr className="border-t-2 border-bali-gold/50 rounded-full" />
        </ScrollReveal>

        {/* Mepandes */}
        <div className="flex flex-col w-full items-center justify-center gap-8 lg:gap-12 px-2">
          <ScrollReveal animation="fade-in-up" delay={100}>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-bali-gold drop-shadow-[0_4px_16px_rgba(255,255,255,0.9)] py-1 leading-tight sm:leading-none text-center">
              {mepandes.title}
            </h3>
          </ScrollReveal>

          <ScrollReveal animation="fade-in-up" delay={200} className="w-full">
            <div className="flex flex-col gap-4 items-center w-full bg-bali-sand backdrop-blur-md border border-bali-gold/30 rounded-2xl p-6 sm:p-8 shadow-2xl hover:border-bali-gold/50 transition-all duration-300">
              <div className="w-8 sm:w-12 md:w-16 lg:w-20 drop-shadow-xl">
                <div className="animate-float">
                  <Image
                    src={ornaments.balineseHeader3}
                    alt="Balinese Header Ornament"
                    width={320}
                    height={80}
                    priority
                    className="w-full h-auto object-contain filter drop-shadow-md"
                  />
                </div>
              </div>
              <p className="flex flex-col gap-1 md:gap-2 items-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-semibold text-bali-bronze drop-shadow-sm">
                {mepandes.participants.map((person) => (
                  <span key={person}>{person}</span>
                ))}
              </p>
              {/* <p className="flex flex-col gap-1 items-center text-sm sm:text-base lg:text-lg font-sans drop-shadow-sm">
                <span className="font-light text-foreground">{mepandes.relationLabel}</span>
                <span className="font-semibold text-bali-bronze">{mepandes.parents.father}</span>
                <span className="font-semibold text-bali-bronze">{mepandes.parents.mother}</span>
              </p> */}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
