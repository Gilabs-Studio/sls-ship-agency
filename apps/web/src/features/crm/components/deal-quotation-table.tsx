import React from "react";
import { FileText, Ship, Calendar, Plus, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DealItem } from "../types/crm.types";

interface DealQuotationTableProps {
  deals: DealItem[];
  onOpenAddDeal: () => void;
}

export function DealQuotationTable({ deals, onOpenAddDeal }: DealQuotationTableProps) {
  const getStatusBadge = (status: DealItem["status"]) => {
    switch (status) {
      case "Terkirim":
        return <Badge variant="outline" className="text-blue-500 border-blue-500/30 bg-blue-500/10">Terkirim</Badge>;
      case "Direview":
        return <Badge variant="outline" className="text-amber-500 border-amber-500/30 bg-amber-500/10">Direview Klien</Badge>;
      case "Disetujui":
        return <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10 font-bold"><CheckCircle2 className="h-3 w-3 mr-1" /> Disetujui</Badge>;
      case "Ditolak":
        return <Badge variant="outline" className="text-rose-500 border-rose-500/30 bg-rose-500/10"><XCircle className="h-3 w-3 mr-1" /> Ditolak</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold">Penawaran Kerja Sama & Quotation</h3>
          <p className="text-xs text-muted-foreground">
            Tracking status proposal dokumen penawaran harga jasa keagenan
          </p>
        </div>
        <Button size="sm" onClick={onOpenAddDeal} className="h-8 text-xs gap-1.5 cursor-pointer">
          <Plus className="h-3.5 w-3.5" />
          <span>Buat Proposal Penawaran</span>
        </Button>
      </div>

      <div className="border border-border rounded-lg bg-card overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
            <tr>
              <th className="p-3">Judul Penawaran & Klien</th>
              <th className="p-3">Jumlah Kapal</th>
              <th className="p-3">Nilai Proposal (IDR)</th>
              <th className="p-3">Status Deal</th>
              <th className="p-3">Tanggal Kirim & Berlaku</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-accent/40 transition-colors">
                <td className="p-3">
                  <div className="flex flex-col space-y-0.5">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-primary" /> {deal.title}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Perusahaan: {deal.companyName}
                    </span>
                  </div>
                </td>
                <td className="p-3">
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <Ship className="h-3.5 w-3.5 text-primary" /> {deal.vesselCount} Kapal
                  </span>
                </td>
                <td className="p-3">
                  <span className="font-extrabold text-foreground text-sm">
                    Rp {deal.proposalValue.toLocaleString("id-ID")}
                  </span>
                </td>
                <td className="p-3">{getStatusBadge(deal.status)}</td>
                <td className="p-3 text-muted-foreground">
                  <div className="flex flex-col space-y-0.5 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-primary" /> Kirim: {deal.sentDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" /> Berlaku s.d: {deal.validUntil}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
