import React from "react";
import { Building2, Ship, ShieldCheck, Download, FileSpreadsheet } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ClientComplianceReportItem } from "../types/report.types";

interface ComplianceReportTableProps {
  reports: ClientComplianceReportItem[];
  onExport: (format: "PDF" | "Excel") => void;
}

export function ComplianceReportTable({ reports, onExport }: ComplianceReportTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold">Laporan Tingkat Kepatuhan Sertifikat per Klien</h3>
          <p className="text-xs text-muted-foreground">
            Evaluasi persentase pemenuhan sertifikat wajib armada milik mitra pelayaran
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onExport("Excel")}
            className="h-8 text-xs gap-1.5 cursor-pointer border-border"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500" />
            <span>Ekspor Excel (.xlsx)</span>
          </Button>

          <Button
            size="sm"
            onClick={() => onExport("PDF")}
            className="h-8 text-xs gap-1.5 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Ekspor Dokumen PDF</span>
          </Button>
        </div>
      </div>

      <div className="border border-border rounded-lg bg-card overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
            <tr>
              <th className="p-3">Perusahaan Pelayaran (Klien)</th>
              <th className="p-3">Jumlah Armada</th>
              <th className="p-3">Total Sertifikat</th>
              <th className="p-3">Rincian Status (Aktif / Expired)</th>
              <th className="p-3">Tingkat Kepatuhan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {reports.map((item) => (
              <tr key={item.clientId} className="hover:bg-accent/40 transition-colors">
                <td className="p-3 font-bold text-foreground">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-primary" />
                    <span>{item.clientCompany}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <Ship className="h-3.5 w-3.5 text-primary" /> {item.vesselCount} Kapal
                  </span>
                </td>
                <td className="p-3 font-semibold text-foreground">{item.totalCertificates} Sertifikat</td>
                <td className="p-3">
                  <div className="flex gap-1.5 text-[10px]">
                    <Badge variant="outline" className="text-success border-success/30 bg-success/10 font-bold">
                      {item.activeCount} Aktif
                    </Badge>
                    {item.expiringCount > 0 && (
                      <Badge variant="outline" className="text-warning border-warning/30 bg-warning/10 font-semibold">
                        {item.expiringCount} Mendekati Expired
                      </Badge>
                    )}
                    {item.expiredCount > 0 && (
                      <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/10 font-bold">
                        {item.expiredCount} Expired
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-muted h-2 rounded-lg overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${item.complianceRate}%` }}
                      />
                    </div>
                    <span className="font-extrabold text-xs text-foreground">{item.complianceRate}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
