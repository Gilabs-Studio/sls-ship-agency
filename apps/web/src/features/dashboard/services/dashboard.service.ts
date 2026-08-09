import type {
  DashboardKpi,
  ComplianceTrendPoint,
  ActivityTimelineItem,
  CrmPipelineSummary,
} from "../types/dashboard.types";

export const mockDashboardKpi: DashboardKpi = {
  totalActiveVessels: 28,
  expiring30Days: 8,
  expiring15Days: 4,
  expiring7Days: 2,
  expiredDocuments: 1,
  activeLeads: 14,
  dealsInNegotiation: 5,
  monthlyClosingDeals: 3,
  complianceRatePercentage: 94.2,
};

export const mockComplianceTrend: ComplianceTrendPoint[] = [
  { month: "Jan", complianceRate: 88, totalCertificates: 140, expiredCount: 5 },
  { month: "Feb", complianceRate: 90, totalCertificates: 145, expiredCount: 4 },
  { month: "Mar", complianceRate: 91, totalCertificates: 150, expiredCount: 3 },
  { month: "Apr", complianceRate: 93, totalCertificates: 154, expiredCount: 2 },
  { month: "Mei", complianceRate: 92, totalCertificates: 158, expiredCount: 3 },
  { month: "Jun", complianceRate: 95, totalCertificates: 162, expiredCount: 1 },
  { month: "Jul", complianceRate: 94.2, totalCertificates: 165, expiredCount: 1 },
];

export const mockRecentActivities: ActivityTimelineItem[] = [
  {
    id: "act-1",
    module: "documents",
    title: "Permohonan Approval Sertifikat SOLAS",
    description: "Staff mengunggah sertifikat baru untuk KM Ocean Star (IMO 948210)",
    actor: "Budi Santoso (Staff)",
    timestamp: "10 menit yang lalu",
    statusSeverity: "warning",
  },
  {
    id: "act-2",
    module: "vessels",
    title: "Status Kapal Diperbarui ke Layak Operasi",
    description: "Supervisor menyetujui perpanjangan ISM Code KM Maritime Titan",
    actor: "Hendra Wijaya (Supervisor)",
    timestamp: "45 menit yang lalu",
    statusSeverity: "success",
  },
  {
    id: "act-3",
    module: "crm",
    title: "Lead Baru Didaftarkan",
    description: "PT Nusantara Logistics mendaftarkan 5 armada potensi keagenan",
    actor: "Siti Rahma (Sales)",
    timestamp: "2 jam yang lalu",
    statusSeverity: "info",
  },
  {
    id: "act-4",
    module: "notifications",
    title: "Eskalasi Notifikasi Expiry H-7",
    description: "Peringatan otomatis dikirim ke Super Admin untuk KM Solid Horizon",
    actor: "System Engine",
    timestamp: "4 jam yang lalu",
    statusSeverity: "destructive",
  },
];

export const mockCrmSummary: CrmPipelineSummary = {
  newLeads: 4,
  contacted: 3,
  presentation: 2,
  negotiation: 3,
  won: 3,
  lost: 1,
};

export async function fetchDashboardSummary() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    kpi: mockDashboardKpi,
    trend: mockComplianceTrend,
    activities: mockRecentActivities,
    crmSummary: mockCrmSummary,
  };
}
