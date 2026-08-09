import { useState } from "react";
import type { UserAccount } from "../types/settings.types";
import type { UserAccountFormValues } from "../schemas/settings.schema";
import { initialUsers, initialAuditLogs } from "../services/settings.service";
import { useSettingsStore, type SettingsTab } from "../stores/useSettingsStore";

export function useSettings() {
  const [users, setUsers] = useState<UserAccount[]>(initialUsers);
  const [auditLogs] = useState(initialAuditLogs);

  const {
    activeTab,
    setActiveTab,
    isAddUserOpen,
    setIsAddUserOpen,
  } = useSettingsStore();

  const handleToggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  const handleAddUser = (data: UserAccountFormValues) => {
    const newUser: UserAccount = {
      ...data,
      id: `user-${Date.now()}`,
      isActive: true,
      lastLogin: "Belum Pernah Login",
    };
    setUsers((prev) => [newUser, ...prev]);
  };

  return {
    users,
    auditLogs,
    activeTab,
    setActiveTab,
    isAddUserOpen,
    setIsAddUserOpen,
    actions: {
      toggleUserStatus: handleToggleUserStatus,
      addUser: handleAddUser,
    },
  };
}
