"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThemeToggleButton } from "@/components/ui/theme-toggle";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import type { LandingTranslations } from "../types/landing.types";

interface HeroSectionProps {
  t: LandingTranslations;
  locale: string;
}

export function HeroSection({ t, locale }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Scroll progress for parallax effect on hero people
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax scroll shift on hero-people (moves with scroll)
  const peopleY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  const toggleLanguage = () => {
    const nextLocale = locale === "id" ? "en" : "id";
    router.replace(pathname, { locale: nextLocale });
  };

  const currentFlag =
    locale === "id"
      ? "/flag/flag-for-flag-monaco-svgrepo-com.svg"
      : "/flag/flag-for-flag-united-kingdom-svgrepo-com.svg";

  return (
    <section
      ref={containerRef}
      className="relative h-screen max-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden selection:bg-emerald-500 selection:text-slate-950"
    >
      {/* ==================================================== */}
      {/* LAYER 0 (z-0): BACKGROUND IMAGE (STATIC, HEAVY OVERLAY) */}
      {/* ==================================================== */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        <Image
          src="/hero-bg.png"
          alt="Ship Agency Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-65 scale-105"
        />
        {/* Dark Backdrop Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/50 to-slate-950" />
      </div>

      {/* Intense Dark Bottom Shadow (Reaches up to half body of "Solid Lautan Sinergi" text) */}
      <div className="absolute inset-x-0 bottom-0 h-36 sm:h-44 lg:h-48 bg-gradient-to-t from-slate-950 via-slate-950/95 via-50% to-transparent z-25 pointer-events-none" />

      {/* ==================================================== */}
      {/* NAVBAR (z-40): MINIMALIST WITH FLAG                   */}
      {/* ==================================================== */}
      <header className="relative z-40 w-full px-6 sm:px-12 py-6">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 bg-transparent border-none">
          {/* Logo & Brand (Pure Text, Minimalist) */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors drop-shadow-md cursor-pointer">
              PT. SOLID LAUTAN SINERGI
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-200 tracking-wide">
            <Link
              href="#"
              className="text-emerald-400 font-bold border-b-2 border-emerald-400 pb-0.5 cursor-pointer"
            >
              {t.nav.home}
            </Link>
            <a href="#showcase" className="hover:text-emerald-400 transition-colors cursor-pointer">
              {t.nav.services}
            </a>
            <a href="#showcase" className="hover:text-emerald-400 transition-colors cursor-pointer">
              {t.nav.certificates}
            </a>
            <a href="#showcase" className="hover:text-emerald-400 transition-colors cursor-pointer">
              {t.nav.about}
            </a>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            {/* Language Switcher (Pure Flag SVG) */}
            <button
              onClick={toggleLanguage}
              type="button"
              className="cursor-pointer transition-transform hover:scale-110 active:scale-95 flex items-center justify-center p-0 bg-transparent border-none outline-none"
              title={locale === "id" ? "Switch to English" : "Switch to Bahasa Indonesia"}
            >
              <Image
                src={currentFlag}
                alt={locale}
                width={28}
                height={20}
                className="w-7 h-[20px] object-cover rounded-sm shadow-md cursor-pointer"
              />
            </button>

            {/* Theme Toggle */}
            <div className="cursor-pointer">
              <ThemeToggleButton />
            </div>
          </div>
        </div>
      </header>

      {/* ==================================================== */}
      {/* LAYER 2 (z-20): HERO PEOPLE WITH ENTRANCE ANIMATION  */}
      {/* ==================================================== */}
      <motion.div
        style={{ y: peopleY }}
        className="relative z-20 w-full max-w-[1650px] h-[78vh] sm:h-[86vh] lg:h-[92vh] mx-auto pointer-events-none flex items-end justify-center px-0 mt-auto"
      >
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative w-[110%] sm:w-full h-full flex items-end justify-center"
        >
          <Image
            src="/hero-people.png"
            alt="PT. Solid Lautan Sinergi Team"
            fill
            priority
            sizes="(max-width: 1700px) 100vw, 1600px"
            className="object-contain object-bottom scale-110 sm:scale-115 lg:scale-120 translate-y-12 sm:translate-y-20 lg:translate-y-24 drop-shadow-[0_45px_100px_rgba(0,0,0,0.85)]"
          />
        </motion.div>
      </motion.div>

      {/* ==================================================== */}
      {/* LAYER 3 (z-30): TYPOGRAPHY OVERLAY AT THE BOTTOM     */}
      {/* ==================================================== */}
      <div className="absolute bottom-6 sm:bottom-10 inset-x-0 z-30 px-4 sm:px-8 text-center pointer-events-none select-none">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight leading-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] whitespace-nowrap">
          {t.heroTagline || "Solid Lautan Sinergi"}
        </h1>
        <p className="text-base sm:text-xl lg:text-2xl text-slate-200/90 font-semibold tracking-wide drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)] mt-3 max-w-3xl mx-auto">
          {t.heroSubtagline || "Outsourcing Agen Perkapalan"}
        </p>
      </div>
    </section>
  );
}




