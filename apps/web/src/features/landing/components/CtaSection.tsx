"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { LandingTranslations } from "../types/landing.types";

interface CtaSectionProps {
  t: LandingTranslations;
}

export function CtaSection({ t }: CtaSectionProps) {
  const c = t.ctaSection;

  return (
    <section className="relative bg-[#030A19] py-20 px-6 sm:px-12 overflow-hidden border-t border-slate-900">
      {/* Background Seaport Vessel Image */}
      <Image
        src="/images/cta-port-vessel.png"
        alt="Seaport Container Ship"
        fill
        className="object-cover object-center opacity-30 pointer-events-none"
        sizes="100vw"
      />

      {/* Gradient Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#040C20] via-[#040C20]/90 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="max-w-xl">
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-3">
            {c.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md">
            {c.description}
          </p>
        </div>

        <a
          href="https://wa.me/62812345678"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-lg text-sm transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0"
        >
          {c.button}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
