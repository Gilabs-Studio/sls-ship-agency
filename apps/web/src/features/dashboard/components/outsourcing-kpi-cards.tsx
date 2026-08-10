"use client";

import React from "react";
import { Card } from "@/components/ui/card";

export function OutsourcingKpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Teknisi & Kru */}
      <Card className="glass-card p-4 rounded-2xl flex flex-col justify-between space-y-2 hover:border-primary/40 transition-all cursor-pointer">
        <span className="text-xs text-muted-foreground font-semibold">
          Total Teknisi & Kru
        </span>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-foreground font-heading tracking-tight">
            128 <span className="text-xs font-normal text-muted-foreground">Personel</span>
          </span>
        </div>
      </Card>

      {/* 2. Sedang Penugasan (Outsourced to Clients) */}
      <Card className="glass-card p-4 rounded-2xl flex flex-col justify-between space-y-2 hover:border-primary/40 transition-all cursor-pointer">
        <span className="text-xs text-muted-foreground font-semibold">
          Penugasan Aktif (Klien)
        </span>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-foreground font-heading tracking-tight">
            103 <span className="text-xs font-normal text-muted-foreground">Personel</span>
          </span>
        </div>
      </Card>

      {/* 3. Standby (Siap Ditugaskan) */}
      <Card className="glass-card p-4 rounded-2xl flex flex-col justify-between space-y-2 hover:border-primary/40 transition-all cursor-pointer">
        <span className="text-xs text-muted-foreground font-semibold">
          Standby (Siap Tugas)
        </span>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-foreground font-heading tracking-tight">
            17 <span className="text-xs font-normal text-muted-foreground">Personel</span>
          </span>
        </div>
      </Card>

      {/* 4. Sertifikat Perlu Perpanjangan */}
      <Card className="glass-card p-4 rounded-2xl flex flex-col justify-between space-y-2 hover:border-destructive/40 transition-all cursor-pointer">
        <span className="text-xs text-muted-foreground font-semibold">
          Perlu Perpanjangan
        </span>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-foreground font-heading tracking-tight">
            8 <span className="text-xs font-normal text-muted-foreground">Dokumen</span>
          </span>
        </div>
      </Card>
    </div>
  );
}
