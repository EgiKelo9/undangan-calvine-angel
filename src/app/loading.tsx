import Image from "next/image";

export default function Loading() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen w-full bg-bali-cream text-bali-dark overflow-hidden px-4">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-bali-sand)_0%,transparent_70%)] opacity-60 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 text-center max-w-sm">
        {/* Balinese Header Ornament with subtle pulse */}
        <div className="animate-pulse">
          <Image
            src="/assets/balinese-header-1.svg"
            alt="Ornamen Bali"
            width={240}
            height={60}
            priority
            className="w-48 sm:w-60 h-auto opacity-90 drop-shadow-sm"
          />
        </div>

        {/* Monogram Inisial & Gold Spinner */}
        <div className="relative flex items-center justify-center my-2">
          {/* Animated Gold Ring Spinner */}
          <div className="absolute w-24 h-24 rounded-full border-2 border-bali-gold/20 border-t-bali-gold animate-spin" />
          <div className="absolute w-20 h-20 rounded-full border border-bali-gold/10 animate-ping opacity-30" />
          
          <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-bali-sand/50 backdrop-blur-sm border border-bali-gold/30 shadow-inner">
            <span className="font-script text-3xl text-bali-gold">
              C & A
            </span>
          </div>
        </div>

        {/* Text Loader */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-serif text-xl sm:text-2xl text-bali-bronze tracking-wide font-semibold">
            Om Swastyastu
          </h2>
          <p className="font-sans text-xs tracking-[0.2em] text-bali-gold uppercase animate-pulse">
            Menyiapkan Undangan...
          </p>
        </div>
      </div>
    </main>
  );
}
