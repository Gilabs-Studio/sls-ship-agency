"use client";

import React from "react";
import { Building2, Users, Folder, FileText, BarChart2, ArrowUpRight } from "lucide-react";
import type { VmsKpiItem } from "../types/dashboard.types";
import { Card, CardContent } from "@/components/ui/card";

interface VmsKpiCardsProps {
  items: VmsKpiItem[];
}

export function VmsKpiCards({ items }: VmsKpiCardsProps) {
  const getIcon = (type: VmsKpiItem["iconType"]) => {
    switch (type) {
      case "building":
        return <Building2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      case "users":
        return <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      case "folder":
        return <Folder className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case "file-text":
        return <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      case "bar-chart":
        return <BarChart2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
    }
  };

  const getIconBg = (type: VmsKpiItem["iconType"]) => {
    switch (type) {
      case "building":
      case "users":
        return "bg-emerald-500/10 border-emerald-500/20";
      case "folder":
        return "bg-blue-500/10 border-blue-500/20";
      case "file-text":
        return "bg-amber-500/10 border-amber-500/20";
      case "bar-chart":
        return "bg-purple-500/10 border-purple-500/20";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {items.map((item) => (
        <Card
          key={item.id}
          className="border-border/60 bg-card/90 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
        >
          <CardContent className="p-4 flex flex-col justify-between h-full space-y-3">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-lg border flex items-center justify-center shrink-0 ${getIconBg(
                  item.iconType
                )}`}
              >
                {getIcon(item.iconType)}
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground truncate">
                  {item.title}
                </p>
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-1 pt-1">
              <div>
                <span className="text-xl font-extrabold tracking-tight text-foreground font-heading">
                  {item.value}
                </span>
                <span className="ml-1 text-[11px] font-medium text-muted-foreground">
                  {item.unit}
                </span>
              </div>

              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold border border-emerald-500/20 shrink-0">
                <ArrowUpRight className="h-3 w-3" />
                <span>{item.changePercentage}%</span>
                <span className="text-[9px] font-normal text-emerald-600/70 dark:text-emerald-400/70 hidden xl:inline ml-0.5">
                  vs bln lalu
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
