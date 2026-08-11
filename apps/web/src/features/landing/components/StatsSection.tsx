"use client";

import { Users, Package, Building2, ShieldCheck } from "lucide-react";
import type { LandingTranslations } from "../types/landing.types";

interface StatsSectionProps {
  t: LandingTranslations;
}

export function StatsSection({ t }: StatsSectionProps) {
  const s = t.statsSection;

  const stats = [
    {
      icon: Users,
      number: s.stat1Number,
      label: s.stat1Label,
    },
    {
      icon: Package,
      number: s.stat2Number,
      label: s.stat2Label,
    },
    {
      icon: Building2,
      number: s.stat3Number,
      label: s.stat3Label,
    },
    {
      icon: ShieldCheck,
      number: s.stat4Number,
      label: s.stat4Label,
    },
  ];

  return (
    <section className="bg-[#030618] py-16 px-6 sm:px-10 border-t border-slate-900/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-[1px] w-12 bg-slate-800 sm:w-20" />
          <span className="text-slate-400 font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase">
            {s.tag}
          </span>
          <div className="h-[1px] w-12 bg-slate-800 sm:w-20" />
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800/80 gap-6 md:gap-0">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center text-center px-4 py-4 md:py-0 group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-950/60 text-emerald-400 flex items-center justify-center mb-3 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight my-1 group-hover:text-emerald-300 transition-colors">
                  {item.number}
                </div>
                <div className="text-slate-400 text-xs sm:text-sm font-medium">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
