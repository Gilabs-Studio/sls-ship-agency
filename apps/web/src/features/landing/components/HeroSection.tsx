"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { LandingTranslations } from "../types/landing.types";

interface HeroSectionProps {
  t: LandingTranslations;
  locale?: string;
}

export function HeroSection({ t }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Scroll progress for parallax effect on hero people
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax scroll shift on hero-people (moves with scroll)
  const peopleY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] min-h-[100dvh] max-h-[100dvh] w-full bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden selection:bg-emerald-500 selection:text-slate-950"
    >
      {/* ==================================================== */}
      {/* LAYER 0 (z-0): BACKGROUND IMAGE (STATIC, HEAVY OVERLAY) */}
      {/* ==================================================== */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        <Image
          src="/hero-bg.webp"
          alt="Ship Agency Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-65 scale-105"
        />
        {/* Dark Backdrop Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/50 to-slate-950" />
      </div>

      {/* Intense Dark Bottom Shadow (Reaches up to half body of "Nautiva Ocean Agency" text) */}
      <div className="absolute inset-x-0 bottom-0 h-36 sm:h-44 lg:h-48 bg-gradient-to-t from-slate-950 via-slate-950/95 via-50% to-transparent z-25 pointer-events-none" />

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
          className="relative w-[680px] sm:w-full min-w-[680px] sm:min-w-0 h-full flex items-end justify-center shrink-0"
        >
          <Image
            src="/hero-people.webp"
            alt="PT. Nautiva Ocean Agency Team"
            fill
            priority
            sizes="(max-width: 1700px) 100vw, 1600px"
            className="object-contain object-bottom scale-100 sm:scale-115 lg:scale-120 translate-y-1 sm:translate-y-10 lg:translate-y-16 drop-shadow-[0_45px_100px_rgba(0,0,0,0.85)]"
          />
        </motion.div>
      </motion.div>

      {/* ==================================================== */}
      {/* LAYER 3 (z-30): TYPOGRAPHY OVERLAY                    */}
      {/* ==================================================== */}
      <div className="absolute top-[300px] sm:top-auto sm:bottom-10 inset-x-0 z-30 px-4 sm:px-8 text-center pointer-events-none select-none">
        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tight leading-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] whitespace-normal sm:whitespace-nowrap">
          {t.heroTagline || "Nautiva Ocean Agency"}
        </h1>
        <p className="text-sm sm:text-lg lg:text-2xl text-slate-200/90 font-semibold tracking-wide drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)] mt-2 sm:mt-3 max-w-3xl mx-auto">
          {t.heroSubtagline || "Outsourcing Agen Perkapalan"}
        </p>
      </div>
    </section>
  );
}





