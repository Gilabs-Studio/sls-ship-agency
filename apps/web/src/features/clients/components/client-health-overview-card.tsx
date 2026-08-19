"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, MoveRight, ArrowDownRight, Ship } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ClientHealthOverviewItem } from "../types/clients.types";

interface ClientHealthOverviewCardProps {
  items: ClientHealthOverviewItem[];
  onViewAll?: () => void;
}

export function ClientHealthOverviewCard({ items, onViewAll }: ClientHealthOverviewCardProps) {
  const t = useTranslations("clients");

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500/15 text-emerald-600 border-emerald-500/30";
    if (score >= 70) return "bg-amber-500/15 text-amber-600 border-amber-500/30";
    if (score >= 60) return "bg-orange-500/15 text-orange-600 border-orange-500/30";
    return "bg-rose-500/15 text-rose-600 border-rose-500/30";
  };

  const renderTrendIcon = (trend: "up" | "flat" | "down") => {
    if (trend === "up") return <ArrowUpRight className="h-4 w-4 text-emerald-500 stroke-[2.5]" />;
    if (trend === "flat") return <MoveRight className="h-4 w-4 text-slate-400 stroke-[2]" />;
    return <ArrowDownRight className="h-4 w-4 text-rose-500 stroke-[2.5]" />;
  };

  return (
    <Card className="glass-card border border-border h-full flex flex-col justify-between">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-bold text-foreground font-heading">
          {t("healthOverview.title")}
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewAll}
          className="h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
        >
          {t("actions.viewAll")}
        </Button>
      </CardHeader>

      <CardContent className="pt-2 pb-4 flex-1">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground font-medium text-[11px]">
                <th className="py-2 pl-1 pr-2">{t("healthOverview.columns.client")}</th>
                <th className="py-2 px-2 text-center">{t("healthOverview.columns.healthScore")}</th>
                <th className="py-2 px-2 text-center">{t("healthOverview.columns.trend")}</th>
                <th className="py-2 pr-1 pl-2 text-right">{t("healthOverview.columns.lastInteraction")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <td className="py-2.5 pl-1 pr-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-muted text-muted-foreground shrink-0">
                        <Ship className="h-3.5 w-3.5" />
                      </div>
                      <span className="font-semibold text-foreground font-heading truncate max-w-[140px]">
                        {item.clientName}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getScoreColor(
                        item.healthScore
                      )}`}
                    >
                      {item.healthScore}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <div className="flex justify-center">{renderTrendIcon(item.trend)}</div>
                  </td>
                  <td className="py-2.5 pr-1 pl-2 text-right text-muted-foreground whitespace-nowrap text-[11px]">
                    {item.lastInteraction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
