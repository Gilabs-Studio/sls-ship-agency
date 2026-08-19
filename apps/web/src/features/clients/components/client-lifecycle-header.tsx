"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Building2, Download, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { TimePeriodOption } from "../hooks/useClientLifecycle";

interface ClientLifecycleHeaderProps {
  timePeriod: TimePeriodOption;
  onPeriodChange: (period: TimePeriodOption) => void;
  onExportReport: () => void;
  onAddContract: () => void;
  onRefresh: () => void;
}

export function ClientLifecycleHeader({
  timePeriod,
  onPeriodChange,
  onExportReport,
  onAddContract,
  onRefresh,
}: ClientLifecycleHeaderProps) {
  const t = useTranslations("clients");

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border">
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
            <Building2 className="h-5 w-5" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-heading tracking-tight text-foreground">
            {t("title")}
          </h1>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground max-w-3xl">
          {t("description")}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
        <Select value={timePeriod} onValueChange={(val) => onPeriodChange(val as TimePeriodOption)}>
          <SelectTrigger className="w-[140px] h-9 text-xs cursor-pointer bg-card">
            <SelectValue placeholder={t("timePeriod.thisMonth")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this_month" className="text-xs cursor-pointer">
              {t("timePeriod.thisMonth")}
            </SelectItem>
            <SelectItem value="this_quarter" className="text-xs cursor-pointer">
              {t("timePeriod.thisQuarter")}
            </SelectItem>
            <SelectItem value="this_year" className="text-xs cursor-pointer">
              {t("timePeriod.thisYear")}
            </SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          className="h-9 text-xs gap-1.5 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{t("actions.refresh")}</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onExportReport}
          className="h-9 text-xs gap-1.5 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
        >
          <Download className="h-3.5 w-3.5" />
          {t("actions.exportReport")}
        </Button>

        <Button
          size="sm"
          onClick={onAddContract}
          className="h-9 text-xs gap-1.5 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
        >
          <Plus className="h-3.5 w-3.5" />
          {t("actions.addContract")}
        </Button>
      </div>
    </div>
  );
}
