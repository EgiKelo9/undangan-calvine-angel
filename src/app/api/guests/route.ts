import { NextRequest, NextResponse } from "next/server";

const GUESTS_SCRIPT_URL = process.env.NEXT_PUBLIC_GUESTS_SCRIPT_URL ?? "";

async function proxyToScript(init: RequestInit): Promise<{ ok: boolean; data: unknown; error?: string }> {
  const res = await fetch(GUESTS_SCRIPT_URL, init);
  const contentType = res.headers.get("content-type") ?? "";
  console.log("[guests] status:", res.status, "| content-type:", contentType);

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    console.error("[guests] non-JSON response (first 300 chars):", text.slice(0, 300));
    return {
      ok: false,
      data: null,
      error: `Apps Script mengembalikan non-JSON (status ${res.status}). Cek: (1) Script sudah di-authorize? (2) Deploy ulang setelah edit kode?`,
    };
  }

  const data = await res.json();
  return { ok: true, data };
}

export async function GET() {
  if (!GUESTS_SCRIPT_URL) {
    return NextResponse.json(
      { success: false, data: [], error: "GUESTS_SCRIPT_URL belum dikonfigurasi di .env." },
      { status: 500 }
    );
  }

  try {
    const { ok, data, error } = await proxyToScript({ next: { revalidate: 0 } } as RequestInit);
    if (!ok) return NextResponse.json({ success: false, data: [], error }, { status: 502 });
    return NextResponse.json(data);
  } catch (err) {
    console.error("[guests/GET] error:", err);
    return NextResponse.json(
      { success: false, data: [], error: "Gagal mengambil daftar tamu." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!GUESTS_SCRIPT_URL) {
    return NextResponse.json(
      { success: false, error: "GUESTS_SCRIPT_URL belum dikonfigurasi di .env." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    console.log("[guests/POST] action:", body?.action, "| id:", body?.id ?? "(none)");

    const { ok, data, error } = await proxyToScript({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!ok) return NextResponse.json({ success: false, error }, { status: 502 });
    return NextResponse.json(data);
  } catch (err) {
    console.error("[guests/POST] error:", err);
    return NextResponse.json(
      { success: false, error: "Gagal memproses permintaan." },
      { status: 500 }
    );
  }
}

