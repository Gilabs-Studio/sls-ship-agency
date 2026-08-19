"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { TopClientItem } from "../types/clients.types";

interface TopClientsCardProps {
  topClients: TopClientItem[];
  onViewAll?: () => void;
}

export function TopClientsCard({ topClients, onViewAll }: TopClientsCardProps) {
  const t = useTranslations("clients");

  const formatCurrency = (val: number) => {
    return `$${val.toLocaleString()}`;
  };

  return (
    <Card className="glass-card border border-border h-full flex flex-col justify-between">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-bold text-foreground font-heading">
          {t("topClients.title")}
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

      <CardContent className="pt-2 pb-4 flex-1 flex flex-col justify-between space-y-3.5">
        {topClients.map((item) => (
          <div key={item.id} className="space-y-1.5 cursor-pointer group">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground truncate font-heading group-hover:text-primary transition-colors">
                {item.clientName}
              </span>
              <span className="font-bold text-foreground font-heading shrink-0 pl-2">
                {formatCurrency(item.contractValueUsd)}
              </span>
            </div>
            {/* Progress bar visual indicator */}
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500 group-hover:bg-primary"
                style={{ width: `${item.relativePercentage}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
