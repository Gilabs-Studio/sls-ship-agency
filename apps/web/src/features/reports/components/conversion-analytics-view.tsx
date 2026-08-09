import React from "react";
import { TrendingUp, Handshake, DollarSign, Award } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CrmConversionMetric } from "../types/report.types";

interface ConversionAnalyticsViewProps {
  metrics: CrmConversionMetric[];
}

export function ConversionAnalyticsView({ metrics }: ConversionAnalyticsViewProps) {
  const avgConversion = (
    metrics.reduce((acc, m) => acc + m.conversionRate, 0) / metrics.length
  ).toFixed(1);

  const totalValue = metrics.reduce((acc, m) => acc + m.totalContractValue, 0);

  return (
    <div className="space-y-6">
      {/* Top Stat Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-border shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Rata-rata Konversi CRM</p>
              <h3 className="text-2xl font-extrabold tracking-tight text-primary mt-1">{avgConversion}%</h3>
              <p className="text-[11px] text-success font-medium flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" /> Rasio Prospek Menang
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Award className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Total Nilai Kontrak Closing</p>
              <h3 className="text-2xl font-extrabold tracking-tight text-foreground mt-1">
                Rp {(totalValue / 1000000000).toFixed(2)} Miliar
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1">Akumulasi Periode Terpilih</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Total Prospek Masuk</p>
              <h3 className="text-2xl font-extrabold tracking-tight text-foreground mt-1">
                {metrics.reduce((acc, m) => acc + m.totalLeads, 0)} Lead
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1">Dari Berbagai Channel Lead</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Handshake className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Conversion Breakdown Table */}
      <div className="border border-border rounded-lg bg-card overflow-hidden shadow-xs">
        <div className="p-4 border-b border-border">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Rincian Rasio Konversi CRM per Periode
          </h4>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
            <tr>
              <th className="p-3">Periode Bulan</th>
              <th className="p-3">Total Lead Masuk</th>
              <th className="p-3">Dihubungi & Presentasi</th>
              <th className="p-3">Closing (Won)</th>
              <th className="p-3">Rasio Konversi (%)</th>
              <th className="p-3">Nilai Kontrak (IDR)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {metrics.map((m) => (
              <tr key={m.period} className="hover:bg-accent/40 transition-colors">
                <td className="p-3 font-bold text-foreground">{m.period}</td>
                <td className="p-3 font-semibold text-foreground">{m.totalLeads} Lead</td>
                <td className="p-3">{m.contactedCount} Lead</td>
                <td className="p-3 font-bold text-success">{m.wonCount} Lead</td>
                <td className="p-3">
                  <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10 font-bold">
                    {m.conversionRate}%
                  </Badge>
                </td>
                <td className="p-3 font-extrabold text-foreground">
                  Rp {m.totalContractValue.toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
