import { useState } from "react";
import type { DigitalDocumentItem, DocumentApprovalStatus } from "../types/document.types";
import { initialDocuments } from "../services/document.service";
import { useDocumentStore } from "../stores/useDocumentStore";

export function useDocuments() {
  const [documents, setDocuments] = useState<DigitalDocumentItem[]>(initialDocuments);

  const {
    activeCategory,
    setActiveCategory,
    selectedDocId,
    setSelectedDocId,
    isUploadModalOpen,
    setIsUploadModalOpen,
    isApprovalModalOpen,
    setIsApprovalModalOpen,
    isClientViewOnly,
    setIsClientViewOnly,
    searchQuery,
    setSearchQuery,
  } = useDocumentStore();

  const handleApproveDocument = (docId: string, status: DocumentApprovalStatus, note?: string) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          const audit = {
            id: `at-${Date.now()}`,
            action: status === "Final" ? "Document Approved to Final" : "Document Rejected",
            actor: "Hendra Wijaya (Supervisor)",
            timestamp: new Date().toLocaleString("id-ID"),
            note,
          };
          return {
            ...doc,
            status,
            approvedBy: status === "Final" ? "Hendra Wijaya (Supervisor)" : undefined,
            approvedAt: status === "Final" ? new Date().toLocaleString("id-ID") : undefined,
            auditTrail: [audit, ...doc.auditTrail],
          };
        }
        return doc;
      })
    );
  };

  const handleUploadDocument = (data: {
    title: string;
    category: any;
    vesselName?: string;
    clientCompany?: string;
    expiryDate?: string;
  }) => {
    const newDoc: DigitalDocumentItem = {
      ...data,
      id: `doc-${Date.now()}`,
      fileType: "PDF",
      fileSize: "2.8 MB",
      version: "v1.0",
      status: "Menunggu Approval",
      uploadedBy: "Budi Santoso (Staff)",
      uploadedAt: new Date().toLocaleString("id-ID"),
      auditTrail: [
        {
          id: `at-${Date.now()}`,
          action: "Document Uploaded",
          actor: "Budi Santoso (Staff)",
          timestamp: new Date().toLocaleString("id-ID"),
          note: "Diunggah oleh Staff, menunggu approval supervisor.",
        },
      ],
      versions: [
        {
          version: "v1.0",
          uploadedBy: "Budi Santoso (Staff)",
          uploadedAt: new Date().toLocaleString("id-ID"),
          fileSize: "2.8 MB",
        },
      ],
    };

    setDocuments((prev) => [newDoc, ...prev]);
  };

  // Filter pipeline:
  // 1. If Client View toggle is active, only show "Final" status documents!
  // 2. Filter by Category tab
  // 3. Filter by Search Query
  const filteredDocuments = documents.filter((doc) => {
    if (isClientViewOnly && doc.status !== "Final") {
      return false;
    }
    if (activeCategory !== "ALL" && doc.category !== activeCategory) {
      return false;
    }
    if (
      searchQuery &&
      !doc.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !doc.vesselName?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const selectedDoc = documents.find((d) => d.id === selectedDocId) || null;

  return {
    documents: filteredDocuments,
    selectedDoc,
    activeCategory,
    setActiveCategory,
    isClientViewOnly,
    setIsClientViewOnly,
    searchQuery,
    setSearchQuery,
    modalState: {
      isUploadModalOpen,
      setIsUploadModalOpen,
      isApprovalModalOpen,
      setIsApprovalModalOpen,
      selectedDocId,
      setSelectedDocId,
    },
    actions: {
      approveDocument: handleApproveDocument,
      uploadDocument: handleUploadDocument,
    },
  };
}
