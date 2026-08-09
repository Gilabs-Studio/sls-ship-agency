import { create } from "zustand";

export type DocCategoryFilter = "ALL" | "Sertifikat Kapal" | "Dokumen Klien" | "Dokumen Internal";

interface DocumentStoreState {
  activeCategory: DocCategoryFilter;
  setActiveCategory: (category: DocCategoryFilter) => void;
  selectedDocId: string | null;
  setSelectedDocId: (id: string | null) => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  isApprovalModalOpen: boolean;
  setIsApprovalModalOpen: (open: boolean) => void;
  isClientViewOnly: boolean;
  setIsClientViewOnly: (clientView: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useDocumentStore = create<DocumentStoreState>((set) => ({
  activeCategory: "ALL",
  setActiveCategory: (category) => set({ activeCategory: category }),
  selectedDocId: null,
  setSelectedDocId: (id) => set({ selectedDocId: id }),
  isUploadModalOpen: false,
  setIsUploadModalOpen: (open) => set({ isUploadModalOpen: open }),
  isApprovalModalOpen: false,
  setIsApprovalModalOpen: (open) => set({ isApprovalModalOpen: open }),
  isClientViewOnly: false,
  setIsClientViewOnly: (clientView) => set({ isClientViewOnly: clientView }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
