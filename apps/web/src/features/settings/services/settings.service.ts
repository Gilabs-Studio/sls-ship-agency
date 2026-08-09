import type { UserAccount, SystemAuditLog } from "../types/settings.types";

export const initialUsers: UserAccount[] = [
  {
    id: "user-1",
    name: "Arafat Nayeem",
    email: "arafat@solidmaritime.com",
    role: "Super Admin",
    department: "Executive & System Management",
    isActive: true,
    lastLogin: "2026-08-09 12:45",
  },
  {
    id: "user-2",
    name: "Budi Santoso",
    email: "budi@solidmaritime.com",
    role: "Staff Operasional",
    department: "Divisi Operasional & Sertifikasi",
    isActive: true,
    lastLogin: "2026-08-09 11:30",
  },
  {
    id: "user-3",
    name: "Siti Rahma",
    email: "siti@solidmaritime.com",
    role: "Sales / Business Dev",
    department: "Business Development",
    isActive: true,
    lastLogin: "2026-08-09 10:00",
  },
  {
    id: "user-4",
    name: "Bambang Soetrisno",
    email: "bambang@samarindaenergy.com",
    role: "Klien",
    department: "Pelayaran Mitra",
    companyName: "PT Samarinda Trans Energi",
    isActive: true,
    lastLogin: "2026-08-08 16:20",
  },
];

export const initialAuditLogs: SystemAuditLog[] = [
  {
    id: "log-1",
    action: "User Account Created",
    actor: "Arafat Nayeem (Super Admin)",
    target: "bambang@samarindaenergy.com (Klien)",
    timestamp: "2026-08-08 16:00",
    ipAddress: "182.253.110.12",
  },
  {
    id: "log-2",
    action: "Reminder Threshold Updated",
    actor: "Arafat Nayeem (Super Admin)",
    target: "Sertifikat SOLAS (H-30 -> H-45)",
    timestamp: "2026-08-07 14:15",
    ipAddress: "182.253.110.12",
  },
  {
    id: "log-3",
    action: "Document Approved",
    actor: "Hendra Wijaya (Supervisor)",
    target: "IOPP Certificate - KM Samarinda Titan",
    timestamp: "2026-08-05 16:30",
    ipAddress: "36.72.198.45",
  },
];
