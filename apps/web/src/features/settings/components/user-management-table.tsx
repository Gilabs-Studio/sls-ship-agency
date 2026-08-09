import React from "react";
import { User, Shield, CheckCircle2, XCircle, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { UserAccount } from "../types/settings.types";

interface UserManagementTableProps {
  users: UserAccount[];
  onToggleStatus: (id: string) => void;
  onOpenAddUser: () => void;
}

export function UserManagementTable({ users, onToggleStatus, onOpenAddUser }: UserManagementTableProps) {
  const getRoleBadge = (role: UserAccount["role"]) => {
    switch (role) {
      case "Super Admin":
        return <Badge variant="outline" className="text-purple border-purple/30 bg-purple/10 font-bold">Super Admin</Badge>;
      case "Staff Operasional":
        return <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10">Staff Operasional</Badge>;
      case "Sales / Business Dev":
        return <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10">Sales / BD</Badge>;
      case "Klien":
        return <Badge variant="outline" className="text-muted-foreground border-border bg-muted/40">Klien Portal</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold">Pengelolaan Akun Pengguna & Hak Akses (RBAC)</h3>
          <p className="text-xs text-muted-foreground">
            Kelola hak akses modul berdasarkan peran Super Admin, Staff, Sales, atau Klien
          </p>
        </div>
        <Button size="sm" onClick={onOpenAddUser} className="h-8 text-xs gap-1.5 cursor-pointer">
          <Plus className="h-3.5 w-3.5" />
          <span>Tambah Akun User</span>
        </Button>
      </div>

      <div className="border border-border rounded-lg bg-card overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
            <tr>
              <th className="p-3">Nama Pengguna & Email</th>
              <th className="p-3">Peran (Role RBAC)</th>
              <th className="p-3">Departemen / Perusahaan</th>
              <th className="p-3">Login Terakhir</th>
              <th className="p-3 text-right">Status Akun</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-accent/40 transition-colors">
                <td className="p-3">
                  <div className="flex flex-col space-y-0.5">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-primary" /> {user.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{user.email}</span>
                  </div>
                </td>
                <td className="p-3">{getRoleBadge(user.role)}</td>
                <td className="p-3">
                  <span className="font-semibold text-foreground">
                    {user.companyName ? `${user.companyName} (${user.department})` : user.department}
                  </span>
                </td>
                <td className="p-3 text-muted-foreground">{user.lastLogin}</td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className={`text-[11px] font-semibold ${user.isActive ? "text-success" : "text-muted-foreground"}`}>
                      {user.isActive ? "Aktif" : "Non-aktif"}
                    </span>
                    <Switch
                      checked={user.isActive}
                      onCheckedChange={() => onToggleStatus(user.id)}
                      className="cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
