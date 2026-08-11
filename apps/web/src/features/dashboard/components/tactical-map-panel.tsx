"use client";

import React, { useState } from "react";
import { Plus, Minus, Maximize2, Compass, MapPin, Globe, CheckCircle2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function TacticalMapPanel() {
  const [mapZoom, setMapZoom] = useState(1);

  return (
    <div className="glass-panel rounded-3xl p-5 space-y-5 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[#8FC5FF]/10 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#ACFCCC]/10 blur-[80px] pointer-events-none" />

      {/* Panel Top Header Bar */}
      <div className="flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full glass-pill flex items-center justify-center text-[#ACFCCC]">
            <Globe className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-foreground tracking-tight">Peta Taktis & Radar Rute</h3>
            <span className="text-[10px] text-muted-foreground">Monitoring Posisi Live Maritime</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon-sm" className="rounded-full glass-pill text-[#ACFCCC]">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Top Metric Container Banner (AtlanticX Containers Card) */}
      <div className="glass-card rounded-2xl p-3.5 space-y-2 z-10 relative border border-white/10">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">
            Total Kontainer & Crew Manning
          </span>
          <Badge variant="mint" className="text-[10px] px-1.5 py-0">
            <CheckCircle2 className="h-3 w-3 mr-1" /> On Time
          </Badge>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-foreground font-heading tracking-tight">
            2,150 <span className="text-xs text-[#8FC5FF] font-normal">TEU</span>
          </span>
          <div className="text-right text-xs">
            <span className="text-muted-foreground">Delivery time: </span>
            <strong className="text-[#ACFCCC]">2/3 Hari</strong>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#8FC5FF] to-[#ACFCCC] rounded-full w-3/4" />
        </div>
      </div>

      {/* Tactical Vector Maritime Route Map */}
      <div className="relative h-56 w-full rounded-2xl bg-black/20 border border-white/10 overflow-hidden flex items-center justify-center z-10 my-1">
        {/* Vector World Coastline Map Simulation (SVG) */}
        <svg
          viewBox="0 0 600 350"
          className="w-full h-full object-cover opacity-60 transition-transform duration-500"
          style={{ transform: `scale(${mapZoom})` }}
        >
          {/* Coastlines */}
          <path
            d="M 50 80 Q 80 50 120 70 T 200 90 T 280 60 T 350 80 T 420 50 T 520 90"
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="2"
          />
          <path
            d="M 60 160 Q 140 120 220 150 T 380 140 T 480 180"
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="2"
          />
          <path
            d="M 100 240 Q 180 210 300 250 T 450 220 T 540 260"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1.5"
          />

          {/* Glowing Maritime Route 1 (Tanjung Priok -> Samarinda) */}
          <path
            d="M 150 180 C 220 120, 280 200, 360 140"
            fill="none"
            stroke="#ACFCCC"
            strokeWidth="3"
            strokeDasharray="6,4"
            className="animate-pulse"
            filter="drop-shadow(0 0 6px rgba(172, 252, 204, 0.8))"
          />

          {/* Glowing Maritime Route 2 (Surabaya -> Makassar) */}
          <path
            d="M 200 220 C 270 180, 340 240, 420 190"
            fill="none"
            stroke="#8FC5FF"
            strokeWidth="2.5"
            strokeDasharray="4,4"
            filter="drop-shadow(0 0 5px rgba(143, 197, 255, 0.8))"
          />

          {/* Node 1 */}
          <circle cx="150" cy="180" r="6" fill="#ACFCCC" className="animate-ping opacity-75" />
          <circle cx="150" cy="180" r="4" fill="#ACFCCC" />
          <text x="135" y="200" fill="#ACFCCC" fontSize="10" fontWeight="bold">T. Priok</text>

          {/* Node 2 */}
          <circle cx="360" cy="140" r="6" fill="#ACFCCC" className="animate-ping opacity-75" />
          <circle cx="360" cy="140" r="4" fill="#ACFCCC" />
          <text x="350" y="125" fill="#ACFCCC" fontSize="10" fontWeight="bold">Samarinda</text>

          {/* Node 3 */}
          <circle cx="420" cy="190" r="4" fill="#8FC5FF" />
          <text x="425" y="205" fill="#8FC5FF" fontSize="9">Makassar</text>
        </svg>

        {/* Map Floating Controls */}
        <div className="absolute bottom-2 right-2 flex flex-col gap-1">
          <button
            onClick={() => setMapZoom((z) => Math.min(z + 0.2, 1.8))}
            className="h-6 w-6 rounded-full glass-pill flex items-center justify-center text-xs text-foreground hover:bg-white/20 cursor-pointer"
          >
            +
          </button>
          <button
            onClick={() => setMapZoom((z) => Math.max(z - 0.2, 0.8))}
            className="h-6 w-6 rounded-full glass-pill flex items-center justify-center text-xs text-foreground hover:bg-white/20 cursor-pointer"
          >
            -
          </button>
        </div>
      </div>

      {/* Bottom Circular Radar Compass Dial & Route Comparison (AtlanticX Radar Dial) */}
      <div className="grid grid-cols-5 gap-3 items-center z-10 relative pt-2 border-t border-white/10">
        {/* Circular Radar Compass Dial (2 cols) */}
        <div className="col-span-2 flex flex-col items-center justify-center relative">
          <div className="h-28 w-28 rounded-full border-2 border-white/15 backdrop-blur-md relative flex items-center justify-center bg-black/30 shadow-inner">
            {/* Cardinal Markers */}
            <span className="absolute top-1 text-[9px] font-bold text-[#ACFCCC]">N</span>
            <span className="absolute right-1 text-[9px] font-bold text-muted-foreground">E</span>
            <span className="absolute bottom-1 text-[9px] font-bold text-muted-foreground">S</span>
            <span className="absolute left-1 text-[9px] font-bold text-[#8FC5FF]">W</span>

            {/* Inner Radar Rings */}
            <div className="h-20 w-20 rounded-full border border-white/10 flex items-center justify-center">
              <div className="h-12 w-12 rounded-full border border-[#ACFCCC]/30 flex items-center justify-center">
                <Compass className="h-6 w-6 text-[#ACFCCC] animate-spin" style={{ animationDuration: "20s" }} />
              </div>
            </div>

            {/* Heading Target Line */}
            <div className="absolute h-full w-0.5 bg-gradient-to-b from-[#ACFCCC]/80 via-transparent to-transparent -rotate-45" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground mt-1.5">
            Heading <strong className="text-[#ACFCCC]">045° N</strong>
          </span>
        </div>

        {/* Route Efficiency & Compliance List (3 cols) */}
        <div className="col-span-3 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
            <span>Rute Pelayaran</span>
            <span>Efisiensi</span>
          </div>

          {/* Item 1 */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-foreground truncate">T. Priok ➔ Samarinda</span>
              <strong className="text-[#ACFCCC] text-xs">80%</strong>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#ACFCCC] rounded-full w-[80%]" />
            </div>
          </div>

          {/* Item 2 */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-foreground truncate">Surabaya ➔ Makassar</span>
              <strong className="text-[#8FC5FF] text-xs">72%</strong>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#8FC5FF] rounded-full w-[72%]" />
            </div>
          </div>

          {/* Item 3 */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-foreground truncate">Batam ➔ Singapore</span>
              <strong className="text-[#ACFCCC] text-xs">89%</strong>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#ACFCCC] rounded-full w-[89%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
