"use client";

import React from "react";
import { toast } from "sonner";

import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { OutsourcingKpiCards } from "@/features/dashboard/components/outsourcing-kpi-cards";
import { CrmDonutSummary } from "@/features/dashboard/components/crm-donut-summary";
import { TechnicianAssignmentTable } from "@/features/dashboard/components/technician-assignment-table";
import { QuickActionModals } from "@/features/dashboard/components/quick-action-modals";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { modalState } = useDashboard();

  const handleSuccessToast = (msg: string) => {
    toast.success(msg);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header & Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground font-heading">
            Dashboard Penugasan Agen & Vendor Management System
          </h1>
          <p className="text-xs text-muted-foreground">
            Monitoring penugasan agen/teknisi di klien, performa mitra VMS supplier, & distribusi deal CRM.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => modalState.setAddVesselOpen(true)}
            className="h-8 text-xs cursor-pointer shadow-xs"
          >
            Tugaskan Personel
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => modalState.setUploadDocOpen(true)}
            className="h-8 text-xs cursor-pointer bg-background/50"
          >
            Upload Sertifikat
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => modalState.setAddLeadOpen(true)}
            className="h-8 text-xs cursor-pointer hover:bg-accent"
          >
            Tambah Lead CRM
          </Button>
        </div>
      </div>

      {/* 4 Clean Summary Metric Cards (No Badges) */}
      <OutsourcingKpiCards />

      {/* CRM Deal Status Donut Circle Chart */}
      <CrmDonutSummary />

      {/* Main Canvas: VMS & Assignment Table */}
      <TechnicianAssignmentTable
        onOpenAddAssignment={() => modalState.setAddVesselOpen(true)}
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
