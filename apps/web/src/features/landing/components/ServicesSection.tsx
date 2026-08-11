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
    <section id="services" className="relative z-20 min-h-screen bg-[#030618] py-20 px-6 sm:px-10 border-t border-[#030618] shadow-2xl shadow-black/90 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider block mb-2">
              {s.tag}
            </span>
            <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight max-w-xl leading-tight">
              {s.title}
            </h2>
          </div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg lg:text-right">
            {s.description}
          </p>
        </div>

        {/* 4 Cards Grid with Gradient from top down */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{ borderRadius: "1.25rem" }}
                className="bg-gradient-to-b from-[#14223d] via-[#0d162a] to-[#070c19] border border-[#1d2f50]/40 p-6 sm:p-7 flex flex-col justify-between min-h-[230px] shadow-xl shadow-black/30"
              >
                <div>
                  {/* Green Circle Icon */}
                  <div
                    style={{ borderRadius: "50%" }}
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-[#059669] text-white flex items-center justify-center mb-6 shrink-0 shadow-md"
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  {/* Title */}
                  <h3 className="text-white text-base sm:text-lg font-bold mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  {/* Description */}
                  <p className="text-slate-300/85 text-xs sm:text-sm leading-relaxed">
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


