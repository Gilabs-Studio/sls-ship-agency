import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ComplianceTrendPoint } from "../types/dashboard.types";

interface ComplianceChartProps {
  trend: ComplianceTrendPoint[];
}

export function ComplianceChart({ trend }: ComplianceChartProps) {
  const maxVal = 100;

  return (
    <Card className="border border-border shadow-xs">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-bold">Tren Kepatuhan Dokumen Kapal</CardTitle>
          <CardDescription className="text-xs">
            Persentase sertifikat aktif & tepat waktu per bulan
          </CardDescription>
        </div>
        <Badge variant="outline" className="text-xs text-primary border-primary">
          Target 95%
        </Badge>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-border">
          {trend.map((pt) => {
            const barHeightPct = (pt.complianceRate / maxVal) * 100;
            return (
              <div key={pt.month} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <span className="text-[10px] font-bold text-muted-foreground group-hover:text-primary transition-colors">
                  {pt.complianceRate}%
                </span>
                <div className="w-full bg-muted rounded-t-sm h-36 flex items-end overflow-hidden p-0.5">
                  <div
                    className="w-full bg-primary rounded-t-xs transition-all duration-500 group-hover:bg-primary/80"
                    style={{ height: `${barHeightPct}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-foreground">{pt.month}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between pt-3 text-xs text-muted-foreground">
          <span>Total Sertifikat Dipantau: <strong className="text-foreground font-bold">165</strong></span>
          <span>Sertifikat ExPIRED Terkelola: <strong className="text-success font-bold">99.4%</strong></span>
        </div>
      </CardContent>
    </Card>
  );
}
