"use client";

import React, { useState } from "react";
import { useMaritimeStore } from "@/lib/mock-maritime-store";
import { useRole } from "@/contexts/role-context";
import type { Certificate } from "@/types/maritime.types";
import { toast } from "sonner";
import {
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Filter,
  Search,
  RefreshCw,
  Send,
  Building2,
  Ship,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function CompliancePage() {
  const { certificates, renewCertificate, renewalReminders } = useMaritimeStore();
  const { isClientUser, clientCompanyName } = useRole();
  const [urgencyFilter, setUrgencyFilter] = useState<"all" | "expired" | "30-days" | "60-days" | "90-days">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCertToRenew, setSelectedCertToRenew] = useState<Certificate | null>(null);

  const displayCertificates = isClientUser
    ? certificates.filter((c) => c.companyName === clientCompanyName)
    : certificates;

  const filteredCertificates = displayCertificates.filter((cert) => {
    const matchesSearch =
      cert.certificateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.vesselName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.companyName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (urgencyFilter === "expired") return cert.daysRemaining <= 0;
    if (urgencyFilter === "30-days") return cert.daysRemaining > 0 && cert.daysRemaining <= 30;
    if (urgencyFilter === "60-days") return cert.daysRemaining > 30 && cert.daysRemaining <= 60;
    if (urgencyFilter === "90-days") return cert.daysRemaining > 60 && cert.daysRemaining <= 90;
    return true;
  });

  const handleBatchTriggerWarning = () => {
    toast.success("🔔 Warning notifikasi otomatis & draft pengajuan Syahbandar telah dikirimkan ke 5 PIC terdaftar!");
  };

  const handleRenewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCertToRenew) return;
    renewCertificate(selectedCertToRenew.id, "2027-08-30");
    toast.success(`Sertifikat ${selectedCertToRenew.certificateName} berhasil diverifikasi & diperpanjang!`);
    setSelectedCertToRenew(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-tight">Renewal &amp; Compliance Center</h1>
            <Badge variant="outline" className="bg-rose-500/10 text-rose-400 border-rose-500/30 text-xs">
              Mendesak Expiry Monitor
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Pusat pemantauan sertifikat kapal niaga mendekati / lewat masa berlaku lintas seluruh klien agency pelayaran.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isClientUser && (
            <Button
              onClick={handleBatchTriggerWarning}
              className="bg-[#ACFCCC] text-black hover:bg-[#96f7bb] font-bold text-xs shadow-md gap-1.5"
            >
              <Send className="h-3.5 w-3.5" />
              Kirim Alert Perpanjangan Massal
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <Button
            variant={urgencyFilter === "all" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setUrgencyFilter("all")}
            className="h-8 text-xs cursor-pointer"
          >
            Semua ({displayCertificates.length})
          </Button>
          <Button
            variant={urgencyFilter === "expired" ? "destructive" : "ghost"}
            size="sm"
            onClick={() => setUrgencyFilter("expired")}
            className="h-8 text-xs gap-1.5 cursor-pointer text-red-400"
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            Expired ({displayCertificates.filter((c) => c.daysRemaining <= 0).length})
          </Button>
          <Button
            variant={urgencyFilter === "30-days" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setUrgencyFilter("30-days")}
            className="h-8 text-xs text-amber-400 cursor-pointer"
          >
            &lt;30 Hari ({displayCertificates.filter((c) => c.daysRemaining > 0 && c.daysRemaining <= 30).length})
          </Button>
          <Button
            variant={urgencyFilter === "60-days" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setUrgencyFilter("60-days")}
            className="h-8 text-xs text-[#8FC5FF] cursor-pointer"
          >
            30-60 Hari ({displayCertificates.filter((c) => c.daysRemaining > 30 && c.daysRemaining <= 60).length})
          </Button>
          <Button
            variant={urgencyFilter === "90-days" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setUrgencyFilter("90-days")}
            className="h-8 text-xs cursor-pointer text-muted-foreground"
          >
            60-90 Hari ({displayCertificates.filter((c) => c.daysRemaining > 60 && c.daysRemaining <= 90).length})
          </Button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari sertifikat, kapal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs glass-input"
          />
        </div>
      </div>

      {/* Compliance Table */}
      <Card className="glass-card border-white/10">
        <CardContent className="p-0">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-muted-foreground uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-3.5">Nama Sertifikat &amp; Kategori</th>
                <th className="p-3.5">Kapal Terkait</th>
                <th className="p-3.5">Perusahaan Pemilik</th>
                <th className="p-3.5">Syahbandar / Instansi</th>
                <th className="p-3.5">Tanggal Expired</th>
                <th className="p-3.5">Status Urgensi</th>
                <th className="p-3.5 text-right">Aksi Perpanjangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCertificates.map((cert) => {
                const isExp = cert.daysRemaining <= 0;
                const isNear30 = cert.daysRemaining > 0 && cert.daysRemaining <= 30;

                return (
                  <tr key={cert.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-bold">
                      <div>{cert.certificateName}</div>
                      <div className="text-[10px] text-muted-foreground">{cert.category}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Ship className="h-3.5 w-3.5 text-[#8FC5FF]" />
                        <span>{cert.vesselName}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-muted-foreground">{cert.companyName}</td>
                    <td className="p-3.5 text-muted-foreground">{cert.issuingAuthority}</td>
                    <td className="p-3.5 font-mono">{cert.expiryDate}</td>
                    <td className="p-3.5">
                      <Badge
                        variant="outline"
                        className={
                          isExp
                            ? "bg-red-500/20 text-red-400 border-red-500/30 text-[10px]"
                            : isNear30
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px]"
                            : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]"
                        }
                      >
                        {isExp ? "Expired" : `${cert.daysRemaining} Hari Lagi`}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      {!isClientUser && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs glass-pill gap-1"
                          onClick={() => setSelectedCertToRenew(cert)}
                        >
                          <RefreshCw className="h-3 w-3 text-[#ACFCCC]" />
                          Proses Perpanjangan
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* RENEW MODAL */}
      <Dialog open={Boolean(selectedCertToRenew)} onOpenChange={(open) => !open && setSelectedCertToRenew(null)}>
        <DialogContent className="glass-card max-w-md border-white/10">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Verifikasi &amp; Perpanjang Sertifikat</DialogTitle>
            <DialogDescription className="text-xs">
              Submit perpanjangan resmi ke Syahbandar / BKI untuk sertifikat:{" "}
              <strong className="text-foreground">{selectedCertToRenew?.certificateName}</strong>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleRenewSubmit} className="space-y-3 text-xs pt-2">
            <div className="space-y-1">
              <label className="font-semibold">Masa Berlaku Baru</label>
              <Input type="date" defaultValue="2027-08-30" className="glass-input h-9 text-xs" />
            </div>

            <DialogFooter className="pt-3">
              <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedCertToRenew(null)}>
                Batal
              </Button>
              <Button type="submit" size="sm" className="bg-[#ACFCCC] text-black font-bold">
                Konfirmasi Perpanjangan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
