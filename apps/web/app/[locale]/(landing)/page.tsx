import dynamic from "next/dynamic";
import { Navbar } from "@/features/landing/components/Navbar";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { LazySectionWrapper } from "@/features/landing/components/LazySectionWrapper";
import { LandingLoader } from "@/features/landing/components/LandingLoader";
import { landingId } from "@/features/landing/i18n/id";
import { landingEn } from "@/features/landing/i18n/en";
import type { Metadata } from "next";

const ServicesSection = dynamic(
  () =>
    import("@/features/landing/components/ServicesSection").then(
      (mod) => mod.ServicesSection
    ),
  {
    loading: () => (
      <LandingLoader fullScreen={false} message="Loading Services..." />
    ),
  }
);

const AboutStatsScrollSection = dynamic(
  () =>
    import("@/features/landing/components/AboutStatsScrollSection").then(
      (mod) => mod.AboutStatsScrollSection
    ),
  {
    loading: () => (
      <LandingLoader fullScreen={false} message="Loading Interactive Experience..." />
    ),
  }
);

const FooterSection = dynamic(
  () =>
    import("@/features/landing/components/FooterSection").then(
      (mod) => mod.FooterSection
    ),
  {
    loading: () => (
      <LandingLoader fullScreen={false} message="Loading Footer..." />
    ),
  }
);

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
      <Navbar t={t} locale={locale} />
      <HeroSection t={t} locale={locale} />

      <LazySectionWrapper minHeight="500px" rootMargin="300px">
        <ServicesSection t={t} />
      </LazySectionWrapper>

      <LazySectionWrapper minHeight="1000px" rootMargin="400px">
        <AboutStatsScrollSection t={t} />
      </LazySectionWrapper>

      <LazySectionWrapper minHeight="300px" rootMargin="200px">
        <FooterSection t={t} />
      </LazySectionWrapper>
    </main>
  );
}


