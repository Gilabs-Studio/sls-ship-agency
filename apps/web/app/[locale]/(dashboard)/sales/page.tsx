"use client";

import React, { useState } from "react";
import { useMaritimeStore } from "@/lib/mock-maritime-store";
import { useRole } from "@/contexts/role-context";
import type { LeadOpportunity, SalesStage, QualificationDiscoveryForm } from "@/types/maritime.types";
import { toast } from "sonner";
import {
  TrendingUp,
  Plus,
  Kanban,
  Table as TableIcon,
  Search,
  Building2,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ClipboardCheck,
  Send,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SALES_STAGES: SalesStage[] = [
  "Lead",
  "Qualified",
  "Discovery",
  "Proposal Sent",
  "Negotiation",
  "Won",
  "Lost",
];

export default function SalesPipelinePage() {
  const { leads, updateLeadStage, addLead, updateLeadQualification } = useMaritimeStore();
  const { isClientUser } = useRole();
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<LeadOpportunity | null>(null);

  // Modal States
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isDiscoveryFormOpen, setIsDiscoveryFormOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  // Form State for Add Lead
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newContactEmail, setNewContactEmail] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newPotentialValue, setNewPotentialValue] = useState("150000000");

  // Form State for Discovery
  const [vesselCount, setVesselCount] = useState("5");
  const [expiringCerts, setExpiringCerts] = useState("SOLAS, MARPOL, ISM Code");
  const [outsourceNeeds, setOutsourceNeeds] = useState("UWILD Diving, Radio Survey");
  const [painPoints, setPainPoints] = useState("Pengurusan perizinan sering terlambat dari target.");
  const [budgetRange, setBudgetRange] = useState("Rp 100M - Rp 200M / bulan");

  const filteredLeads = leads.filter(
    (l) =>
      l.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStageChange = (leadId: string, newStage: SalesStage) => {
    updateLeadStage(leadId, newStage);
    if (newStage === "Won") {
      toast.success(`🎉 Lead ${leadId} BERHASIL WON! Klien resmi di-onboard ke Client Lifecycle.`);
    } else {
      toast.info(`Stage lead diperbarui menjadi ${newStage}`);
    }
  };

  const handleCreateLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName || !newContactName) {
      toast.error("Mohon lengkapi nama perusahaan dan PIC.");
      return;
    }
    addLead({
      companyName: newCompanyName,
      businessType: "Container Carrier",
      contactName: newContactName,
      contactEmail: newContactEmail || "pic@company.com",
      contactPhone: newContactPhone || "+62 812-0000-1111",
      leadSource: "Inbound Website",
      stage: "Lead",
      potentialValueMonthly: Number(newPotentialValue),
      priorityScore: 80,
      assignedSales: "Sales Team",
      notes: "Lead prospek baru diajukan melalui portal.",
    });
    toast.success(`Lead ${newCompanyName} berhasil ditambahkan!`);
    setIsAddLeadOpen(false);
    setNewCompanyName("");
    setNewContactName("");
  };

  const handleDiscoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;
    const qualificationData: QualificationDiscoveryForm = {
      vesselCountNeeded: Number(vesselCount),
      frequentlyExpiringCerts: expiringCerts.split(",").map((s) => s.trim()),
      outsourcingNeeds: outsourceNeeds.split(",").map((s) => s.trim()),
      currentAgencyPainPoints: painPoints,
      expectedStartDate: "2026-09-01",
      budgetRangeMonthly: budgetRange,
      decisionMakerName: selectedLead.contactName,
    };
    updateLeadQualification(selectedLead.id, qualificationData);
    toast.success(`Form Kualifikasi & Discovery ${selectedLead.companyName} berhasil disimpan! Stage diubah ke Qualified.`);
    setIsDiscoveryFormOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-tight">Sales &amp; Opportunity Pipeline</h1>
            <Badge variant="outline" className="bg-[#8FC5FF]/10 text-[#8FC5FF] border-[#8FC5FF]/30 text-xs">
              6 Pipeline Stages
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Kelola prospek agen kapal niaga dari Lead Inbound, Kualifikasi Discovery, Proposal, hingga Closing Contract.
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
              Kanban
            </Button>
            <Button
              variant={viewMode === "table" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="h-8 text-xs gap-1.5 cursor-pointer"
            >
              <TableIcon className="h-3.5 w-3.5" />
              Tabel
            </Button>
          </div>

          {!isClientUser && (
            <Button
              onClick={() => setIsAddLeadOpen(true)}
              className="bg-[#ACFCCC] text-black hover:bg-[#96f7bb] font-bold text-xs shadow-md"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Tambah Lead Prospek
            </Button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari perusahaan atau nama PIC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs glass-input"
          />
        </div>
      </div>

      {/* View Mode 1: KANBAN BOARD */}
      {viewMode === "kanban" && (
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2">
          {SALES_STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.stage === stage);
            const totalStageValue = stageLeads.reduce((acc, l) => acc + l.potentialValueMonthly, 0);

            return (
              <div
                key={stage}
                className="w-80 shrink-0 bg-card/40 backdrop-blur-xl rounded-2xl border border-white/10 p-3.5 flex flex-col gap-3 min-h-[500px]"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase tracking-wider">{stage}</span>
                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
                      {stageLeads.length}
                    </Badge>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium">
                    Rp {(totalStageValue / 1000000).toFixed(0)}M/bln
                  </span>
                </div>

                {/* Lead Cards List */}
                <div className="space-y-3 flex-1">
                  {stageLeads.map((lead) => (
                    <Card
                      key={lead.id}
                      className="glass-card hover:border-[#ACFCCC]/50 transition-all cursor-pointer group"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <CardContent className="p-3.5 space-y-2.5">
                        <div className="flex items-start justify-between">
                          <h4 className="font-bold text-xs group-hover:text-[#ACFCCC] transition-colors">
                            {lead.companyName}
                          </h4>
                          <Badge variant="outline" className="text-[9px] border-white/10 text-muted-foreground">
                            {lead.businessType.split(" ")[0]}
                          </Badge>
                        </div>

                        <div className="space-y-1 text-[11px] text-muted-foreground">
                          <p className="flex items-center gap-1.5">
                            <Building2 className="h-3 w-3 text-[#8FC5FF]" />
                            <span>PIC: {lead.contactName}</span>
                          </p>
                          <p className="flex items-center gap-1.5">
                            <DollarSign className="h-3 w-3 text-emerald-400" />
                            <span className="font-semibold text-foreground">
                              Rp {(lead.potentialValueMonthly / 1000000).toFixed(0)} Juta / bulan
                            </span>
                          </p>
                        </div>

                        {/* Discovery Qualification Indicator */}
                        {lead.qualification && (
                          <div className="bg-[#ACFCCC]/10 border border-[#ACFCCC]/20 p-2 rounded-lg text-[10px] text-[#22c55e] flex items-center justify-between font-medium">
                            <span className="flex items-center gap-1">
                              <ClipboardCheck className="h-3 w-3" /> Form Discovery Terisi
                            </span>
                            <span>{lead.qualification.vesselCountNeeded} Kapal</span>
                          </div>
                        )}

                        {/* Stage Selector */}
                        {!isClientUser && (
                          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                            <Select
                              value={lead.stage}
                              onValueChange={(val) => handleStageChange(lead.id, val as SalesStage)}
                            >
                              <SelectTrigger className="h-7 text-[10px] bg-white/5 border-white/10 w-[130px]">
                                <SelectValue placeholder="Ubah Stage" />
                              </SelectTrigger>
                              <SelectContent>
                                {SALES_STAGES.map((stg) => (
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
                                setSelectedLead(lead);
                                setIsDiscoveryFormOpen(true);
                              }}
                            >
                              Discovery
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="h-32 rounded-xl border border-dashed border-white/10 flex items-center justify-center text-[11px] text-muted-foreground">
                      Tidak ada lead di stage ini
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View Mode 2: TABLE VIEW */}
      {viewMode === "table" && (
        <Card className="glass-card border-white/10">
          <CardContent className="p-0">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-muted-foreground uppercase font-semibold text-[10px]">
                <tr>
                  <th className="p-3.5">Perusahaan</th>
                  <th className="p-3.5">Jenis Usaha</th>
                  <th className="p-3.5">PIC &amp; Kontak</th>
                  <th className="p-3.5">Stage</th>
                  <th className="p-3.5">Nilai Potensial</th>
                  <th className="p-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-bold">{lead.companyName}</td>
                    <td className="p-3.5 text-muted-foreground">{lead.businessType}</td>
                    <td className="p-3.5">
                      <div>{lead.contactName}</div>
                      <div className="text-[10px] text-muted-foreground">{lead.contactEmail}</div>
                    </td>
                    <td className="p-3.5">
                      <Badge variant="outline" className="bg-[#8FC5FF]/10 text-[#8FC5FF] border-[#8FC5FF]/30 text-[10px]">
                        {lead.stage}
                      </Badge>
                    </td>
                    <td className="p-3.5 font-semibold text-emerald-400">
                      Rp {lead.potentialValueMonthly.toLocaleString("id-ID")} / bln
                    </td>
                    <td className="p-3.5 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs glass-pill"
                        onClick={() => setSelectedLead(lead)}
                      >
                        Detail
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* MODAL 1: ADD NEW LEAD */}
      <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
        <DialogContent className="glass-card max-w-md border-white/10">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Tambah Lead Prospek Baru</DialogTitle>
            <DialogDescription className="text-xs">
              Masukkan informasi dasar perusahaan pelayaran untuk masuk ke pipeline sales.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateLeadSubmit} className="space-y-3 text-xs pt-2">
            <div className="space-y-1">
              <Label>Nama Perusahaan Pelayaran</Label>
              <Input
                placeholder="Contoh: PT Pelayaran Samudera Jaya"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                className="glass-input h-9 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Nama PIC Utama</Label>
                <Input
                  placeholder="Contoh: Capt. Irwan"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className="glass-input h-9 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label>Email PIC</Label>
                <Input
                  placeholder="pic@company.com"
                  value={newContactEmail}
                  onChange={(e) => setNewContactEmail(e.target.value)}
                  className="glass-input h-9 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>No. WhatsApp / HP</Label>
                <Input
                  placeholder="+62 812-..."
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  className="glass-input h-9 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label>Estimasi Nilai Kontrak (IDR/bln)</Label>
                <Input
                  type="number"
                  value={newPotentialValue}
                  onChange={(e) => setNewPotentialValue(e.target.value)}
                  className="glass-input h-9 text-xs"
                />
              </div>
            </div>

            <DialogFooter className="pt-3">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddLeadOpen(false)}>
                Batal
              </Button>
              <Button type="submit" size="sm" className="bg-[#ACFCCC] text-black font-bold">
                Simpan Lead
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: LEAD QUALIFICATION & DISCOVERY FORM */}
      <Dialog open={isDiscoveryFormOpen} onOpenChange={setIsDiscoveryFormOpen}>
        <DialogContent className="glass-card max-w-lg border-white/10">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-[#ACFCCC]" />
              Form Kualifikasi &amp; Discovery Needs
            </DialogTitle>
            <DialogDescription className="text-xs">
              Isi data kebutuhan armada &amp; pain points perizinan untuk prospek:{" "}
              <strong className="text-foreground">{selectedLead?.companyName}</strong>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleDiscoverySubmit} className="space-y-3 text-xs pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Jumlah Kapal Yang Dikelola</Label>
                <Input
                  type="number"
                  value={vesselCount}
                  onChange={(e) => setVesselCount(e.target.value)}
                  className="glass-input h-9 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label>Budget Keagenan per Bulan</Label>
                <Input
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="glass-input h-9 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Sertifikat Kapal Yang Sering Expired / Bermasalah</Label>
              <Input
                value={expiringCerts}
                onChange={(e) => setExpiringCerts(e.target.value)}
                placeholder="SOLAS, MARPOL, ISM Code, SIUPAL"
                className="glass-input h-9 text-xs"
              />
            </div>

            <div className="space-y-1">
              <Label>Kebutuhan Layanan Outsource (Vendor Technical)</Label>
              <Input
                value={outsourceNeeds}
                onChange={(e) => setOutsourceNeeds(e.target.value)}
                placeholder="UWILD Diving Survey, GMDSS Radio Test"
                className="glass-input h-9 text-xs"
              />
            </div>

            <div className="space-y-1">
              <Label>Keluhan &amp; Constraint Agen Kapal Saat Ini</Label>
              <Textarea
                value={painPoints}
                onChange={(e) => setPainPoints(e.target.value)}
                placeholder="Sebutkan kendala operasional yang dialami klien..."
                className="glass-input text-xs min-h-[70px]"
              />
            </div>

            <DialogFooter className="pt-3">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsDiscoveryFormOpen(false)}>
                Batal
              </Button>
              <Button type="submit" size="sm" className="bg-[#ACFCCC] text-black font-bold">
                Simpan &amp; Set Qualified
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
