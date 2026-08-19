import { create } from "zustand";
import type { SalesViewMode, SalesStage } from "../types/sales.types";

interface SalesUIState {
  viewMode: SalesViewMode;
  searchQuery: string;
  stageFilter: SalesStage | "all";
  selectedLeadId: string | null;
  isAddLeadOpen: boolean;
  isDiscoveryFormOpen: boolean;
  isLeadDetailOpen: boolean;

  // Actions
  setViewMode: (mode: SalesViewMode) => void;
  setSearchQuery: (query: string) => void;
  setStageFilter: (stage: SalesStage | "all") => void;
  setSelectedLeadId: (id: string | null) => void;
  setIsAddLeadOpen: (open: boolean) => void;
  setIsDiscoveryFormOpen: (open: boolean) => void;
  setIsLeadDetailOpen: (open: boolean) => void;
}

export const useSalesStore = create<SalesUIState>((set) => ({
  viewMode: "kanban",
  searchQuery: "",
  stageFilter: "all",
  selectedLeadId: null,
  isAddLeadOpen: false,
  isDiscoveryFormOpen: false,
  isLeadDetailOpen: false,

  setViewMode: (viewMode) => set({ viewMode }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStageFilter: (stageFilter) => set({ stageFilter }),
  setSelectedLeadId: (selectedLeadId) => set({ selectedLeadId }),
  setIsAddLeadOpen: (isAddLeadOpen) => set({ isAddLeadOpen }),
  setIsDiscoveryFormOpen: (isDiscoveryFormOpen) => set({ isDiscoveryFormOpen }),
  setIsLeadDetailOpen: (isLeadDetailOpen) => set({ isLeadDetailOpen }),
}));
