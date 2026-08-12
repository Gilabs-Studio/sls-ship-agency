import type {
  LeadOpportunity,
  SalesStage,
  QualificationDiscoveryForm,
  ShippingBusinessType,
} from "@/types/maritime.types";

export type {
  LeadOpportunity,
  SalesStage,
  QualificationDiscoveryForm,
  ShippingBusinessType,
};

export type SalesViewMode = "kanban" | "table";

export interface SalesKpiMetrics {
  totalLeads: number;
  totalPipelineValue: number;
  qualifiedLeadsCount: number;
  wonLeadsCount: number;
  winRatePercentage: number;
}

export interface SalesFilterState {
  searchQuery: string;
  stageFilter: SalesStage | "all";
}
