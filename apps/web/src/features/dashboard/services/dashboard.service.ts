import type {
  DashboardKpi,
  ComplianceTrendPoint,
  ActivityTimelineItem,
  CrmPipelineSummary,
  VmsKpiItem,
  VmsPipelineSegment,
  VmsTopAgency,
  VmsAgencyListItem,
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
    description: "PT. Nautiva Ocean Agencyan 5 armada potensi keagenan",
    actor: "Siti Rahma (Sales)",
    timestamp: "2 jam yang lalu",
    statusSeverity: "info",
  },
  {
    id: "act-4",
    module: "notifications",
    title: "Eskalasi Notifikasi Expiry H-7",
    description: "Peringatan otomatis dikirim ke Super Admin untuk KM Nautiva Horizon",
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

// --- VMS Mock Data ---

export const mockVmsKpis: VmsKpiItem[] = [
  {
    id: "kpi-1",
    title: "Total Agency Terdaftar",
    value: "36",
    unit: "Agency",
    changePercentage: 12,
    changePeriod: "vs bulan lalu",
    iconType: "building",
  },
  {
    id: "kpi-2",
    title: "Agency Aktif",
    value: "28",
    unit: "Agency",
    changePercentage: 8,
    changePeriod: "vs bulan lalu",
    iconType: "users",
  },
  {
    id: "kpi-3",
    title: "Proyek Berjalan",
    value: "42",
    unit: "Proyek",
    changePercentage: 15,
    changePeriod: "vs bulan lalu",
    iconType: "folder",
  },
  {
    id: "kpi-4",
    title: "Total Nilai Kontrak",
    value: "Rp 8.75 M",
    unit: "Total Value",
    changePercentage: 18,
    changePeriod: "vs bulan lalu",
    iconType: "file-text",
  },
  {
    id: "kpi-5",
    title: "Performa Rata-rata",
    value: "4.6 / 5",
    unit: "Skor",
    changePercentage: 5,
    changePeriod: "vs bulan lalu",
    iconType: "bar-chart",
  },
];

export const mockVmsPipeline: VmsPipelineSegment[] = [
  {
    id: "pipe-1",
    name: "Deal Closing / Negosiasi",
    count: 12,
    percentage: 29,
    color: "#047857", // emerald-700
  },
  {
    id: "pipe-2",
    name: "On Progress / Berjalan",
    count: 18,
    percentage: 43,
    color: "#2563eb", // blue-600
  },
  {
    id: "pipe-3",
    name: "Review / QA",
    count: 7,
    percentage: 17,
    color: "#f59e0b", // amber-500
  },
  {
    id: "pipe-4",
    name: "Selesai",
    count: 5,
    percentage: 11,
    color: "#94a3b8", // slate-400
  },
];

export const mockVmsTopAgencies: VmsTopAgency[] = [
  {
    id: "top-1",
    rank: 1,
    name: "TechCare Solutions",
    logo: "r",
    projectsCount: 6,
    contractValueFormatted: "Rp 1.25 M",
    score: 4.9,
    trend: "up",
  },
  {
    id: "top-2",
    rank: 2,
    name: "Digital Workforce ID",
    logo: "d",
    projectsCount: 5,
    contractValueFormatted: "Rp 980 Jt",
    score: 4.7,
    trend: "up",
  },
  {
    id: "top-3",
    rank: 3,
    name: "Inovasi Mandiri Agency",
    logo: "i",
    projectsCount: 4,
    contractValueFormatted: "Rp 870 Jt",
    score: 4.6,
    trend: "neutral",
  },
  {
    id: "top-4",
    rank: 4,
    name: "Solusi Talenta Nusantara",
    logo: "s",
    projectsCount: 3,
    contractValueFormatted: "Rp 760 Jt",
    score: 4.5,
    trend: "down",
  },
  {
    id: "top-5",
    rank: 5,
    name: "Smart Outsource Partner",
    logo: "so",
    projectsCount: 4,
    contractValueFormatted: "Rp 650 Jt",
    score: 4.4,
    trend: "up",
  },
];

export const mockVmsAgencies: VmsAgencyListItem[] = [
  {
    id: "agy-1",
    code: "ID-AGY-001",
    name: "TechCare Solutions",
    logo: "r",
    pic: {
      name: "Rizky Pratama",
      email: "rizky@techcare.id",
    },
    skills: ["IT Support", "Web Dev", "Mobile Dev"],
    activeProjectsCount: 6,
    completedProjectsThisMonth: 2,
    totalContractValueFormatted: "Rp 1.25 M",
    contractCount: 3,
    performanceScore: 4.9,
    status: "aktif",
    hasRunningProject: true,
  },
  {
    id: "agy-2",
    code: "ID-AGY-002",
    name: "Digital Workforce ID",
    logo: "d",
    pic: {
      name: "Budi Santoso",
      email: "budi@digitalworkforce.id",
    },
    skills: ["DevOps", "Cloud Infra", "Cybersecurity"],
    activeProjectsCount: 5,
    completedProjectsThisMonth: 1,
    totalContractValueFormatted: "Rp 980 Jt",
    contractCount: 2,
    performanceScore: 4.7,
    status: "aktif",
    hasRunningProject: true,
  },
  {
    id: "agy-3",
    code: "ID-AGY-003",
    name: "Inovasi Mandiri Agency",
    logo: "i",
    pic: {
      name: "Siti Rahma",
      email: "siti@inovasimandiri.co.id",
    },
    skills: ["UI/UX Design", "QA Automation", "Frontend"],
    activeProjectsCount: 4,
    completedProjectsThisMonth: 0,
    totalContractValueFormatted: "Rp 870 Jt",
    contractCount: 2,
    performanceScore: 4.6,
    status: "aktif",
    hasRunningProject: true,
  },
  {
    id: "agy-4",
    code: "ID-AGY-004",
    name: "Solusi Talenta Nusantara",
    logo: "s",
    pic: {
      name: "Hendra Wijaya",
      email: "hendra@solusitalenta.co.id",
    },
    skills: ["Data Engineer", "Backend Go", "AI/ML"],
    activeProjectsCount: 3,
    completedProjectsThisMonth: 1,
    totalContractValueFormatted: "Rp 760 Jt",
    contractCount: 1,
    performanceScore: 4.5,
    status: "aktif",
    hasRunningProject: true,
  },
  {
    id: "agy-5",
    code: "ID-AGY-005",
    name: "Smart Outsource Partner",
    logo: "so",
    pic: {
      name: "Dewi Anggraini",
      email: "dewi@smartoutsource.com",
    },
    skills: ["Technical Writer", "Scrum Master", "Product Manager"],
    activeProjectsCount: 4,
    completedProjectsThisMonth: 2,
    totalContractValueFormatted: "Rp 650 Jt",
    contractCount: 2,
    performanceScore: 4.4,
    status: "aktif",
    hasRunningProject: true,
  },
  {
    id: "agy-6",
    code: "ID-AGY-006",
    name: "PT. Nautiva Ocean Agency",
    logo: "cs",
    pic: {
      name: "Agus Pratama",
      email: "agus@cybershield.id",
    },
    skills: ["Penetration Testing", "Security Audit"],
    activeProjectsCount: 0,
    completedProjectsThisMonth: 0,
    totalContractValueFormatted: "Rp 450 Jt",
    contractCount: 1,
    performanceScore: 3.8,
    status: "blacklist",
    hasRunningProject: false,
  },
];

export async function fetchDashboardSummary() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    kpi: mockDashboardKpi,
    trend: mockComplianceTrend,
    activities: mockRecentActivities,
    crmSummary: mockCrmSummary,
    vmsKpis: mockVmsKpis,
    vmsPipeline: mockVmsPipeline,
    vmsTopAgencies: mockVmsTopAgencies,
    vmsAgencies: mockVmsAgencies,
  };
}

