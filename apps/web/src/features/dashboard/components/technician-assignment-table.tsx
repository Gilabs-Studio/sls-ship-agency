"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface AgentAssignment {
  id: string;
  agentName: string;
  clientCompany: string;
  vendorSupplier: string;
  positionVessel: string;
  contractDurationMonths: number;
  currentMonthElapsed: number;
  monthlyFeeRate: string;
  certificateStatus: "Valid (Lengkap)" | "Mendekati Expired" | "Expired";
}

export interface VendorSupplierItem {
  id: string;
  vendorName: string;
  serviceCategory: string;
  techniciansDeployedCount: number;
  slaPerformanceRating: string;
  status: "Verified Partner" | "Active Partner";
}

export interface ClientRequestItem {
  id: string;
  clientCompany: string;
  positionRequirement: string;
  scheduleDueDate: string;
  matchStatus: "Matched (Siap Tugas)" | "Dalam Screening";
}

const defaultAssignments: AgentAssignment[] = [
  {
    id: "ta-1",
    agentName: "Bambang Kurniawan",
    clientCompany: "PT. Nautiva Ocean Agency",
    vendorSupplier: "PT Nautiva Ocean Agency",
    positionVessel: "Chief Engineer (KM Nautiva Horizon)",
    contractDurationMonths: 6,
    currentMonthElapsed: 4,
    monthlyFeeRate: "Rp 25.000.000",
    certificateStatus: "Valid (Lengkap)",
  },
  {
    id: "ta-2",
    agentName: "Ahmad Hidayat",
    clientCompany: "PT. Nautiva Ocean Agency",
    vendorSupplier: "CV Subsea Engine Tech",
    positionVessel: "Teknisi Elektrikal (KM Ocean Star)",
    contractDurationMonths: 6,
    currentMonthElapsed: 2,
    monthlyFeeRate: "Rp 18.500.000",
    certificateStatus: "Mendekati Expired",
  },
  {
    id: "ta-3",
    agentName: "Capt. Hendra Wijaya",
    clientCompany: "PT. Nautiva Ocean Agency",
    vendorSupplier: "PT Nautiva Ocean Agency",
    positionVessel: "Master Mariner (KM Pacific Queen)",
    contractDurationMonths: 12,
    currentMonthElapsed: 8,
    monthlyFeeRate: "Rp 35.000.000",
    certificateStatus: "Valid (Lengkap)",
  },
  {
    id: "ta-4",
    agentName: "Rian Prasetyo",
    clientCompany: "PT. Nautiva Ocean Agency",
    vendorSupplier: "PT. Nautiva Ocean Agency",
    positionVessel: "Teknisi Navigasi (KM Fast Express 02)",
    contractDurationMonths: 6,
    currentMonthElapsed: 1,
    monthlyFeeRate: "Rp 20.000.000",
    certificateStatus: "Valid (Lengkap)",
  },
];

const defaultVendors: VendorSupplierItem[] = [
  {
    id: "vms-1",
    vendorName: "PT Nautiva Ocean Agency",
    serviceCategory: "Main Marine Engine & Crew Manning",
    techniciansDeployedCount: 42,
    slaPerformanceRating: "98.5%",
    status: "Verified Partner",
  },
  {
    id: "vms-2",
    vendorName: "CV Subsea Engine Tech",
    serviceCategory: "Subsea Electrical & Hydraulic Maintenance",
    techniciansDeployedCount: 28,
    slaPerformanceRating: "96.0%",
    status: "Active Partner",
  },
  {
    id: "vms-3",
    vendorName: "PT. Nautiva Ocean Agency",
    serviceCategory: "Sonar & ECDIS Marine Navigation System",
    techniciansDeployedCount: 18,
    slaPerformanceRating: "94.2%",
    status: "Verified Partner",
  },
];

const defaultRequests: ClientRequestItem[] = [
  {
    id: "req-1",
    clientCompany: "PT. Nautiva Ocean Agency",
    positionRequirement: "1 Chief Engineer (Mesin Utama)",
    scheduleDueDate: "Jadwal H-3 Requirement",
    matchStatus: "Matched (Siap Tugas)",
  },
  {
    id: "req-2",
    clientCompany: "PT. Nautiva Ocean Agency",
    positionRequirement: "2 Teknisi Elektrikal Kapal",
    scheduleDueDate: "Jadwal H-7 Requirement",
    matchStatus: "Dalam Screening",
  },
];

interface TechnicianAssignmentTableProps {
  assignments?: AgentAssignment[];
  onOpenAddAssignment?: () => void;
}

