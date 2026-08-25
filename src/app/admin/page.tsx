import { redirect } from "next/navigation";
import GuestListClient from "./GuestListClient";

interface AdminPageProps {
  searchParams: Promise<{ key?: string }>;
}

export const metadata = {
  title: "Admin — Daftar Tamu | Calvine & Angel",
  description: "Halaman manajemen daftar tamu undangan pernikahan.",
  robots: "noindex, nofollow",
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const { key } = await searchParams;
  const secret = process.env.ADMIN_SECRET_KEY;

  if (!secret || key !== secret) {
    redirect("/");
  }

  return <GuestListClient adminKey={key} />;
}
