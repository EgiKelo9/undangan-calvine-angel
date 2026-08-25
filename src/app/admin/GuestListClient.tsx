"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Settings,
  Pencil,
  Trash2,
  Check,
  X,
  Copy,
  MessageCircle,
  Loader2,
  RefreshCw,
  AlertCircle,
  Users,
} from "lucide-react";
import { Guest } from "@/types";
import ConfigModal, { useAdminConfig } from "./ConfigModal";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://undangan-calvine-angel.vercel.app";

function generateLink(name: string): string {
  return `${BASE_URL}/?to=${encodeURIComponent(name)}`;
}

function buildWhatsAppUrl(
  phone: string | number,
  template: string,
  name: string,
  link: string
): string {
  const text = (template || "")
    .replace(/\{nama\}/g, String(name || ""))
    .replace(/\{link\}/g, String(link || ""));
  const cleanPhone = String(phone || "").replace(/\D/g, "");
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`;
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function useToast() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(
    null
  );

  const show = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  return { toast, show };
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface EditState {
  id: string | null; // null = baris tambah baru
  name: string;
  phone: string;
}

interface GuestListClientProps {
  adminKey: string;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GuestListClient({ adminKey }: GuestListClientProps) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editState, setEditState] = useState<EditState | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { config, saveConfig } = useAdminConfig();
  const { toast, show: showToast } = useToast();

  // ─── Fetch ──────────────────────────────────────────────────────────────────

  const fetchGuests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/guests?key=${adminKey}`);
      const json = await res.json();
      if (json.success) {
        setGuests(json.data);
      } else {
        setError(json.error ?? "Gagal memuat data.");
      }
    } catch {
      setError("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }, [adminKey]);

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  // ─── CRUD ───────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!editState) return;
    if (!editState.name.trim()) {
      showToast("Nama tamu tidak boleh kosong.", "error");
      return;
    }

    const isNew = editState.id === null;
    const tempId = isNew ? "__new__" : editState.id!;
    setSavingId(tempId);

    try {
      const body = isNew
        ? { action: "create", name: editState.name.trim(), phone: editState.phone.trim() }
        : {
            action: "update",
            id: editState.id,
            name: editState.name.trim(),
            phone: editState.phone.trim(),
          };

      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();

      if (json.success) {
        showToast(isNew ? "Tamu berhasil ditambahkan." : "Data berhasil disimpan.");
        setEditState(null);
        await fetchGuests();
      } else {
        showToast(json.error ?? "Gagal menyimpan.", "error");
      }
    } catch {
      showToast("Koneksi gagal.", "error");
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus tamu "${name}"? Tindakan ini tidak dapat dibatalkan.`)) return;

    setDeletingId(id);
    try {
      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      });
      const json = await res.json();

      if (json.success) {
        showToast("Tamu berhasil dihapus.");
        setGuests((prev) => prev.filter((g) => g.id !== id));
      } else {
        showToast(json.error ?? "Gagal menghapus.", "error");
      }
    } catch {
      showToast("Koneksi gagal.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopyLink = async (name: string, id: string) => {
    const link = generateLink(name);
    await navigator.clipboard.writeText(link);
    setCopiedId(id);
    showToast("Link berhasil disalin!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleWhatsApp = (guest: Guest) => {
    const link = generateLink(guest.name);
    const url = buildWhatsAppUrl(guest.phone, config.messageTemplate, guest.name, link);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // ─── Edit State Helpers ─────────────────────────────────────────────────────

  const startEdit = (guest: Guest) => {
    setEditState({ id: guest.id, name: guest.name, phone: guest.phone });
  };

  const startAddNew = () => {
    setEditState({ id: null, name: "", phone: "" });
  };

  const cancelEdit = () => setEditState(null);

  // ─── Render ─────────────────────────────────────────────────────────────────

  const isAddingNew = editState?.id === null;

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(160deg, #FDFBF7 0%, #F8F4EC 50%, #F3EEE5 100%)",
        fontFamily: "var(--font-sans)",
        color: "#1C1917",
      }}
    >
      {/* ── Background ornament ── */}
      <div
        className="pointer-events-none fixed inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(197, 160, 89, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(197, 160, 89, 0.12) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl p-6 sm:p-10">
        {/* ── Header ── */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="mb-1 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
                style={{ background: "rgba(197, 160, 89, 0.15)", border: "1px solid rgba(197, 160, 89, 0.3)" }}
              >
                <Users size={18} style={{ color: "#4A2E12" }} />
              </div>
              <h1
                className="text-xl sm:text-2xl font-bold"
                style={{ color: "#4A2E12" }}
              >
                Daftar Tamu
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-600">
              Undangan Pernikahan Calvine &amp; Angel · {guests.length} tamu terdaftar
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              id="btn-refresh"
              onClick={fetchGuests}
              disabled={loading}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-all cursor-pointer shadow-xs disabled:opacity-40"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(197, 160, 89, 0.3)",
                color: "rgba(28, 25, 23, 0.6)",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#C5A059";
                (e.currentTarget as HTMLButtonElement).style.color = "#4A2E12";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(197, 160, 89, 0.3)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(28, 25, 23, 0.6)";
              }}
              title="Refresh"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              id="btn-config"
              onClick={() => setIsConfigOpen(true)}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all cursor-pointer"
              style={{
                background: "rgba(197, 160, 89, 0.15)",
                border: "1px solid rgba(197, 160, 89, 0.35)",
                color: "#4A2E12",
              }}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(197, 160, 89, 0.25)")
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(197, 160, 89, 0.15)")
              }
            >
              <Settings size={14} />
              Konfigurasi
            </button>
          </div>
        </div>

        {/* ── Error State ── */}
        {error && (
          <div
            className="mb-6 flex items-center gap-3 rounded-xl px-4 py-3 bg-red-50 border border-red-200 text-red-800"
          >
            <AlertCircle size={16} className="text-red-600 shrink-0" />
            <p className="text-sm font-medium">
              {error}
            </p>
          </div>
        )}

        {/* ── Table Card (Scrollable Container) ── */}
        <div
          className="overflow-hidden rounded-2xl bg-white border border-[#C5A059]/25 shadow-md"
        >
          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              {/* Table header */}
              <div
                className="px-4 py-3 bg-[#F3EEE5]/60 border-b border-[#C5A059]/20"
              >
                <div className="grid grid-cols-20 items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-left col-span-1 text-[#4A2E12]/70">#</span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-left col-span-5 text-[#4A2E12]/70">Nama</span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-left col-span-3 text-[#4A2E12]/70">No. Telepon</span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-left col-span-7 text-[#4A2E12]/70">Link Undangan</span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-right col-span-4 text-[#4A2E12]/70">Aksi</span>
                </div>
              </div>

              {/* Table body */}
              <div>
                {/* Loading Skeleton */}
                {loading && guests.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Loader2 size={24} className="animate-spin mb-3 text-[#C5A059]" />
                    <p className="text-sm text-stone-500">
                      Memuat daftar tamu...
                    </p>
                  </div>
                )}

                {/* Empty State */}
                {!loading && guests.length === 0 && !isAddingNew && (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Users size={32} className="mb-3 text-[#C5A059]/40" />
                    <p className="text-sm font-medium text-stone-600">
                      Belum ada tamu terdaftar
                    </p>
                    <p className="mt-1 text-xs text-stone-400">
                      Klik &quot;+ Tambah Tamu&quot; untuk mulai
                    </p>
                  </div>
                )}

                {/* Rows */}
                {guests.map((guest, idx) => {
                  const isEditing = editState?.id === guest.id;
                  const isDeleting = deletingId === guest.id;
                  const isSaving = savingId === guest.id;
                  const link = guest.name ? generateLink(guest.name) : "";

                  return (
                    <div
                      key={guest.id}
                      className={`group grid grid-cols-20 items-center gap-3 px-4 py-3 transition-colors border-b border-[#F3EEE5] ${
                        isEditing ? "bg-[#C5A059]/10" : "hover:bg-[#F3EEE5]/40"
                      }`}
                    >
                      {/* # */}
                      <span className="text-xs tabular-nums font-medium text-left col-span-1 text-stone-400">
                        {idx + 1}
                      </span>

                      {/* Nama */}
                      {isEditing ? (
                        <input
                          id={`edit-name-${guest.id}`}
                          autoFocus
                          value={editState.name}
                          onChange={(e) =>
                            setEditState((prev) => prev && { ...prev, name: e.target.value })
                          }
                          onKeyDown={(e) => e.key === "Enter" && handleSave()}
                          placeholder="Nama tamu"
                          className="w-full rounded-lg px-3 py-1.5 text-sm outline-none text-left col-span-5 bg-white border border-[#C5A059] text-[#1C1917]"
                        />
                      ) : (
                        <span className="truncate text-sm font-medium text-left col-span-5 text-[#1C1917]">
                          {guest.name}
                        </span>
                      )}

                      {/* No. Telepon */}
                      {isEditing ? (
                        <input
                          id={`edit-phone-${guest.id}`}
                          type="tel"
                          value={editState.phone}
                          onChange={(e) =>
                            setEditState((prev) => prev && { ...prev, phone: e.target.value })
                          }
                          onKeyDown={(e) => e.key === "Enter" && handleSave()}
                          placeholder="628xxx"
                          className="w-full rounded-lg px-3 py-1.5 text-sm outline-none text-left col-span-3 bg-white border border-[#C5A059] text-[#1C1917]"
                        />
                      ) : (
                        <span className="truncate text-sm text-left col-span-3 text-stone-600">
                          {guest.phone || "—"}
                        </span>
                      )}

                      {/* Link */}
                      <span
                        className="truncate text-xs font-mono font-medium text-left col-span-7 text-[#4A2E12]/85"
                        title={link}
                      >
                        {guest.name ? generateLink(guest.name) : "—"}
                      </span>

                      {/* Aksi */}
                      <div className="flex items-center justify-end gap-1.5 text-right col-span-4">
                        {isEditing ? (
                          <>
                            <ActionBtn
                              id={`btn-save-${guest.id}`}
                              onClick={handleSave}
                              disabled={isSaving}
                              title="Simpan"
                              color="#16a34a"
                              hoverBg="rgba(22, 163, 74, 0.12)"
                            >
                              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                            </ActionBtn>
                            <ActionBtn
                              id={`btn-cancel-${guest.id}`}
                              onClick={cancelEdit}
                              title="Batal"
                              color="rgba(28, 25, 23, 0.5)"
                              hoverBg="rgba(28, 25, 23, 0.08)"
                            >
                              <X size={14} />
                            </ActionBtn>
                          </>
                        ) : (
                          <>
                            <ActionBtn
                              id={`btn-edit-${guest.id}`}
                              onClick={() => startEdit(guest)}
                              disabled={!!editState || isDeleting}
                              title="Edit"
                              color="rgba(28, 25, 23, 0.6)"
                              hoverBg="rgba(197, 160, 89, 0.15)"
                            >
                              <Pencil size={13} />
                            </ActionBtn>
                            <ActionBtn
                              id={`btn-delete-${guest.id}`}
                              onClick={() => handleDelete(guest.id, guest.name)}
                              disabled={!!editState || isDeleting}
                              title="Hapus"
                              color="rgba(28, 25, 23, 0.6)"
                              hoverBg="rgba(239, 68, 68, 0.12)"
                            >
                              {isDeleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                            </ActionBtn>
                            <ActionBtn
                              id={`btn-copy-${guest.id}`}
                              onClick={() => handleCopyLink(guest.name, guest.id)}
                              disabled={!guest.name}
                              title="Salin link undangan"
                              color={copiedId === guest.id ? "#16a34a" : "rgba(28, 25, 23, 0.6)"}
                              hoverBg="rgba(197, 160, 89, 0.15)"
                            >
                              <Copy size={13} />
                            </ActionBtn>
                            <ActionBtn
                              id={`btn-wa-${guest.id}`}
                              onClick={() => handleWhatsApp(guest)}
                              disabled={!guest.name || !guest.phone}
                              title={!guest.phone ? "Isi nomor telepon terlebih dahulu" : "Kirim via WhatsApp"}
                              color="rgba(28, 25, 23, 0.6)"
                              hoverBg="rgba(37, 211, 102, 0.15)"
                            >
                              <MessageCircle size={13} />
                            </ActionBtn>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Add New Row */}
                {isAddingNew && (
                  <div className="grid grid-cols-20 items-center gap-3 px-4 py-3 border-b border-[#F3EEE5] bg-[#C5A059]/10">
                    <span className="text-xs font-medium text-left col-span-1 text-stone-400">
                      {guests.length + 1}
                    </span>
                    <input
                      id="new-guest-name"
                      autoFocus
                      value={editState!.name}
                      onChange={(e) => setEditState((prev) => prev && { ...prev, name: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && handleSave()}
                      placeholder="Nama tamu"
                      className="w-full rounded-lg px-3 py-1.5 text-sm outline-none text-left col-span-5 bg-white border border-[#C5A059] text-[#1C1917]"
                    />
                    <input
                      id="new-guest-phone"
                      type="tel"
                      value={editState!.phone}
                      onChange={(e) => setEditState((prev) => prev && { ...prev, phone: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && handleSave()}
                      placeholder="628xxx"
                      className="w-full rounded-lg px-3 py-1.5 text-sm outline-none text-left col-span-3 bg-white border border-[#C5A059] text-[#1C1917]"
                    />
                    <span className="text-xs font-mono font-medium text-left col-span-7 text-[#4A2E12]/60">
                      {editState!.name ? generateLink(editState.name) : "—"}
                    </span>
                    <div className="flex items-center justify-end gap-1.5 text-right col-span-4">
                      <ActionBtn
                        id="btn-save-new"
                        onClick={handleSave}
                        disabled={savingId === "__new__"}
                        title="Simpan"
                        color="#16a34a"
                        hoverBg="rgba(22, 163, 74, 0.12)"
                      >
                        {savingId === "__new__" ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                      </ActionBtn>
                      <ActionBtn
                        id="btn-cancel-new"
                        onClick={cancelEdit}
                        title="Batal"
                        color="rgba(28, 25, 23, 0.5)"
                        hoverBg="rgba(28, 25, 23, 0.08)"
                      >
                        <X size={14} />
                      </ActionBtn>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Footer: Add button ── */}
          <div
            className="px-4 py-3 bg-[#F3EEE5]/40 border-t border-[#C5A059]/20"
          >
            <button
              id="btn-add-guest"
              onClick={startAddNew}
              disabled={!!editState}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all bg-white border border-dashed border-[#C5A059]/50 text-[#4A2E12] hover:bg-[#C5A059]/15 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus size={15} />
              Tambah Tamu
            </button>
          </div>
        </div>
      </div>

      {/* ── Config Modal ── */}
      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        config={config}
        onSave={saveConfig}
      />

      {/* ── Toast ── */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-4 py-3 shadow-xl border bg-white animate-fade-in-up ${
            toast.type === "success"
              ? "border-emerald-300 text-emerald-800"
              : "border-red-300 text-red-800"
          }`}
        >
          {toast.type === "success" ? (
            <Check size={15} className="text-emerald-600" />
          ) : (
            <AlertCircle size={15} className="text-red-600" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}

// ─── ActionBtn helper ─────────────────────────────────────────────────────────

interface ActionBtnProps {
  id: string;
  onClick: () => void;
  disabled?: boolean;
  title: string;
  color: string;
  hoverBg: string;
  children: React.ReactNode;
}

function ActionBtn({ id, onClick, disabled, title, color, hoverBg, children }: ActionBtnProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="flex h-7 w-7 items-center justify-center rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      style={{ color, background: "transparent" }}
      onMouseOver={(e) => {
        if (!disabled)
          (e.currentTarget as HTMLButtonElement).style.background = hoverBg;
      }}
      onMouseOut={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
      }
    >
      {children}
    </button>
  );
}
