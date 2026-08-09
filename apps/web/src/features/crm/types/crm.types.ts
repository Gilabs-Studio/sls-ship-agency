export type LeadStage = "Baru" | "Dihubungi" | "Presentasi" | "Negosiasi" | "Menang" | "Kalah";

export interface LeadItem {
  id: string;
  companyName: string;
  picName: string;
  picPhone: string;
  picEmail: string;
  source: string;
  vesselCount: number;
  vesselTypes: string[];
  potentialValue: number;
  priorityScore: number; // calculated: vesselCount * potentialValue / 10M
  stage: LeadStage;
  isStagnant: boolean; // >14 days without activity
  lastActivityDate: string;
  createdAt: string;
  notes?: string;
}

export interface ContactItem {
  id: string;
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  isClientActive: boolean;
  interactionCount: number;
  lastContacted: string;
}

export interface InteractionLog {
  id: string;
  contactId: string;
  type: "Call" | "Email" | "Meeting" | "Proposal";
  summary: string;
  actor: string;
  timestamp: string;
}

export interface DealItem {
  id: string;
  leadId: string;
  title: string;
  companyName: string;
  vesselCount: number;
  proposalValue: number;
  status: "Terkirim" | "Direview" | "Disetujui" | "Ditolak";
  sentDate: string;
  validUntil: string;
}
