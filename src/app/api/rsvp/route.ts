import { NextRequest, NextResponse } from "next/server";

const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ?? "";

export async function GET() {
  if (!SCRIPT_URL) {
    return NextResponse.json(
      { success: false, data: [], error: "Google Script URL belum dikonfigurasi." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(SCRIPT_URL, {
      next: { revalidate: 0 }, // selalu fetch fresh
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, data: [], error: "Gagal mengambil data ucapan." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!SCRIPT_URL) {
    return NextResponse.json(
      { success: false, error: "Google Script URL belum dikonfigurasi." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mengirim ucapan." },
      { status: 500 }
    );
  }
}