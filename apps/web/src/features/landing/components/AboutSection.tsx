"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { LandingTranslations } from "../types/landing.types";

interface AboutSectionProps {
  t: LandingTranslations;
}

export function AboutSection({ t }: AboutSectionProps) {
  const a = t.aboutSection;

  return (
    <section id="about" className="bg-white py-20 px-6 sm:px-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Content */}
        <div>
          <span className="text-emerald-600 font-mono text-xs font-semibold uppercase tracking-wider block mb-2">
            {a.tag}
          </span>
          <h2 className="text-slate-900 text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-4">
            {a.title}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-xl">
            {a.description}
          </p>
          <a
            href="#services"
            className="inline-flex items-center gap-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-emerald-600/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            {a.ctaButton}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Right Column: Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group bg-slate-100 aspect-[4/3] w-full">
          <Image
            src="/images/about-vessel.png"
            alt="Mitra Terpercaya Industri Maritim"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

