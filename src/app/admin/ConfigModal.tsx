"use client";

import { useEffect, useState } from "react";
import { X, Settings } from "lucide-react";
import { AdminConfig } from "@/types";

const STORAGE_KEY = "admin_config_calvine_angel";

const DEFAULT_CONFIG: AdminConfig = {
  messageTemplate: `Halo {nama} 🙏

Dengan bahagia, kami mengundang Anda untuk hadir dan merayakan hari bahagia kami:

📅 Jumat, 09 Oktober 2026
📍 Sanur, Denpasar, Bali

Buka undangan Anda di sini:
{link}

Kehadiran dan doa restu Anda sangat berarti bagi kami. 🤍

Love,
Calvine & Angel`,
};

export function useAdminConfig() {
  const [config, setConfig] = useState<AdminConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setConfig(JSON.parse(stored));
    } catch {
      // ignore parse error
    }
  }, []);

  const saveConfig = (newConfig: AdminConfig) => {
    setConfig(newConfig);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
  };

  return { config, saveConfig };
}

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AdminConfig;
  onSave: (config: AdminConfig) => void;
}

export default function ConfigModal({ isOpen, onClose, config, onSave }: ConfigModalProps) {
  const [form, setForm] = useState<AdminConfig>(config);

  // Sync form ketika config dari luar berubah (misal saat pertama buka)
  useEffect(() => {
    setForm(config);
  }, [config]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(28, 25, 23, 0.4)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(197, 160, 89, 0.3)",
          boxShadow: "0 20px 40px rgba(28, 25, 23, 0.12)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{
            background: "rgba(243, 238, 229, 0.5)",
            borderBottom: "1px solid rgba(197, 160, 89, 0.2)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: "rgba(197, 160, 89, 0.15)" }}
            >
              <Settings size={16} style={{ color: "#4A2E12" }} />
            </div>
            <h2 className="font-semibold" style={{ color: "#1C1917", fontSize: "1rem" }}>
              Konfigurasi WhatsApp
            </h2>
          </div>
          <button
            id="config-modal-close"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer"
            style={{ color: "rgba(28, 25, 23, 0.5)" }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "rgba(197, 160, 89, 0.15)";
              (e.currentTarget as HTMLButtonElement).style.color = "#1C1917";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(28, 25, 23, 0.5)";
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 px-6 py-6">
          {/* Template Pesan */}
          <div className="space-y-2">
            <label
              htmlFor="config-message-template"
              className="block text-sm font-medium"
              style={{ color: "rgba(28, 25, 23, 0.8)" }}
            >
              Template Pesan
            </label>
            <textarea
              id="config-message-template"
              rows={7}
              value={form.messageTemplate}
              onChange={(e) => setForm({ ...form, messageTemplate: e.target.value })}
              placeholder="Gunakan {nama} dan {link} sebagai variabel"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
              style={{
                background: "#FDFBF7",
                border: "1px solid rgba(197, 160, 89, 0.3)",
                color: "#1C1917",
                caretColor: "#C5A059",
                lineHeight: "1.6",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.border = "1px solid #C5A059")
              }
              onBlur={(e) =>
                (e.currentTarget.style.border = "1px solid rgba(197, 160, 89, 0.3)")
              }
            />
            <p className="text-xs" style={{ color: "rgba(28, 25, 23, 0.5)" }}>
              Gunakan <code className="px-1 py-0.5 rounded font-mono" style={{ background: "rgba(197,160,89,0.15)", color: "#4A2E12" }}>{"{nama}"}</code> dan{" "}
              <code className="px-1 py-0.5 rounded font-mono" style={{ background: "rgba(197,160,89,0.15)", color: "#4A2E12" }}>{"{link}"}</code> sebagai variabel
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 px-6 py-4"
          style={{
            background: "rgba(243, 238, 229, 0.3)",
            borderTop: "1px solid rgba(197, 160, 89, 0.2)",
          }}
        >
          <button
            id="config-modal-cancel"
            onClick={onClose}
            className="rounded-xl px-5 py-2 text-sm font-medium transition-all cursor-pointer"
            style={{
              background: "#FFFFFF",
              color: "rgba(28, 25, 23, 0.7)",
              border: "1px solid rgba(197, 160, 89, 0.3)",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(243, 238, 229, 0.8)";
              (e.currentTarget as HTMLButtonElement).style.color = "#1C1917";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#FFFFFF";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(28, 25, 23, 0.7)";
            }}
          >
            Batal
          </button>
          <button
            id="config-modal-save"
            onClick={handleSave}
            className="rounded-xl px-5 py-2 text-sm font-semibold transition-all cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #C5A059, #a8873f)",
              color: "#FFFFFF",
              boxShadow: "0 4px 15px rgba(197, 160, 89, 0.3)",
            }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 6px 20px rgba(197, 160, 89, 0.5)")
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 4px 15px rgba(197, 160, 89, 0.3)")
            }
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
