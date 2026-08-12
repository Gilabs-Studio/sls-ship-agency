"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import type { LandingTranslations } from "../types/landing.types";

interface NavbarProps {
  t: LandingTranslations;
  locale: string;
}

export function Navbar({ t, locale }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set scrolled background style
      setIsScrolled(currentScrollY > 20);

      // Hide when scrolling down past 80px, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      // Always show at top
      if (currentScrollY <= 10) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === "id" ? "en" : "id";
    router.replace(pathname, { locale: nextLocale });
  };

  const currentFlag =
    locale === "id"
      ? "/flag/flag-for-flag-monaco-svgrepo-com.svg"
      : "/flag/flag-for-flag-united-kingdom-svgrepo-com.svg";

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 w-full px-6 sm:px-12 py-4 transition-all duration-300`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
        {/* Logo & Brand */}
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
        </div>
      </div>
    </motion.header>
  );
}
