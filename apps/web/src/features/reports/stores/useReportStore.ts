import { create } from "zustand";

export type ReportTab = "compliance" | "crm-conversion";

interface ReportStoreState {
  activeTab: ReportTab;
  setActiveTab: (tab: ReportTab) => void;
  selectedClientFilter: string;
  setSelectedClientFilter: (client: string) => void;
}

export const useReportStore = create<ReportStoreState>((set) => ({
  activeTab: "compliance",
  setActiveTab: (tab) => set({ activeTab: tab }),
  selectedClientFilter: "ALL",
  setSelectedClientFilter: (client) => set({ selectedClientFilter: client }),
}));
