"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Clock, ArrowUpRight, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { VesselAgentKpiMetrics } from "../types/vessel-agent.types";

interface VesselKpiCardsProps {
  metrics: VesselAgentKpiMetrics;
}

export function VesselKpiCards({ metrics }: VesselKpiCardsProps) {
  const t = useTranslations("vessels");

  const deploymentPct = Math.round((metrics.onDutyCount / (metrics.totalAgents || 1)) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* 1. Time Estimate / Deployment Graph Card (Ref: Left card) */}
      <Card className="glass-card border border-border shadow-xs hover:-translate-y-0.5 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-5">
          <CardTitle className="text-sm font-bold text-foreground">
            Tingkat Operasional Armada
          </CardTitle>
          <div className="h-7 w-7 rounded-full border border-border bg-muted/40 flex items-center justify-center text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0 space-y-3">
          <div className="relative w-full h-11 bg-muted/50 rounded-xl overflow-hidden flex items-center border border-border/50">
            {/* Filled Progress Segment */}
            <div
              className="h-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs transition-all duration-500 rounded-lg shadow-2xs"
              style={{ width: `${deploymentPct}%` }}
            >
              {deploymentPct}% Active Duty
            </div>
            {/* Remaining Hatched Pattern Segment */}
            <div className="flex-1 h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(0,0,0,0.04)_6px,rgba(0,0,0,0.04)_12px)] dark:bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(255,255,255,0.04)_6px,rgba(255,255,255,0.04)_12px)]" />
          </div>

          <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Tahun Buku</span>
              <span className="font-mono font-medium text-foreground">2026 Q1-Q4</span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Status Armada</span>
              <span className="font-mono font-medium text-foreground">{metrics.onDutyCount} dari {metrics.totalAgents} Berlayar</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Active Crew Metric Card (Ref: Middle card) */}
      <Card className="glass-card border border-border shadow-xs hover:-translate-y-0.5 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-5">
          <CardTitle className="text-sm font-bold text-foreground">
            {t("kpi.totalAgents")}
          </CardTitle>
          <div className="h-7 w-7 rounded-full border border-border bg-muted/40 flex items-center justify-center text-muted-foreground">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0 flex items-end justify-between">
          <div className="space-y-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px] font-semibold gap-1 px-2 py-0.5">
              <TrendingUp className="h-3 w-3" /> +12% vs bln lalu
            </Badge>
            <div>
              <div className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
                {metrics.totalAgents} <span className="text-sm font-semibold text-muted-foreground font-sans">Kru</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {metrics.readyCount} Ready • {metrics.onDutyCount} On Duty
              </p>
            </div>
          </div>

          {/* Mini Bar Indicator */}
          <div className="flex items-end gap-1.5 h-12 pb-1">
            <div className="w-2.5 bg-primary/40 rounded-full h-[60%]" title="Ready" />
            <div className="w-2.5 bg-primary rounded-full h-[100%]" title="On Duty" />
            <div className="w-2.5 bg-primary/30 rounded-full h-[40%]" title="Cuti" />
          </div>
        </CardContent>
      </Card>

      {/* 3. Product Revenue / Rating & Compliance Card (Ref: Right card) */}
      <Card className="glass-card border border-border shadow-xs hover:-translate-y-0.5 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-5">
          <CardTitle className="text-sm font-bold text-foreground">
            Skor Performansi & Compliance
          </CardTitle>
          <div className="h-7 w-7 rounded-full border border-border bg-muted/40 flex items-center justify-center text-muted-foreground">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0 flex items-end justify-between">
          <div className="space-y-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px] font-semibold gap-1 px-2 py-0.5">
              <TrendingUp className="h-3 w-3" /> +0.4 ★
            </Badge>
            <div>
              <div className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
                {metrics.avgRating.toFixed(1)} <span className="text-amber-500 text-2xl">★</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Rerata penilaian Kapten & Shipowner
              </p>
            </div>
          </div>

          {/* Donut Circle Indicator */}
          <div className="relative h-14 w-14 shrink-0 flex items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-muted/60 stroke-current"
                strokeWidth="3.5"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-primary stroke-current"
                strokeDasharray="96, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[11px] font-bold text-foreground">96%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
