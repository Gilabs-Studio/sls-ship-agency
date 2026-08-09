import React from "react";
import { FileText, Download, CheckCircle2, Clock, XCircle, ShieldCheck, Eye, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { DigitalDocumentItem, DocumentCategory } from "../types/document.types";

interface DocumentGridTableProps {
  documents: DigitalDocumentItem[];
  activeCategory: string;
  onSelectCategory: (cat: any) => void;
  isClientViewOnly: boolean;
  onToggleClientView: (checked: boolean) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenUploadModal: () => void;
  onOpenReviewModal: (docId: string) => void;
}

export function DocumentGridTable({
  documents,
  activeCategory,
  onSelectCategory,
  isClientViewOnly,
  onToggleClientView,
  searchQuery,
  onSearchChange,
  onOpenUploadModal,
  onOpenReviewModal,
}: DocumentGridTableProps) {
  const categories = ["ALL", "Sertifikat Kapal", "Dokumen Klien", "Dokumen Internal"];

  const getStatusBadge = (status: DigitalDocumentItem["status"]) => {
    switch (status) {
      case "Menunggu Approval":
        return <Badge variant="outline" className="text-warning border-warning/30 bg-warning/10 font-bold"><Clock className="h-3 w-3 mr-1" /> Menunggu Approval</Badge>;
      case "Final":
        return <Badge variant="outline" className="text-success border-success/30 bg-success/10 font-bold"><CheckCircle2 className="h-3 w-3 mr-1" /> Final (Resmi)</Badge>;
      case "Ditolak":
        return <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/10 font-bold"><XCircle className="h-3 w-3 mr-1" /> Ditolak</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Filter and Client Portal View Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-card border border-border p-4 rounded-lg shadow-xs">
        <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectCategory(cat)}
              className="h-8 text-xs cursor-pointer"
            >
              {cat === "ALL" ? "Semua Dokumen" : cat}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Client Portal View Switch */}
          <div className="flex items-center gap-2 border-l border-border pl-4">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
              <Eye className="h-3.5 w-3.5 text-primary" /> Mode Portal Klien:
            </span>
            <Switch
              checked={isClientViewOnly}
              onCheckedChange={onToggleClientView}
              className="cursor-pointer"
            />
          </div>

          <Button size="sm" onClick={onOpenUploadModal} className="h-8 text-xs gap-1.5 cursor-pointer">
            <Plus className="h-3.5 w-3.5" />
            <span>Upload Dokumen Digital</span>
          </Button>
        </div>
      </div>

      {/* Documents Dataset Table */}
      <div className="border border-border rounded-lg bg-card overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
            <tr>
              <th className="p-3">Nama Dokumen & File</th>
              <th className="p-3">Kategori & Kapal/Klien</th>
              <th className="p-3">Versi</th>
              <th className="p-3">Status Approval</th>
              <th className="p-3">Pengunggah & Tanggal</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {documents.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground text-xs">
                  Tidak ada dokumen digital yang cocok. (Portal klien hanya menampilkan dokumen Final).
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-accent/40 transition-colors">
                  <td className="p-3">
                    <div className="flex flex-col space-y-0.5">
                      <span className="font-bold text-foreground flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-primary" /> {doc.title}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Format: {doc.fileType} ({doc.fileSize})
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-col space-y-0.5">
                      <Badge variant="outline" className="w-fit text-[10px]">
                        {doc.category}
                      </Badge>
                      {doc.vesselName && (
                        <span className="text-[11px] text-muted-foreground">Kapal: {doc.vesselName}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge variant="secondary" className="text-[10px] font-mono">
                      {doc.version}
                    </Badge>
                  </td>
                  <td className="p-3">{getStatusBadge(doc.status)}</td>
                  <td className="p-3 text-muted-foreground">
                    <div className="flex flex-col space-y-0.5 text-[11px]">
                      <span>{doc.uploadedBy}</span>
                      <span className="text-[10px] text-muted-foreground">{doc.uploadedAt}</span>
                    </div>
                  </td>
                  <td className="p-3 text-right space-x-1">
                    {doc.status === "Menunggu Approval" && !isClientViewOnly && (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => onOpenReviewModal(doc.id)}
                        className="h-7 text-[11px] gap-1 cursor-pointer bg-warning text-warning-foreground hover:bg-warning/90"
                      >
                        <ShieldCheck className="h-3 w-3" /> Review Approval
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="h-7 text-[11px] gap-1 cursor-pointer border-border">
                      <Download className="h-3 w-3 text-primary" /> Unduh
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
