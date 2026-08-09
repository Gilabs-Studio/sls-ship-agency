"use client";

import React from "react";
import { toast } from "sonner";
import { Users, Shield } from "lucide-react";

import { useSettings } from "@/features/settings/hooks/useSettings";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserManagementTable } from "@/features/settings/components/user-management-table";
import { UserFormModal } from "@/features/settings/components/user-form-modal";
import { AuditLogTable } from "@/features/settings/components/audit-log-table";
import type { SettingsTab } from "@/features/settings/stores/useSettingsStore";

export default function SettingsPage() {
  const {
    users,
    auditLogs,
    activeTab,
    setActiveTab,
    isAddUserOpen,
    setIsAddUserOpen,
    actions,
  } = useSettings();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight">Pengaturan Sistem & Manajemen Pengguna</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Kelola pengguna, peran akses RBAC (Super Admin, Staff, Sales, Klien), dan pantau log audit keamanan.
        </p>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as SettingsTab)}>
        <TabsList className="bg-card border border-border h-10 p-1">
          <TabsTrigger value="users" className="text-xs gap-1.5 cursor-pointer">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span>Manajemen User ({users.length})</span>
          </TabsTrigger>
          <TabsTrigger value="audit-logs" className="text-xs gap-1.5 cursor-pointer">
            <Shield className="h-3.5 w-3.5 text-purple" />
            <span>Log Audit Keamanan</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="pt-4">
          <UserManagementTable
            users={users}
            onToggleStatus={(id) => {
              actions.toggleUserStatus(id);
              toast.info("Status akun pengguna berhasil diperbarui.");
            }}
            onOpenAddUser={() => setIsAddUserOpen(true)}
          />
        </TabsContent>

        <TabsContent value="audit-logs" className="pt-4">
          <AuditLogTable logs={auditLogs} />
        </TabsContent>
      </Tabs>

      {/* User Creation Modal */}
      <UserFormModal
        isOpen={isAddUserOpen}
        onOpenChange={setIsAddUserOpen}
        onSubmitUser={(data) => {
          actions.addUser(data);
          toast.success(`Akun user ${data.name} (${data.role}) berhasil ditambahkan!`);
        }}
      />
    </div>
  );
}
