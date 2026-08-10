"use client";

import React from "react";
import { Users, UserCheck, Clock, AlertTriangle, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function OutsourcingKpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Teknisi & Kru */}
      <Card className="glass-card p-4 rounded-2xl flex flex-col justify-between space-y-3 hover:border-primary/40 transition-all cursor-pointer">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Total Teknisi & Kru
          </span>
          <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Users className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-foreground font-heading tracking-tight">
            128 <span className="text-xs font-normal text-muted-foreground">Personel</span>
          </span>
          <Badge variant="mint" className="text-[10px] px-1.5 py-0">
            100% Verified
          </Badge>
        </div>
      </Card>

      {/* 2. Sedang Penugasan (Outsourced) */}
      <Card className="glass-card p-4 rounded-2xl flex flex-col justify-between space-y-3 hover:border-primary/40 transition-all cursor-pointer">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Penugasan Aktif (Klien)
          </span>
          <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <UserCheck className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-foreground font-heading tracking-tight">
            103 <span className="text-xs font-normal text-muted-foreground">Personel</span>
          </span>
          <Badge variant="mint" className="text-[10px] px-1.5 py-0">
            80.5% Alokasi
          </Badge>
        </div>
      </Card>

      {/* 3. Standby (Siap Ditugaskan) */}
      <Card className="glass-card p-4 rounded-2xl flex flex-col justify-between space-y-3 hover:border-primary/40 transition-all cursor-pointer">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Standby (Siap Tugas)
          </span>
          <div className="h-8 w-8 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
            <Clock className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-foreground font-heading tracking-tight">
            17 <span className="text-xs font-normal text-muted-foreground">Personel</span>
          </span>
          <Badge variant="ice" className="text-[10px] px-1.5 py-0">
            Ready
          </Badge>
        </div>
      </Card>

      {/* 4. Sertifikat Perlu Perpanjangan */}
      <Card className="glass-card p-4 rounded-2xl flex flex-col justify-between space-y-3 hover:border-destructive/40 transition-all cursor-pointer">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Perlu Perpanjangan
          </span>
          <div className="h-8 w-8 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
            <AlertTriangle className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-foreground font-heading tracking-tight">
            8 <span className="text-xs font-normal text-muted-foreground">Dokumen</span>
          </span>
          <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
            H-30 Perhatian
          </Badge>
        </div>
      </Card>
    </div>
  );
}
