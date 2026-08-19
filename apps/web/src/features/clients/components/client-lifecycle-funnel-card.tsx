"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FunnelStage } from "../types/clients.types";

interface ClientLifecycleFunnelCardProps {
  stages: FunnelStage[];
}

export function ClientLifecycleFunnelCard({ stages }: ClientLifecycleFunnelCardProps) {
  const t = useTranslations("clients.funnel");

  // Colors array for funnel steps from top (deep dark blue) to bottom (ice blue/white)
  const funnelColors = [
    "#1e3a8a", // Lead - Deep Navy Blue
    "#2563eb", // Prospect - Royal Blue
    "#3b82f6", // Proposal - Primary Blue
    "#60a5fa", // Negotiation - Light Blue
    "#93c5fd", // Contracted - Soft Blue
    "#bfdbfe", // Active - Ice Blue
    "#dbeafe", // Inactive/Lost - Pale Ice Blue
  ];

  return (
    <Card className="glass-card border border-border h-full flex flex-col justify-between">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-bold text-foreground font-heading">
          {t("title")}
        </CardTitle>
        <Select defaultValue="this_month">
          <SelectTrigger className="w-[120px] h-8 text-xs cursor-pointer bg-card">
            <SelectValue placeholder="This Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this_month" className="text-xs cursor-pointer">
              This Month
            </SelectItem>
            <SelectItem value="this_quarter" className="text-xs cursor-pointer">
              This Quarter
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="pt-2 pb-5 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Funnel Visual Graphic (Left) */}
          <div className="md:col-span-5 flex items-center justify-center p-2">
            <div className="w-full max-w-[160px] flex flex-col items-center gap-1">
              {stages.map((stage, idx) => {
                // Compute width percent for funnel shape (tapering from 100% to 35%, then slight flared base)
                const widths = ["w-full", "w-[88%]", "w-[76%]", "w-[64%]", "w-[52%]", "w-[68%]", "w-[40%]"];
                return (
                  <div
                    key={stage.id}
                    className={`h-6 ${widths[idx] || "w-1/2"} rounded-sm transition-all duration-300 hover:scale-[1.03] cursor-pointer shadow-2xs flex items-center justify-center`}
                    style={{ backgroundColor: funnelColors[idx] || stage.color }}
                    title={`${stage.name}: ${stage.count} (${stage.percentage}%)`}
                  />
                );
              })}
            </div>
          </div>

          {/* Funnel Data List (Right) */}
          <div className="md:col-span-7 space-y-2.5">
            {stages.map((stage, idx) => (
              <div
                key={stage.id}
                className="flex items-center justify-between text-xs py-1 px-2 rounded-md hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: funnelColors[idx] || stage.color }}
                  />
                  <span className="font-medium text-foreground truncate">
                    {stage.name}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground shrink-0">
                  <span className="font-bold text-foreground w-8 text-right font-heading">
                    {stage.count}
                  </span>
                  <span className="w-12 text-right text-[11px]">
                    {stage.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
