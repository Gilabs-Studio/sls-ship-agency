"use client";

import React from "react";
import { toast } from "sonner";

import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { VmsHeader } from "@/features/dashboard/components/vms-header";
import { OutsourcingKpiCards } from "@/features/dashboard/components/outsourcing-kpi-cards";
import { VmsProjectPipelineDonut } from "@/features/dashboard/components/vms-project-pipeline-donut";
import { VmsTopAgenciesTable } from "@/features/dashboard/components/vms-top-agencies-table";
import { VmsAgencyListTable } from "@/features/dashboard/components/vms-agency-list-table";
import { QuickActionModals } from "@/features/dashboard/components/quick-action-modals";

export default function DashboardPage() {
  const {
    vmsPipeline,
    vmsTopAgencies,
    filteredAgencies,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    counts,
    modalState,
  } = useDashboard();

  const handleSuccessToast = (msg: string) => {
    toast.success(msg);
  };

  return (
    <div className="space-y-5 pb-8">
      {/* 1. Header & Actions */}
      <VmsHeader
        onAddAgency={() => modalState.setAddVesselOpen(true)}
        onUploadDoc={() => modalState.setUploadDocOpen(true)}
        onExportReport={() => handleSuccessToast("Laporan VMS berhasil diexport")}
      />

      {/* 2. Reverted KPI Metric Cards (Clean glass-cards format) */}
      <OutsourcingKpiCards />

      {/* 3. Middle Section: Pipeline Donut Chart + Top Performing Agency */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5">
          <VmsProjectPipelineDonut pipeline={vmsPipeline} />
        </div>
        <div className="lg:col-span-7">
          <VmsTopAgenciesTable
            topAgencies={vmsTopAgencies}
            onViewAll={() => setActiveTab("semua")}
          />
        </div>
      </div>

      {/* 4. Bottom Section: Clean Filing Style Folder Container for Agency List */}
      <VmsAgencyListTable
        agencies={filteredAgencies}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        counts={counts}
      />

      {/* Quick Action Interactive Dialog Modals */}
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


