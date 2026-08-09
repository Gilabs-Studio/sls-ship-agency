"use client";

import React from "react";
import { ShieldCheck, TrendingUp } from "lucide-react";

import { useReports } from "@/features/reports/hooks/useReports";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ComplianceReportTable } from "@/features/reports/components/compliance-report-table";
import { ConversionAnalyticsView } from "@/features/reports/components/conversion-analytics-view";
import type { ReportTab } from "@/features/reports/stores/useReportStore";

export default function ReportsPage() {
  const {
    complianceReports,
    conversionMetrics,
    activeTab,
    setActiveTab,
    actions,
  } = useReports();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight">Laporan & Analitik Operasional</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Evaluasi kinerja kepatuhan sertifikat armada, tingkat rasio konversi CRM, dan ekspor laporan resmi.
        </p>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as ReportTab)}>
        <TabsList className="bg-card border border-border h-10 p-1">
          <TabsTrigger value="compliance" className="text-xs gap-1.5 cursor-pointer">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span>Kepatuhan Dokumen Kapal</span>
          </TabsTrigger>
          <TabsTrigger value="crm-conversion" className="text-xs gap-1.5 cursor-pointer">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            <span>Konversi Pipeline CRM</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compliance" className="pt-4">
          <ComplianceReportTable
            reports={complianceReports}
            onExport={(fmt) => actions.exportReport(fmt)}
          />
        </TabsContent>

        <TabsContent value="crm-conversion" className="pt-4">
          <ConversionAnalyticsView metrics={conversionMetrics} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
