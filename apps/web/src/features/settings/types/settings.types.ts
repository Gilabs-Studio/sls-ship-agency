export type UserRole = "Super Admin" | "Staff Operasional" | "Sales / Business Dev" | "Klien";

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  companyName?: string;
  isActive: boolean;
  lastLogin: string;
}

export interface SystemAuditLog {
  id: string;
  action: string;
  actor: string;
  target: string;
  timestamp: string;
  ipAddress: string;
}
