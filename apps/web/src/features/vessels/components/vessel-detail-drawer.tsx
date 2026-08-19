import React from "react";
import { Ship, AlertTriangle, CheckCircle2, RefreshCw, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { VesselItem } from "../types/vessel.types";

interface VesselDetailDrawerProps {
  vessel: VesselItem;
  onOpenRenewModal: (certId: string) => void;
}

export function VesselDetailDrawer({ vessel, onOpenRenewModal }: VesselDetailDrawerProps) {
  const getCertStatusBadge = (status: string, daysRemaining: number) => {
    switch (status) {
      case "Aktif":
        return <Badge variant="outline" className="text-success border-success/30 bg-success/10 font-medium">Aktif ({daysRemaining}h)</Badge>;
      case "Mendekati Expired":
        return <Badge variant="outline" className="text-warning border-warning/30 bg-warning/10 font-bold">Expired dalam {daysRemaining} Hari</Badge>;
      case "Sudah Expired":
        return <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/10 font-extrabold">Sudah Expired ({Math.abs(daysRemaining)}h lalu)</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="glass-card space-y-4">
      {/* Vessel Header */}
      <CardHeader className="pb-3 border-b border-white/10">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Ship className="h-5 w-5 text-[#8FC5FF]" />
              <CardTitle className="text-base font-extrabold tracking-tight">{vessel.name}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">
              IMO: <strong className="text-foreground font-mono">{vessel.imoNumber}</strong> | Bendera: {vessel.flag} | Tipe: {vessel.vesselType}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Pemilik: <strong className="text-foreground">{vessel.clientCompany}</strong> (GT: {vessel.grossTonnage.toLocaleString("id-ID")})
            </p>
          </div>
          {vessel.seaworthinessStatus === "Layak Operasi" ? (
            <Badge variant="mint" className="px-2.5 py-1 text-xs">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Layak Operasi
            </Badge>
          ) : (
            <Badge variant="destructive" className="px-2.5 py-1 text-xs">
              <AlertTriangle className="h-3.5 w-3.5 mr-1" /> Tidak Layak Operasi
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Certificate Checklist Section */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Checklist Sertifikat Wajib ({vessel.vesselType})
          </h4>
          <div className="space-y-2.5">
            {vessel.certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-3 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-[#8FC5FF]" />
                    <span className="font-bold text-xs text-foreground">{cert.certificateName}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Penerbit: {cert.issuingAuthority} | Expired: <strong>{cert.expiryDate}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {getCertStatusBadge(cert.status, cert.daysRemaining)}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onOpenRenewModal(cert.id)}
                    className="h-7 text-[11px] gap-1 cursor-pointer border-white/15 hover:border-[#ACFCCC]/50"
                  >
                    <RefreshCw className="h-3 w-3 text-[#ACFCCC]" />
                    Perbarui
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Renewal History Log */}
        {vessel.renewalHistory.length > 0 && (
          <div className="pt-2 border-t border-white/10">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Riwayat Perpanjangan Sertifikat
            </h4>
            <div className="space-y-2 text-xs">
              {vessel.renewalHistory.map((rh) => (
                <div key={rh.id} className="p-2 border border-white/10 rounded-lg bg-white/5 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-foreground">{rh.certificateName}</span>
                    <p className="text-[10px] text-muted-foreground">
                      Expired Lama: {rh.previousExpiry} &rarr; Expired Baru: <strong>{rh.newExpiry}</strong>
                    </p>
                  </div>
                  <span className="text-[10px] text-muted-foreground">Oleh: {rh.renewedBy}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
