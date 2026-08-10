"use client";

import React, { useState } from "react";
import { Navigation, Gauge, Clock, Users, SlidersHorizontal, Anchor, AlertCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface OperationalMetrics {
  totalBoats: number;
  totalOrders: number;
  activeBoats: number;
  dockedBoats: number;
  maintenanceBoats: number;
}

interface VesselHeroHeaderProps {
  metrics?: OperationalMetrics;
  onFilterChange?: (filter: string) => void;
}

export function VesselHeroHeader({
  metrics = {
    totalBoats: 128,
    totalOrders: 5600,
    activeBoats: 103,
    dockedBoats: 17,
    maintenanceBoats: 8,
  },
  onFilterChange,
}: VesselHeroHeaderProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange?.(filter);
  };

  return (
    <div className="space-y-4">
      {/* Top Hero Active Fleet Focus Title & Parameter Pills */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
            Aurora Sea
          </h1>
          <Badge variant="mint" className="px-2.5 py-0.5 text-xs">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Active Operational
          </Badge>
        </div>

        {/* Real-time Maritime Parameter Pills (AtlanticX Style) */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="glass-pill px-3 py-1.5 rounded-full flex items-center gap-1.5 text-muted-foreground">
            <Navigation className="h-3.5 w-3.5 text-[#8FC5FF]" />
            <span>Current location:</span>
            <strong className="text-foreground font-semibold">Selat Makassar (Atlantic Ocean)</strong>
          </div>

          <div className="glass-pill px-3 py-1.5 rounded-full flex items-center gap-1.5 text-muted-foreground">
            <Gauge className="h-3.5 w-3.5 text-[#ACFCCC]" />
            <span>Speed:</span>
            <strong className="text-foreground font-semibold">22 knots</strong>
          </div>

          <div className="glass-pill px-3 py-1.5 rounded-full flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-[#8FC5FF]" />
            <span>Estimated time:</span>
            <strong className="text-foreground font-semibold">2 Hari (ETA 16:40 UTC)</strong>
          </div>

          <div className="glass-pill px-3 py-1.5 rounded-full flex items-center gap-1.5 text-muted-foreground">
            <Users className="h-3.5 w-3.5 text-[#ACFCCC]" />
            <span>Crew (Manning):</span>
            <strong className="text-foreground font-semibold">24 Members (100% Verified)</strong>
          </div>
        </div>
      </div>

      {/* Horizontal Fleet Operational Metric Filter Bar (AtlanticX Bar) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          {/* Boats Total */}
          <button
            onClick={() => handleFilterClick("all")}
            className={`glass-pill px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeFilter === "all"
                ? "bg-white/20 border-[#ACFCCC]/50 text-foreground font-bold shadow-md shadow-[#ACFCCC]/10"
                : "hover:bg-white/10 text-muted-foreground"
            }`}
          >
            <span>Boats</span>
            <strong className="text-foreground text-sm font-extrabold">{metrics.totalBoats}</strong>
          </button>

          {/* Orders */}
          <button
            onClick={() => handleFilterClick("orders")}
            className={`glass-pill px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeFilter === "orders"
                ? "bg-white/20 border-[#ACFCCC]/50 text-foreground font-bold shadow-md"
                : "hover:bg-white/10 text-muted-foreground"
            }`}
          >
            <span>Orders</span>
            <strong className="text-foreground text-sm font-extrabold">{metrics.totalOrders.toLocaleString()}</strong>
          </button>

          {/* Actives */}
          <button
            onClick={() => handleFilterClick("active")}
            className={`glass-pill px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeFilter === "active"
                ? "bg-[#ACFCCC]/20 border-[#ACFCCC]/60 text-[#ACFCCC] font-bold shadow-md"
                : "hover:bg-white/10 text-muted-foreground"
            }`}
          >
            <span>Actives</span>
            <strong className="text-[#ACFCCC] text-sm font-extrabold">{metrics.activeBoats}</strong>
          </button>

          {/* Docked */}
          <button
            onClick={() => handleFilterClick("docked")}
            className={`glass-pill px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeFilter === "docked"
                ? "bg-[#8FC5FF]/20 border-[#8FC5FF]/60 text-[#8FC5FF] font-bold shadow-md"
                : "hover:bg-white/10 text-muted-foreground"
            }`}
          >
            <span>Docked</span>
            <strong className="text-[#8FC5FF] text-sm font-extrabold">{metrics.dockedBoats}</strong>
          </button>

          {/* Maintenance */}
          <button
            onClick={() => handleFilterClick("maintenance")}
            className={`glass-pill px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeFilter === "maintenance"
                ? "bg-amber-400/20 border-amber-400/60 text-amber-300 font-bold shadow-md"
                : "hover:bg-white/10 text-muted-foreground"
            }`}
          >
            <span>Maintenance</span>
            <strong className="text-amber-300 text-sm font-extrabold">0{metrics.maintenanceBoats}</strong>
          </button>
        </div>

        {/* Filter Control Button */}
        <Button variant="outline" size="sm" className="h-8 glass-pill text-xs gap-1.5 cursor-pointer rounded-xl">
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#ACFCCC]" />
          <span>Filter Status</span>
        </Button>
      </div>
    </div>
  );
}
