import React from "react";
import { Shield, Clock, Monitor } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { SystemAuditLog } from "../types/settings.types";

interface AuditLogTableProps {
  logs: SystemAuditLog[];
}

export function AuditLogTable({ logs }: AuditLogTableProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span>Jejak Audit Keamanan & Perubahan Sistem</span>
        </h3>
        <p className="text-xs text-muted-foreground">
          Log lengkap aktivitas pengguna untuk keperluan compliance dan audit internal
        </p>
      </div>

      <div className="border border-border rounded-lg bg-card overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
            <tr>
              <th className="p-3">Aksi System Audit</th>
              <th className="p-3">Petugas (Actor)</th>
              <th className="p-3">Target Entitas</th>
              <th className="p-3">Waktu & IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-accent/40 transition-colors">
                <td className="p-3 font-bold text-foreground">{log.action}</td>
                <td className="p-3">{log.actor}</td>
                <td className="p-3 font-semibold text-foreground">{log.target}</td>
                <td className="p-3 text-muted-foreground">
                  <div className="flex flex-col space-y-0.5 text-[11px]">
                    <span>{log.timestamp}</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Monitor className="h-3 w-3" /> IP: {log.ipAddress}
                    </span>
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
