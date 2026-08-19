export interface ClientKpiMetrics {
  totalClients: number;
  totalClientsDelta: number;
  activeContracts: number;
  activeContractsDelta: number;
  activePlacements: number;
  activePlacementsDelta: number;
  contractValueUsd: number; // in USD e.g. 2450000 -> $2.45M
  contractValueDeltaPercent: number; // e.g. 18.6
  clientHealthScoreAvg: number; // e.g. 78
  clientHealthStatus: "Good" | "Needs Attention";
}

export interface FunnelStage {
  id: string;
  key: string;
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ContractStatusSegment {
  id: string;
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface UpcomingRenewal {
  id: string;
  clientName: string;
  vesselName: string;
  dueDate: string; // e.g. "Jun 20, 2026"
  daysLeft: number; // e.g. 9
}

export type HealthTrend = "up" | "flat" | "down";

export interface ClientHealthOverviewItem {
  id: string;
  clientName: string;
  healthScore: number;
  trend: HealthTrend;
  lastInteraction: string; // e.g. "2 days ago"
}

export type ActivityType =
  | "contract_renewed"
  | "proposal_sent"
  | "placement_completed"
  | "meeting";

export interface RecentActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  targetInfo: string;
  timeAgo: string;
  userAvatar?: string;
}

export interface TopClientItem {
  id: string;
  clientName: string;
  contractValueUsd: number;
  relativePercentage: number; // 0 - 100 for progress bar
}

export interface ClientLifecycleData {
  metrics: ClientKpiMetrics;
  funnelStages: FunnelStage[];
  contractsByStatus: ContractStatusSegment[];
  upcomingRenewals: UpcomingRenewal[];
  clientHealthOverview: ClientHealthOverviewItem[];
  recentActivities: RecentActivityItem[];
  topClients: TopClientItem[];
}
