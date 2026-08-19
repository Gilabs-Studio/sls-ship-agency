"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SalesKanbanCard } from "./sales-kanban-card";
import type { LeadOpportunity, SalesStage } from "../types/sales.types";

const STAGE_MAPPINGS: { stage: SalesStage; displayTitle: string }[] = [
  { stage: "Lead", displayTitle: "PROSPECTION" },
  { stage: "Qualified", displayTitle: "QUALIFIED" },
  { stage: "Discovery", displayTitle: "REQUEST RECEIVED" },
  { stage: "Proposal Sent", displayTitle: "PROPOSAL SENT" },
  { stage: "Negotiation", displayTitle: "NEGOTIATION" },
  { stage: "Won", displayTitle: "PROPOSAL ACCEPTED" },
];

interface SalesKanbanBoardProps {
  leads: LeadOpportunity[];
  onStageChange: (leadId: string, newStage: SalesStage) => void;
  onOpenDiscovery: (leadId: string) => void;
  onSelectLead: (leadId: string) => void;
  isClientUser: boolean;
}

export function SalesKanbanBoard({
  leads,
  onOpenDiscovery,
  onSelectLead,
}: SalesKanbanBoardProps) {
  const t = useTranslations("sales");

  return (
    <div className="w-full min-w-0 flex gap-4 overflow-x-auto pb-6 pt-1">
      {STAGE_MAPPINGS.map(({ stage, displayTitle }) => {
        const stageLeads = leads.filter((l) => l.stage === stage);
        const totalStageValue = stageLeads.reduce((acc, l) => acc + l.potentialValueMonthly, 0);
        const isWonColumn = stage === "Won";

        const formattedTotal =
          totalStageValue >= 1000000000
            ? `Rp ${(totalStageValue / 1000000000).toFixed(2)}M`
            : `Rp ${(totalStageValue / 1000000).toFixed(0)} Juta`;

        return (
          <div
            key={stage}
            className="w-80 shrink-0 bg-muted/50 backdrop-blur-xl rounded-xl border border-border/70 p-3 flex flex-col gap-3 min-h-[550px]"
          >
            {/* Column Header Panel */}
            <div
              className={`p-3 rounded-lg border transition-colors ${
                isWonColumn
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                  : "bg-card border-border/60 text-foreground"
              }`}
            >
              {/* Line 1: STAGE NAME + Menu */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs uppercase tracking-wider">
                  {displayTitle}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-muted-foreground hover:text-foreground -mr-1 -mt-1 cursor-pointer"
                  onClick={() => toast.info(`Menu opsi untuk stage ${displayTitle}`)}
                >
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>
              </div>

              {/* Line 2: Sum Amount + Deal Count */}
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-base font-extrabold tracking-tight">
                  {formattedTotal}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {stageLeads.length} deals
                </span>
              </div>
            </div>

            {/* Lead Cards Stack */}
            <div className="space-y-3 flex-1">
              {stageLeads.map((lead) => (
                <SalesKanbanCard
                  key={lead.id}
                  lead={lead}
                  onSelectLead={onSelectLead}
                  onOpenDiscovery={onOpenDiscovery}
                />
              ))}

              {stageLeads.length === 0 && (
                <div className="h-32 rounded-xl border border-dashed border-border/60 flex items-center justify-center text-xs text-muted-foreground p-4 text-center">
                  {t("kanban.emptyStage")}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
