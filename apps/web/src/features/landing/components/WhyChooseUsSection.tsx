"use client";

import { UserCheck, Clock, ShieldCheck, Layers } from "lucide-react";
import type { LandingTranslations } from "../types/landing.types";

interface WhyChooseUsSectionProps {
  t: LandingTranslations;
}

export function WhyChooseUsSection({ t }: WhyChooseUsSectionProps) {
  const w = t.whyChooseUsSection;

  const items = [
    {
      icon: UserCheck,
      title: w.item1Title,
      desc: w.item1Desc,
    },
    {
      icon: Clock,
      title: w.item2Title,
      desc: w.item2Desc,
    },
    {
      icon: ShieldCheck,
      title: w.item3Title,
      desc: w.item3Desc,
    },
    {
      icon: Layers,
      title: w.item4Title,
      desc: w.item4Desc,
    },
  ];

  return (
    <section className="bg-slate-50 py-20 px-6 sm:px-10 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-emerald-600 font-mono text-xs font-semibold uppercase tracking-wider block mb-2">
              {w.tag}
            </span>
            <h2 className="text-slate-900 text-3xl sm:text-4xl font-bold tracking-tight leading-tight max-w-md">
              {w.title}
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
            {w.description}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md hover:border-emerald-300 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-slate-900 font-bold text-base sm:text-lg mb-2 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
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

