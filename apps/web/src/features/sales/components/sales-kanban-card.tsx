"use client";

import React from "react";
import {
  MoreHorizontal,
  Calendar,
  ListTodo,
  FileText,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { LeadOpportunity } from "../types/sales.types";

interface SalesKanbanCardProps {
  lead: LeadOpportunity;
  onSelectLead: (leadId: string) => void;
  onOpenDiscovery: (leadId: string) => void;
}

// Category color map for top accent bar & PIC avatar circle
const accentColors = [
  "bg-sky-500 text-white",
  "bg-emerald-500 text-white",
  "bg-indigo-500 text-white",
  "bg-purple-500 text-white",
  "bg-amber-500 text-white",
  "bg-rose-500 text-white",
];

export function SalesKanbanCard({
  lead,
  onSelectLead,
  onOpenDiscovery,
}: SalesKanbanCardProps) {
  // Deterministic color assignment based on lead id hash
  const colorIndex =
    Math.abs(
      lead.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    ) % accentColors.length;
  const avatarBg = accentColors[colorIndex];
  const barBg = avatarBg.split(" ")[0];

  const picInitial = lead.contactName ? lead.contactName.charAt(0).toUpperCase() : "P";
  const formattedValue = (lead.potentialValueMonthly / 1000000).toFixed(0);

  // Micro meta counters
  const vesselCount = lead.qualification?.vesselCountNeeded || 1;
  const certsCount = lead.qualification?.frequentlyExpiringCerts.length || 0;

  return (
    <div
      onClick={() => onSelectLead(lead.id)}
      className="bg-card hover:bg-card/90 rounded-xl border border-border/80 p-3.5 space-y-2.5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer group hover:-translate-y-0.5"
    >
      {/* 1. Top Accent Line */}
      <div className={`h-1 w-7 rounded-full ${barBg}`} />

      {/* 2. Row 1: Deal Title + More Menu */}
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1 leading-snug">
          {lead.companyName}
        </h4>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-foreground shrink-0 -mr-1 -mt-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDiscovery(lead.id);
          }}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* 3. Row 2: Business Type & Subtitle */}
      <p className="text-xs text-muted-foreground line-clamp-1">
        {lead.businessType} &bull; {lead.leadSource}
      </p>

      {/* 4. Row 3: PIC Avatar + Name on Left, Amount on Right */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar className="h-6 w-6 shrink-0 text-[10px] font-bold">
            <AvatarFallback className={`${avatarBg} font-bold`}>
              {picInitial}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs font-semibold text-foreground truncate">
            {lead.contactName}
          </span>
        </div>

        <span className="text-xs font-extrabold text-foreground shrink-0 ml-2">
          Rp {formattedValue} Juta
        </span>
      </div>

      {/* 5. Row 4: Bottom Meta Icons + Timestamp & Assignee */}
      <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
        {/* Left: Micro Icons & Counters */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-0.5 hover:text-foreground">
            <Calendar className="h-3 w-3" />
            <span>1</span>
          </span>
          <span className="flex items-center gap-0.5 hover:text-foreground">
            <ListTodo className="h-3 w-3" />
            <span>{vesselCount}</span>
          </span>
          {certsCount > 0 && (
            <span className="flex items-center gap-0.5 hover:text-foreground">
              <FileText className="h-3 w-3" />
              <span>{certsCount}</span>
            </span>
          )}
          {lead.qualification && (
            <span className="flex items-center gap-0.5 text-emerald-500">
              <Sparkles className="h-3 w-3" />
            </span>
          )}
        </div>

        {/* Right: Time & Assignee Avatar */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] font-medium text-muted-foreground">
            {lead.lastActivityDate ? "1m" : "5m"}
          </span>
          <Avatar className="h-5 w-5 border border-background">
            <AvatarFallback className="bg-muted text-[9px] font-bold text-foreground">
              {lead.assignedSales.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
