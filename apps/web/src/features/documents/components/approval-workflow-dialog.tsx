import React, { useState } from "react";
import { CheckCircle2, XCircle, FileText, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type { DigitalDocumentItem } from "../types/document.types";

interface ApprovalWorkflowDialogProps {
  document: DigitalDocumentItem | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: (docId: string, status: "Final" | "Ditolak", note?: string) => void;
}

export function ApprovalWorkflowDialog({
  document,
  isOpen,
  onOpenChange,
  onApprove,
}: ApprovalWorkflowDialogProps) {
  const [reviewNote, setReviewNote] = useState("");

  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-sm font-bold flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <span>Persetujuan Supervisor Dokumen</span>
          </DialogTitle>
          <DialogDescription className="text-xs">
            Review keabsahan dokumen sebelum dipublikasikan ke status Final & Portal Klien.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2 text-xs">
          <div className="p-3 border border-border rounded-lg bg-card space-y-1">
            <p className="font-bold text-foreground">{document.title}</p>
            <p className="text-muted-foreground">Kategori: {document.category}</p>
            {document.vesselName && <p className="text-muted-foreground">Kapal Terkait: {document.vesselName}</p>}
            <p className="text-muted-foreground">Diunggah Oleh: {document.uploadedBy} ({document.uploadedAt})</p>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-xs text-foreground">Catatan Supervisor (Review Note)</label>
            <Textarea
              placeholder="Catatan hasil verifikasi sertifikat..."
              value={reviewNote}
              onChange={(e) => setReviewNote(e.target.value)}
              className="text-xs"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => {
              onApprove(document.id, "Ditolak", reviewNote);
              onOpenChange(false);
            }}
            className="text-xs gap-1 cursor-pointer"
          >
            <XCircle className="h-3.5 w-3.5" />
            Tolak Dokumen
          </Button>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() => {
              onApprove(document.id, "Final", reviewNote);
              onOpenChange(false);
            }}
            className="text-xs gap-1 cursor-pointer bg-success text-success-foreground hover:bg-success/90"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Setujui (Set Status Final)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
