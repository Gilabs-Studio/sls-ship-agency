import { getRequestConfig } from "next-intl/server";

import type { Locale } from "@/types/locale";

import { routing } from "./routing";
import globalEnMessages from "./messages/en.json";
import globalIdMessages from "./messages/id.json";

import { dashboardEn } from "@/features/dashboard/i18n/en";
import { dashboardId } from "@/features/dashboard/i18n/id";
import { crmEn } from "@/features/crm/i18n/en";
import { crmId } from "@/features/crm/i18n/id";
import { vesselsEn } from "@/features/vessels/i18n/en";
import { vesselsId } from "@/features/vessels/i18n/id";
import { documentsEn } from "@/features/documents/i18n/en";
import { documentsId } from "@/features/documents/i18n/id";
import { notificationsEn } from "@/features/notifications/i18n/en";
import { notificationsId } from "@/features/notifications/i18n/id";
import { reportsEn } from "@/features/reports/i18n/en";
import { reportsId } from "@/features/reports/i18n/id";
import { settingsEn } from "@/features/settings/i18n/en";
import { settingsId } from "@/features/settings/i18n/id";

const messages = {
  en: {
    ...globalEnMessages,
    dashboard: dashboardEn,
    crm: crmEn,
    vessels: vesselsEn,
    documents: documentsEn,
    notifications: notificationsEn,
    reports: reportsEn,
    settings: settingsEn,
  },
  id: {
    ...globalIdMessages,
    dashboard: dashboardId,
    crm: crmId,
    vessels: vesselsId,
    documents: documentsId,
    notifications: notificationsId,
    reports: reportsId,
    settings: settingsId,
  },
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: messages[locale as keyof typeof messages],
  };
});
