import { create } from "zustand";

interface VesselStoreState {
  selectedVesselId: string | null;
  setSelectedVesselId: (id: string | null) => void;
  isAddVesselOpen: boolean;
  setIsAddVesselOpen: (open: boolean) => void;
  isRenewCertOpen: boolean;
  setIsRenewCertOpen: (open: boolean) => void;
  selectedCertificateId: string | null;
  setSelectedCertificateId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useVesselStore = create<VesselStoreState>((set) => ({
  selectedVesselId: "vessel-1",
  setSelectedVesselId: (id) => set({ selectedVesselId: id }),
  isAddVesselOpen: false,
  setIsAddVesselOpen: (open) => set({ isAddVesselOpen: open }),
  isRenewCertOpen: false,
  setIsRenewCertOpen: (open) => set({ isRenewCertOpen: open }),
  selectedCertificateId: null,
  setSelectedCertificateId: (id) => set({ selectedCertificateId: id }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
