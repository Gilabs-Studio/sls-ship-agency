export interface DashboardKpi {
  totalActiveVessels: number;
  expiring30Days: number;
  expiring15Days: number;
  expiring7Days: number;
  expiredDocuments: number;
  activeLeads: number;
  dealsInNegotiation: number;
  monthlyClosingDeals: number;
  complianceRatePercentage: number;
}

export interface ComplianceTrendPoint {
  month: string;
  complianceRate: number;
  totalCertificates: number;
  expiredCount: number;
}

export interface ActivityTimelineItem {
  id: string;
  module: "vessels" | "documents" | "crm" | "notifications" | "settings";
  title: string;
  description: string;
  actor: string;
  timestamp: string;
  statusSeverity: "info" | "success" | "warning" | "destructive";
}

export interface CrmPipelineSummary {
  newLeads: number;
  contacted: number;
  presentation: number;
  negotiation: number;
  won: number;
  lost: number;
}

// --- VMS Dashboard Interfaces ---

export interface VmsKpiItem {
  id: string;
  title: string;
  value: string;
  unit: string;
  changePercentage: number;
  changePeriod: string;
  iconType: "building" | "users" | "folder" | "file-text" | "bar-chart";
}

export interface VmsPipelineSegment {
  id: string;
  name: string;
  count: number;
  percentage: number;
  color: string; // Hex or Tailwind color token
}

export interface VmsTopAgency {
  id: string;
  rank: number;
  name: string;
  logo: string; // SVG icon or URL
  projectsCount: number;
  contractValueFormatted: string;
  score: number;
  trend: "up" | "neutral" | "down";
}

export type VmsAgencyStatus = "aktif" | "non-aktif" | "blacklist";

export interface VmsAgencyListItem {
  id: string;
  code: string;
  name: string;
  logo: string;
  pic: {
    name: string;
    email: string;
    avatar?: string;
  };
  skills: string[];
  activeProjectsCount: number;
  completedProjectsThisMonth: number;
  totalContractValueFormatted: string;
  contractCount: number;
  performanceScore: number;
  status: VmsAgencyStatus;
  hasRunningProject: boolean;
}

