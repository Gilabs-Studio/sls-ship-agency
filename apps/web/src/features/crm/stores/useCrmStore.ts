import { create } from "zustand";

export type CrmTab = "leads" | "contacts" | "deals" | "activities";

interface CrmStoreState {
  activeTab: CrmTab;
  setActiveTab: (tab: CrmTab) => void;
  selectedLeadId: string | null;
  setSelectedLeadId: (id: string | null) => void;
  isAddLeadOpen: boolean;
  setIsAddLeadOpen: (open: boolean) => void;
  isAddContactOpen: boolean;
  setIsAddContactOpen: (open: boolean) => void;
  isAddDealOpen: boolean;
  setIsAddDealOpen: (open: boolean) => void;
}

export const useCrmStore = create<CrmStoreState>((set) => ({
  activeTab: "leads",
  setActiveTab: (tab) => set({ activeTab: tab }),
  selectedLeadId: null,
  setSelectedLeadId: (id) => set({ selectedLeadId: id }),
  isAddLeadOpen: false,
  setIsAddLeadOpen: (open) => set({ isAddLeadOpen: open }),
  isAddContactOpen: false,
  setIsAddContactOpen: (open) => set({ isAddContactOpen: open }),
  isAddDealOpen: false,
  setIsAddDealOpen: (open) => set({ isAddDealOpen: open }),
}));
