/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Scale, Star, CheckCircle2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Agent } from "../types/vessel-agent.types";

interface AgentComparisonViewProps {
  comparisonAgents: Agent[];
  allAgents: Agent[];
  onToggleComparison: (agentId: string) => void;
  onClearComparison: () => void;
}

export function AgentComparisonView({
  comparisonAgents,
  allAgents,
  onToggleComparison,
  onClearComparison,
}: AgentComparisonViewProps) {
  const t = useTranslations("vessels");

  return (
    <div className="p-5 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Scale className="h-4 w-4 text-primary" />
            <span>{t("comparison.title")}</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("comparison.subtitle")}
          </p>
        </div>

        {comparisonAgents.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearComparison}
            className="h-8 text-xs gap-1.5 text-destructive hover:bg-destructive/10 cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Bersihkan Komparasi</span>
          </Button>
        )}
      </div>

      {/* Selector dropdown if fewer than 3 selected */}
      <div className="bg-muted/30 p-3.5 rounded-xl border border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-muted-foreground">
          Pilih agen dari daftar untuk ditambahkan ke tabel komparasi (Maks. 3 Agen):
        </span>
        <div className="flex items-center gap-2">
          <select
            onChange={(e) => {
              if (e.target.value) onToggleComparison(e.target.value);
            }}
            className="bg-card text-foreground border border-border rounded-lg px-3 py-1.5 outline-none text-xs cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>+ Tambah Agen ke Komparasi...</option>
            {allAgents
              .filter((a) => !comparisonAgents.some((ca) => ca.id === a.id))
              .map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name} ({agent.mainRank})
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      {comparisonAgents.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-border rounded-2xl bg-card space-y-3">
          <Scale className="h-10 w-10 text-muted-foreground mx-auto" />
          <h3 className="text-sm font-bold text-foreground">Belum Ada Agen Ditingkatkan ke Komparasi</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            {t("comparison.selectPlaceholder")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {comparisonAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-card border border-border/80 rounded-2xl p-5 space-y-4 shadow-2xs relative group hover:border-primary/50 transition-colors"
            >
              {/* Remove button */}
              <button
                onClick={() => onToggleComparison(agent.id)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-destructive cursor-pointer"
                title="Hapus dari komparasi"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              {/* Agent Header */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary overflow-hidden shrink-0">
                  {agent.avatar ? (
                    <img src={agent.avatar} alt={agent.name} className="h-full w-full object-cover" />
                  ) : (
                    agent.name.substring(0, 2).toUpperCase()
                  )}
                </div>
                <div className="pr-6">
                  <h3 className="font-bold text-foreground text-sm leading-tight">{agent.name}</h3>
                  <span className="text-xs text-primary font-semibold block">{agent.mainRank}</span>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[10px] mt-1">
                    {agent.status}
                  </Badge>
                </div>
              </div>

              {/* Comparison Metric Rows */}
              <div className="space-y-3 pt-2 text-xs border-t border-border/60">
                {/* Sea Time */}
                <div className="bg-muted/40 p-3 rounded-xl border border-border/40 justify-between flex items-center">
                  <span className="text-muted-foreground font-medium">{t("comparison.seaTime")}:</span>
                  <strong className="text-primary text-sm">{agent.seaTimeMonths} Bulan</strong>
                </div>

                {/* Overall Rating */}
                <div className="bg-muted/40 p-3 rounded-xl border border-border/40 justify-between flex items-center">
                  <span className="text-muted-foreground font-medium">{t("comparison.rating")}:</span>
                  <div className="flex items-center gap-1 font-bold text-amber-400 text-sm">
                    <Star className="h-4 w-4 fill-amber-400" />
                    <span>{agent.overallRating.toFixed(1)} / 5.0</span>
                  </div>
                </div>

                {/* Current Placement */}
                <div className="bg-muted/40 p-3 rounded-xl border border-border/40 justify-between flex items-center">
                  <span className="text-muted-foreground font-medium">Penempatan:</span>
                  <span className="font-semibold text-foreground">
                    {agent.currentVessel || "Standby / Ready"}
                  </span>
                </div>

                {/* Valid Certs Count */}
                <div className="bg-muted/40 p-3 rounded-xl border border-border/40 justify-between flex items-center">
                  <span className="text-muted-foreground font-medium">{t("comparison.certsCount")}:</span>
                  <span className="font-bold text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {agent.certificates.filter((c) => c.status === "valid").length} / {agent.certificates.length}
                  </span>
                </div>

                {/* Flags & Special Skills */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-muted-foreground block uppercase tracking-wider">
                    {t("comparison.topFlags")}:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {agent.flags.map((flag, idx) => (
                      <Badge key={idx} variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                        {flag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
