"use client";

import React, { useState } from "react";
import { useMaritimeStore } from "@/lib/mock-maritime-store";
import { useRole } from "@/contexts/role-context";
import type { Vessel, Certificate } from "@/types/maritime.types";
import { toast } from "sonner";
import {
  Ship,
  Search,
  Building2,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldAlert,
  Calendar,
  FileText,
  Upload,
  RefreshCw,
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

export default function VesselsPage() {
  const { vessels, certificates, renewCertificate } = useMaritimeStore();
  const { isClientUser, clientCompanyName } = useRole();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);
  const [selectedCertToRenew, setSelectedCertToRenew] = useState<Certificate | null>(null);
  const [newExpiryDate, setNewExpiryDate] = useState("2027-08-30");

  const displayVessels = isClientUser
    ? vessels.filter((v) => v.companyName === clientCompanyName)
    : vessels;

  const filteredVessels = displayVessels.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.imoNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRenewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCertToRenew) return;
    renewCertificate(selectedCertToRenew.id, newExpiryDate);
    toast.success(`Sertifikat ${selectedCertToRenew.certificateName} berhasil diperpanjang hingga ${newExpiryDate}!`);
    setSelectedCertToRenew(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-tight">Armada Kapal &amp; Status Sertifikasi</h1>
            <Badge variant="outline" className="bg-[#ACFCCC]/10 text-[#22c55e] border-[#ACFCCC]/30 text-xs">
              {filteredVessels.length} Kapal Terdaftar
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Pantau status kelaiklautan (seaworthiness), nomor IMO, lokasi pelabuhan sandar, dan tanggal expired sertifikat wajib.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari kapal, nomor IMO, atau pemilik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs glass-input"
          />
        </div>
      </div>

      {/* Vessel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVessels.map((vessel) => {
          const vesselCerts = certificates.filter((c) => c.vesselId === vessel.id || c.vesselName === vessel.name);
          const hasExpired = vesselCerts.some((c) => c.daysRemaining <= 0);
          const hasNearExpiry = vesselCerts.some((c) => c.daysRemaining > 0 && c.daysRemaining <= 30);

          return (
            <Card
              key={vessel.id}
              className="glass-card hover:border-[#ACFCCC]/50 transition-all cursor-pointer group"
              onClick={() => setSelectedVessel(vessel)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <CardTitle className="text-base font-bold group-hover:text-[#ACFCCC] transition-colors flex items-center gap-2">
                      <Ship className="h-4 w-4 text-[#8FC5FF]" />
                      {vessel.name}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {vessel.imoNumber} • {vessel.flag}
                    </CardDescription>
                  </div>

                  <Badge
                    variant="outline"
                    className={
                      vessel.seaworthinessStatus === "Layak Operasi"
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]"
                        : "bg-red-500/20 text-red-400 border-red-500/30 text-[10px]"
                    }
                  >
                    {vessel.seaworthinessStatus}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 text-xs">
                <div className="space-y-1.5 text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="flex justify-between">
                    <span>Pemilik / Operator:</span>
                    <strong className="text-foreground">{vessel.companyName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Tipe Kapal:</span>
                    <span className="text-foreground">{vessel.vesselType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gross Tonnage:</span>
                    <span className="text-foreground">{vessel.grossTonnage} GT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lokasi Pelabuhan:</span>
                    <span className="text-[#8FC5FF] font-semibold">{vessel.currentPortLocation}</span>
                  </div>
                </div>

                {/* Sertifikat Expiry Status Badges */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">
                    Status Sertifikat Wajib ({vesselCerts.length} Doc)
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {vesselCerts.map((cert) => {
                      const isExp = cert.daysRemaining <= 0;
                      const isNear = cert.daysRemaining > 0 && cert.daysRemaining <= 30;
                      return (
                        <Badge
                          key={cert.id}
                          variant="outline"
                          className={
                            isExp
                              ? "bg-red-500/20 text-red-400 border-red-500/30 text-[10px] gap-1"
                              : isNear
                              ? "bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px] gap-1"
                              : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] gap-1"
                          }
                        >
                          {isExp ? (
                            <AlertTriangle className="h-3 w-3" />
                          ) : isNear ? (
                            <Clock className="h-3 w-3" />
                          ) : (
                            <CheckCircle2 className="h-3 w-3" />
                          )}
                          <span>{cert.certificateName.split(" ")[0]}</span>
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button size="sm" variant="ghost" className="h-7 text-xs text-[#8FC5FF] hover:text-white">
                    Lihat Berkas &amp; Dokumen &rarr;
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* VESSEL DETAIL MODAL */}
      <Dialog open={Boolean(selectedVessel)} onOpenChange={(open) => !open && setSelectedVessel(null)}>
        <DialogContent className="glass-card max-w-2xl border-white/10">
          {selectedVessel && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between pr-6">
                  <div>
                    <DialogTitle className="text-lg font-bold flex items-center gap-2">
                      <Ship className="h-5 w-5 text-[#8FC5FF]" />
                      {selectedVessel.name}
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                      {selectedVessel.imoNumber} • {selectedVessel.flag} • {selectedVessel.vesselType}
                    </DialogDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      selectedVessel.seaworthinessStatus === "Layak Operasi"
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs px-3 py-1 font-bold"
                        : "bg-red-500/20 text-red-400 border-red-500/30 text-xs px-3 py-1 font-bold"
                    }
                  >
                    {selectedVessel.seaworthinessStatus}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="space-y-4 pt-2 text-xs">
                {/* Vessel Specs */}
                <div className="grid grid-cols-3 gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <div>
                    <span className="text-muted-foreground">Tahun Pembuatan:</span>
                    <p className="font-bold">{selectedVessel.builtYear}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Gross Tonnage:</span>
                    <p className="font-bold">{selectedVessel.grossTonnage} GT</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Panjang Kapal (LOA):</span>
                    <p className="font-bold">{selectedVessel.lengthOverallMeters} Meter</p>
                  </div>
                </div>

                {/* Certificates List */}
                <div className="space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider flex items-center justify-between">
                    <span>Daftar Sertifikat Kapal</span>
                    <span className="text-[10px] text-muted-foreground">Warna Indikator Expired</span>
                  </h4>

                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {certificates
                      .filter((c) => c.vesselId === selectedVessel.id || c.vesselName === selectedVessel.name)
                      .map((cert) => {
                        const isExp = cert.daysRemaining <= 0;
                        const isNear = cert.daysRemaining > 0 && cert.daysRemaining <= 30;

                        return (
                          <div
                            key={cert.id}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-bold">{cert.certificateName}</span>
                                <Badge
                                  variant="outline"
                                  className={
                                    isExp
                                      ? "bg-red-500/20 text-red-400 border-red-500/30 text-[10px]"
                                      : isNear
                                      ? "bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px]"
                                      : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]"
                                  }
                                >
                                  {isExp ? "Expired" : isNear ? `${cert.daysRemaining} Hari` : "Valid"}
                                </Badge>
                              </div>
                              <p className="text-[10px] text-muted-foreground">
                                No: {cert.certificateNumber} • Penerbit: {cert.issuingAuthority} • Exp: {cert.expiryDate}
                              </p>
                            </div>

                            {!isClientUser && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-[10px] glass-pill gap-1"
                                onClick={() => setSelectedCertToRenew(cert)}
                              >
                                <RefreshCw className="h-3 w-3 text-[#ACFCCC]" />
                                Perpanjang
                              </Button>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* RENEW CERTIFICATE TRIGGER MODAL */}
      <Dialog open={Boolean(selectedCertToRenew)} onOpenChange={(open) => !open && setSelectedCertToRenew(null)}>
        <DialogContent className="glass-card max-w-md border-white/10">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Perpanjang Sertifikat Syahbandar</DialogTitle>
            <DialogDescription className="text-xs">
              Pembaruan sertifikat: <strong className="text-foreground">{selectedCertToRenew?.certificateName}</strong>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleRenewSubmit} className="space-y-3 text-xs pt-2">
            <div className="space-y-1">
              <label className="font-semibold">Tanggal Expiry Baru</label>
              <Input
                type="date"
                value={newExpiryDate}
                onChange={(e) => setNewExpiryDate(e.target.value)}
                className="glass-input h-9 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold">Unggah Berkas Baru (PDF/Doc)</label>
              <div className="border border-dashed border-white/20 rounded-xl p-4 text-center cursor-pointer hover:bg-white/5 transition-colors">
                <Upload className="h-6 w-6 text-[#ACFCCC] mx-auto mb-1" />
                <span className="text-[11px] text-muted-foreground">Klik atau drag file sertifikat resmi di sini</span>
              </div>
            </div>

            <DialogFooter className="pt-3">
              <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedCertToRenew(null)}>
                Batal
              </Button>
              <Button type="submit" size="sm" className="bg-[#ACFCCC] text-black font-bold">
                Simpan &amp; Verifikasi
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
