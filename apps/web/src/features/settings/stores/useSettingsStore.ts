import { create } from "zustand";

export type SettingsTab = "users" | "thresholds" | "audit-logs";

interface SettingsStoreState {
  activeTab: SettingsTab;
  setActiveTab: (tab: SettingsTab) => void;
  isAddUserOpen: boolean;
  setIsAddUserOpen: (open: boolean) => void;
}

export const useSettingsStore = create<SettingsStoreState>((set) => ({
  activeTab: "users",
  setActiveTab: (tab) => set({ activeTab: tab }),
  isAddUserOpen: false,
  setIsAddUserOpen: (open) => set({ isAddUserOpen: open }),
}));
