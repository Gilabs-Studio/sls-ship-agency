import { create } from "zustand";

interface DashboardStoreState {
  isAddVesselOpen: boolean;
  isUploadDocOpen: boolean;
  isAddLeadOpen: boolean;
  setAddVesselOpen: (open: boolean) => void;
  setUploadDocOpen: (open: boolean) => void;
  setAddLeadOpen: (open: boolean) => void;
}

export const useDashboardStore = create<DashboardStoreState>((set) => ({
  isAddVesselOpen: false,
  isUploadDocOpen: false,
  isAddLeadOpen: false,
  setAddVesselOpen: (open) => set({ isAddVesselOpen: open }),
  setUploadDocOpen: (open) => set({ isUploadDocOpen: open }),
  setAddLeadOpen: (open) => set({ isAddLeadOpen: open }),
}));
