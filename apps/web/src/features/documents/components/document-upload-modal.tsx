import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { documentUploadSchema, type DocumentUploadValues } from "../schemas/document.schema";

interface DocumentUploadModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitUpload: (data: DocumentUploadValues) => void;
}

export function DocumentUploadModal({
  isOpen,
  onOpenChange,
  onSubmitUpload,
}: DocumentUploadModalProps) {
  const form = useForm<DocumentUploadValues>({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: {
      title: "",
      category: "Sertifikat Kapal",
      vesselName: "KM Solid Horizon",
      clientCompany: "PT Nusantara Cargo Line",
      expiryDate: "",
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-sm font-bold">Upload Dokumen Digital Baru</DialogTitle>
          <DialogDescription className="text-xs">
            Dokumen akan di-link ke record kapal/klien dan berstatus Menunggu Approval.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit((values) => {
            onSubmitUpload(values);
            form.reset();
            onOpenChange(false);
          })}
          className="space-y-3 py-1"
        >
          <FieldGroup className="space-y-3">
            <Field>
              <FieldLabel htmlFor="title" className="text-xs font-semibold">Judul Sertifikat / Dokumen</FieldLabel>
              <Input id="title" placeholder="Contoh: Sertifikat SOLAS Construction" {...form.register("title")} />
              {form.formState.errors.title && (
                <FieldError className="text-xs">{form.formState.errors.title.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel className="text-xs font-semibold">Kategori Dokumen</FieldLabel>
              <Select
                defaultValue={form.watch("category")}
                onValueChange={(v) => form.setValue("category", v as any)}
              >
                <SelectTrigger className="w-full text-xs">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sertifikat Kapal">Sertifikat Kapal</SelectItem>
                  <SelectItem value="Dokumen Klien">Dokumen Klien</SelectItem>
                  <SelectItem value="Dokumen Internal">Dokumen Internal</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="vesselName" className="text-xs font-semibold">Nama Kapal Terkait</FieldLabel>
              <Input id="vesselName" placeholder="Contoh: KM Solid Horizon" {...form.register("vesselName")} />
            </Field>

            <Field>
              <FieldLabel htmlFor="expiryDate" className="text-xs font-semibold">Tanggal Expired (Jika Ada)</FieldLabel>
              <Input id="expiryDate" type="date" {...form.register("expiryDate")} />
            </Field>
          </FieldGroup>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)} className="text-xs">
              Batal
            </Button>
            <Button type="submit" size="sm" className="text-xs">
              Upload File PDF
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
