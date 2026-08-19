"use client";

import React from "react";
import { Kanban, List, Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FolderTabs, type FolderTab } from "@/components/ui/folder-tabs";
import { toast } from "sonner";
import type { SalesViewMode } from "../types/sales.types";

interface SalesToolbarProps {
  viewMode: SalesViewMode;
  onViewModeChange: (mode: SalesViewMode) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  totalLeadsCount: number;
  totalRevenueFormatted: string;
  children: React.ReactNode;
}

export function SalesToolbar({
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchQueryChange,
  totalLeadsCount,
  totalRevenueFormatted,
  children,
}: SalesToolbarProps) {
  const tabItems: FolderTab<SalesViewMode>[] = [
    {
      key: "kanban",
      label: "Pipeline",
      icon: <Kanban className="h-3.5 w-3.5" />,
    },
    {
      key: "table",
      label: "List",
      icon: <List className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <FolderTabs
      tabs={tabItems}
      activeTab={viewMode}
      onTabChange={onViewModeChange}
      actions={
        <>
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="h-8 pl-8 pr-3 text-xs bg-background border-border/80 rounded-lg focus-visible:ring-emerald-500"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info("Filter opsi aktif")}
            className="h-8 px-3 text-xs font-medium border-border/80 cursor-pointer bg-background hover:bg-muted/50"
          >
            <Filter className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
            Filter
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info("Urutkan berdasar nilai terbesar")}
            className="h-8 px-3 text-xs font-medium border-border/80 cursor-pointer bg-background hover:bg-muted/50"
          >
            <ArrowUpDown className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
            Sort
          </Button>
        </>
      }
    >
      {children}
    </FolderTabs>
  );
}
