export type DocumentCategory = "Sertifikat Kapal" | "Dokumen Klien" | "Dokumen Internal";

export type DocumentApprovalStatus = "Menunggu Approval" | "Final" | "Ditolak";

export interface DocumentAuditTrail {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
  note?: string;
}

export interface DocumentVersion {
  version: string;
  uploadedBy: string;
  uploadedAt: string;
  fileSize: string;
}

export interface DigitalDocumentItem {
  id: string;
  title: string;
  category: DocumentCategory;
  vesselName?: string;
  clientCompany?: string;
  fileType: string;
  fileSize: string;
  version: string;
  status: DocumentApprovalStatus;
  expiryDate?: string;
  uploadedBy: string;
  uploadedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  auditTrail: DocumentAuditTrail[];
  versions: DocumentVersion[];
}
