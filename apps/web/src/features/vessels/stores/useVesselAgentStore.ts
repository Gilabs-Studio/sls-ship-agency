import { create } from "zustand";
import type { AgentTabKey } from "../types/vessel-agent.types";

interface VesselAgentStoreState {
  activeTab: AgentTabKey;
  setActiveTab: (tab: AgentTabKey) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string; // "all", "Ready", "On Duty", "Cuti", "Blacklist"
  setStatusFilter: (filter: string) => void;
  rankFilter: string; // "all", "Master Captain", "Chief Engineer", etc.
  setRankFilter: (filter: string) => void;
  selectedAgentId: string | null;
  setSelectedAgentId: (id: string | null) => void;
  comparisonAgentIds: string[];
  toggleComparisonAgentId: (id: string) => void;
  clearComparison: () => void;
  isAddAgentOpen: boolean;
  setIsAddAgentOpen: (open: boolean) => void;
  isRenewCertOpen: boolean;
  setIsRenewCertOpen: (open: boolean) => void;
  selectedCertIdToRenew: string | null;
  setSelectedCertIdToRenew: (id: string | null) => void;
}

export const useVesselAgentStore = create<VesselAgentStoreState>((set) => ({
  activeTab: "overview",
  setActiveTab: (tab) => set({ activeTab: tab }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  statusFilter: "all",
  setStatusFilter: (filter) => set({ statusFilter: filter }),
  rankFilter: "all",
  setRankFilter: (filter) => set({ rankFilter: filter }),
  selectedAgentId: null,
  setSelectedAgentId: (id) => set({ selectedAgentId: id }),
  comparisonAgentIds: ["agent-1", "agent-3"], // Pre-selected for immediate demonstration
  toggleComparisonAgentId: (id) =>
    set((state) => {
      const exists = state.comparisonAgentIds.includes(id);
      if (exists) {
        return { comparisonAgentIds: state.comparisonAgentIds.filter((item) => item !== id) };
      }
      if (state.comparisonAgentIds.length >= 3) {
        return state; // Max 3 items
      }
      return { comparisonAgentIds: [...state.comparisonAgentIds, id] };
    }),
  clearComparison: () => set({ comparisonAgentIds: [] }),
  isAddAgentOpen: false,
  setIsAddAgentOpen: (open) => set({ isAddAgentOpen: open }),
  isRenewCertOpen: false,
  setIsRenewCertOpen: (open) => set({ isRenewCertOpen: open }),
  selectedCertIdToRenew: null,
  setSelectedCertIdToRenew: (id) => set({ selectedCertIdToRenew: id }),
}));
