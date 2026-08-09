export type NotificationChannel = "Email" | "WhatsApp" | "In-App";

export type NotificationPriority = "High" | "Medium" | "Low";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: "Certificate Expiry" | "Approval Request" | "CRM Follow-up" | "System Escalation";
  channels: NotificationChannel[];
  priority: NotificationPriority;
  isRead: boolean;
  isEscalated: boolean;
  targetUrl: string;
  timestamp: string;
}

export interface ReminderThresholdRule {
  id: string;
  categoryName: string;
  threshold30Days: boolean;
  threshold15Days: boolean;
  threshold7Days: boolean;
  threshold1Day: boolean;
  sendEmail: boolean;
  sendWhatsApp: boolean;
}
