"use client";

import React from "react";
import type { VmsPipelineSegment } from "../types/dashboard.types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface VmsProjectPipelineDonutProps {
  pipeline: VmsPipelineSegment[];
}

export function VmsProjectPipelineDonut({ pipeline }: VmsProjectPipelineDonutProps) {
  const totalProjects = pipeline.reduce((acc, curr) => acc + curr.count, 0);

  // Calculate SVG strokeDasharray and strokeDashoffset for donut segments
  const radius = 68;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;
  const segmentsWithDash = pipeline.map((seg) => {
    const strokeLength = (seg.percentage / 100) * circumference;
    const strokeDasharray = `${strokeLength} ${circumference - strokeLength}`;
    const strokeDashoffset = -cumulativeOffset;
    cumulativeOffset += strokeLength;

    return {
      ...seg,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <Card className="border-border/60 bg-card/90 shadow-2xs h-full flex flex-col justify-between">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold text-foreground font-heading">
          Ringkasan Pipeline Proyek
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Distribusi status proyek agency outsource
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2 pb-6 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* SVG Donut Chart with Center Text */}
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
                    className="transition-all duration-500 hover:opacity-80 cursor-pointer"
                  />
                ))}
              </svg>

              {/* Center Text Container */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-2xl font-black text-foreground font-heading leading-none">
                  {totalProjects}
                </span>
                <span className="text-[10px] font-medium text-muted-foreground mt-1">
                  Total Proyek
                </span>
              </div>
            </div>
          </div>

          {/* Status Legend List */}
          <div className="md:col-span-7 space-y-3 pl-0 md:pl-2">
            {pipeline.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-2 p-1.5 rounded-lg hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-medium text-foreground truncate">
                    {item.name}
                  </span>
                </div>
                <div className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                  {item.count} Proyek{" "}
                  <span className="text-[11px] font-normal text-muted-foreground/80">
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
