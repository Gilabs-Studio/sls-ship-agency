"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable, type Column } from "@/components/ui/data-table";
import type { LeadOpportunity } from "../types/sales.types";

interface SalesTableViewProps {
  leads: LeadOpportunity[];
  onSelectLead: (leadId: string) => void;
}

export function SalesTableView({ leads, onSelectLead }: SalesTableViewProps) {
  const t = useTranslations("sales");

  const columns: Column<LeadOpportunity>[] = [
    {
      id: "companyName",
      header: t("table.company"),
      accessor: (row) => (
        <span className="font-bold text-foreground">{row.companyName}</span>
      ),
      sortable: true,
    },
    {
      id: "businessType",
      header: t("table.businessType"),
      accessor: (row) => (
        <span className="text-muted-foreground">{row.businessType}</span>
      ),
    },
    {
      id: "contactName",
      header: t("table.picContact"),
      accessor: (row) => (
        <div>
          <div className="font-medium text-foreground">{row.contactName}</div>
          <div className="text-[10px] text-muted-foreground">{row.contactEmail}</div>
        </div>
      ),
    },
    {
      id: "stage",
      header: t("table.stage"),
      accessor: (row) => (
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px]">
          {row.stage}
        </Badge>
      ),
    },
    {
      id: "potentialValueMonthly",
      header: t("table.potentialValue"),
      accessor: (row) => (
        <span className="font-semibold text-emerald-500">
          Rp {row.potentialValueMonthly.toLocaleString("id-ID")} {t("kpi.perMonth")}
        </span>
      ),
      sortable: true,
    },
    {
      id: "actions",
      header: t("table.actions"),
      accessor: (row) => (
        <div className="text-right">
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs border-border/80 bg-card text-foreground hover:bg-accent cursor-pointer"
            onClick={() => onSelectLead(row.id)}
          >
            {t("table.detail")}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={leads}
      emptyMessage={t("table.empty")}
      outerClassName="bg-card/70 backdrop-blur-xl border border-border/80 shadow-xs"
    />
  );
}
