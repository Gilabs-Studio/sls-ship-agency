"use client";

import React, { useState } from "react";
import { useMaritimeStore } from "@/lib/mock-maritime-store";
import { useRole } from "@/contexts/role-context";
import type { OutsourceTask, OutsourceTaskStage, Vendor } from "@/types/maritime.types";
import { toast } from "sonner";
import {
  Handshake,
  Kanban,
  Table as TableIcon,
  Search,
  Plus,
  Star,
  Clock,
  CheckCircle2,
  FileText,
  DollarSign,
  Phone,
  Mail,
  Award,
  Upload,
  AlertCircle,
  Building2,
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

const OUTSOURCE_STAGES: OutsourceTaskStage[] = [
  "Task Required",
  "Vendor Selected",
  "Sent to Vendor",
  "Accepted",
  "In Progress",
  "Submitted",
  "Reviewed",
  "Approved/Rejected",
];

export default function OutsourcingPage() {
  const {
    outsourceTasks,
    vendors,
    serviceRequests,
    updateOutsourceTaskStage,
    createOutsourceTask,
  } = useMaritimeStore();

  const { isClientUser } = useRole();
  const [activeTab, setActiveTab] = useState<"pipeline" | "vendors">("pipeline");
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States
  const [isAssignVendorOpen, setIsAssignVendorOpen] = useState(false);
  const [selectedVendorForDetail, setSelectedVendorForDetail] = useState<Vendor | null>(null);

  // Form State
  const [selectedServiceRequestId, setSelectedServiceRequestId] = useState("req-[#101]");
  const [selectedVendorId, setSelectedVendorId] = useState("vend-1");
  const [taskTitle, setTaskTitle] = useState("Inspeksi UWILD & Survey Lambung Subsea");
  const [costEstimate, setCostEstimate] = useState("25000000");
  const [deadlineDate, setDeadlineDate] = useState("2026-08-25");

  const filteredTasks = outsourceTasks.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.serviceRequestNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVendors = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.expertise.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStageChange = (taskId: string, newStage: OutsourceTaskStage) => {
    updateOutsourceTaskStage(taskId, newStage);
    toast.info(`Stage task vendor outsource ${taskId} diubah ke: ${newStage}`);
  };

  const handleAssignTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vendorObj = vendors.find((v) => v.id === selectedVendorId);
    const reqObj = serviceRequests.find((r) => r.id === selectedServiceRequestId);

    createOutsourceTask({
      serviceRequestId: selectedServiceRequestId,
      serviceRequestNo: reqObj?.requestNo || "SR-2026-0801",
      title: taskTitle,
      vendorId: selectedVendorId,
      vendorName: vendorObj?.name || "PT. Nautiva Ocean Agency",
      expertise: vendorObj?.expertise || "Marine Survey & Technical Inspection",
      deadline: deadlineDate,
      costActual: Number(costEstimate),
      notes: "Tugas outsource diterbitkan via sistem agency.",
    });

    toast.success(`Task outsource berhasil ditugaskan ke vendor ${vendorObj?.name}!`);
    setIsAssignVendorOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-tight">Outsourcing &amp; Vendor Management</h1>
            <Badge variant="outline" className="bg-[#ACFCCC]/10 text-[#22c55e] border-[#ACFCCC]/30 text-xs">
              {vendors.length} Mitra Vendor Terverifikasi
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Kelola mitra outsource teknis (surveyor, penyelam subsea, perbaikan galangan, kesehatan pelaut) dan SLA pengerjaan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isClientUser && (
            <Button
              onClick={() => setIsAssignVendorOpen(true)}
              className="bg-[#ACFCCC] text-black hover:bg-[#96f7bb] font-bold text-xs shadow-md"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Tugaskan Vendor Baru
            </Button>
          )}
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-3">
          <TabsList className="bg-white/5 border border-white/10 h-10">
            <TabsTrigger value="pipeline" className="text-xs gap-1.5 cursor-pointer">
              <Kanban className="h-3.5 w-3.5 text-[#ACFCCC]" />
              Pipeline Outsource Task ({outsourceTasks.length})
            </TabsTrigger>
            <TabsTrigger value="vendors" className="text-xs gap-1.5 cursor-pointer">
              <Handshake className="h-3.5 w-3.5 text-[#8FC5FF]" />
              Direktori Vendor &amp; Rate Card ({vendors.length})
            </TabsTrigger>
          </TabsList>

          {activeTab === "pipeline" && (
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
          )}
        </div>

        {/* TAB 1: PIPELINE OUTSOURCE TASKS */}
        <TabsContent value="pipeline" className="pt-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari task outsource, nama vendor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs glass-input"
              />
            </div>
          </div>

          {viewMode === "kanban" ? (
            <div className="flex gap-4 overflow-x-auto pb-6 pt-2">
              {OUTSOURCE_STAGES.map((stage) => {
                const stageTasks = filteredTasks.filter((t) => t.stage === stage);

                return (
                  <div
                    key={stage}
                    className="w-80 shrink-0 bg-card/40 backdrop-blur-xl rounded-2xl border border-white/10 p-3.5 flex flex-col gap-3 min-h-[500px]"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <span className="font-bold text-xs uppercase tracking-wider">{stage}</span>
                      <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
                        {stageTasks.length}
                      </Badge>
                    </div>

                    <div className="space-y-3 flex-1">
                      {stageTasks.map((task) => (
                        <Card key={task.id} className="glass-card hover:border-[#8FC5FF]/50 transition-all">
                          <CardContent className="p-3.5 space-y-2.5">
                            <div className="flex items-start justify-between">
                              <span className="text-[10px] font-mono text-[#8FC5FF]">
                                {task.serviceRequestNo}
                              </span>
                              <Badge variant="outline" className="text-[9px] border-white/10">
                                {task.expertise.split(" ")[0]}
                              </Badge>
                            </div>

                            <h4 className="font-bold text-xs leading-snug">{task.title}</h4>

                            <div className="space-y-1 text-[11px] text-muted-foreground">
                              <p className="flex items-center gap-1.5 font-semibold text-foreground">
                                <Handshake className="h-3 w-3 text-[#ACFCCC]" />
                                <span>Vendor: {task.vendorName}</span>
                              </p>
                              <p className="flex items-center gap-1.5">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span>Deadline: {task.deadline}</span>
                              </p>
                              <p className="flex items-center gap-1.5">
                                <DollarSign className="h-3 w-3 text-emerald-400" />
                                <span>Biaya: Rp {task.costActual.toLocaleString("id-ID")}</span>
                              </p>
                            </div>

                            {task.deliverablesSummary && (
                              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[10px] text-muted-foreground">
                                <strong>Hasil Submit:</strong> {task.deliverablesSummary}
                              </div>
                            )}

                            {!isClientUser && (
                              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                                <Select
                                  value={task.stage}
                                  onValueChange={(val) =>
                                    handleStageChange(task.id, val as OutsourceTaskStage)
                                  }
                                >
                                  <SelectTrigger className="h-7 text-[10px] bg-white/5 border-white/10 w-[130px]">
                                    <SelectValue placeholder="Ubah Stage" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {OUTSOURCE_STAGES.map((stg) => (
                                      <SelectItem key={stg} value={stg} className="text-xs">
                                        {stg}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}

                      {stageTasks.length === 0 && (
                        <div className="h-32 rounded-xl border border-dashed border-white/10 flex items-center justify-center text-[11px] text-muted-foreground">
                          Tidak ada task outsource di stage ini
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Card className="glass-card border-white/10">
              <CardContent className="p-0">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-muted-foreground uppercase font-semibold text-[10px]">
                    <tr>
                      <th className="p-3.5">Ref SR</th>
                      <th className="p-3.5">Judul Task Outsource</th>
                      <th className="p-3.5">Nama Vendor</th>
                      <th className="p-3.5">Bidang Keahlian</th>
                      <th className="p-3.5">Stage</th>
                      <th className="p-3.5">Biaya Actual</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredTasks.map((t) => (
                      <tr key={t.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 font-mono text-[#8FC5FF]">{t.serviceRequestNo}</td>
                        <td className="p-3.5 font-bold">{t.title}</td>
                        <td className="p-3.5">{t.vendorName}</td>
                        <td className="p-3.5 text-muted-foreground">{t.expertise}</td>
                        <td className="p-3.5">
                          <Badge variant="outline" className="text-[10px]">
                            {t.stage}
                          </Badge>
                        </td>
                        <td className="p-3.5 font-semibold text-emerald-400">
                          Rp {t.costActual.toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* TAB 2: VENDOR DIRECTORY */}
        <TabsContent value="vendors" className="pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <Card
                key={vendor.id}
                className="glass-card hover:border-[#ACFCCC]/50 transition-all cursor-pointer group"
                onClick={() => setSelectedVendorForDetail(vendor)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base font-bold group-hover:text-[#ACFCCC] transition-colors">
                        {vendor.name}
                      </CardTitle>
                      <CardDescription className="text-xs">{vendor.expertise}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]">
                      {vendor.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 text-xs">
                  {/* Rating & SLA */}
                  <div className="grid grid-cols-2 gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                    <div>
                      <span className="text-[10px] text-muted-foreground">Rating Performa:</span>
                      <div className="flex items-center gap-1 font-bold text-amber-400">
                        <Star className="h-3.5 w-3.5 fill-amber-400" />
                        <span>{vendor.performanceRating} / 5.0</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground">SLA Response:</span>
                      <div className="font-bold text-[#8FC5FF]">{vendor.slaHours} Jam</div>
                    </div>
                  </div>

                  <div className="space-y-1 text-muted-foreground">
                    <p>
                      <strong>Rate Card:</strong> {vendor.rateCardSummary}
                    </p>
                    <p>
                      <strong>Pelabuhan Operasi:</strong> {vendor.operatingPorts.join(", ")}
                    </p>
                    <p>
                      <strong>Total Task Selesai:</strong> {vendor.completedTasksCount} Penugasan
                    </p>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button size="sm" variant="ghost" className="h-7 text-xs text-[#ACFCCC]">
                      Detail &amp; Kontak Vendor &rarr;
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* MODAL 1: ASSIGN VENDOR TASK */}
      <Dialog open={isAssignVendorOpen} onOpenChange={setIsAssignVendorOpen}>
        <DialogContent className="glass-card max-w-md border-white/10">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Penugasan Outsource Vendor Baru</DialogTitle>
            <DialogDescription className="text-xs">
              Terbitkan tugas teknis outsource kepada mitra vendor yang telah terverifikasi.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAssignTaskSubmit} className="space-y-3 text-xs pt-2">
            <div className="space-y-1">
              <Label>Pilih Service Request Terkait</Label>
              <Select value={selectedServiceRequestId} onValueChange={setSelectedServiceRequestId}>
                <SelectTrigger className="glass-input h-9 text-xs">
                  <SelectValue placeholder="Pilih Request" />
                </SelectTrigger>
                <SelectContent>
                  {serviceRequests.map((r) => (
                    <SelectItem key={r.id} value={r.id} className="text-xs">
                      {r.requestNo} - {r.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Pilih Mitra Vendor</Label>
              <Select value={selectedVendorId} onValueChange={setSelectedVendorId}>
                <SelectTrigger className="glass-input h-9 text-xs">
                  <SelectValue placeholder="Pilih Vendor" />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map((v) => (
                    <SelectItem key={v.id} value={v.id} className="text-xs">
                      {v.name} - Rating {v.performanceRating}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Judul Penugasan Teknis</Label>
              <Input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="glass-input h-9 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Biaya Estimasi (IDR)</Label>
                <Input
                  type="number"
                  value={costEstimate}
                  onChange={(e) => setCostEstimate(e.target.value)}
                  className="glass-input h-9 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label>Deadline Penyerahan</Label>
                <Input
                  type="date"
                  value={deadlineDate}
                  onChange={(e) => setDeadlineDate(e.target.value)}
                  className="glass-input h-9 text-xs"
                />
              </div>
            </div>

            <DialogFooter className="pt-3">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsAssignVendorOpen(false)}>
                Batal
              </Button>
              <Button type="submit" size="sm" className="bg-[#ACFCCC] text-black font-bold">
                Kirim Order Ke Vendor
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
