"use client";

import React, { useState } from "react";
import { BarChart3, TrendingUp, ShieldCheck, PieChart, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PrdOverviewChart() {
  const [activeTab, setActiveTab] = useState<"compliance" | "pipeline">("compliance");

  return (
    <div className="glass-card rounded-2xl p-4 space-y-4 border border-border shadow-xs">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-foreground font-heading">
              Grafik Overview System (PRD Modules)
            </h3>
            <p className="text-xs text-muted-foreground">
              Agregasi tren kepatuhan sertifikat maritim & pipeline CRM
            </p>
          </div>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("compliance")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === "compliance"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Tren Kepatuhan Sertifikat
          </button>

          <button
            onClick={() => setActiveTab("pipeline")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === "pipeline"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Pipeline CRM Prospek
          </button>
        </div>
      </div>

      {/* Tab Content 1: Compliance Trend */}
      {activeTab === "compliance" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Badge variant="mint">Rata-rata 94.2% Safe</Badge>
              <span className="text-muted-foreground">Target Minimum: 90%</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-700 dark:text-[#ACFCCC] font-semibold">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+3.2% dari Bulan Lalu</span>
            </div>
          </div>

          {/* Bar Chart Simulation */}
          <div className="grid grid-cols-6 gap-2 items-end h-32 pt-4 px-2 border-b border-border">
            {[
              { month: "Jan", val: 88 },
              { month: "Feb", val: 90 },
              { month: "Mar", val: 91 },
              { month: "Apr", val: 92.5 },
              { month: "Mei", val: 93.8 },
              { month: "Jun", val: 94.2, current: true },
            ].map((item) => (
              <div key={item.month} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="text-[10px] font-bold text-foreground opacity-80 group-hover:opacity-100">
                  {item.val}%
                </span>
                <div
                  className={`w-full rounded-t-lg transition-all duration-300 ${
                    item.current
                      ? "bg-emerald-600 dark:bg-[#ACFCCC] shadow-xs"
                      : "bg-primary/30 hover:bg-primary/50"
                  }`}
                  style={{ height: `${(item.val / 100) * 100}%` }}
                />
                <span className="text-[10px] text-muted-foreground font-medium">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 2: CRM Pipeline */}
      {activeTab === "pipeline" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Konversi Pipeline Prospek Keagenan</span>
            <Badge variant="ice">45 Lead Aktif</Badge>
          </div>

          <div className="grid grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-card/50 border border-border space-y-1">
              <span className="text-[10px] text-muted-foreground font-semibold">Lead Baru</span>
              <div className="text-lg font-extrabold text-foreground">45</div>
              <div className="h-1 w-full bg-primary/30 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-full" />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-card/50 border border-border space-y-1">
              <span className="text-[10px] text-muted-foreground font-semibold">Dihubungi</span>
              <div className="text-lg font-extrabold text-foreground">28</div>
              <div className="h-1 w-full bg-sky-500/30 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 w-[62%]" />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-card/50 border border-border space-y-1">
              <span className="text-[10px] text-muted-foreground font-semibold">Negosiasi</span>
              <div className="text-lg font-extrabold text-foreground">14</div>
              <div className="h-1 w-full bg-amber-500/30 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[31%]" />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-card/50 border border-border space-y-1">
              <span className="text-[10px] text-muted-foreground font-semibold">Closing</span>
              <div className="text-lg font-extrabold text-emerald-700 dark:text-[#ACFCCC]">9</div>
              <div className="h-1 w-full bg-emerald-500/30 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 dark:bg-[#ACFCCC] w-[20%]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
