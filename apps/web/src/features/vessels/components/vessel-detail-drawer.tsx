import React from "react";
import { Ship, Clock, AlertTriangle, CheckCircle2, RefreshCw, FileText } from "lucide-react";
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
    <Card className="border border-border shadow-xs space-y-4">
      {/* Vessel Header */}
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Ship className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-extrabold tracking-tight">{vessel.name}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">
              IMO: <strong>{vessel.imoNumber}</strong> | Bendera: {vessel.flag} | Tipe: {vessel.vesselType}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Pemilik: <strong className="text-foreground">{vessel.clientCompany}</strong> (GT: {vessel.grossTonnage.toLocaleString("id-ID")})
            </p>
          </div>
          {vessel.seaworthinessStatus === "Layak Operasi" ? (
            <Badge variant="outline" className="text-xs text-success border-success/30 bg-success/10 font-bold px-2 py-1">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Layak Operasi
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs text-destructive border-destructive/30 bg-destructive/10 font-bold px-2 py-1">
              <AlertTriangle className="h-3.5 w-3.5 mr-1" /> Tidak Layak Operasi
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Certificate Checklist Section */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Checklist Sertifikat Wajib ({vessel.vesselType})
          </h4>
          <div className="space-y-2.5">
            {vessel.certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-3 border border-border rounded-lg bg-card hover:bg-accent/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-primary" />
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
                    className="h-7 text-[11px] gap-1 cursor-pointer border-border"
                  >
                    <RefreshCw className="h-3 w-3 text-primary" />
                    Perbarui
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Renewal History Log */}
        {vessel.renewalHistory.length > 0 && (
          <div className="pt-2 border-t border-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Riwayat Perpanjangan Sertifikat
            </h4>
            <div className="space-y-2 text-xs">
              {vessel.renewalHistory.map((rh) => (
                <div key={rh.id} className="p-2 border border-border rounded-lg bg-muted/30 flex items-center justify-between">
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
