"use client";

import React from "react";
import { toast } from "sonner";
import { Plus, FileText, UserPlus } from "lucide-react";

import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { OutsourcingKpiCards } from "@/features/dashboard/components/outsourcing-kpi-cards";
import { PrdOverviewChart } from "@/features/dashboard/components/prd-overview-chart";
import { TechnicianAssignmentTable } from "@/features/dashboard/components/technician-assignment-table";
import { CrewCompliancePanel } from "@/features/dashboard/components/crew-compliance-panel";
import { QuickActionModals } from "@/features/dashboard/components/quick-action-modals";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { modalState } = useDashboard();

  const handleSuccessToast = (msg: string) => {
    toast.success(msg);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Super Clean Borderless Header (No Container Box) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground font-heading">
            Dashboard Pengelolaan Teknisi & Kru Maritim
          </h1>
          <p className="text-xs text-muted-foreground">
            Ringkasan alokasi penugasan teknisi, kelaikan sertifikat kru, dan permintaan outsourcing klien.
          </p>
        </div>

        {/* Simplified Action Buttons (No Card Wrapper Box) */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => modalState.setAddVesselOpen(true)}
            className="h-8 text-xs gap-1.5 cursor-pointer shadow-xs"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>Tugaskan Teknisi</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => modalState.setUploadDocOpen(true)}
            className="h-8 text-xs gap-1.5 cursor-pointer bg-background/50"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Upload Sertifikat</span>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => modalState.setAddLeadOpen(true)}
            className="h-8 text-xs gap-1.5 cursor-pointer text-foreground hover:bg-accent"
          >
            <Plus className="h-3.5 w-3.5 text-primary" />
            <span>Tambah Lead CRM</span>
          </Button>
        </div>
      </div>

      {/* 4 Clean Outsourcing Summary Cards */}
      <OutsourcingKpiCards />

      {/* PRD Multi-Module Overview Chart */}
      <PrdOverviewChart />

      {/* Main Content Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Left Column: Technician Assignments Table */}
        <div className="lg:col-span-2 space-y-4">
          <TechnicianAssignmentTable
            onOpenAddAssignment={() => modalState.setAddVesselOpen(true)}
          />
        </div>

        {/* Right Column: Crew Certificate Compliance & Placement Requests */}
        <div className="lg:col-span-1">
          <CrewCompliancePanel />
        </div>
      </div>

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
