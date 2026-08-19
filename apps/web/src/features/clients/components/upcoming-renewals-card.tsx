"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Ship } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { UpcomingRenewal } from "../types/clients.types";

interface UpcomingRenewalsCardProps {
  renewals: UpcomingRenewal[];
  onViewAll?: () => void;
}

export function UpcomingRenewalsCard({ renewals, onViewAll }: UpcomingRenewalsCardProps) {
  const t = useTranslations("clients");

  return (
    <Card className="glass-card border border-border h-full flex flex-col justify-between">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-bold text-foreground font-heading">
          {t("renewals.title")}
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

      <CardContent className="pt-2 pb-4 flex-1 flex flex-col justify-between space-y-3">
        {renewals.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2.5 rounded-lg border border-border/50 hover:bg-muted/30 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 shrink-0">
                <Ship className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-foreground truncate font-heading">
                  {item.clientName}
                </h4>
                <p className="text-[11px] text-muted-foreground truncate">
                  {item.vesselName}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className="text-[11px] font-medium text-foreground">
                {item.dueDate}
              </p>
              <p
                className={`text-[10px] font-semibold mt-0.5 ${
                  item.daysLeft <= 10
                    ? "text-amber-500"
                    : "text-amber-600/90"
                }`}
              >
                {item.daysLeft} days left
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
