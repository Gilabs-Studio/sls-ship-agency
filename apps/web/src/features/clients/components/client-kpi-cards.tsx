"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Users, FileText, Anchor, DollarSign, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ClientKpiMetrics } from "../types/clients.types";

interface ClientKpiCardsProps {
  metrics: ClientKpiMetrics;
}

export function ClientKpiCards({ metrics }: ClientKpiCardsProps) {
  const t = useTranslations("clients.kpi");

  // Format Contract Value USD (e.g. 2450000 -> $2.45M)
  const formattedContractValue = `$${(metrics.contractValueUsd / 1000000).toFixed(2)}M`;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {/* Card 1: Total Clients */}
      <Card className="glass-card border border-border transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5">
        <CardContent className="p-3.5 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">{t("totalClients")}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground font-heading">
                {metrics.totalClients}
              </span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-500">
              +{metrics.totalClientsDelta} bulan ini
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <Users className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Active Contracts */}
      <Card className="glass-card border border-border transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5">
        <CardContent className="p-3.5 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">{t("activeContracts")}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground font-heading">
                {metrics.activeContracts}
              </span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-500">
              +{metrics.activeContractsDelta} bulan ini
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <FileText className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Active Placements */}
      <Card className="glass-card border border-border transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5">
        <CardContent className="p-3.5 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">{t("activePlacements")}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground font-heading">
                {metrics.activePlacements}
              </span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-500">
              +{metrics.activePlacementsDelta} bulan ini
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-500 border border-sky-500/20">
            <Anchor className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Contract Value (USD) */}
      <Card className="glass-card border border-border transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5">
        <CardContent className="p-3.5 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">{t("contractValue")}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground font-heading">
                {formattedContractValue}
              </span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-500">
              +{metrics.contractValueDeltaPercent}% vs last month
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <DollarSign className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>

      {/* Card 5: Client Health Score (Avg) */}
      <Card className="glass-card border border-border transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5">
        <CardContent className="p-3.5 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">{t("healthScore")}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold tracking-tight text-foreground font-heading">
                {metrics.clientHealthScoreAvg}
              </span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-500">
                {metrics.clientHealthStatus === "Good" ? t("good") : t("needsAttention")}
              </span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20">
            <Heart className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
