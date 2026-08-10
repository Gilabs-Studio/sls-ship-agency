"use client";

import React, { useState } from "react";
import { useMaritimeStore } from "@/lib/mock-maritime-store";
import { useRole } from "@/contexts/role-context";
import type { ServiceRequest, ServiceRequestStage } from "@/types/maritime.types";
import { toast } from "sonner";
import {
  ClipboardList,
  Kanban,
  Table as TableIcon,
  Search,
  Plus,
  Ship,
  UserCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  MapPin,
  Percent,
  User,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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

const REQUEST_STAGES: ServiceRequestStage[] = [
  "Request Created",
  "Verified",
  "Assigned",
  "In Progress",
  "Waiting Approval",
  "Completed",
  "Closed",
];

export default function ServiceRequestsPage() {
  const {
    serviceRequests,
    companies,
    vessels,
    vendors,
    updateServiceRequestStage,
    assignServiceRequest,
    addServiceRequest,
  } = useMaritimeStore();

  const { isClientUser, clientCompanyName } = useRole();
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States
  const [isAddRequestOpen, setIsAddRequestOpen] = useState(false);
  const [selectedRequestToAssign, setSelectedRequestToAssign] = useState<ServiceRequest | null>(null);

  // Form state for new request
  const [newTitle, setNewTitle] = useState("");
  const [newCompanyId, setNewCompanyId] = useState("comp-1");
  const [newVesselId, setNewVesselId] = useState("vess-1");
  const [newServiceType, setNewServiceType] = useState<any>("Port Clearance & Formalities");
  const [newPriority, setNewPriority] = useState<"Urgent" | "High" | "Normal">("High");
  const [newPortLocation, setNewPortLocation] = useState("Pelabuhan Tanjung Priok");
  const [newDescription, setNewDescription] = useState("");

  // Assignee state
  const [assigneeType, setAssigneeType] = useState<"internal" | "outsource">("internal");
  const [assigneeName, setAssigneeName] = useState("Andi Wijaya (Ops Coordinator)");
  const [selectedVendorId, setSelectedVendorId] = useState("vend-1");

  const displayRequests = isClientUser
    ? serviceRequests.filter((r) => r.companyName === clientCompanyName)
    : serviceRequests;

  const filteredRequests = displayRequests.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.vesselName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.requestNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStageChange = (reqId: string, newStage: ServiceRequestStage) => {
    updateServiceRequestStage(reqId, newStage);
    toast.info(`Stage service request ${reqId} diubah ke: ${newStage}`);
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequestToAssign) return;

    let finalAssigneeName = assigneeName;
    if (assigneeType === "outsource") {
      const vendorObj = vendors.find((v) => v.id === selectedVendorId);
      if (vendorObj) finalAssigneeName = vendorObj.name;
    }

    assignServiceRequest(selectedRequestToAssign.id, assigneeType, finalAssigneeName, selectedVendorId);
    toast.success(`Service request ${selectedRequestToAssign.requestNo} berhasil di-assign ke ${finalAssigneeName}!`);
    setSelectedRequestToAssign(null);
  };

  const handleCreateRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) {
      toast.error("Mohon isi judul request.");
      return;
    }

    const companyObj = companies.find((c) => c.id === newCompanyId);
    const vesselObj = vessels.find((v) => v.id === newVesselId);

    addServiceRequest({
      title: newTitle,
      companyId: newCompanyId,
      companyName: companyObj?.name || "PT Samudera Indonesia Tbk",
      vesselId: newVesselId,
      vesselName: vesselObj?.name || "KM Samudera Sejahtera",
      serviceType: newServiceType,
      assigneeType: "internal",
      assigneeName: "Tim Operasional",
      deadline: "2026-08-30",
      priority: newPriority,
      description: newDescription || "Permohonan pengurusan keagenan kapal.",
      portLocation: newPortLocation,
    });

    toast.success(`Request "${newTitle}" berhasil diajukan!`);
    setIsAddRequestOpen(false);
    setNewTitle("");
    setNewDescription("");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-tight">Service Request Pipeline</h1>
            <Badge variant="outline" className="bg-[#8FC5FF]/10 text-[#8FC5FF] border-[#8FC5FF]/30 text-xs">
              7 Workflow Stages
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Pengajuan permohonan layanan keagenan, pengurusan clearance pelabuhan, dan perpanjangan sertifikat kapal.
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

          <Button
            onClick={() => setIsAddRequestOpen(true)}
            className="bg-[#ACFCCC] text-black hover:bg-[#96f7bb] font-bold text-xs shadow-md"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Ajukan Request Baru
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nomor SR, judul request, kapal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs glass-input"
          />
        </div>
      </div>

      {/* KANBAN VIEW */}
      {viewMode === "kanban" && (
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2">
          {REQUEST_STAGES.map((stage) => {
            const stageRequests = filteredRequests.filter((r) => r.stage === stage);

            return (
              <div
                key={stage}
                className="w-80 shrink-0 bg-card/40 backdrop-blur-xl rounded-2xl border border-white/10 p-3.5 flex flex-col gap-3 min-h-[500px]"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase tracking-wider">{stage}</span>
                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
                      {stageRequests.length}
                    </Badge>
                  </div>
                </div>

                {/* Request Cards */}
                <div className="space-y-3 flex-1">
                  {stageRequests.map((req) => (
                    <Card key={req.id} className="glass-card hover:border-[#ACFCCC]/50 transition-all">
                      <CardContent className="p-3.5 space-y-2.5">
                        <div className="flex items-start justify-between">
                          <span className="text-[10px] font-mono text-[#8FC5FF]">{req.requestNo}</span>
                          <Badge
                            variant="outline"
                            className={
                              req.priority === "Urgent"
                                ? "bg-red-500/20 text-red-400 border-red-500/30 text-[9px]"
                                : req.priority === "High"
                                ? "bg-amber-500/20 text-amber-400 border-amber-500/30 text-[9px]"
                                : "text-[9px]"
                            }
                          >
                            {req.priority}
                          </Badge>
                        </div>

                        <h4 className="font-bold text-xs leading-snug">{req.title}</h4>

                        <div className="space-y-1 text-[11px] text-muted-foreground">
                          <p className="flex items-center gap-1.5">
                            <Ship className="h-3 w-3 text-[#ACFCCC]" />
                            <span>Kapal: {req.vesselName}</span>
                          </p>
                          <p className="flex items-center gap-1.5">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span>{req.portLocation}</span>
                          </p>
                          <p className="flex items-center gap-1.5">
                            <User className="h-3 w-3 text-[#8FC5FF]" />
                            <span>Assigned: {req.assigneeName}</span>
                          </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-muted-foreground">
                            <span>Progress</span>
                            <span className="font-semibold">{req.progressPercentage}%</span>
                          </div>
                          <Progress value={req.progressPercentage} className="h-1.5 bg-white/10" />
                        </div>

                        {/* Action buttons */}
                        {!isClientUser && (
                          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                            <Select
                              value={req.stage}
                              onValueChange={(val) => handleStageChange(req.id, val as ServiceRequestStage)}
                            >
                              <SelectTrigger className="h-7 text-[10px] bg-white/5 border-white/10 w-[120px]">
                                <SelectValue placeholder="Ubah Stage" />
                              </SelectTrigger>
                              <SelectContent>
                                {REQUEST_STAGES.map((stg) => (
                                  <SelectItem key={stg} value={stg} className="text-xs">
                                    {stg}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 text-[10px] text-[#ACFCCC] hover:text-white px-2"
                              onClick={() => setSelectedRequestToAssign(req)}
                            >
                              Assign Staff/Vendor
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {stageRequests.length === 0 && (
                    <div className="h-32 rounded-xl border border-dashed border-white/10 flex items-center justify-center text-[11px] text-muted-foreground">
                      Tidak ada request di stage ini
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
                  <th className="p-3.5">No. Request</th>
                  <th className="p-3.5">Judul Request</th>
                  <th className="p-3.5">Perusahaan &amp; Kapal</th>
                  <th className="p-3.5">Prioritas</th>
                  <th className="p-3.5">Assigned To</th>
                  <th className="p-3.5">Stage</th>
                  <th className="p-3.5">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-mono text-[#8FC5FF]">{req.requestNo}</td>
                    <td className="p-3.5 font-bold">{req.title}</td>
                    <td className="p-3.5">
                      <div>{req.companyName}</div>
                      <div className="text-[10px] text-muted-foreground">Kapal: {req.vesselName}</div>
                    </td>
                    <td className="p-3.5">
                      <Badge variant="outline" className="text-[10px]">
                        {req.priority}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-muted-foreground">{req.assigneeName}</td>
                    <td className="p-3.5">
                      <Badge variant="secondary" className="text-[10px]">
                        {req.stage}
                      </Badge>
                    </td>
                    <td className="p-3.5 font-semibold text-[#ACFCCC]">{req.progressPercentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* MODAL 1: AJUKAN REQUEST BARU */}
      <Dialog open={isAddRequestOpen} onOpenChange={setIsAddRequestOpen}>
        <DialogContent className="glass-card max-w-md border-white/10">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Ajukan Service Request Baru</DialogTitle>
            <DialogDescription className="text-xs">
              Buat permohonan keagenan kapal, survey, atau perpanjangan sertifikat.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateRequestSubmit} className="space-y-3 text-xs pt-2">
            <div className="space-y-1">
              <Label>Judul Permohonan Service</Label>
              <Input
                placeholder="Contoh: Perpanjangan Sertifikat SOLAS Kapal KM X"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="glass-input h-9 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Pilih Kapal</Label>
                <Select value={newVesselId} onValueChange={setNewVesselId}>
                  <SelectTrigger className="glass-input h-9 text-xs">
                    <SelectValue placeholder="Pilih kapal" />
                  </SelectTrigger>
                  <SelectContent>
                    {vessels.map((v) => (
                      <SelectItem key={v.id} value={v.id} className="text-xs">
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>Tingkat Prioritas</Label>
                <Select value={newPriority} onValueChange={(val: any) => setNewPriority(val)}>
                  <SelectTrigger className="glass-input h-9 text-xs">
                    <SelectValue placeholder="Prioritas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Urgent" className="text-xs">
                      Urgent (&lt;24 jam)
                    </SelectItem>
                    <SelectItem value="High" className="text-xs">
                      High (2-3 hari)
                    </SelectItem>
                    <SelectItem value="Normal" className="text-xs">
                      Normal (&gt;5 hari)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label>Lokasi Pelabuhan Sandar</Label>
              <Input
                value={newPortLocation}
                onChange={(e) => setNewPortLocation(e.target.value)}
                className="glass-input h-9 text-xs"
              />
            </div>

            <div className="space-y-1">
              <Label>Deskripsi / Catatan Tambahan</Label>
              <Textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Jelaskan kebutuhan pengurusan secara detail..."
                className="glass-input text-xs min-h-[70px]"
              />
            </div>

            <DialogFooter className="pt-3">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddRequestOpen(false)}>
                Batal
              </Button>
              <Button type="submit" size="sm" className="bg-[#ACFCCC] text-black font-bold">
                Kirim Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: ASSIGN STAFF / OUTSOURCE VENDOR */}
      <Dialog open={Boolean(selectedRequestToAssign)} onOpenChange={(open) => !open && setSelectedRequestToAssign(null)}>
        <DialogContent className="glass-card max-w-md border-white/10">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Assign Staff Internal / Outsource Vendor</DialogTitle>
            <DialogDescription className="text-xs">
              Tentukan penanggung jawab untuk request: <strong className="text-foreground">{selectedRequestToAssign?.requestNo}</strong>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAssignSubmit} className="space-y-3 text-xs pt-2">
            <div className="space-y-1">
              <Label>Tipe Pelaksana</Label>
              <Select value={assigneeType} onValueChange={(val: any) => setAssigneeType(val)}>
                <SelectTrigger className="glass-input h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal" className="text-xs">
                    Staff Operasional Internal
                  </SelectItem>
                  <SelectItem value="outsource" className="text-xs">
                    Mitra Vendor Outsource
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {assigneeType === "internal" ? (
              <div className="space-y-1">
                <Label>Nama Staff Operasional</Label>
                <Input
                  value={assigneeName}
                  onChange={(e) => setAssigneeName(e.target.value)}
                  className="glass-input h-9 text-xs"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <Label>Pilih Mitra Vendor Outsource</Label>
                <Select value={selectedVendorId} onValueChange={setSelectedVendorId}>
                  <SelectTrigger className="glass-input h-9 text-xs">
                    <SelectValue placeholder="Pilih vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map((v) => (
                      <SelectItem key={v.id} value={v.id} className="text-xs">
                        {v.name} ({v.expertise.split(" ")[0]})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <DialogFooter className="pt-3">
              <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedRequestToAssign(null)}>
                Batal
              </Button>
              <Button type="submit" size="sm" className="bg-[#ACFCCC] text-black font-bold">
                Assign Penugasan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
