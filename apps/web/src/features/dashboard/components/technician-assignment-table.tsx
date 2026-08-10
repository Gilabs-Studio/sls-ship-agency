"use client";

import React from "react";
import { UserCheck, ShieldCheck, RefreshCw, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface TechnicianAssignment {
  id: string;
  clientCompany: string;
  vesselName: string;
  positionTitle: string;
  technicianName: string;
  certificateStatus: "Valid (Lengkap)" | "Mendekati Expired" | "Expired";
  assignmentStatus: "Aktif Bertugas" | "Standby" | "Pending Approval";
}

const defaultAssignments: TechnicianAssignment[] = [
  {
    id: "ta-1",
    clientCompany: "PT Samarinda Trans Energi",
    vesselName: "KM Solid Horizon",
    positionTitle: "Teknisi Mesin Utam (Chief Engineer)",
    technicianName: "Bambang Kurniawan",
    certificateStatus: "Valid (Lengkap)",
    assignmentStatus: "Aktif Bertugas",
  },
  {
    id: "ta-2",
    clientCompany: "PT Ocean Line Logistics",
    vesselName: "KM Ocean Star",
    positionTitle: "Teknisi Elektrikal Kapal",
    technicianName: "Ahmad Hidayat",
    certificateStatus: "Mendekati Expired",
    assignmentStatus: "Aktif Bertugas",
  },
  {
    id: "ta-3",
    clientCompany: "PT Pelayaran Nusantara",
    vesselName: "KM Pacific Queen",
    positionTitle: "Master Mariner (Nakhoda)",
    technicianName: "Capt. Hendra Wijaya",
    certificateStatus: "Valid (Lengkap)",
    assignmentStatus: "Aktif Bertugas",
  },
  {
    id: "ta-4",
    clientCompany: "PT Batam Fast Ferry",
    vesselName: "KM Fast Express 02",
    positionTitle: "Teknisi Sistem Navigasi",
    technicianName: "Rian Prasetyo",
    certificateStatus: "Valid (Lengkap)",
    assignmentStatus: "Pending Approval",
  },
];

interface TechnicianAssignmentTableProps {
  assignments?: TechnicianAssignment[];
  onOpenAddAssignment?: () => void;
}

export function TechnicianAssignmentTable({
  assignments = defaultAssignments,
  onOpenAddAssignment,
}: TechnicianAssignmentTableProps) {
  return (
    <div className="glass-card rounded-2xl p-4 space-y-4 border border-border shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-extrabold text-sm text-foreground font-heading">
            Daftar Penugasan Teknisi & Kru Klien
          </h3>
          <p className="text-xs text-muted-foreground">
            Alokasi personel outsourcing ke kapal perusahaan pelayaran mitra
          </p>
        </div>

        <Button size="sm" onClick={onOpenAddAssignment} className="h-8 text-xs gap-1.5 cursor-pointer">
          <UserCheck className="h-3.5 w-3.5" />
          <span>Tugaskan Teknisi</span>
        </Button>
      </div>

      {/* Table Canvas */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card/40">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 text-muted-foreground font-bold text-[11px] border-b border-border">
            <tr>
              <th className="p-3">Perusahaan Klien & Kapal</th>
              <th className="p-3">Posisi Teknisi / Kru</th>
              <th className="p-3">Nama Personel</th>
              <th className="p-3">Status Sertifikat</th>
              <th className="p-3">Status Penugasan</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {assignments.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-accent/30 transition-colors cursor-pointer"
              >
                <td className="p-3">
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground">{item.clientCompany}</span>
                    <span className="text-[11px] text-muted-foreground">{item.vesselName}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span className="font-semibold text-foreground">{item.positionTitle}</span>
                </td>
                <td className="p-3">
                  <span className="font-semibold text-foreground">{item.technicianName}</span>
                </td>
                <td className="p-3">
                  {item.certificateStatus === "Valid (Lengkap)" ? (
                    <Badge variant="mint" className="text-[10px] px-2 py-0.5">
                      <ShieldCheck className="h-3 w-3 mr-1" /> Valid (Lengkap)
                    </Badge>
                  ) : (
                    <Badge variant="warning" className="text-[10px] px-2 py-0.5">
                      <RefreshCw className="h-3 w-3 mr-1" /> Expired H-15
                    </Badge>
                  )}
                </td>
                <td className="p-3">
                  {item.assignmentStatus === "Aktif Bertugas" ? (
                    <Badge variant="mint" className="text-[10px] px-2 py-0.5">
                      Aktif Bertugas
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                      Pending Approval
                    </Badge>
                  )}
                </td>
                <td className="p-3 text-right">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 cursor-pointer rounded-full">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
