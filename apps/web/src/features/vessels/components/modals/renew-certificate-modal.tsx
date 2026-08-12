"use client";

import React, { useState } from "react";
import { RefreshCw, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";

interface RenewCertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certId: string | null;
  onSubmit: (certId: string, newExpiryDate: string) => void;
}

export function RenewCertificateModal({
  open,
  onOpenChange,
  certId,
  onSubmit,
}: RenewCertificateModalProps) {
  const [newExpiryDate, setNewExpiryDate] = useState("2028-12-31");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId) return;
    onSubmit(certId, newExpiryDate);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-md border-border">
        <DialogHeader>
          <DialogTitle className="text-base font-bold flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            <span>Perpanjang Sertifikat Syahbandar / KKP</span>
          </DialogTitle>
          <DialogDescription className="text-xs">
            Pembaruan masa berlaku sertifikat & upload berkas perpanjangan resmi.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs pt-2">
          <FieldGroup className="space-y-3">
            <Field className="space-y-1">
              <FieldLabel htmlFor="new-expiry">Tanggal Expiry Baru</FieldLabel>
              <Input
                id="new-expiry"
                type="date"
                value={newExpiryDate}
                onChange={(e) => setNewExpiryDate(e.target.value)}
                required
                className="h-9 text-xs glass-input"
              />
            </Field>

            <Field className="space-y-1">
              <FieldLabel>Unggah Berkas Baru (PDF/Doc)</FieldLabel>
              <div className="border border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:bg-muted/40 transition-colors">
                <Upload className="h-6 w-6 text-primary mx-auto mb-1" />
                <span className="text-[11px] text-muted-foreground block">
                  Klik atau drag file sertifikat resmi di sini
                </span>
              </div>
            </Field>
          </FieldGroup>

          <DialogFooter className="pt-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 text-xs cursor-pointer"
            >
              Batal
            </Button>
            <Button
              type="submit"
              size="sm"
              className="h-8 text-xs bg-primary text-primary-foreground font-bold cursor-pointer hover:bg-primary/90"
            >
              Simpan & Verifikasi
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
