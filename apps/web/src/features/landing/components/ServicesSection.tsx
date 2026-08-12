"use client";

import { Users, FileText, Package, ShieldCheck } from "lucide-react";
import type { LandingTranslations } from "../types/landing.types";

interface ServicesSectionProps {
  t: LandingTranslations;
}

export function ServicesSection({ t }: ServicesSectionProps) {
  const s = t.servicesSection;

  const services = [
    {
      icon: Users,
      title: s.crewTitle,
      desc: s.crewDesc,
    },
    {
      icon: FileText,
      title: s.techTitle,
      desc: s.techDesc,
    },
    {
      icon: Package,
      title: s.logisticsTitle,
      desc: s.logisticsDesc,
    },
    {
      icon: ShieldCheck,
      title: s.complianceTitle,
      desc: s.complianceDesc,
    },
  ];

  return (
    <section id="services" className="relative z-20 min-h-screen bg-[#030618] py-12 sm:py-20 px-4 sm:px-10 border-t border-[#030618] shadow-2xl shadow-black/90 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2 sm:gap-6 mb-6 sm:mb-14 text-center lg:text-left">
          <div className="mx-auto lg:mx-0">
            <span className="text-emerald-400 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider block mb-1 sm:mb-2">
              {s.tag}
            </span>
            <h2 className="text-white text-xl sm:text-4xl font-bold tracking-tight max-w-xl leading-tight mx-auto lg:mx-0">
              {s.title}
            </h2>
          </div>
          <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-lg mx-auto lg:text-right">
            {s.description}
          </p>
        </div>

        {/* 4 Cards Grid - 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 w-full">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{ borderRadius: "0.875rem" }}
                className="bg-gradient-to-b from-[#14223d]/90 via-[#0d162a]/90 to-[#070c19]/95 border border-[#1d2f50]/60 p-3.5 sm:p-7 flex flex-col justify-between min-h-[125px] sm:min-h-[230px] shadow-xl shadow-black/40 backdrop-blur-md group hover:border-emerald-500/50 transition-all duration-300"
              >
                <div>
                  {/* Green Circle Icon */}
                  <div
                    style={{ borderRadius: "50%" }}
                    className="w-7 h-7 sm:w-12 sm:h-12 bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 sm:mb-6 shrink-0 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300"
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
                  </div>
                  {/* Title */}
                  <h3 className="text-white text-xs sm:text-lg font-bold mb-1 sm:mb-3 tracking-tight group-hover:text-emerald-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  {/* Description */}
                  <p className="text-slate-300/85 text-[10px] sm:text-sm leading-snug line-clamp-3 sm:line-clamp-none">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


