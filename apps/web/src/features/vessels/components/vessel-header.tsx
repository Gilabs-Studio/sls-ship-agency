"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface VesselHeaderProps {
  onAddAgentClick: () => void;
  totalAgentsCount: number;
}

export function VesselHeader({ onAddAgentClick }: VesselHeaderProps) {
  const t = useTranslations("vessels");

  const handleExport = () => {
    toast.success("Data Armada & Agen Pelaut berhasil diexport!");
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-1">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-heading">
          {t("title")}
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          {t("subtitle")}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="h-9 px-4 text-xs font-semibold border border-border bg-card text-foreground hover:bg-muted/70 shadow-2xs rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
        >
          <Download className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
          {t("actions.exportData")}
        </Button>

        <Button
          onClick={onAddAgentClick}
          className="h-9 px-4 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-2xs cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          {t("actions.registerAgent")}
        </Button>
      </div>
    </div>
  );
}
