"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

export function CrmDonutSummary() {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-4 border border-border shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-extrabold text-sm text-foreground font-heading">
            Ringkasan CRM & Status Penugasan Agen
          </h3>
          <p className="text-xs text-muted-foreground">
            Distribusi deal keagenan & statistik alokasi agen/teknisi di klien
          </p>
        </div>

        <Badge variant="mint" className="text-xs">
          45 Total Deal Aktif
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center pt-2">
        {/* SVG Donut Circle Chart */}
        <div className="flex flex-col items-center justify-center relative">
          <div className="relative h-36 w-36 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {/* Circle 1: Closing (45%) -> Mint */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray="238.76"
                strokeDashoffset="0"
                className="text-primary"
              />

              {/* Circle 2: Negosiasi (30%) -> Ice */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray="238.76"
                strokeDashoffset="107.44"
                className="text-secondary"
              />

              {/* Circle 3: Prospek Baru (25%) -> Warning */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray="238.76"
                strokeDashoffset="179.07"
                className="text-warning-theme"
              />
            </svg>

            {/* Donut Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold text-foreground font-heading leading-none">
                45
              </span>
              <span className="text-[10px] text-muted-foreground mt-0.5">Total Deal</span>
            </div>
          </div>
        </div>

        {/* Donut Chart Legend & Breakdown */}
        <div className="space-y-3 col-span-2">
          {/* Item 1: Deal Closing */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-card/40 border border-border">
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full bg-primary shrink-0" />
              <div>
                <span className="text-xs font-bold text-foreground">Deal Closing (Kontrak Aktif)</span>
                <p className="text-[10px] text-muted-foreground">Agen/Teknisi sedang bertugas di klien</p>
              </div>
            </div>
            <div className="text-right">
              <strong className="text-xs font-extrabold text-mint">20 Deal (45%)</strong>
            </div>
          </div>

          {/* Item 2: Tahap Negosiasi */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-card/40 border border-border">
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full bg-secondary shrink-0" />
              <div>
                <span className="text-xs font-bold text-foreground">Tahap Negosiasi & Proposal</span>
                <p className="text-[10px] text-muted-foreground">Penyesuaian spesifikasi & durasi kontrak</p>
              </div>
            </div>
            <div className="text-right">
              <strong className="text-xs font-extrabold text-ice">14 Deal (30%)</strong>
            </div>
          </div>

          {/* Item 3: Prospek Baru */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-card/40 border border-border">
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full bg-warning-theme shrink-0" />
              <div>
                <span className="text-xs font-bold text-foreground">Prospek Baru (Inquiry)</span>
                <p className="text-[10px] text-muted-foreground">Permintaan alokasi personel baru dari klien</p>
              </div>
            </div>
            <div className="text-right">
              <strong className="text-xs font-extrabold text-warning-theme">11 Deal (25%)</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