export function TechnicianAssignmentTable({
  assignments = defaultAssignments,
  onOpenAddAssignment,
}: TechnicianAssignmentTableProps) {
  const [activeTab, setActiveTab] = useState<"assignments" | "vms" | "requests">("assignments");

  return (
    <div className="glass-card rounded-2xl p-4 space-y-4 border border-border shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-extrabold text-sm text-foreground font-heading">
            Daftar Penugasan & Vendor Management System (VMS)
          </h3>
          <p className="text-xs text-muted-foreground">
            Pengelolaan alokasi agen/teknisi, mitra vendor supplier, & permintaan klien
          </p>
        </div>

        <Button size="sm" onClick={onOpenAddAssignment} className="h-8 text-xs cursor-pointer">
          Tugaskan Personel
        </Button>
      </div>

      {/* VMS Sub-Tabs */}
      <div className="flex items-center gap-1.5 border-b border-border pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("assignments")}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === "assignments"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          }`}
        >
          Penugasan Agen / Teknisi ({assignments.length})
        </button>

        <button
          onClick={() => setActiveTab("vms")}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === "vms"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          }`}
        >
          Vendor Management System ({defaultVendors.length} Mitra)
        </button>

        <button
          onClick={() => setActiveTab("requests")}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === "requests"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          }`}
        >
          Permintaan Klien ({defaultRequests.length})
        </button>
      </div>

      {/* Tab 1: Penugasan Agen / Teknisi */}
      {activeTab === "assignments" && (
        <div className="overflow-x-auto rounded-xl border border-border bg-card/40">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground font-bold text-[11px] border-b border-border">
              <tr>
                <th className="p-3">Nama Agen / Teknisi</th>
                <th className="p-3">Perusahaan Klien</th>
                <th className="p-3">Vendor Supplier</th>
                <th className="p-3">Posisi & Kapal</th>
                <th className="p-3">Masa Kerja (Timespan)</th>
                <th className="p-3">Rate Penugasan</th>
                <th className="p-3 text-right">Status Sertifikat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {assignments.map((item) => {
                const progressPercent = Math.round(
                  (item.currentMonthElapsed / item.contractDurationMonths) * 100
                );

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-accent/30 transition-colors cursor-pointer"
                  >
                    <td className="p-3 font-bold text-foreground">
                      {item.agentName}
                    </td>
                    <td className="p-3 font-medium text-foreground">
                      {item.clientCompany}
                    </td>
                    <td className="p-3 text-muted-foreground text-[11px]">
                      {item.vendorSupplier}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {item.positionVessel}
                    </td>
                    <td className="p-3">
                      <div className="space-y-1 w-36">
                        <div className="flex justify-between text-[10px]">
                          <span className="font-semibold text-foreground">
                            Bulan ke-{item.currentMonthElapsed} / {item.contractDurationMonths} Bln
                          </span>
                          <span className="text-muted-foreground">{progressPercent}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-bold text-foreground">
                      {item.monthlyFeeRate}
                    </td>
                    <td className="p-3 text-right">
                      {item.certificateStatus === "Valid (Lengkap)" ? (
                        <Badge variant="mint" className="text-[10px] px-2 py-0.5 font-bold">
                          Valid (Lengkap)
                        </Badge>
                      ) : (
                        <Badge variant="warning" className="text-[10px] px-2 py-0.5 font-bold">
                          Expired H-15
                        </Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Vendor Management System (VMS) */}
      {activeTab === "vms" && (
        <div className="overflow-x-auto rounded-xl border border-border bg-card/40">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground font-bold text-[11px] border-b border-border">
              <tr>
                <th className="p-3">Nama Vendor Partner</th>
                <th className="p-3">Spesialisasi / Kategori Layanan</th>
                <th className="p-3">Personel Ditugaskan</th>
                <th className="p-3">Rating Performa SLA</th>
                <th className="p-3 text-right">Status Vendor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {defaultVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-accent/30 transition-colors cursor-pointer">
                  <td className="p-3 font-bold text-foreground">
                    {vendor.vendorName}
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {vendor.serviceCategory}
                  </td>
                  <td className="p-3 font-bold text-foreground">
                    {vendor.techniciansDeployedCount} Personel
                  </td>
                  <td className="p-3 font-bold text-mint">
                    {vendor.slaPerformanceRating}
                  </td>
                  <td className="p-3 text-right">
                    <Badge variant="mint" className="text-[10px] px-2 py-0.5 font-bold">
                      {vendor.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Permintaan Alokasi Klien */}
      {activeTab === "requests" && (
        <div className="overflow-x-auto rounded-xl border border-border bg-card/40">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground font-bold text-[11px] border-b border-border">
              <tr>
                <th className="p-3">Perusahaan Klien</th>
                <th className="p-3">Kebutuhan Posisi</th>
                <th className="p-3">Tenggat Waktu Requirement</th>
                <th className="p-3 text-right">Status Match Candidate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {defaultRequests.map((req) => (
                <tr key={req.id} className="hover:bg-accent/30 transition-colors cursor-pointer">
                  <td className="p-3 font-bold text-foreground">
                    {req.clientCompany}
                  </td>
                  <td className="p-3 font-semibold text-foreground">
                    {req.positionRequirement}
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {req.scheduleDueDate}
                  </td>
                  <td className="p-3 text-right">
                    {req.matchStatus === "Matched (Siap Tugas)" ? (
                      <Badge variant="mint" className="text-[10px] px-2 py-0.5 font-bold">
                        {req.matchStatus}
                      </Badge>
                    ) : (
                      <Badge variant="ice" className="text-[10px] px-2 py-0.5 font-bold">
                        {req.matchStatus}
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
