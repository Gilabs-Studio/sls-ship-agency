/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Mail,
  Phone,
  ShieldCheck,
  History,
  Star,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Anchor,
  FileText,
  RefreshCw,
  Tag,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Agent } from "../types/vessel-agent.types";

interface AgentDetailDrawerProps {
  agent: Agent | null;
  onClose: () => void;
  onOpenRenewCert: (certId: string) => void;
}

export function AgentDetailDrawer({
  agent,
  onClose,
  onOpenRenewCert,
}: AgentDetailDrawerProps) {
  const t = useTranslations("vessels");

  return (
    <Sheet open={!!agent} onOpenChange={(open) => !open && onClose()}>
      {agent && (
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto p-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header */}
            <SheetHeader className="p-0 border-b border-border/80 pb-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xl overflow-hidden shrink-0">
                  {agent.avatar ? (
                    <img src={agent.avatar} alt={agent.name} className="h-full w-full object-cover" />
                  ) : (
                    agent.name.substring(0, 2).toUpperCase()
                  )}
                </div>
                <div className="space-y-1">
                  <SheetTitle className="text-lg font-bold text-foreground">
                    {agent.name}
                  </SheetTitle>
                  <SheetDescription className="text-xs text-muted-foreground font-medium">
                    {agent.mainRank}
                  </SheetDescription>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[10px]">
                      {agent.status}
                    </Badge>
                    {agent.currentVessel && (
                      <span className="text-[11px] text-sky-500 font-semibold flex items-center gap-1">
                        <Anchor className="h-3 w-3" /> {agent.currentVessel}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </SheetHeader>

            {/* Quick Metrics & Sea Time Box */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-muted/40 p-4 rounded-xl border border-border">
              <div>
                <span className="text-[11px] text-muted-foreground block">{t("drawer.seaTimeAccumulated")}</span>
                <span className="text-lg font-bold text-primary">{agent.seaTimeMonths} Bulan</span>
                <span className="text-[10px] text-muted-foreground block">
                  (~{(agent.seaTimeMonths / 12).toFixed(1)} Tahun Laut)
                </span>
              </div>
              <div>
                <span className="text-[11px] text-muted-foreground block">Skor Rating Kapten</span>
                <div className="flex items-center gap-1 text-lg font-bold text-amber-400">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <span>{agent.overallRating.toFixed(1)}</span>
                  <span className="text-xs font-normal text-muted-foreground">/ 5.0</span>
                </div>
              </div>
              <div>
                <span className="text-[11px] text-muted-foreground block">Jumlah Sertifikat</span>
                <span className="text-lg font-bold text-foreground">{agent.certificates.length} Dokumen</span>
              </div>
            </div>

            {/* Contact & Personal Data */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                <span>{t("drawer.contactInfo")}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-card p-3 rounded-xl border border-border/80">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-semibold text-foreground">{agent.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Telepon:</span>
                  <span className="font-semibold text-foreground">{agent.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">{t("drawer.passportNo")}:</span>
                  <span className="font-mono font-semibold text-foreground">{agent.passportNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">{t("drawer.seamanBookNo")}:</span>
                  <span className="font-mono font-semibold text-foreground">{agent.seamanBookNumber}</span>
                </div>
                <div className="col-span-1 sm:col-span-2 pt-1 border-t border-border/40 text-[11px] text-muted-foreground">
                  <strong>{t("drawer.emergencyContact")}:</strong> {agent.emergencyContactName} ({agent.emergencyContactPhone})
                </div>
              </div>
            </div>

            {/* Flags & Special Skills */}
            {agent.flags && agent.flags.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" />
                  <span>{t("drawer.flags")}</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {agent.flags.map((flag, idx) => (
                    <Badge key={idx} variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[11px]">
                      {flag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates List */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{t("drawer.certificates")}</span>
              </h3>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {agent.certificates.map((cert) => {
                  const isExp = cert.status === "expired";
                  const isNear = cert.status === "near-expiry";

                  return (
                    <div
                      key={cert.id}
                      className="p-3 rounded-xl bg-muted/30 border border-border flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground">{cert.name}</span>
                          <Badge
                            variant="outline"
                            className={
                              isExp
                                ? "bg-destructive/10 text-destructive border-destructive/30 text-[10px]"
                                : isNear
                                ? "bg-amber-500/10 text-amber-500 border-amber-500/30 text-[10px]"
                                : "bg-emerald-500/10 text-emerald-500 border-emerald-500/30 text-[10px]"
                            }
                          >
                            {isExp ? (
                              <span className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Expired</span>
                            ) : isNear ? (
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Expiring ({cert.daysRemaining} hari)</span>
                            ) : (
                              <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Valid</span>
                            )}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          No: <span className="font-mono">{cert.certNumber}</span> • Penerbit: {cert.issuingAuthority} • Exp: {cert.expiryDate}
                        </p>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onOpenRenewCert(cert.id)}
                        className="h-7 text-[10px] gap-1 cursor-pointer hover:bg-primary/10 hover:text-primary shrink-0"
                      >
                        <RefreshCw className="h-3 w-3" />
                        <span>Perpanjang</span>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Past Placement History */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <History className="h-3.5 w-3.5" />
                <span>{t("drawer.placementHistory")}</span>
              </h3>
              {agent.placementHistory.length === 0 ? (
                <p className="text-xs text-muted-foreground italic bg-muted/20 p-3 rounded-xl border border-border">
                  Belum ada riwayat penempatan kapal sebelumnya.
                </p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {agent.placementHistory.map((hist) => (
                    <div key={hist.id} className="p-3 rounded-xl bg-card border border-border/80 space-y-1 text-xs">
                      <div className="flex justify-between font-bold">
                        <span className="text-foreground flex items-center gap-1.5">
                          <Anchor className="h-3.5 w-3.5 text-sky-500" /> {hist.vesselName} ({hist.vesselType})
                        </span>
                        <span className="text-muted-foreground font-normal">{hist.durationMonths} Bulan</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        Sign On: {hist.signOnDate} &rarr; Sign Off: {hist.signOffDate} • Jabatan: {hist.rank}
                      </p>
                      {hist.captainFeedback && (
                        <p className="text-[11px] text-foreground italic bg-muted/40 p-2 rounded-lg mt-1 border border-border/40">
                          &quot;{hist.captainFeedback}&quot; — <span className="font-semibold text-amber-500">Rating: {hist.rating}★</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <SheetFooter className="p-0 pt-4 border-t border-border mt-6">
            <Button variant="outline" size="sm" onClick={onClose} className="h-8 text-xs cursor-pointer ml-auto">
              Tutup
            </Button>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  );
}
