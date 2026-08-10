"use client";

import React from "react";
import { Search, Filter, ArrowUpDown, Star, MoreVertical, Info } from "lucide-react";
import type { VmsAgencyListItem } from "../types/dashboard.types";
import type { VmsFilterTab } from "../hooks/useDashboard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface VmsAgencyListTableProps {
  agencies: VmsAgencyListItem[];
  activeTab: VmsFilterTab;
  onTabChange: (tab: VmsFilterTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  counts: {
    semua: number;
    aktif: number;
    berjalan: number;
    blacklist: number;
  };
}

export function VmsAgencyListTable({
  agencies,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  counts,
}: VmsAgencyListTableProps) {
  // Tab configuration for file folder filing index
  const tabItems: { key: VmsFilterTab; label: string; count: number }[] = [
    { key: "semua", label: "Semua Agency", count: counts.semua },
    { key: "aktif", label: "Agency Aktif", count: counts.aktif },
    { key: "berjalan", label: "Proyek Berjalan", count: counts.berjalan },
    { key: "blacklist", label: "Blacklist", count: counts.blacklist },
  ];

  // Render Star Rating UI
  const renderStars = (score: number) => {
    const fullStars = Math.floor(score);
    return (
      <div className="flex items-center gap-0.5 text-amber-400 mt-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < fullStars
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground/30 fill-muted-foreground/10"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-0 pt-2">
      {/* File Folder Filing Tabs Header + Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 px-0.5">
        {/* Left: Filing Folder Tabs */}
        <div className="flex items-end gap-1.5 -mb-px z-10 overflow-x-auto scrollbar-none pb-0.5">
          {tabItems.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`relative px-4 py-2 text-xs font-semibold rounded-t-xl transition-all duration-200 cursor-pointer flex items-center gap-2 border-t border-x ${
                  isActive
                    ? "bg-card text-foreground border-border/80 shadow-2xs z-20 pb-2.5 -mb-px"
                    : "bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/70 hover:text-foreground z-10"
                }`}
              >
                <Info
                  className={`h-3.5 w-3.5 ${
                    isActive ? "text-primary" : "text-muted-foreground/70"
                  }`}
                />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Search Input + Filter/Sort Action Controls */}
        <div className="flex items-center gap-2 pb-2">
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari agency..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-8 pl-8 pr-3 text-xs bg-background border-border/80 rounded-lg focus-visible:ring-emerald-500"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs font-medium border-border/80 cursor-pointer bg-background hover:bg-muted/50"
          >
            <Filter className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
            Filter
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs font-medium border-border/80 cursor-pointer bg-background hover:bg-muted/50"
          >
            <ArrowUpDown className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
            Urutkan
          </Button>
        </div>
      </div>

      {/* Main File Container Box (Clean Minimalist Folder Body) */}
      <div className="bg-card border border-border/80 rounded-b-2xl rounded-tr-2xl shadow-2xs overflow-hidden relative z-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30 text-muted-foreground font-semibold">
                <th className="py-3 px-4">Agency</th>
                <th className="py-3 px-4">PIC Utama</th>
                <th className="py-3 px-4">Keahlian Utama</th>
                <th className="py-3 px-4">Proyek Aktif</th>
                <th className="py-3 px-4">Total Kontrak</th>
                <th className="py-3 px-4">Skor Performa</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-3 text-center w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {agencies.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-muted-foreground text-xs">
                    Tidak ada agency yang sesuai dengan filter atau kata kunci pencarian.
                  </td>
                </tr>
              ) : (
                agencies.map((agency) => (
                  <tr
                    key={agency.id}
                    className="hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    {/* Company Column */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-foreground text-background font-black text-sm flex items-center justify-center uppercase shrink-0 shadow-2xs">
                          {agency.logo}
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-bold text-foreground text-xs">
                            {agency.name}
                          </p>
                          <p className="text-[11px] font-mono text-muted-foreground">
                            {agency.code}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* PIC Column */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-7 w-7 shrink-0">
                          <AvatarImage src={agency.pic.avatar} alt={agency.pic.name} />
                          <AvatarFallback className="bg-transparent">
                            {agency.pic.name}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-foreground text-xs">
                            {agency.pic.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {agency.pic.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Skills Tags Column */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1.5 max-w-[220px]">
                        {agency.skills.map((skill, idx) => (
                          <Badge
                            key={idx}
                            variant="mint"
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </td>

                    {/* Active Projects Column */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <p className="font-bold text-foreground text-xs">
                          {agency.activeProjectsCount} Proyek
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {agency.completedProjectsThisMonth} selesai bulan ini
                        </p>
                      </div>
                    </td>

                    {/* Total Contract Column */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <p className="font-bold text-foreground text-xs">
                          {agency.totalContractValueFormatted}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {agency.contractCount} kontrak
                        </p>
                      </div>
                    </td>

                    {/* Performance Score Column */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <div className="font-extrabold text-foreground text-xs">
                          {agency.performanceScore} / 5
                        </div>
                        {renderStars(agency.performanceScore)}
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="py-3.5 px-4 text-center">
                      {agency.status === "aktif" ? (
                        <Badge variant="success" className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                          Aktif
                        </Badge>
                      ) : agency.status === "blacklist" ? (
                        <Badge variant="rose" className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                          Blacklist
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                          Non-Aktif
                        </Badge>
                      )}
                    </td>

                    {/* Action Column */}
                    <td className="py-3.5 px-3 text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
