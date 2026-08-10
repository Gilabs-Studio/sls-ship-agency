"use client";

import React, { useState } from "react";
import { useMaritimeStore } from "@/lib/mock-maritime-store";
import { useRole } from "@/contexts/role-context";
import type { Company, CompanyLifecycleStage } from "@/types/maritime.types";
import { toast } from "sonner";
import {
  Building2,
  Kanban,
  Table as TableIcon,
  Search,
  Users,
  Ship,
  FileText,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Layers,
  History,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LIFECYCLE_STAGES: CompanyLifecycleStage[] = [
  "New Client",
  "Onboarding",
  "Active",
  "Renewal Risk",
  "Renewed",
  "Dormant",
  "Churned",
];

export default function ClientsPage() {
  const { companies, vessels, updateCompanyLifecycleStage } = useMaritimeStore();
  const { isClientUser, clientCompanyName } = useRole();
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const displayCompanies = isClientUser
    ? companies.filter((c) => c.name === clientCompanyName)
    : companies;

  const filteredCompanies = displayCompanies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.primaryPicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.businessType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStageChange = (companyId: string, newStage: CompanyLifecycleStage) => {
    updateCompanyLifecycleStage(companyId, newStage);
    toast.info(`Status lifecycle perusahaan diperbarui menjadi: ${newStage}`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-tight">Client Accounts &amp; Lifecycle Management</h1>
            <Badge variant="outline" className="bg-[#ACFCCC]/10 text-[#22c55e] border-[#ACFCCC]/30 text-xs">
              7 Lifecycle Stages
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Pantau status retensi akun perusahaan pelayaran, perpanjangan kontrak tahunan, dan profil armada.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
            <Button
              variant={viewMode === "kanban" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("kanban")}
              className="h-8 text-xs gap-1.5 cursor-pointer"
            >
              <Kanban className="h-3.5 w-3.5" />
              Kanban Lifecycle
            </Button>
            <Button
              variant={viewMode === "table" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="h-8 text-xs gap-1.5 cursor-pointer"
            >
              <TableIcon className="h-3.5 w-3.5" />
              Daftar Klien
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari perusahaan pelayaran, kota, atau PIC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs glass-input"
          />
        </div>
      </div>

      {/* KANBAN LIFECYCLE VIEW */}
      {viewMode === "kanban" && (
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2">
          {LIFECYCLE_STAGES.map((stage) => {
            const stageCompanies = filteredCompanies.filter((c) => c.lifecycleStage === stage);
            const totalMrr = stageCompanies.reduce((acc, c) => acc + c.mrrValue, 0);

            return (
              <div
                key={stage}
                className="w-80 shrink-0 bg-card/40 backdrop-blur-xl rounded-2xl border border-white/10 p-3.5 flex flex-col gap-3 min-h-[500px]"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase tracking-wider">{stage}</span>
                    <Badge
                      variant="secondary"
                      className={
                        stage === "Renewal Risk"
                          ? "bg-amber-500/20 text-amber-400 text-[10px]"
                          : stage === "Active" || stage === "Renewed"
                          ? "bg-emerald-500/20 text-emerald-400 text-[10px]"
                          : "text-[10px]"
                      }
                    >
                      {stageCompanies.length}
                    </Badge>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium">
                    Rp {(totalMrr / 1000000).toFixed(0)}M/bln
                  </span>
                </div>

                {/* Company Cards */}
                <div className="space-y-3 flex-1">
                  {stageCompanies.map((company) => (
                    <Card
                      key={company.id}
                      className="glass-card hover:border-[#8FC5FF]/50 transition-all cursor-pointer group"
                      onClick={() => setSelectedCompany(company)}
                    >
                      <CardContent className="p-3.5 space-y-2.5">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-xs group-hover:text-[#8FC5FF] transition-colors">
                              {company.name}
                            </h4>
                            <span className="text-[10px] text-muted-foreground">{company.code}</span>
                          </div>
                          <Badge variant="outline" className="text-[9px] border-white/10">
                            {company.fleetCount} Kapal
                          </Badge>
                        </div>

                        <div className="space-y-1 text-[11px] text-muted-foreground">
                          <p className="flex items-center gap-1.5">
                            <Building2 className="h-3 w-3 text-[#ACFCCC]" />
                            <span>{company.businessType}</span>
                          </p>
                          <p className="flex items-center gap-1.5">
                            <Users className="h-3 w-3 text-[#8FC5FF]" />
                            <span>PIC: {company.primaryPicName}</span>
                          </p>
                          <p className="flex items-center gap-1.5 font-medium text-foreground">
                            <DollarSign className="h-3 w-3 text-emerald-400" />
                            <span>Rp {(company.mrrValue / 1000000).toFixed(0)} Juta / bulan</span>
                          </p>
                        </div>

                        {/* Lifecycle Selector */}
                        {!isClientUser && (
                          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                            <Select
                              value={company.lifecycleStage}
                              onValueChange={(val) =>
                                handleStageChange(company.id, val as CompanyLifecycleStage)
                              }
                            >
                              <SelectTrigger className="h-7 text-[10px] bg-white/5 border-white/10 w-[140px]">
                                <SelectValue placeholder="Ubah Stage" />
                              </SelectTrigger>
                              <SelectContent>
                                {LIFECYCLE_STAGES.map((stg) => (
                                  <SelectItem key={stg} value={stg} className="text-xs">
                                    {stg}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 text-[10px] text-[#8FC5FF] hover:text-white px-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCompany(company);
                              }}
                            >
                              Profil Klien
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {stageCompanies.length === 0 && (
                    <div className="h-32 rounded-xl border border-dashed border-white/10 flex items-center justify-center text-[11px] text-muted-foreground">
                      Tidak ada klien di stage ini
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === "table" && (
        <Card className="glass-card border-white/10">
          <CardContent className="p-0">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-muted-foreground uppercase font-semibold text-[10px]">
                <tr>
                  <th className="p-3.5">Perusahaan</th>
                  <th className="p-3.5">Lini Bisnis</th>
                  <th className="p-3.5">Area Operasi</th>
                  <th className="p-3.5">Jumlah Armada</th>
                  <th className="p-3.5">Status Lifecycle</th>
                  <th className="p-3.5">Nilai MRR</th>
                  <th className="p-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredCompanies.map((comp) => (
                  <tr key={comp.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-bold">
                      <div>{comp.name}</div>
                      <div className="text-[10px] text-muted-foreground">{comp.code}</div>
                    </td>
                    <td className="p-3.5 text-muted-foreground">{comp.businessType}</td>
                    <td className="p-3.5 text-muted-foreground">{comp.operatingArea}</td>
                    <td className="p-3.5 font-semibold">{comp.fleetCount} Kapal</td>
                    <td className="p-3.5">
                      <Badge
                        variant="outline"
                        className={
                          comp.lifecycleStage === "Active" || comp.lifecycleStage === "Renewed"
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]"
                            : comp.lifecycleStage === "Renewal Risk"
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px]"
                            : "text-[10px]"
                        }
                      >
                        {comp.lifecycleStage}
                      </Badge>
                    </td>
                    <td className="p-3.5 font-semibold text-emerald-400">
                      Rp {comp.mrrValue.toLocaleString("id-ID")}
                    </td>
                    <td className="p-3.5 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs glass-pill"
                        onClick={() => setSelectedCompany(comp)}
                      >
                        Detail Profil
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* COMPANY DETAIL MODAL / PROFILE SHEET */}
      <Dialog open={Boolean(selectedCompany)} onOpenChange={(open) => !open && setSelectedCompany(null)}>
        <DialogContent className="glass-card max-w-2xl border-white/10">
          {selectedCompany && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between pr-6">
                  <div>
                    <DialogTitle className="text-lg font-bold flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-[#8FC5FF]" />
                      {selectedCompany.name}
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                      {selectedCompany.code} • {selectedCompany.businessType} • {selectedCompany.operatingArea}
                    </DialogDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs px-3 py-1 font-bold"
                  >
                    {selectedCompany.lifecycleStage}
                  </Badge>
                </div>
              </DialogHeader>

              <Tabs defaultValue="profile" className="pt-2">
                <TabsList className="bg-white/5 border border-white/10 h-9">
                  <TabsTrigger value="profile" className="text-xs">
                    Profil Account
                  </TabsTrigger>
                  <TabsTrigger value="fleet" className="text-xs">
                    Armada Kapal ({selectedCompany.fleetCount})
                  </TabsTrigger>
                  <TabsTrigger value="contracts" className="text-xs">
                    Kontrak &amp; MRR
                  </TabsTrigger>
                  <TabsTrigger value="history" className="text-xs">
                    Riwayat Komunikasi
                  </TabsTrigger>
                </TabsList>

                {/* Tab 1: Profile */}
                <TabsContent value="profile" className="space-y-4 pt-3 text-xs">
                  <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#8FC5FF]" />
                        <strong>PIC Utama:</strong> {selectedCompany.primaryPicName}
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <strong>Email:</strong> {selectedCompany.primaryPicEmail}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <strong>No. HP:</strong> {selectedCompany.primaryPicPhone}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <strong>Alamat Kantor:</strong> {selectedCompany.address}, {selectedCompany.city}
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <strong>Onboarding:</strong> {selectedCompany.onboardingDate}
                      </p>
                    </div>
                  </div>

                  {selectedCompany.notes && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300">
                      <strong>Catatan Account Manager:</strong> {selectedCompany.notes}
                    </div>
                  )}
                </TabsContent>

                {/* Tab 2: Fleet */}
                <TabsContent value="fleet" className="pt-3 space-y-2 text-xs">
                  <div className="divide-y divide-white/10">
                    {vessels
                      .filter((v) => v.companyId === selectedCompany.id || v.companyName === selectedCompany.name)
                      .map((vessel) => (
                        <div key={vessel.id} className="py-2.5 flex items-center justify-between">
                          <div>
                            <span className="font-bold">{vessel.name}</span>
                            <span className="text-[11px] text-muted-foreground ml-2">({vessel.imoNumber})</span>
                            <div className="text-[10px] text-muted-foreground">
                              {vessel.vesselType} • GT {vessel.grossTonnage} • Loc: {vessel.currentPortLocation}
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              vessel.seaworthinessStatus === "Layak Operasi"
                                ? "bg-emerald-500/20 text-emerald-400 text-[10px]"
                                : "bg-red-500/20 text-red-400 text-[10px]"
                            }
                          >
                            {vessel.seaworthinessStatus}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                {/* Tab 3: Contracts */}
                <TabsContent value="contracts" className="pt-3 space-y-3 text-xs">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nilai Retainer Keagenan (MRR):</span>
                      <span className="font-bold text-emerald-400">
                        Rp {selectedCompany.mrrValue.toLocaleString("id-ID")} / bulan
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Kontrak Aktif Terdaftar:</span>
                      <span className="font-bold">{selectedCompany.activeContractsCount} Layanan</span>
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 4: History */}
                <TabsContent value="history" className="pt-3 space-y-2 text-xs">
                  <div className="space-y-2">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex justify-between font-semibold">
                        <span>Meeting Review Kontrak Tahunan</span>
                        <span className="text-[10px] text-muted-foreground">05 Agt 2026</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        PIC menyetujui perpanjangan paket bundel 10 armada kapal peti kemas.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
