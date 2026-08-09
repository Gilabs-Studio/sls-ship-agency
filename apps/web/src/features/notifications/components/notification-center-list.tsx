import React from "react";
import { Link } from "@/i18n/routing";
import { Bell, AlertTriangle, CheckCircle2, ArrowUpRight, Mail, MessageSquare, ShieldAlert, Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { NotificationItem } from "../types/notification.types";

interface NotificationCenterListProps {
  notifications: NotificationItem[];
  unreadCount: number;
  activeFilter: string;
  onSelectFilter: (filter: any) => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationCenterList({
  notifications,
  unreadCount,
  activeFilter,
  onSelectFilter,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationCenterListProps) {
  const filters = [
    { key: "ALL", label: "Semua Alert" },
    { key: "UNREAD", label: `Belum Dibaca (${unreadCount})` },
    { key: "HIGH_PRIORITY", label: "Prioritas Tinggi" },
    { key: "ESCALATED", label: "Eskalasi Admin" },
  ];

  const getCategoryIcon = (category: NotificationItem["category"]) => {
    switch (category) {
      case "Certificate Expiry":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "Approval Request":
        return <CheckCircle2 className="h-4 w-4 text-primary" />;
      case "CRM Follow-up":
        return <Bell className="h-4 w-4 text-emerald-500" />;
      case "System Escalation":
        return <ShieldAlert className="h-4 w-4 text-destructive" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Filter and Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-card border border-border p-4 rounded-lg shadow-xs">
        <div className="flex items-center gap-2">
          {filters.map((f) => (
            <Button
              key={f.key}
              variant={activeFilter === f.key ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectFilter(f.key)}
              className="h-8 text-xs cursor-pointer"
            >
              {f.label}
            </Button>
          ))}
        </div>

        {unreadCount > 0 && (
          <Button size="sm" variant="ghost" onClick={onMarkAllAsRead} className="h-8 text-xs gap-1.5 cursor-pointer">
            <Check className="h-3.5 w-3.5 text-success" />
            <span>Tandai Semua Dibaca</span>
          </Button>
        )}
      </div>

      {/* Notifications List Feed */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <Card className="border border-border p-8 text-center text-xs text-muted-foreground">
            Tidak ada notifikasi pada kategori filter ini.
          </Card>
        ) : (
          notifications.map((n) => (
            <Card
              key={n.id}
              className={`border transition-all duration-300 ${
                n.isRead ? "border-border bg-card/60" : "border-primary/40 bg-primary/5 shadow-xs"
              }`}
            >
              <CardContent className="p-4 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-background border border-border flex items-center justify-center shrink-0 mt-0.5">
                    {getCategoryIcon(n.category)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-foreground leading-none">{n.title}</h4>
                      {n.isEscalated && (
                        <Badge variant="outline" className="text-[10px] text-destructive border-destructive/30 bg-destructive/10 font-bold">
                          Eskalasi Super Admin
                        </Badge>
                      )}
                      {!n.isRead && (
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{n.message}</p>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] text-muted-foreground">{n.timestamp}</span>
                      <span className="text-muted-foreground text-[10px]">• Saluran:</span>
                      {n.channels.map((ch) => (
                        <Badge key={ch} variant="secondary" className="text-[9px] px-1 py-0">
                          {ch === "Email" ? "📧 Email" : ch === "WhatsApp" ? "💬 WA" : "🔔 In-App"}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!n.isRead && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMarkAsRead(n.id)}
                      className="h-7 text-[11px] cursor-pointer"
                    >
                      Dibaca
                    </Button>
                  )}
                  {/* Quick Jump Navigation */}
                  <Link href={n.targetUrl}>
                    <Button size="sm" variant="outline" className="h-7 text-[11px] gap-1 cursor-pointer border-border">
                      Buka Sumber <ArrowUpRight className="h-3 w-3 text-primary" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
