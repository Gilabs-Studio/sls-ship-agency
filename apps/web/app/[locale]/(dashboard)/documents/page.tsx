"use client";

import React from "react";
import { toast } from "sonner";

import { useDocuments } from "@/features/documents/hooks/useDocuments";
import { DocumentGridTable } from "@/features/documents/components/document-grid-table";
import { ApprovalWorkflowDialog } from "@/features/documents/components/approval-workflow-dialog";
import { DocumentUploadModal } from "@/features/documents/components/document-upload-modal";

export default function DocumentsPage() {
  const {
    documents,
    selectedDoc,
    activeCategory,
    setActiveCategory,
    isClientViewOnly,
    setIsClientViewOnly,
    searchQuery,
    setSearchQuery,
    modalState,
    actions,
  } = useDocuments();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight">Manajemen Dokumen Digital & Approval</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Penyimpanan terpusat sertifikat kapal, dokumen klien, alur persetujuan supervisor, dan audit trail resmi.
        </p>
      </div>

      {/* Main Grid & Actions */}
      <DocumentGridTable
        documents={documents}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        isClientViewOnly={isClientViewOnly}
        onToggleClientView={(val) => {
          setIsClientViewOnly(val);
          toast.info(val ? "Mode Portal Klien Aktif: Hanya menampilkan dokumen berstatus Final." : "Mode Internal: Menampilkan semua draf & pending dokumen.");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenUploadModal={() => modalState.setIsUploadModalOpen(true)}
        onOpenReviewModal={(docId) => {
          modalState.setSelectedDocId(docId);
          modalState.setIsApprovalModalOpen(true);
        }}
      />

      {/* Approval Dialog */}
      <ApprovalWorkflowDialog
        document={selectedDoc}
        isOpen={modalState.isApprovalModalOpen}
        onOpenChange={modalState.setIsApprovalModalOpen}
        onApprove={(docId, status, note) => {
          actions.approveDocument(docId, status, note);
          if (status === "Final") {
            toast.success("Dokumen disetujui! Status berubah menjadi Final & tanggal berlaku sertifikat diperbarui.");
          } else {
            toast.error("Dokumen ditolak oleh Supervisor.");
          }
        }}
      />

      {/* Document Upload Modal */}
      <DocumentUploadModal
        isOpen={modalState.isUploadModalOpen}
        onOpenChange={modalState.setIsUploadModalOpen}
        onSubmitUpload={(data) => {
          actions.uploadDocument(data);
          toast.success(`Dokumen "${data.title}" berhasil diunggah! Menunggu approval supervisor.`);
        }}
      />
    </div>
  );
}
