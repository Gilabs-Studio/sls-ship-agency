"use client";

import React from "react";
import { toast } from "sonner";

import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { NotificationCenterList } from "@/features/notifications/components/notification-center-list";
import { ReminderRuleConfig } from "@/features/notifications/components/reminder-rule-config";

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    rules,
    activeFilter,
    setActiveFilter,
    actions,
  } = useNotifications();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight">Pusat Notifikasi & Mesin Reminder</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Pengingat otomatis jatuh tempo sertifikat kapal, aktivitas CRM, dan eskalasi penanganan ke Super Admin.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <NotificationCenterList
            notifications={notifications}
            unreadCount={unreadCount}
            activeFilter={activeFilter}
            onSelectFilter={(f) => setActiveFilter(f)}
            onMarkAsRead={(id) => {
              actions.markAsRead(id);
              toast.info("Notifikasi ditandai telah dibaca.");
            }}
            onMarkAllAsRead={() => {
              actions.markAllAsRead();
              toast.success("Semua notifikasi ditandai telah dibaca!");
            }}
          />
        </div>

        <div>
          <ReminderRuleConfig
            rules={rules}
            onToggleRule={(ruleId, key) => {
              actions.toggleRule(ruleId, key);
              toast.success("Aturan ambang reminder berhasil diperbarui!");
            }}
          />
        </div>
      </div>
    </div>
  );
}
