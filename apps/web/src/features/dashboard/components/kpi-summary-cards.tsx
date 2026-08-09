import React from "react";
import { Ship, Clock, AlertTriangle, ShieldCheck, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DashboardKpi } from "../types/dashboard.types";

interface KpiSummaryCardsProps {
  kpi: DashboardKpi;
}

export function KpiSummaryCards({ kpi }: KpiSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Active Vessels Card */}
      <Card className="border border-border shadow-xs hover:-translate-y-0.5 transition-all duration-300">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Total Armada Aktif</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tracking-tight">{kpi.totalActiveVessels}</span>
              <span className="text-[11px] text-muted-foreground">Kapal</span>
            </div>
            <p className="text-[11px] text-success font-medium flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> 100% Layak Operasi
            </p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Ship className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Expiring Documents (30/15/7 days) */}
      <Card className="border border-border shadow-xs hover:-translate-y-0.5 transition-all duration-300">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Mendekati Expired</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tracking-tight text-warning">
                {kpi.expiring30Days}
              </span>
              <span className="text-[11px] text-muted-foreground">Dokumen</span>
            </div>
            <div className="flex gap-1 text-[10px]">
              <Badge variant="outline" className="px-1 py-0 text-warning border-warning/30 bg-warning/5">
                30h: {kpi.expiring30Days}
              </Badge>
              <Badge variant="outline" className="px-1 py-0 text-warning border-warning/30 bg-warning/10 font-bold">
                15h: {kpi.expiring15Days}
              </Badge>
              <Badge variant="outline" className="px-1 py-0 text-destructive border-destructive/30 bg-destructive/10 font-extrabold">
                7h: {kpi.expiring7Days}
              </Badge>
            </div>
          </div>
          <div className="h-10 w-10 rounded-lg bg-warning/10 text-warning flex items-center justify-center">
            <Clock className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Expired Documents */}
      <Card className="border border-border shadow-xs hover:-translate-y-0.5 transition-all duration-300">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Sudah Expired</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tracking-tight text-destructive">
                {kpi.expiredDocuments}
              </span>
              <span className="text-[11px] text-muted-foreground">Sertifikat</span>
            </div>
            <p className="text-[11px] text-destructive font-medium flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" /> Perlu Eskalasi Segera
            </p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Overall Compliance Rate */}
      <Card className="border border-border shadow-xs hover:-translate-y-0.5 transition-all duration-300">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Tingkat Kepatuhan</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tracking-tight text-primary">
                {kpi.complianceRatePercentage}%
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {kpi.monthlyClosingDeals} Closing CRM Bulan Ini
            </p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
