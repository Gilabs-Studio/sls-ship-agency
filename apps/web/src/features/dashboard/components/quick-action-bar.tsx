import React from "react";
import { Ship, FileUp, UserPlus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionBarProps {
  onOpenAddVessel: () => void;
  onOpenUploadDoc: () => void;
  onOpenAddLead: () => void;
}

export function QuickActionBar({
  onOpenAddVessel,
  onOpenUploadDoc,
  onOpenAddLead,
}: QuickActionBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-card border border-border p-4 rounded-lg shadow-xs">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <Zap className="h-4 w-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold leading-none">Shortcut Aksi Cepat</h4>
          <p className="text-[11px] text-muted-foreground leading-none mt-1">
            Eksekusi pendaftaran data tanpa perlu berpindah modul
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={onOpenAddVessel}
          className="h-8 text-xs gap-1.5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-md"
        >
          <Ship className="h-3.5 w-3.5" />
          <span>Tambah Kapal Baru</span>
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={onOpenUploadDoc}
          className="h-8 text-xs gap-1.5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 border-border"
        >
          <FileUp className="h-3.5 w-3.5 text-amber-500" />
          <span>Upload Dokumen</span>
        </Button>

        <Button
          size="sm"
          variant="secondary"
          onClick={onOpenAddLead}
          className="h-8 text-xs gap-1.5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
        >
          <UserPlus className="h-3.5 w-3.5 text-emerald-500" />
          <span>Tambah Lead CRM</span>
        </Button>
      </div>
    </div>
  );
}
