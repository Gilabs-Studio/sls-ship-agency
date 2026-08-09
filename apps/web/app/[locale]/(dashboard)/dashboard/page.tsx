"use client";

import React from "react";
import { toast } from "sonner";

import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { KpiSummaryCards } from "@/features/dashboard/components/kpi-summary-cards";
import { QuickActionBar } from "@/features/dashboard/components/quick-action-bar";
import { ComplianceChart } from "@/features/dashboard/components/compliance-chart";
import { CrmPipelineWidget } from "@/features/dashboard/components/crm-pipeline-widget";
import { RecentActivityTimeline } from "@/features/dashboard/components/recent-activity-timeline";
import { QuickActionModals } from "@/features/dashboard/components/quick-action-modals";

export default function DashboardPage() {
  const { kpi, trend, activities, crmSummary, modalState } = useDashboard();

  const handleSuccessToast = (msg: string) => {
    toast.success(msg);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight">Dashboard Ringkasan Operasional</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Pantau kesehatan sertifikat kapal, pipeline prospek CRM, dan status kepatuhan maritim secara real-time.
        </p>
      </div>

      {/* KPI Summary Cards */}
      <KpiSummaryCards kpi={kpi} />

      {/* Quick Action Shortcuts */}
      <QuickActionBar
        onOpenAddVessel={() => modalState.setAddVesselOpen(true)}
        onOpenUploadDoc={() => modalState.setUploadDocOpen(true)}
        onOpenAddLead={() => modalState.setAddLeadOpen(true)}
      />

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Trend Chart */}
        <div className="lg:col-span-2 space-y-6">
          <ComplianceChart trend={trend} />
          <RecentActivityTimeline activities={activities} />
        </div>

        {/* CRM Pipeline Summary Widget */}
        <div className="space-y-6">
          <CrmPipelineWidget crmSummary={crmSummary} />
        </div>
      </div>

      {/* Interactive Quick Action Modals */}
      <QuickActionModals
        isAddVesselOpen={modalState.isAddVesselOpen}
        onAddVesselOpenChange={modalState.setAddVesselOpen}
        isUploadDocOpen={modalState.isUploadDocOpen}
        onUploadDocOpenChange={modalState.setUploadDocOpen}
        isAddLeadOpen={modalState.isAddLeadOpen}
        onAddLeadOpenChange={modalState.setAddLeadOpen}
        onSuccessToast={handleSuccessToast}
      />
    </div>
  );
}
