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
