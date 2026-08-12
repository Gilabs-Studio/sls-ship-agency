"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Building2,
  Phone,
  Mail,
  DollarSign,
  Calendar,
  ClipboardCheck,
  Award,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LeadOpportunity, SalesStage } from "../types/sales.types";

interface SalesLeadDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: LeadOpportunity | null;
  onStageChange: (leadId: string, stage: SalesStage) => void;
  onOpenDiscovery: (leadId: string) => void;
  isClientUser: boolean;
}

const SALES_STAGES: SalesStage[] = [
  "Lead",
  "Qualified",
  "Discovery",
  "Proposal Sent",
  "Negotiation",
  "Won",
  "Lost",
];

export function SalesLeadDetailModal({
  open,
  onOpenChange,
  lead,
  onStageChange,
  onOpenDiscovery,
  isClientUser,
}: SalesLeadDetailModalProps) {
  const t = useTranslations("sales");

  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                {lead.companyName}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-1">
                {lead.businessType} &bull; {lead.leadSource}
              </DialogDescription>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
              {lead.stage}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4 text-xs">
          {/* Section 1: PIC & Value */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-muted/40 p-3.5 rounded-lg border border-border">
            <div className="space-y-2">
              <span className="font-semibold text-muted-foreground uppercase text-[10px]">
                {t("detailModal.picInfo")}
              </span>
              <p className="flex items-center gap-2 text-foreground font-medium">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                <span>{lead.contactName}</span>
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{lead.contactEmail}</span>
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{lead.contactPhone}</span>
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-semibold text-muted-foreground uppercase text-[10px]">
                {t("detailModal.companyInfo")}
              </span>
              <p className="flex items-center gap-2">
                <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                <span className="font-bold text-emerald-500 text-sm">
                  Rp {lead.potentialValueMonthly.toLocaleString("id-ID")} {t("kpi.perMonth")}
                </span>
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-3.5 w-3.5 text-amber-500" />
                <span>Priority Score: {lead.priorityScore} / 100</span>
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Sales Assigned: {lead.assignedSales}</span>
              </p>
            </div>
          </div>

          {/* Section 2: Discovery Qualification Status */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground flex items-center gap-1.5">
                <ClipboardCheck className="h-4 w-4 text-primary" />
                {t("detailModal.qualificationDetails")}
              </span>
              {!isClientUser && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs glass-pill cursor-pointer"
                  onClick={() => {
                    onOpenChange(false);
                    onOpenDiscovery(lead.id);
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5 mr-1 text-primary" />
                  Edit Discovery Form
                </Button>
              )}
            </div>

            {lead.qualification ? (
              <div className="bg-card p-4 rounded-lg border border-border space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                  <div>
                    <span className="text-muted-foreground block">{t("detailModal.vesselsNeeded")}</span>
                    <strong className="text-foreground">{lead.qualification.vesselCountNeeded} Kapal</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">{t("detailModal.targetStart")}</span>
                    <strong className="text-foreground">{lead.qualification.expectedStartDate}</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">{t("detailModal.budget")}</span>
                    <strong className="text-emerald-500">{lead.qualification.budgetRangeMonthly}</strong>
                  </div>
                </div>

                <div className="space-y-1 text-[11px]">
                  <span className="text-muted-foreground block">{t("detailModal.expiringCerts")}</span>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {lead.qualification.frequentlyExpiringCerts.map((cert, i) => (
                      <Badge key={i} variant="secondary" className="text-[10px]">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 text-[11px]">
                  <span className="text-muted-foreground block">{t("detailModal.outsourceNeeds")}</span>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {lead.qualification.outsourcingNeeds.map((need, i) => (
                      <Badge key={i} variant="outline" className="text-[10px] border-border">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 text-[11px]">
                  <span className="text-muted-foreground block">{t("detailModal.painPoints")}</span>
                  <p className="text-foreground bg-muted/30 p-2 rounded border border-border italic">
                    "{lead.qualification.currentAgencyPainPoints}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-lg border border-dashed border-border text-center text-muted-foreground text-xs">
                Form Discovery belum terisi untuk prospek ini.
              </div>
            )}
          </div>

          {/* Section 3: Notes */}
          {lead.notes && (
            <div className="space-y-1">
              <span className="font-semibold text-muted-foreground text-[10px] uppercase">
                {t("detailModal.notes")}
              </span>
              <p className="text-muted-foreground bg-muted/20 p-2.5 rounded-lg border border-border">
                {lead.notes}
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between pt-3 border-t border-border">
          {!isClientUser ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{t("detailModal.changeStageBtn")}:</span>
              <Select
                value={lead.stage}
                onValueChange={(val) => onStageChange(lead.id, val as SalesStage)}
              >
                <SelectTrigger className="h-8 text-xs bg-background border-border w-[140px] cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SALES_STAGES.map((stg) => (
                    <SelectItem key={stg} value={stg} className="text-xs cursor-pointer">
                      {stg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div />
          )}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          >
            {t("detailModal.close")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
