"use client";

import React from "react";
import { Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SalesHeaderProps {
  onAddLeadClick: () => void;
  isClientUser: boolean;
}

export function SalesHeader({
  onAddLeadClick,
  isClientUser,
}: SalesHeaderProps) {
  const handleExport = () => {
    toast.success("Laporan Sales Pipeline berhasil diexport!");
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-1">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-heading">
        Deals Pipeline
      </h1>

      {/* Right Actions: Highly Visible Export & Add Deal Buttons */}
      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="h-9 px-4 text-xs font-semibold border border-border bg-card text-foreground hover:bg-muted/70 shadow-2xs rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
        >
          <Download className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
          Export
        </Button>

        {!isClientUser && (
          <Button
            onClick={onAddLeadClick}
            className="h-9 px-4 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Add Deal
          </Button>
        )}
      </div>
    </div>
  );
}
