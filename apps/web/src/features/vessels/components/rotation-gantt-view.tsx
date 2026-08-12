"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Calendar, Anchor, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { RotationScheduleItem } from "../types/vessel-agent.types";

interface RotationGanttViewProps {
  schedule: RotationScheduleItem[];
}

export function RotationGanttView({ schedule }: RotationGanttViewProps) {
  const t = useTranslations("vessels");

  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  return (
    <div className="p-5 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border">
        <div>
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{t("rotation.title")}</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("rotation.subtitle")}
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs w-fit">
          {schedule.length} Proyeksi Rotasi
        </Badge>
      </div>

      {/* Gantt Matrix Container */}
      <div className="border border-border rounded-xl bg-card overflow-hidden shadow-2xs">
        {/* Timeline Header Months */}
        <div className="grid grid-cols-12 bg-muted/60 border-b border-border text-[11px] font-bold text-muted-foreground text-center py-2.5 px-4">
          <div className="col-span-4 text-left">Nama Kru & Kapal Penempatan</div>
          <div className="col-span-8 grid grid-cols-12 text-center border-l border-border/60">
            {months.map((m, i) => (
              <span key={i} className="text-[10px] tracking-tight">{m}</span>
            ))}
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border/60 text-xs">
          {schedule.map((item) => {
            const isActive = item.status === "Active";

            return (
              <div key={item.id} className="p-4 grid grid-cols-12 items-center hover:bg-muted/30 transition-colors gap-2">
                {/* Agent & Vessel info */}
                <div className="col-span-4 space-y-1 pr-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground text-xs">{item.agentName}</span>
                    <Badge
                      variant="outline"
                      className={
                        isActive
                          ? "bg-sky-500/10 text-sky-500 border-sky-500/30 text-[10px]"
                          : "bg-emerald-500/10 text-emerald-500 border-emerald-500/30 text-[10px]"
                      }
                    >
                      {isActive ? "Aktif di Kapal" : "Siap Rotasi"}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1 font-medium">
                    <Anchor className="h-3 w-3 text-primary shrink-0" />
                    <span>{item.vesselName}</span>
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                    <span>{item.signOnDate}</span>
                    <ArrowRight className="h-2.5 w-2.5" />
                    <span>{item.signOffDate}</span>
                  </div>
                </div>

                {/* Visual Bar Timeline Representation */}
                <div className="col-span-8 border-l border-border/60 pl-2">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>Progres Kontrak Penempatan</span>
                      <span className="font-bold text-foreground">{item.progressPercentage}%</span>
                    </div>

                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden p-0.5 border border-border/40 relative">
                      <div
                        className={
                          isActive
                            ? "h-full bg-gradient-to-r from-sky-500 to-primary rounded-full transition-all duration-500"
                            : "h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                        }
                        style={{ width: `${item.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
