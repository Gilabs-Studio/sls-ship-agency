"use client";

import React from "react";
import { Kanban, List, Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { SalesViewMode } from "../types/sales.types";

interface SalesToolbarProps {
  viewMode: SalesViewMode;
  onViewModeChange: (mode: SalesViewMode) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  totalLeadsCount: number;
  totalRevenueFormatted: string;
}

export function SalesToolbar({
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchQueryChange,
  totalLeadsCount,
  totalRevenueFormatted,
}: SalesToolbarProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-border/60 pb-3">
      {/* Left: View Switcher Tabs + Projected Stats */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-6">
        {/* Tabs: Pipeline | List */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onViewModeChange("kanban")}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all cursor-pointer rounded-lg ${
              viewMode === "kanban"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            <Kanban className="h-3.5 w-3.5" />
            <span>Pipeline</span>
            {viewMode === "kanban" && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full" />
            )}
          </button>

          <button
            onClick={() => onViewModeChange("table")}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all cursor-pointer rounded-lg ${
              viewMode === "table"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            <List className="h-3.5 w-3.5" />
            <span>List</span>
            {viewMode === "table" && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-border/80 hidden sm:block" />

        {/* Projected Deals & Revenue Stat line */}
        <div className="text-xs text-muted-foreground font-medium flex items-center gap-2 flex-wrap">
          <span>
            Projected Deals: <strong className="text-foreground">{totalLeadsCount}</strong>
          </span>
          <span>&bull;</span>
          <span>
            Projected Revenue: <strong className="text-foreground">{totalRevenueFormatted}</strong>
          </span>
        </div>
      </div>

      {/* Right: Search + Filter + Sort (Highly Visible Card Fill & Borders) */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-56 sm:flex-initial">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="h-9 pl-9 pr-3 text-xs bg-card border border-border shadow-2xs rounded-xl focus:border-primary text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.info("Filter opsi aktif")}
          className="h-9 px-3.5 text-xs font-semibold border border-border bg-card text-foreground hover:bg-muted/70 shadow-2xs rounded-xl cursor-pointer shrink-0 transition-all duration-200 hover:-translate-y-0.5"
        >
          <Filter className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
          Filter
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.info("Urutkan berdasar nilai terbesar")}
          className="h-9 px-3.5 text-xs font-semibold border border-border bg-card text-foreground hover:bg-muted/70 shadow-2xs rounded-xl cursor-pointer shrink-0 transition-all duration-200 hover:-translate-y-0.5"
        >
          <ArrowUpDown className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
          Sort
        </Button>
      </div>
    </div>
  );
}
