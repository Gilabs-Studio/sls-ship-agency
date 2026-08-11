import { HeroSection } from "@/features/landing/components/HeroSection";
import { landingId } from "@/features/landing/i18n/id";
import { landingEn } from "@/features/landing/i18n/en";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === "id";

  return {
    title: isId
      ? "PT. Solid Lautan Sinergi — Layanan Keagenan Kapal & Monitoring Dokumen"
      : "PT. Solid Lautan Sinergi — Ship Agency & Vessel Certificate Management",
    description: isId
      ? "Mitra terpercaya perusahaan pelayaran nasional & lokal. Menghadirkan pengelolaan sertifikat kapal, pengurusan dokumen efisien, dan monitoring berbasis teknologi."
      : "Trusted partner for national and local shipping companies. Streamlining vessel documentation, compliance monitoring, and professional port agency operations.",
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = locale === "id" ? landingId : landingEn;

  return (
    <main className="min-h-screen bg-slate-950">
      <HeroSection t={t} locale={locale} />
    </main>
  );
}

