"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ContractStatusSegment } from "../types/clients.types";

interface ContractsByStatusCardProps {
  segments: ContractStatusSegment[];
  onViewAll?: () => void;
}

export function ContractsByStatusCard({ segments, onViewAll }: ContractsByStatusCardProps) {
  const t = useTranslations("clients");

  const totalContracts = segments.reduce((acc, curr) => acc + curr.count, 0);

  // Calculate SVG strokeDasharray and strokeDashoffset for donut
  const radius = 68;
  const circumference = 2 * Math.PI * radius;

  const segmentsWithDash = segments.reduce<{
    items: (ContractStatusSegment & { strokeDasharray: string; strokeDashoffset: number })[];
    offset: number;
  }>(
    (acc, seg) => {
      const strokeLength = (seg.percentage / 100) * circumference;
      const strokeDasharray = `${strokeLength} ${circumference - strokeLength}`;
      const strokeDashoffset = -acc.offset;

      return {
        items: [
          ...acc.items,
          {
            ...seg,
            strokeDasharray,
            strokeDashoffset,
          },
        ],
        offset: acc.offset + strokeLength,
      };
    },
    { items: [], offset: 0 }
  ).items;

  return (
    <Card className="glass-card border border-border h-full flex flex-col justify-between">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-bold text-foreground font-heading">
          {t("contractsStatus.title")}
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

      <CardContent className="pt-2 pb-5 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* SVG Donut Chart with Center Text (Left) */}
          <div className="md:col-span-5 flex items-center justify-center relative my-2">
            <div className="relative w-44 h-44">
              <svg viewBox="0 0 180 180" className="w-full h-full transform -rotate-90">
                {/* Background Ring Track */}
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="20"
                  className="text-muted/20"
                />
                {/* Colored Segments */}
                {segmentsWithDash.map((seg) => (
                  <circle
                    key={seg.id}
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="transparent"
                    stroke={seg.color}
                    strokeWidth="22"
                    strokeDasharray={seg.strokeDasharray}
                    strokeDashoffset={seg.strokeDashoffset}
                    strokeLinecap="butt"
                    className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                  />
                ))}
              </svg>

              {/* Center Text Container */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-xs text-muted-foreground font-medium">Total</span>
                <span className="text-3xl font-black text-foreground font-heading leading-tight">
                  {totalContracts}
                </span>
              </div>
            </div>
          </div>

          {/* Status Legend List (Right) */}
          <div className="md:col-span-7 space-y-2">
            {segments.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-2 p-1 px-2 rounded-md hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-medium text-foreground truncate">
                    {item.name}
                  </span>
                </div>
                <div className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                  <span className="text-foreground font-bold">{item.count}</span>{" "}
                  <span className="text-[11px] font-normal text-muted-foreground">
                    ({item.percentage}%)
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
