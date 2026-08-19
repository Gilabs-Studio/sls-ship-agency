"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle, Clock, ShieldAlert, RefreshCw, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { AgentCertificate } from "../types/vessel-agent.types";

interface ComplianceAlertWidgetProps {
  alerts: {
    agentId: string;
    agentName: string;
    agentRank: string;
    cert: AgentCertificate;
  }[];
  onOpenRenewCert: (certId: string) => void;
}

export function ComplianceAlertWidget({ alerts, onOpenRenewCert }: ComplianceAlertWidgetProps) {
  const t = useTranslations("vessels");
  const [filterType, setFilterType] = useState<"all" | "expired" | "near-expiry">("all");
  const [search, setSearch] = useState("");

  const filteredAlerts = alerts.filter((item) => {
    const matchesFilter =
      filterType === "all" ? true : item.cert.status === filterType;
    const matchesSearch =
      item.agentName.toLowerCase().includes(search.toLowerCase()) ||
      item.cert.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const expiredCount = alerts.filter((a) => a.cert.status === "expired").length;
  const nearExpiryCount = alerts.filter((a) => a.cert.status === "near-expiry").length;

  return (
    <Card className="glass-card border border-border shadow-md">
      {/* Title Header */}
      <CardHeader className="pb-3 border-b border-border/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <span>{t("compliance.title")}</span>
            </CardTitle>
            <CardDescription className="text-xs mt-1">
              {t("compliance.subtitle")}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs px-2.5 py-0.5">
              {expiredCount} Kadaluarsa
            </Badge>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-xs px-2.5 py-0.5">
              {nearExpiryCount} Mendekati Expired
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-muted/30 p-2.5 rounded-xl border border-border/60">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Cari nama kru atau dokumen..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8 text-xs glass-input"
            />
          </div>

          <div className="flex items-center gap-1 bg-card border border-border p-1 rounded-lg">
            <Button
              variant={filterType === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilterType("all")}
              className={`h-7 px-3 text-xs cursor-pointer ${
                filterType === "all" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground"
              }`}
            >
              Semua ({alerts.length})
            </Button>
            <Button
              variant={filterType === "expired" ? "destructive" : "ghost"}
              size="sm"
              onClick={() => setFilterType("expired")}
              className={`h-7 px-3 text-xs cursor-pointer ${
                filterType === "expired" ? "font-semibold" : "text-muted-foreground"
              }`}
            >
              Expired
            </Button>
            <Button
              variant={filterType === "near-expiry" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFilterType("near-expiry")}
              className={`h-7 px-3 text-xs cursor-pointer ${
                filterType === "near-expiry" ? "bg-amber-500/20 text-amber-500 font-semibold" : "text-muted-foreground"
              }`}
            >
              Mendekati Expired
            </Button>
          </div>
        </div>

        {/* Warning Cards List */}
        <div className="space-y-3">
          {filteredAlerts.length === 0 ? (
            <div className="p-8 text-center bg-muted/20 border border-border/60 rounded-xl text-xs text-muted-foreground">
              Tidak ada dokumen yang memerlukan perhatian mendesak saat ini.
            </div>
          ) : (
            filteredAlerts.map((item, idx) => {
              const isExp = item.cert.status === "expired";

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isExp
                      ? "bg-destructive/5 border-destructive/20 hover:border-destructive/40"
                      : "bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40"
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-foreground text-xs">{item.agentName}</span>
                      <span className="text-[11px] text-muted-foreground">({item.agentRank})</span>
                      <Badge
                        variant="outline"
                        className={
                          isExp
                            ? "bg-destructive/15 text-destructive border-destructive/30 text-[10px] gap-1 px-2 py-0.5"
                            : "bg-amber-500/15 text-amber-500 border-amber-500/30 text-[10px] gap-1 px-2 py-0.5"
                        }
                      >
                        {isExp ? (
                          <>
                            <AlertTriangle className="h-3 w-3" /> Kadaluarsa ({Math.abs(item.cert.daysRemaining)} Hari Lalu)
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3" /> Sisa {item.cert.daysRemaining} Hari
                          </>
                        )}
                      </Badge>
                    </div>

                    <p className="text-xs font-semibold text-foreground">
                      Sertifikat: {item.cert.name}
                    </p>

                    <p className="text-[11px] text-muted-foreground">
                      No: <span className="font-mono">{item.cert.certNumber}</span> • Penerbit: {item.cert.issuingAuthority} • Expired: {item.cert.expiryDate}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => onOpenRenewCert(item.cert.id)}
                    className={`h-8 text-xs gap-1.5 cursor-pointer shrink-0 font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                      isExp
                        ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        : "bg-amber-500 text-black hover:bg-amber-400 font-bold"
                    }`}
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>{t("compliance.renewBtn")}</span>
                  </Button>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
