/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Search,
  Filter,
  Star,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChevronRight,
  Anchor,
  UserCheck,
  Ban,
  SlidersHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { Agent } from "../types/vessel-agent.types";

interface AgentTableViewProps {
  agents: Agent[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  rankFilter: string;
  onRankFilterChange: (rank: string) => void;
  onSelectAgent: (agentId: string) => void;
  comparisonAgentIds: string[];
  onToggleComparison: (agentId: string) => void;
}

export function AgentTableView({
  agents,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  rankFilter,
  onRankFilterChange,
  onSelectAgent,
  comparisonAgentIds,
  onToggleComparison,
}: AgentTableViewProps) {
  const t = useTranslations("vessels");

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-muted/30 p-3.5 rounded-xl border border-border/60">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder={t("table.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9 text-xs glass-input"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-card border border-border px-2.5 py-1.5 rounded-lg text-xs">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="bg-transparent text-foreground outline-none cursor-pointer text-xs font-medium"
            >
              <option value="all">{t("table.allStatuses")}</option>
              <option value="Ready">Ready / Standby</option>
              <option value="On Duty">On Duty</option>
              <option value="Cuti">Cuti</option>
              <option value="Blacklist">Blacklist</option>
            </select>
          </div>

          {/* Rank Filter */}
          <div className="flex items-center gap-1.5 bg-card border border-border px-2.5 py-1.5 rounded-lg text-xs">
            <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={rankFilter}
              onChange={(e) => onRankFilterChange(e.target.value)}
              className="bg-transparent text-foreground outline-none cursor-pointer text-xs font-medium"
            >
              <option value="all">{t("table.allRanks")}</option>
              <option value="Master Captain">Master Captain</option>
              <option value="Chief Engineer">Chief Engineer</option>
              <option value="Deck Officer">Deck Officer</option>
              <option value="AB Seaman">AB Seaman</option>
              <option value="Cook">Cook</option>
              <option value="2nd Engineer">2nd Engineer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dataset Table */}
      <div className="border border-border rounded-xl bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/60 border-b border-border text-muted-foreground font-semibold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-3.5 w-10 text-center">Compare</th>
                <th className="p-3.5">{t("table.agentName")}</th>
                <th className="p-3.5">{t("table.placement")}</th>
                <th className="p-3.5">{t("table.status")}</th>
                <th className="p-3.5">{t("table.seaTime")}</th>
                <th className="p-3.5">{t("table.rating")}</th>
                <th className="p-3.5">{t("table.documents")}</th>
                <th className="p-3.5 text-right">{t("table.actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {agents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-muted-foreground text-xs">
                    Tidak ada data agen pelaut yang cocok dengan pencarian / filter.
                  </td>
                </tr>
              ) : (
                agents.map((agent) => {
                  const isComparing = comparisonAgentIds.includes(agent.id);
                  const hasExpired = agent.certificates.some((c) => c.status === "expired");
                  const hasNearExpiry = agent.certificates.some((c) => c.status === "near-expiry");

                  return (
                    <tr
                      key={agent.id}
                      className="hover:bg-muted/40 transition-colors cursor-pointer group"
                      onClick={() => onSelectAgent(agent.id)}
                    >
                      {/* Checkbox for comparison */}
                      <td className="p-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={isComparing}
                          onCheckedChange={() => onToggleComparison(agent.id)}
                          className="cursor-pointer"
                        />
                      </td>

                      {/* Agent Name & Rank */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs shrink-0 overflow-hidden">
                            {agent.avatar ? (
                              <img
                                src={agent.avatar}
                                alt={agent.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              agent.name.substring(0, 2).toUpperCase()
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                              {agent.name}
                            </span>
                            <span className="text-[11px] text-muted-foreground font-medium block">
                              {agent.mainRank}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Placement */}
                      <td className="p-3.5">
                        {agent.currentVessel ? (
                          <div className="flex items-center gap-1.5 text-sky-500 font-semibold">
                            <Anchor className="h-3.5 w-3.5 shrink-0" />
                            <span>{agent.currentVessel}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground italic font-normal">
                            {t("table.standby")}
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-3.5">
                        {agent.status === "Ready" && (
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30 text-[10px] gap-1">
                            <UserCheck className="h-3 w-3" /> Ready / Standby
                          </Badge>
                        )}
                        {agent.status === "On Duty" && (
                          <Badge variant="outline" className="bg-sky-500/10 text-sky-500 border-sky-500/30 text-[10px] gap-1">
                            <Anchor className="h-3 w-3" /> On Duty
                          </Badge>
                        )}
                        {agent.status === "Cuti" && (
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30 text-[10px] gap-1">
                            <Clock className="h-3 w-3" /> Cuti
                          </Badge>
                        )}
                        {agent.status === "Blacklist" && (
                          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 text-[10px] gap-1">
                            <Ban className="h-3 w-3" /> Blacklist
                          </Badge>
                        )}
                      </td>

                      {/* Sea Time */}
                      <td className="p-3.5">
                        <span className="font-semibold text-foreground">
                          {agent.seaTimeMonths} Bulan
                        </span>
                        <span className="text-[10px] text-muted-foreground block">
                          (~{(agent.seaTimeMonths / 12).toFixed(1)} Thn)
                        </span>
                      </td>

                      {/* Rating */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-1 font-bold text-foreground">
                          <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                          <span>{agent.overallRating.toFixed(1)}</span>
                        </div>
                      </td>

                      {/* Document Status */}
                      <td className="p-3.5">
                        {hasExpired ? (
                          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 text-[10px] gap-1">
                            <AlertTriangle className="h-3 w-3" /> Expired Doc
                          </Badge>
                        ) : hasNearExpiry ? (
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30 text-[10px] gap-1">
                            <Clock className="h-3 w-3" /> Near Expiry
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30 text-[10px] gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Valid ({agent.certificates.length})
                          </Badge>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onSelectAgent(agent.id)}
                          className="h-8 text-xs gap-1 text-primary hover:bg-primary/10 cursor-pointer"
                        >
                          <span>{t("table.viewProfile")}</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
