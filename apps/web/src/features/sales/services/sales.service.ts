import type { LeadOpportunity, SalesKpiMetrics } from "../types/sales.types";

export function calculateSalesKpiMetrics(leads: LeadOpportunity[]): SalesKpiMetrics {
  const totalLeads = leads.length;
  const totalPipelineValue = leads.reduce((sum, l) => sum + l.potentialValueMonthly, 0);
  const qualifiedLeadsCount = leads.filter(
    (l) => l.stage === "Qualified" || l.stage === "Discovery" || l.qualification !== undefined
  ).length;
  const wonLeadsCount = leads.filter((l) => l.stage === "Won").length;
  const winRatePercentage = totalLeads > 0 ? Math.round((wonLeadsCount / totalLeads) * 100) : 0;

  return {
    totalLeads,
    totalPipelineValue,
    qualifiedLeadsCount,
    wonLeadsCount,
    winRatePercentage,
  };
}
