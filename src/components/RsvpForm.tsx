"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { weddingData } from "@/lib/data";

interface RsvpFormProps {
  onSubmitSuccess: () => void;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function RsvpForm({ onSubmitSuccess }: RsvpFormProps) {
  const { rsvp } = weddingData;

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const isValid = name.trim() !== "" && attendance !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          attendance,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Submit failed");

      setStatus("success");
      setName("");
      setMessage("");
      setAttendance("");
      onSubmitSuccess();

      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <form
      id="rsvp-form"
      onSubmit={handleSubmit}
      className="w-full max-w-xl flex flex-col gap-4"
    >
      {/* Nama */}
      <div className="flex flex-col gap-1.5 items-start">
        <label htmlFor="rsvp-name" className="text-sm font-sans font-semibold text-foreground/80">
          <span>Nama</span>
          <span className="text-bali-gold">*</span>
        </label>
        <input
          id="rsvp-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={rsvp.namePlaceholder}
          required
          disabled={status === "loading"}
          className="w-full px-4 py-3 rounded-xl border border-bali-gold/30 bg-white/60 backdrop-blur-sm font-sans text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-bali-gold/40 transition-all disabled:opacity-60"
        />
      </div>

      {/* Ucapan */}
      <div className="flex flex-col gap-1.5 items-start">
        <label htmlFor="rsvp-message" className="text-sm font-sans font-semibold text-foreground/80">
          <span>Ucapan</span>
        </label>
        <textarea
          id="rsvp-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={rsvp.messagePlaceholder}
          rows={4}
          disabled={status === "loading"}
          className="w-full px-4 py-3 rounded-xl border border-bali-gold/30 bg-white/60 backdrop-blur-sm font-sans text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-bali-gold/40 transition-all resize-none disabled:opacity-60"
        />
      </div>

      {/* Kehadiran */}
      <div className="flex flex-col gap-2 items-start">
        <span className="text-sm font-sans font-semibold text-foreground/80">
          <span>Kehadiran</span>
          <span className="text-bali-gold">*</span>
        </span>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {rsvp.attendanceOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div
                className={`relative flex items-center justify-center w-4 h-4 rounded-full border transition-all duration-200 shrink-0 ${
                  attendance === option
                    ? "border-bali-gold bg-white shadow-sm"
                    : "border-bali-gold/50 bg-white/60 group-hover:border-bali-gold"
                }`}
              >
                <input
                  type="radio"
                  name="attendance"
                  value={option}
                  checked={attendance === option}
                  onChange={() => setAttendance(option)}
                  disabled={status === "loading"}
                  className="sr-only"
                />
                {attendance === option && (
                  <span className="w-2 h-2 rounded-full bg-bali-gold" />
                )}
              </div>
              <span className="text-sm font-sans text-foreground/80">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Feedback Messages */}
      {status === "success" && (
        <p className="text-sm font-sans text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          Terima kasih atas konfirmasi dan doa restunya.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-sans text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          Gagal mengirim. Silakan coba lagi.
        </p>
      )}

      {/* Submit Button */}
      <button
        id="rsvp-submit"
        type="submit"
        disabled={status === "loading" || !isValid}
        className="flex items-center justify-center gap-2 px-8 py-3.5 bg-bali-bronze text-bali-cream font-sans font-bold text-sm rounded-full shadow-md hover:shadow-bali-gold/30 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        {status === "loading" ? "Mengirim..." : "Kirim Ucapan"}
      </button>
    </form>
  );
}
