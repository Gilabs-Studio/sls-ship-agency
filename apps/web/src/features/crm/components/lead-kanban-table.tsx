import React from "react";
import { Ship, Clock, AlertTriangle, ArrowRight, Award, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { LeadItem, LeadStage } from "../types/crm.types";

interface LeadKanbanTableProps {
  leads: LeadItem[];
  onUpdateStage: (id: string, stage: LeadStage) => void;
  onOpenAddLead: () => void;
  onSelectLead: (id: string) => void;
}

export function LeadKanbanTable({
  leads,
  onUpdateStage,
  onOpenAddLead,
  onSelectLead,
}: LeadKanbanTableProps) {
  const stages: LeadStage[] = ["Baru", "Dihubungi", "Presentasi", "Negosiasi", "Menang", "Kalah"];

  const getStageBadge = (stage: LeadStage) => {
    switch (stage) {
      case "Baru":
        return <Badge variant="outline" className="text-blue-500 border-blue-500/30 bg-blue-500/10">Baru</Badge>;
      case "Dihubungi":
        return <Badge variant="outline" className="text-indigo-500 border-indigo-500/30 bg-indigo-500/10">Dihubungi</Badge>;
      case "Presentasi":
        return <Badge variant="outline" className="text-purple-500 border-purple-500/30 bg-purple-500/10">Presentasi</Badge>;
      case "Negosiasi":
        return <Badge variant="outline" className="text-amber-500 border-amber-500/30 bg-amber-500/10">Negosiasi</Badge>;
      case "Menang":
        return <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10 font-bold">Menang (Closing)</Badge>;
      case "Kalah":
        return <Badge variant="outline" className="text-rose-500 border-rose-500/30 bg-rose-500/10">Kalah</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Action Filter Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold">Pipeline Lead & Prospek</h3>
          <p className="text-xs text-muted-foreground">
            Kelola calon klien perusahaan pelayaran berdasarkan skor prioritas armada
          </p>
        </div>
        <Button size="sm" onClick={onOpenAddLead} className="h-8 text-xs gap-1.5 cursor-pointer">
          <Plus className="h-3.5 w-3.5" />
          <span>Tambah Lead Prospek</span>
        </Button>
      </div>

      {/* Leads Table View */}
      <div className="border border-border rounded-lg bg-card overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
            <tr>
              <th className="p-3">Perusahaan & PIC</th>
              <th className="p-3">Armada & Nilai Potensi</th>
              <th className="p-3">Skor Prioritas</th>
              <th className="p-3">Status Stage</th>
              <th className="p-3">Aktivitas Terakhir</th>
              <th className="p-3 text-right">Aksi Stage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-accent/40 transition-colors">
                {/* Perusahaan & PIC */}
                <td className="p-3">
                  <div className="flex flex-col space-y-0.5">
                    <span
                      onClick={() => onSelectLead(lead.id)}
                      className="font-bold text-foreground hover:text-primary cursor-pointer transition-colors"
                    >
                      {lead.companyName}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      PIC: {lead.picName} ({lead.picPhone})
                    </span>
                    {lead.isStagnant && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-destructive">
                        <AlertTriangle className="h-3 w-3" /> Stagnant &gt;14 Hari
                      </span>
                    )}
                  </div>
                </td>

                {/* Armada & Nilai */}
                <td className="p-3">
                  <div className="flex flex-col space-y-0.5">
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      <Ship className="h-3.5 w-3.5 text-primary" /> {lead.vesselCount} Armada ({lead.vesselTypes.join(", ")})
                    </span>
                    <span className="text-[11px] text-success font-semibold">
                      Rp {lead.potentialValue.toLocaleString("id-ID")}
                    </span>
                  </div>
                </td>

                {/* Priority Score */}
                <td className="p-3">
                  <div className="flex items-center gap-1.5">
                    <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xs">
                      {lead.priorityScore}
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium">/ 100 Poin</span>
                  </div>
                </td>

                {/* Status Stage */}
                <td className="p-3">{getStageBadge(lead.stage)}</td>

                {/* Last Activity */}
                <td className="p-3 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{lead.lastActivityDate}</span>
                  </div>
                </td>

                {/* Actions dropdown */}
                <td className="p-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1 cursor-pointer border-border">
                        Ubah Stage <ArrowRight className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {stages.map((st) => (
                        <DropdownMenuItem
                          key={st}
                          disabled={lead.stage === st}
                          onClick={() => onUpdateStage(lead.id, st)}
                          className="text-xs cursor-pointer"
                        >
                          {st === "Menang" && <Award className="h-3.5 w-3.5 text-emerald-500 mr-1.5" />}
                          Stage: {st}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
