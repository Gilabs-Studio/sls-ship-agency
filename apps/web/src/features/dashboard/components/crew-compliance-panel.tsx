"use client";

import React from "react";
import { ShieldCheck, Compass, CheckCircle2, UserPlus, FileCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CrewCompliancePanel() {
  return (
    <Card className="glass-panel p-5 rounded-2xl space-y-5 border border-border shadow-md h-full flex flex-col justify-between">
      {/* 1. Kepatuhan Sertifikat Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-foreground">Kepatuhan Sertifikat Kru</h3>
              <span className="text-[10px] text-muted-foreground">Regulasi Maritim SOLAS & BST</span>
            </div>
          </div>
          <Badge variant="mint" className="text-[10px] px-2 py-0.5 font-bold">
            94.2% Safe
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 p-3 rounded-xl bg-card/40 border border-border">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Sertifikat Aktif & Valid</span>
            <strong className="text-foreground">156 / 165 Dokumen</strong>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-[94.2%]" />
          </div>
        </div>
      </div>

      {/* 2. Permintaan Outsourcing Teknisi Klien Terbaru */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-muted-foreground">
          Permintaan Outsourcing Klien
        </h4>

        <div className="space-y-2 text-xs">
          {/* Request 1 */}
          <div className="p-3 rounded-xl bg-card/40 border border-border space-y-1 hover:bg-accent/30 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">PT Samarinda Trans</span>
              <Badge variant="mint" className="text-[9px] px-1.5 py-0">1 Teknisi Mesin</Badge>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Butuh 1 Chief Engineer untuk KM Solid Horizon (Jadwal H-3)
            </p>
          </div>

          {/* Request 2 */}
          <div className="p-3 rounded-xl bg-card/40 border border-border space-y-1 hover:bg-accent/30 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">PT Ocean Line</span>
              <Badge variant="ice" className="text-[9px] px-1.5 py-0">2 Teknisi Elektrikal</Badge>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Pengajuan alokasi teknisi navigasi KM Ocean Star
            </p>
          </div>
        </div>
      </div>

      {/* 3. Clean Radar Compass Dial Widget */}
      <div className="pt-3 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-full border border-border glass-pill relative flex items-center justify-center shrink-0">
            <Compass className="h-6 w-6 text-primary animate-spin" style={{ animationDuration: "25s" }} />
            <span className="absolute top-0.5 text-[8px] font-bold text-primary">N</span>
          </div>
          <div>
            <span className="text-xs font-bold text-foreground">Command Center Navigasi</span>
            <p className="text-[10px] text-muted-foreground">Posisi & Kelaikan Sertifikat Terpantau</p>
          </div>
        </div>

        <Button variant="outline" size="sm" className="h-8 text-xs gap-1 cursor-pointer">
          <FileCheck className="h-3.5 w-3.5 text-primary" />
          <span>Laporan</span>
        </Button>
      </div>
    </Card>
  );
}
