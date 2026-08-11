export type ShippingBusinessType =
  | "Container Carrier"
  | "Oil & Chemical Tanker"
  | "Tug & Barge (Coal & Minerals)"
  | "General Cargo & Breakbulk"
  | "Offshore Support & Supply";

export type OperatingArea =
  | "Nasional & Domestik"
  | "Inter-Island / Antar-Pulau"
  | "Internasional / Regional SEA"
  | "Global Maritime Route";

export type CompanyLifecycleStage =
  | "New Client"
  | "Onboarding"
  | "Active"
  | "Renewal Risk"
  | "Renewed"
  | "Dormant"
  | "Churned";

export interface Company {
  id: string;
  name: string;
  code: string;
  businessType: ShippingBusinessType;
  operatingArea: OperatingArea;
  fleetCount: number;
  activeContractsCount: number;
  lifecycleStage: CompanyLifecycleStage;
  onboardingDate: string;
  mrrValue: number; // In IDR
  primaryPicName: string;
  primaryPicEmail: string;
  primaryPicPhone: string;
  address: string;
  city: string;
  activeCertificatesCount: number;
  nearExpiryCertificatesCount: number;
  expiredCertificatesCount: number;
  notes?: string;
}

export interface Contact {
  id: string;
  name: string;
  companyId: string;
  companyName: string;
  position: string;
  email: string;
  phone: string;
  isPrimary: boolean;
  status: "Aktif" | "Non-Aktif";
  lastContacted: string;
}

export type VesselType =
  | "Container Ship"
  | "Oil Tanker"
  | "Chemical Tanker"
  | "Tugboat & Barge"
  | "Bulk Carrier"
  | "Offshore Supply Vessel (OSV)";

export type SeaworthinessStatus = "Layak Operasi" | "Tidak Layak Operasi" | "Dalam Perbaikan";

export type CertificateCategory =
  | "Statutory (SOLAS/MARPOL)"
  | "Class & Seaworthiness"
  | "Legal & SIUPAL"
  | "Crewing & Safe Manning"
  | "Safety & Security (ISM/ISPS)";

export type CertificateStatus = "valid" | "near-expiry" | "expired";

export interface Certificate {
  id: string;
  certificateName: string;
  certificateNumber: string;
  category: CertificateCategory;
  vesselId: string;
  vesselName: string;
  companyId: string;
  companyName: string;
  issuingAuthority: string; // e.g. Syahbandar, BKI, DNV, ABS
  issueDate: string;
  expiryDate: string;
  daysRemaining: number;
  status: CertificateStatus;
  lastRenewedBy?: string;
  documentFileUrl?: string;
}

export interface Vessel {
  id: string;
  name: string;
  imoNumber: string;
  flag: string;
  vesselType: VesselType;
  companyId: string;
  companyName: string;
  builtYear: number;
  grossTonnage: number;
  lengthOverallMeters: number;
  seaworthinessStatus: SeaworthinessStatus;
  currentPortLocation: string;
  certificates: Certificate[];
}

export type VendorExpertise =
  | "Marine Survey & Technical Inspection"
  | "Underwater Hull & Tank Cleaning"
  | "Docking, Maintenance & Repair"
  | "Radio Communication & GMDSS Inspection"
  | "Crew Medical Check & Certification"
  | "Port Clearance & Formalities Agency";

export interface Vendor {
  id: string;
  name: string;
  expertise: VendorExpertise;
  operatingPorts: string[];
  rateCardSummary: string;
  slaHours: number; // SLA response/fulfillment in hours e.g. 24, 48
  performanceRating: number; // 1.0 to 5.0
  completedTasksCount: number;
  activeTasksCount: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  status: "Mitra Aktif" | "Dalam Review" | "Suspended";
}

export type SalesStage =
  | "Lead"
  | "Qualified"
  | "Discovery"
  | "Proposal Sent"
  | "Negotiation"
  | "Won"
  | "Lost";

export interface QualificationDiscoveryForm {
  vesselCountNeeded: number;
  frequentlyExpiringCerts: string[];
  outsourcingNeeds: string[];
  currentAgencyPainPoints: string;
  expectedStartDate: string;
  budgetRangeMonthly: string;
  decisionMakerName: string;
}

export interface LeadOpportunity {
  id: string;
  leadSource: "Inbound Website" | "Referral Partner" | "Port Exhibition" | "Outbound Sales" | "Tender Portal";
  companyName: string;
  businessType: ShippingBusinessType;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  stage: SalesStage;
  potentialValueMonthly: number; // IDR
  priorityScore: number; // 1-100
  qualification?: QualificationDiscoveryForm;
  assignedSales: string;
  notes?: string;
  lastActivityDate: string;
  createdAt: string;
}

export interface Proposal {
  id: string;
  leadId: string;
  companyName: string;
  version: string; // e.g. v1.0, v1.2
  sentDate: string;
  recipientPic: string;
  status: "Sent" | "Reviewed" | "Accepted" | "Rejected";
  proposalValueMonthly: number;
  pdfUrl?: string;
  validUntil: string;
  scopeSummary: string;
}

export type ServiceRequestType =
  | "Port Clearance & Formalities"
  | "Certificate Renewal & Survey"
  | "Outsource Technical Inspection"
  | "Bunkering & Fresh Water Supply"
  | "Emergency Repair & Spares";

export type ServiceRequestStage =
  | "Request Created"
  | "Verified"
  | "Assigned"
  | "In Progress"
  | "Waiting Approval"
  | "Completed"
  | "Closed";

export interface ServiceRequest {
  id: string;
  requestNo: string;
  title: string;
  companyId: string;
  companyName: string;
  vesselId: string;
  vesselName: string;
  serviceType: ServiceRequestType;
  stage: ServiceRequestStage;
  assigneeType: "internal" | "outsource";
  assigneeId?: string;
  assigneeName: string; // Internal staff name or vendor name
  deadline: string;
  priority: "Urgent" | "High" | "Normal";
  progressPercentage: number;
  description: string;
  portLocation: string;
  createdAt: string;
}

export type OutsourceTaskStage =
  | "Task Required"
  | "Vendor Selected"
  | "Sent to Vendor"
  | "Accepted"
  | "In Progress"
  | "Submitted"
  | "Reviewed"
  | "Approved/Rejected";

export interface OutsourceTask {
  id: string;
  serviceRequestId: string;
  serviceRequestNo: string;
  title: string;
  vendorId: string;
  vendorName: string;
  expertise: VendorExpertise;
  stage: OutsourceTaskStage;
  deadline: string;
  submittedAt?: string;
  deliverablesSummary?: string;
  costActual: number; // IDR
  notes?: string;
}

export interface RenewalReminder {
  id: string;
  certificateId: string;
  certificateName: string;
  vesselId: string;
  vesselName: string;
  companyId: string;
  companyName: string;
  expiryDate: string;
  daysRemaining: number;
  urgency: "Expired" | "30-days" | "60-days" | "90-days";
  reminderStatus: "Belum Dilihat" | "Dalam Diproses" | "Disetujui Syahbandar";
  assignedPic: string;
}
