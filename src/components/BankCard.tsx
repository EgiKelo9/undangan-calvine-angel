"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { BankAccount } from "@/types";

export default function BankCard({ bank, accountNumber, accountName }: BankAccount) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
    } catch {
      // Fallback untuk browser yang tidak support clipboard API
      const el = document.createElement("textarea");
      el.value = accountNumber;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full bg-white/50 backdrop-blur-md border border-bali-gold/30 rounded-2xl p-6 sm:p-8 shadow-lg hover:border-bali-gold/55 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
      {/* Bank Name */}
      <p className="text-sm font-sans font-bold tracking-[0.2em] uppercase text-bali-bronze/70">
        {bank}
      </p>

      {/* Account Number */}
      <p className="text-xl sm:text-2xl font-mono font-bold text-bali-dark tracking-widest">
        {accountNumber}
      </p>

      {/* Account Name */}
      <p className="text-base sm:text-lg font-serif text-foreground/70">
        a.n{" "}
        <span className="font-semibold text-bali-bronze">{accountName}</span>
      </p>

      {/* Copy Button */}
      <button
        id={`copy-btn-${bank.toLowerCase()}`}
        onClick={handleCopy}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-sans font-semibold text-sm transition-all duration-300 ${
          copied
            ? "bg-green-500/15 border border-green-500/40 text-green-700"
            : "bg-bali-gold/15 border border-bali-gold/40 text-bali-bronze hover:bg-bali-gold/25 hover:scale-105 active:scale-95"
        }`}
        aria-label={`Salin nomor rekening ${bank}`}
      >
        {copied ? (
          <Check className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
        {copied ? "Tersalin!" : "Salin"}
      </button>
    </div>
  );
}
