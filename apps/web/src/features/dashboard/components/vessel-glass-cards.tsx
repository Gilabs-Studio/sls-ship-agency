"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Anchor, Navigation, Clock, Fuel, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface VesselCardItem {
  id: string;
  name: string;
  status: "Active" | "Docked" | "Maintenance";
  imageUrl?: string;
  fuelPercentage: number;
  capacityText: string;
  departure: string;
  destination: string;
  eta: string;
}

const defaultVessels: VesselCardItem[] = [
  {
    id: "v-1",
    name: "Aurora Sea",
    status: "Active",
    imageUrl: "/images/vessel-aurora-sea.jpg",
    fuelPercentage: 78,
    capacityText: "2150/2400 TEU • 24 Crew",
    departure: "Tanjung Priok",
    destination: "Samarinda",
    eta: "16:40 WIB",
  },
  {
    id: "v-2",
    name: "Atlantic Star",
    status: "Active",
    imageUrl: "/images/vessel-atlantic-star.jpg",
    fuelPercentage: 82,
    capacityText: "1120/1800 TEU • 18 Crew",
    departure: "Surabaya",
    destination: "Makassar",
    eta: "18:20 WIB",
  },
  {
    id: "v-3",
    name: "Pacific Queen",
    status: "Docked",
    fuelPercentage: 95,
    capacityText: "1850/2000 TEU • 20 Crew",
    departure: "Tanjung Perak",
    destination: "Balikpapan",
    eta: "Docked Port",
  },
  {
    id: "v-4",
    name: "Ocean Pioneer",
    status: "Active",
    fuelPercentage: 64,
    capacityText: "980/1200 TEU • 15 Crew",
    departure: "Batam",
    destination: "Singapore",
    eta: "21:15 WIB",
  },
];

interface VesselGlassCardsProps {
  vessels?: VesselCardItem[];
  onSelectVessel?: (vessel: VesselCardItem) => void;
}

export function VesselGlassCards({
  vessels = defaultVessels,
  onSelectVessel,
}: VesselGlassCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {vessels.map((vessel) => (
        <div
          key={vessel.id}
          onClick={() => onSelectVessel?.(vessel)}
          className="glass-card rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] hover:border-[#ACFCCC]/40 cursor-pointer relative overflow-hidden group shadow-2xl"
        >
          {/* Header Card Row */}
          <div className="flex items-center justify-between mb-3 z-10 relative">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm text-foreground group-hover:text-[#ACFCCC] transition-colors">
                {vessel.name}
              </h3>
              <Badge
                variant={vessel.status === "Active" ? "mint" : "ice"}
                className="text-[10px] px-2 py-0.5"
              >
                {vessel.status}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-full glass-pill text-muted-foreground group-hover:text-[#ACFCCC] group-hover:bg-white/20 transition-all"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Optional High-Res Vessel Photo (AtlanticX Vessel Image Card) */}
          {vessel.imageUrl ? (
            <div className="relative h-28 w-full rounded-xl overflow-hidden mb-3 border border-white/10 shadow-inner">
              <Image
                src={vessel.imageUrl}
                alt={vessel.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Overlay Stat Gauges */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white">
                <div className="flex items-center gap-1">
                  <Fuel className="h-3 w-3 text-[#ACFCCC]" />
                  <span>Fuel <strong>{vessel.fuelPercentage}%</strong></span>
                </div>
                <div className="font-mono text-[10px] bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
                  {vessel.capacityText}
                </div>
              </div>
            </div>
          ) : (
            /* Fallback Compact Gauge Bar */
            <div className="mb-3 space-y-1.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Fuel className="h-3 w-3 text-[#ACFCCC]" /> Fuel Level
                </span>
                <strong className="text-foreground">{vessel.fuelPercentage}%</strong>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#8FC5FF] to-[#ACFCCC] rounded-full"
                  style={{ width: `${vessel.fuelPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Route & ETA Bottom Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground truncate max-w-[65%]">
              <Navigation className="h-3.5 w-3.5 text-[#8FC5FF] shrink-0" />
              <span className="truncate font-medium text-foreground">
                {vessel.departure} <span className="text-[#ACFCCC]">➔</span> {vessel.destination}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0 font-mono">
              <Clock className="h-3 w-3 text-[#8FC5FF]" />
              <span>ETA: <strong className="text-foreground">{vessel.eta}</strong></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
