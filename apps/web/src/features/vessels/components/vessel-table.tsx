import React from "react";
import { Ship, AlertTriangle, CheckCircle2, ChevronRight, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { VesselItem } from "../types/vessel.types";

interface VesselTableProps {
  vessels: VesselItem[];
  selectedVesselId: string | null;
  onSelectVessel: (id: string) => void;
  onOpenAddVessel: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function VesselTable({
  vessels,
  selectedVesselId,
  onSelectVessel,
  onOpenAddVessel,
  searchQuery,
  onSearchChange,
}: VesselTableProps) {
  return (
    <div className="space-y-4">
      {/* Search and Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Cari nama kapal, IMO, klien..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 h-8 text-xs bg-card border-border"
          />
        </div>
        <Button size="sm" onClick={onOpenAddVessel} className="h-8 text-xs gap-1.5 cursor-pointer">
          <Plus className="h-3.5 w-3.5" />
          <span>Registrasi Kapal Baru</span>
        </Button>
      </div>

      {/* Vessels Dataset Table */}
      <div className="border border-white/10 dark:border-white/5 rounded-xl backdrop-blur-xl bg-card/65 overflow-hidden shadow-xl shadow-black/10">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/5 border-b border-white/10 text-muted-foreground font-bold text-[11px] uppercase tracking-wider">
            <tr>
              <th className="p-3.5">Nama Kapal & IMO</th>
              <th className="p-3.5">Jenis & Bendera</th>
              <th className="p-3.5">Pemilik (Klien)</th>
              <th className="p-3.5">Status Kelaikan Operasi</th>
              <th className="p-3.5">Ringkasan Sertifikat</th>
              <th className="p-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {vessels.map((vessel) => {
              const isSelected = vessel.id === selectedVesselId;
              const expiredCount = vessel.certificates.filter((c) => c.status === "Sudah Expired").length;
              const warningCount = vessel.certificates.filter((c) => c.status === "Mendekati Expired").length;

              return (
                <tr
                  key={vessel.id}
                  onClick={() => onSelectVessel(vessel.id)}
                  className={`hover:bg-white/10 dark:hover:bg-white/5 transition-all cursor-pointer ${
                    isSelected ? "bg-[#ACFCCC]/10 border-l-2 border-[#ACFCCC] font-semibold" : ""
                  }`}
                >
                  <td className="p-3.5">
                    <div className="flex flex-col space-y-0.5">
                      <span className="font-bold text-foreground flex items-center gap-1.5">
                        <Ship className="h-3.5 w-3.5 text-[#8FC5FF]" /> {vessel.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-mono">IMO: {vessel.imoNumber}</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <div className="flex flex-col space-y-0.5">
                      <span className="font-semibold text-foreground">{vessel.vesselType}</span>
                      <span className="text-[11px] text-muted-foreground">{vessel.flag}</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-semibold text-foreground">{vessel.clientCompany}</span>
                  </td>
                  <td className="p-3.5">
                    {vessel.seaworthinessStatus === "Layak Operasi" ? (
                      <Badge variant="mint">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Layak Operasi
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <AlertTriangle className="h-3 w-3 mr-1" /> Tidak Layak Operasi
                      </Badge>
                    )}
                  </td>
                  <td className="p-3.5">
                    <div className="flex gap-1 text-[10px]">
                      <Badge variant="mint" className="px-1.5 py-0">
                        {vessel.certificates.length - expiredCount - warningCount} Aktif
                      </Badge>
                      {warningCount > 0 && (
                        <Badge variant="warning" className="px-1.5 py-0">
                          {warningCount} Warning
                        </Badge>
                      )}
                      {expiredCount > 0 && (
                        <Badge variant="destructive" className="px-1.5 py-0">
                          {expiredCount} Expired
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="p-3.5 text-right">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 cursor-pointer rounded-full hover:bg-white/15">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
