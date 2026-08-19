"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Ship, MapPin, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { VesselFleetItem } from "../types/vessel-agent.types";

interface FleetMapAndTrendProps {
  fleet: VesselFleetItem[];
}

export function FleetMapAndTrend({ fleet }: FleetMapAndTrendProps) {
  const t = useTranslations("vessels");
  const [filter, setFilter] = useState<"all" | "operable" | "maintenance">("all");

  const filteredFleet = fleet.filter((vessel) => {
    if (filter === "operable") return vessel.seaworthinessStatus === "Layak Operasi";
    if (filter === "maintenance") return vessel.seaworthinessStatus !== "Layak Operasi";
    return true;
  });

  return (
    <Card className="glass-card border border-border shadow-xs h-full flex flex-col justify-between">
      {/* Header matching Reference Image (Project History style) */}
      <CardHeader className="pb-3 border-b border-border/60">
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
              <Ship className="h-4 w-4 text-primary" />
              <span>{t("fleetMap.title")}</span>
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Posisi armada & jumlah agen kru yang bertugas di pelabuhan.
            </p>
          </div>

          {/* Top Pill Tabs matching reference image ("Completed / Pending" style) */}
          <div className="flex items-center gap-1 bg-muted p-1 rounded-lg border border-border/50 shrink-0">
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("all")}
              className={`h-6 px-2.5 text-[11px] cursor-pointer ${
                filter === "all" ? "bg-foreground text-background font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Semua
            </Button>
            <Button
              variant={filter === "operable" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("operable")}
              className={`h-6 px-2.5 text-[11px] cursor-pointer ${
                filter === "operable" ? "bg-foreground text-background font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Layak
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1 divide-y divide-border/60">
        {/* Table/List Rows matching reference image structure */}
        <div className="divide-y divide-border/60">
          {filteredFleet.map((vessel) => {
            const isOperable = vessel.seaworthinessStatus === "Layak Operasi";

            return (
              <div
                key={vessel.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/30 transition-colors"
              >
                {/* 1. Vessel Icon & Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Ship className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-foreground text-xs truncate">
                      {vessel.name}
                    </h4>
                    <span className="text-[11px] text-muted-foreground font-mono block">
                      IMO: {vessel.imoNumber}
                    </span>
                  </div>
                </div>

                {/* 2. Port Location */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground sm:w-44 shrink-0">
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="truncate font-medium text-foreground">{vessel.currentPort}</span>
                </div>

                {/* 3. Deployed Crew & Status Badge */}
                <div className="flex items-center gap-3 shrink-0 justify-between sm:justify-end">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-semibold text-foreground">{vessel.deployedCrewCount} Agen</span>
                  </div>

                  <Badge
                    variant="outline"
                    className={`text-[10px] px-2.5 py-0.5 border ${
                      isOperable
                        ? "bg-primary/10 text-primary border-primary/20 font-semibold"
                        : "bg-destructive/10 text-destructive border-destructive/20 font-semibold"
                    }`}
                  >
                    {vessel.seaworthinessStatus}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>

      {/* Card Footer note */}
      <div className="p-3 bg-muted/20 border-t border-border/60 text-[11px] text-muted-foreground flex justify-between items-center px-4">
        <span>AIS Port Radar Status</span>
        <span className="font-mono text-[10px]">Update: Realtime</span>
      </div>
    </Card>
  );
}
