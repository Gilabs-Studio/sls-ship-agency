export interface NavItem {
  id?: string;
  name: string;
  i18nKey?: string;
  icon: string;
  url: string;
  permission?: string;
  badge?: string;
  children?: NavItem[];
}

export const navigationConfig: NavItem[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    i18nKey: "dashboard",
    icon: "dashboard",
    url: "/dashboard",
  },
  {
    id: "crm",
    name: "CRM & Pipeline",
    i18nKey: "crm",
    icon: "handshake",
    url: "/crm",
  },
  {
    id: "vessels",
    name: "Kapal & Sertifikat",
    i18nKey: "vessels",
    icon: "truck",
    url: "/vessels",
  },
  {
    id: "documents",
    name: "Manajemen Dokumen",
    i18nKey: "documents",
    icon: "file-text",
    url: "/documents",
  },
  {
    id: "notifications",
    name: "Notifikasi & Alert",
    i18nKey: "notifications",
    icon: "clock",
    url: "/notifications",
  },
  {
    id: "reports",
    name: "Laporan & Analitik",
    i18nKey: "reports",
    icon: "bar-chart-3",
    url: "/reports",
  },
  {
    id: "settings",
    name: "Pengaturan & User",
    i18nKey: "settings",
    icon: "settings",
    url: "/settings",
  },
];
