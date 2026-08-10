"use client";

import React from "react";
import { Plus, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VmsHeaderProps {
  onAddAgency?: () => void;
  onUploadDoc?: () => void;
  onExportReport?: () => void;
}

export function VmsHeader({
  onAddAgency,
  onUploadDoc,
  onExportReport,
}: VmsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Dashboard Vendor Management System
        </h1>
        <p className="text-xs text-muted-foreground">
          Manajemen & monitoring partner agency outsource dalam satu platform terpusat.
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <Button
          onClick={onAddAgency}
          className="h-9 px-4 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-xs hover:shadow-md hover:shadow-emerald-700/20"
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Tambah Agency
        </Button>

        <Button
          variant="outline"
          onClick={onUploadDoc}
          className="h-9 px-3.5 text-xs font-medium border-border/80 bg-background text-foreground hover:bg-muted/50 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Upload className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
          Upload Dokumen
        </Button>

        <Button
          variant="outline"
          onClick={onExportReport}
          className="h-9 px-3.5 text-xs font-medium border-border/80 bg-background text-foreground hover:bg-muted/50 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Download className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
          Export Laporan
        </Button>
      </div>
    </div>
  );
}
