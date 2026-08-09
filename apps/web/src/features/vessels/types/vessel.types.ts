export type VesselType = "Cargo" | "Tanker" | "Tugboat" | "Bulk Carrier";

export type CertificateStatus = "Aktif" | "Mendekati Expired" | "Sudah Expired";

export type VesselSeaworthinessStatus = "Layak Operasi" | "Tidak Layak Operasi";

export interface MandatoryCertificate {
  id: string;
  certificateName: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  daysRemaining: number;
  status: CertificateStatus;
  lastRenewedBy?: string;
  documentFileUrl?: string;
}

export interface RenewalHistoryItem {
  id: string;
  certificateName: string;
  previousExpiry: string;
  newExpiry: string;
  renewedBy: string;
  renewedAt: string;
}

export interface VesselItem {
  id: string;
  name: string;
  imoNumber: string;
  flag: string;
  vesselType: VesselType;
  clientCompany: string;
  builtYear: number;
  grossTonnage: number;
  seaworthinessStatus: VesselSeaworthinessStatus;
  certificates: MandatoryCertificate[];
  renewalHistory: RenewalHistoryItem[];
}
