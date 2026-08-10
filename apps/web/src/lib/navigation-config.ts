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
    name: "Dashboard KPI",
    i18nKey: "dashboard",
    icon: "dashboard",
    url: "/dashboard",
  },
  {
    id: "sales",
    name: "Sales Pipeline",
    i18nKey: "sales",
    icon: "trending-up",
    url: "/sales",
    badge: "5 Lead",
  },
  {
    id: "clients",
    name: "Klien & Lifecycle",
    i18nKey: "clients",
    icon: "building-2",
    url: "/clients",
  },
  {
    id: "vessels",
    name: "Kapal & Armada",
    i18nKey: "vessels",
    icon: "truck",
    url: "/vessels",
  },
  {
    id: "service-requests",
    name: "Service Requests",
    i18nKey: "service-requests",
    icon: "clipboard-list",
    url: "/service-requests",
    badge: "3 Aktif",
  },
  {
    id: "outsourcing",
    name: "Outsourcing & Vendor",
    i18nKey: "outsourcing",
    icon: "handshake",
    url: "/outsourcing",
  },
  {
    id: "compliance",
    name: "Compliance & Renewal",
    i18nKey: "compliance",
    icon: "shield-check",
    url: "/compliance",
    badge: "Alert Expiry",
  },
  {
    id: "documents",
    name: "Manajemen Dokumen",
    i18nKey: "documents",
    icon: "file-text",
    url: "/documents",
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
    name: "Pengaturan & Role",
    i18nKey: "settings",
    icon: "settings",
    url: "/settings",
  },
];
