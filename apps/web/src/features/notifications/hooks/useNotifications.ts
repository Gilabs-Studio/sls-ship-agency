import { useState } from "react";
import type { NotificationItem, ReminderThresholdRule } from "../types/notification.types";
import { initialNotifications, initialRules } from "../services/notification.service";
import { useNotificationStore, type NotificationFilter } from "../stores/useNotificationStore";

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [rules, setRules] = useState<ReminderThresholdRule[]>(initialRules);

  const { activeFilter, setActiveFilter } = useNotificationStore();

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleToggleRule = (ruleId: string, key: keyof ReminderThresholdRule) => {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id === ruleId) {
          return { ...r, [key]: !r[key] };
        }
        return r;
      })
    );
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === "UNREAD") return !n.isRead;
    if (activeFilter === "HIGH_PRIORITY") return n.priority === "High";
    if (activeFilter === "ESCALATED") return n.isEscalated;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return {
    notifications: filteredNotifications,
    unreadCount,
    rules,
    activeFilter,
    setActiveFilter,
    actions: {
      markAsRead: handleMarkAsRead,
      markAllAsRead: handleMarkAllAsRead,
      toggleRule: handleToggleRule,
    },
  };
}
