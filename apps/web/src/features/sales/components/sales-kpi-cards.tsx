"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { TrendingUp, DollarSign, ClipboardCheck, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SalesKpiMetrics } from "../types/sales.types";

interface SalesKpiCardsProps {
  metrics: SalesKpiMetrics;
}

export function SalesKpiCards({ metrics }: SalesKpiCardsProps) {
  const t = useTranslations("sales");

  const formattedPipelineValue = (metrics.totalPipelineValue / 1000000000).toFixed(2);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Active Leads */}
      <Card className="glass-card border border-border">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">{t("kpi.totalLeads")}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                {metrics.totalLeads}
              </span>
              <span className="text-[10px] text-muted-foreground">Prospek</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
            <TrendingUp className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Total Pipeline Value */}
      <Card className="glass-card border border-border">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">{t("kpi.totalPipeline")}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                Rp {formattedPipelineValue}M
              </span>
              <span className="text-[10px] text-muted-foreground">{t("kpi.perMonth")}</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500">
            <DollarSign className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Qualified Prospects */}
      <Card className="glass-card border border-border">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">{t("kpi.qualifiedCount")}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                {metrics.qualifiedLeadsCount}
              </span>
              <span className="text-[10px] text-muted-foreground">Form Discovery</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-500">
            <ClipboardCheck className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Target Win Rate */}
      <Card className="glass-card border border-border">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">{t("kpi.winRate")}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                {metrics.winRatePercentage}%
              </span>
              <span className="text-[10px] text-emerald-500 font-semibold">{metrics.wonLeadsCount} Won</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500">
            <Target className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
