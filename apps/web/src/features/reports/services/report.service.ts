import type { ClientComplianceReportItem, CrmConversionMetric } from "../types/report.types";

export const initialComplianceReports: ClientComplianceReportItem[] = [
  {
    clientId: "c-1",
    clientCompany: "PT. Nautiva Ocean Agency",
    vesselCount: 12,
    totalCertificates: 48,
    activeCount: 45,
    expiringCount: 3,
    expiredCount: 0,
    complianceRate: 100,
  },
  {
    clientId: "c-2",
    clientCompany: "PT. Nautiva Ocean Agency",
    vesselCount: 6,
    totalCertificates: 24,
    activeCount: 20,
    expiringCount: 3,
    expiredCount: 1,
    complianceRate: 95.8,
  },
  {
    clientId: "c-3",
    clientCompany: "CV Lautan Makmur Transport",
    vesselCount: 3,
    totalCertificates: 12,
    activeCount: 11,
    expiringCount: 1,
    expiredCount: 0,
    complianceRate: 100,
  },
];

export const initialConversionMetrics: CrmConversionMetric[] = [
  {
    period: "Mei 2026",
    totalLeads: 8,
    contactedCount: 6,
    wonCount: 2,
    conversionRate: 25.0,
    totalContractValue: 650000000,
  },
  {
    period: "Juni 2026",
    totalLeads: 10,
    contactedCount: 8,
    wonCount: 3,
    conversionRate: 30.0,
    totalContractValue: 980000000,
  },
  {
    period: "Juli 2026",
    totalLeads: 12,
    contactedCount: 10,
    wonCount: 4,
    conversionRate: 33.3,
    totalContractValue: 1450000000,
  },
  {
    period: "Agustus 2026",
    totalLeads: 14,
    contactedCount: 11,
    wonCount: 3,
    conversionRate: 27.2,
    totalContractValue: 1200000000,
  },
];
