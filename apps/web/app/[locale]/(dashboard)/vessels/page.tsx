"use client";

import React from "react";
import { toast } from "sonner";

import { useVessels } from "@/features/vessels/hooks/useVessels";
import { VesselTable } from "@/features/vessels/components/vessel-table";
import { VesselDetailDrawer } from "@/features/vessels/components/vessel-detail-drawer";
import { VesselModals } from "@/features/vessels/components/vessel-modals";

export default function VesselsPage() {
  const {
    vessels,
    activeVessel,
    selectedVesselId,
    setSelectedVesselId,
    searchQuery,
    setSearchQuery,
    modalState,
    actions,
  } = useVessels();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight">Manajemen Kapal Armada & Sertifikat</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Pantau status kelaikan operasi armada, perpanjang sertifikat maritim, dan kelola checklist dokumen wajib.
        </p>
      </div>

      {/* Main Grid split view */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <VesselTable
            vessels={vessels}
            selectedVesselId={selectedVesselId}
            onSelectVessel={(id) => setSelectedVesselId(id)}
            onOpenAddVessel={() => modalState.setIsAddVesselOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        <div>
          {activeVessel && (
            <VesselDetailDrawer
              vessel={activeVessel}
              onOpenRenewModal={(certId) => {
                modalState.setSelectedCertificateId(certId);
                modalState.setIsRenewCertOpen(true);
              }}
            />
          )}
        </div>
      </div>

      {/* Vessel Modals */}
      <VesselModals
        isAddVesselOpen={modalState.isAddVesselOpen}
        onAddVesselOpenChange={modalState.setIsAddVesselOpen}
        onAddVesselSubmit={(data) => {
          actions.addVessel(data);
          toast.success(`Kapal ${data.name} berhasil didaftarkan beserta checklist sertifikat!`);
        }}
        isRenewCertOpen={modalState.isRenewCertOpen}
        onRenewCertOpenChange={modalState.setIsRenewCertOpen}
        onRenewCertSubmit={(data) => {
          actions.renewCertificate(data);
          toast.success("Sertifikat berhasil diperbarui! Jadwal pengingat otomatis di-reset.");
        }}
        selectedCertId={modalState.selectedCertificateId}
      />
    </div>
  );
}
