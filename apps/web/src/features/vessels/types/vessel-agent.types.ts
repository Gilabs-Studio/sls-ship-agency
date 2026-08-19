export type AgentStatus = "Ready" | "On Duty" | "Cuti" | "Blacklist";

export type AgentRank =
  | "Master Captain"
  | "Chief Engineer"
  | "Deck Officer"
  | "AB Seaman"
  | "2nd Engineer"
  | "Cook"
  | "Electrical Officer"
  | "Bosun";

export type CertificateDocStatus = "valid" | "near-expiry" | "expired";

export interface AgentCertificate {
  id: string;
  name: string; // e.g. BST (Basic Safety Training), ANT-I, ATT-I, MCU (Medical Checkup), Seaman Passport
  certNumber: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  daysRemaining: number;
  status: CertificateDocStatus;
}

export interface PlacementHistoryItem {
  id: string;
  vesselName: string;
  imoNumber: string;
  vesselType: string;
  signOnDate: string;
  signOffDate: string;
  durationMonths: number;
  rank: AgentRank;
  captainFeedback: string;
  rating: number; // 1-5
}

export interface PerformanceReviewItem {
  id: string;
  reviewerName: string;
  reviewerTitle: string; // e.g. Capt. Herman, Port Engineer
  vesselName: string;
  reviewDate: string;
  rating: number; // 1.0 to 5.0
  comment: string;
  recommended: boolean;
}

export interface Agent {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  phone: string;
  mainRank: AgentRank;
  status: AgentStatus;
  currentVessel?: string; // empty string or undefined if Ready/Standby
  currentVesselImo?: string;
  seaTimeMonths: number; // Cumulative sea service in months
  overallRating: number; // 1.0 to 5.0
  certificates: AgentCertificate[];
  placementHistory: PlacementHistoryItem[];
  reviews: PerformanceReviewItem[];
  flags: string[]; // e.g. ["Re-recommended", "Bilingual", "High Discipline"]
  notes?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  passportNumber: string;
  seamanBookNumber: string;
}

export interface VesselFleetItem {
  id: string;
  name: string;
  imoNumber: string;
  vesselType: string;
  companyName: string;
  currentPort: string;
  lat: number;
  lng: number;
  seaworthinessStatus: "Layak Operasi" | "Tidak Layak Operasi";
  deployedCrewCount: number;
}

export interface VesselAgentKpiMetrics {
  totalAgents: number;
  readyCount: number;
  onDutyCount: number;
  expiringCertsCount: number;
  avgRating: number;
  activeComplaintsCount: number;
}

export interface RotationScheduleItem {
  id: string;
  agentId: string;
  agentName: string;
  rank: AgentRank;
  vesselName: string;
  signOnDate: string;
  signOffDate: string;
  status: "Active" | "Upcoming" | "Completed";
  progressPercentage: number;
}

export type AgentTabKey =
  | "overview"
  | "directory"
  | "rotation"
  | "compliance"
  | "comparison"
  | "fleet";
