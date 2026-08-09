export interface ClientComplianceReportItem {
  clientId: string;
  clientCompany: string;
  vesselCount: number;
  totalCertificates: number;
  activeCount: number;
  expiringCount: number;
  expiredCount: number;
  complianceRate: number;
}

export interface CrmConversionMetric {
  period: string;
  totalLeads: number;
  contactedCount: number;
  wonCount: number;
  conversionRate: number; // wonCount / totalLeads * 100
  totalContractValue: number;
}

export interface ReportFilterParams {
  startDate: string;
  endDate: string;
  clientCompany: string;
  vesselType: string;
}
