import { create } from "zustand";

export type NotificationFilter = "ALL" | "UNREAD" | "HIGH_PRIORITY" | "ESCALATED";

interface NotificationStoreState {
  activeFilter: NotificationFilter;
  setActiveFilter: (filter: NotificationFilter) => void;
}

export const useNotificationStore = create<NotificationStoreState>((set) => ({
  activeFilter: "ALL",
  setActiveFilter: (filter) => set({ activeFilter: filter }),
}));
