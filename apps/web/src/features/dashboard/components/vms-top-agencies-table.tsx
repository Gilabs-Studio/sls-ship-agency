"use client";

import React from "react";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import type { VmsTopAgency } from "../types/dashboard.types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface VmsTopAgenciesTableProps {
  topAgencies: VmsTopAgency[];
  onViewAll?: () => void;
}

export function VmsTopAgenciesTable({
  topAgencies,
  onViewAll,
}: VmsTopAgenciesTableProps) {
  const getTrendIcon = (trend: VmsTopAgency["trend"]) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />;
      case "down":
        return <ArrowDown className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />;
      case "neutral":
        return <Minus className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />;
    }
  };

  return (
    <Card className="border-border/60 bg-card/90 shadow-2xs h-full flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-bold text-foreground font-heading">
            Top Performing Agency
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Berdasarkan performa proyek & kepuasan klien
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewAll}
          className="h-8 px-3 text-xs font-medium cursor-pointer transition-all hover:bg-accent"
        >
          Lihat Semua
        </Button>
      </CardHeader>

      <CardContent className="pt-2 pb-4 flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground font-semibold">
                <th className="py-2.5 px-2 w-10 text-center">#</th>
                <th className="py-2.5 px-3">Agency</th>
                <th className="py-2.5 px-3 text-center">Proyek</th>
                <th className="py-2.5 px-3">Nilai Kontrak</th>
                <th className="py-2.5 px-3 text-center">Skor</th>
                <th className="py-2.5 px-2 text-center w-14">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {topAgencies.map((agency) => (
                <tr
                  key={agency.id}
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-2 text-center font-medium text-muted-foreground">
                    {agency.rank}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-foreground text-background font-bold text-xs flex items-center justify-center uppercase shrink-0 shadow-2xs">
                        {agency.logo}
                      </div>
                      <span className="font-semibold text-foreground truncate max-w-[160px] sm:max-w-[200px]">
                        {agency.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center font-medium text-foreground">
                    {agency.projectsCount}
                  </td>
                  <td className="py-3 px-3 font-semibold text-foreground">
                    {agency.contractValueFormatted}
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-foreground">
                    {agency.score}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <div className="inline-flex items-center justify-center">
                      {getTrendIcon(agency.trend)}
                    </div>
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
