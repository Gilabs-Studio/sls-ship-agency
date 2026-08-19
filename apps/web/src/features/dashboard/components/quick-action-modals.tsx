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

import {
  quickAddVesselSchema,
  quickUploadDocSchema,
  quickAddLeadSchema,
  type QuickAddVesselValues,
  type QuickUploadDocValues,
  type QuickAddLeadValues,
} from "../schemas/dashboard.schema";

interface QuickActionModalsProps {
  isAddVesselOpen: boolean;
  onAddVesselOpenChange: (open: boolean) => void;
  isUploadDocOpen: boolean;
  onUploadDocOpenChange: (open: boolean) => void;
  isAddLeadOpen: boolean;
  onAddLeadOpenChange: (open: boolean) => void;
  onSuccessToast?: (msg: string) => void;
}

export function QuickActionModals({
  isAddVesselOpen,
  onAddVesselOpenChange,
  isUploadDocOpen,
  onUploadDocOpenChange,
  isAddLeadOpen,
  onAddLeadOpenChange,
  onSuccessToast,
}: QuickActionModalsProps) {
  // Vessel form
  const vesselForm = useForm<QuickAddVesselValues>({
    resolver: zodResolver(quickAddVesselSchema),
    defaultValues: {
      vesselName: "",
      imoNumber: "",
      flag: "Indonesia",
      vesselType: "Cargo",
      clientName: "",
    },
  });

  // Doc form
  const docForm = useForm<QuickUploadDocValues>({
    resolver: zodResolver(quickUploadDocSchema),
    defaultValues: {
      documentName: "",
      vesselId: "vessel-1",
      category: "Sertifikat Kapal",
      expiryDate: "",
    },
  });

  // Lead form
  const leadForm = useForm<QuickAddLeadValues>({
    resolver: zodResolver(quickAddLeadSchema),
    defaultValues: {
      companyName: "",
      picName: "",
      vesselCount: 2,
      potentialValue: 150000000,
    },
  });

  const onSubmitVessel = (values: QuickAddVesselValues) => {
    onSuccessToast?.(`Kapal ${values.vesselName} (IMO: ${values.imoNumber}) berhasil terdaftar!`);
    vesselForm.reset();
    onAddVesselOpenChange(false);
  };

  const onSubmitDoc = (values: QuickUploadDocValues) => {
    onSuccessToast?.(`Dokumen ${values.documentName} diunggah dan menunggu approval supervisor.`);
    docForm.reset();
    onUploadDocOpenChange(false);
  };

  const onSubmitLead = (values: QuickAddLeadValues) => {
    onSuccessToast?.(`Lead prospek ${values.companyName} berhasil dibuat dengan skor prioritas tinggi!`);
    leadForm.reset();
    onAddLeadOpenChange(false);
  };

  return (
    <>
      {/* Add Vessel Modal */}
      <Dialog open={isAddVesselOpen} onOpenChange={onAddVesselOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">Registrasi Kapal Baru</DialogTitle>
            <DialogDescription className="text-xs">
              Sistem akan otomatis menyiapkan checklist sertifikat wajib sesuai jenis kapal.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={vesselForm.handleSubmit(onSubmitVessel)} className="space-y-4 py-2">
            <FieldGroup className="space-y-3">
              <Field>
                <FieldLabel htmlFor="vesselName" className="text-xs font-semibold">Nama Kapal</FieldLabel>
                <Input id="vesselName" placeholder="Contoh: KM Nautiva Horizon" {...vesselForm.register("vesselName")} />
                {vesselForm.formState.errors.vesselName && (
                  <FieldError className="text-xs">{vesselForm.formState.errors.vesselName.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="imoNumber" className="text-xs font-semibold">IMO Number</FieldLabel>
                <Input id="imoNumber" placeholder="Contoh: IMO 9821245" {...vesselForm.register("imoNumber")} />
                {vesselForm.formState.errors.imoNumber && (
                  <FieldError className="text-xs">{vesselForm.formState.errors.imoNumber.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel className="text-xs font-semibold">Jenis Kapal</FieldLabel>
                <Select
                  defaultValue={vesselForm.watch("vesselType")}
                  onValueChange={(v) => vesselForm.setValue("vesselType", v as any)}
                >
                  <SelectTrigger className="w-full text-xs">
                    <SelectValue placeholder="Pilih jenis kapal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cargo">Kapal Kargo General</SelectItem>
                    <SelectItem value="Tanker">Kapal Tanker Minyak/Kimia</SelectItem>
                    <SelectItem value="Tugboat">Tugboat / Tongkang</SelectItem>
                    <SelectItem value="Bulk Carrier">Bulk Carrier</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="clientName" className="text-xs font-semibold">Pemilik / Perusahaan Pelayaran</FieldLabel>
                <Input id="clientName" placeholder="Contoh: PT. Nautiva Ocean Agency" {...vesselForm.register("clientName")} />
                {vesselForm.formState.errors.clientName && (
                  <FieldError className="text-xs">{vesselForm.formState.errors.clientName.message}</FieldError>
                )}
              </Field>
            </FieldGroup>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => onAddVesselOpenChange(false)} className="text-xs">
                Batal
              </Button>
              <Button type="submit" size="sm" className="text-xs">
                Simpan & Generate Checklist
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Upload Doc Modal */}
      <Dialog open={isUploadDocOpen} onOpenChange={onUploadDocOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">Upload Dokumen Digital</DialogTitle>
            <DialogDescription className="text-xs">
              Dokumen akan berstatus Menunggu Approval sebelum berstatus Final resmi.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={docForm.handleSubmit(onSubmitDoc)} className="space-y-4 py-2">
            <FieldGroup className="space-y-3">
              <Field>
                <FieldLabel htmlFor="documentName" className="text-xs font-semibold">Nama Sertifikat / Dokumen</FieldLabel>
                <Input id="documentName" placeholder="Contoh: Sertifikat SOLAS Safety Construction" {...docForm.register("documentName")} />
                {docForm.formState.errors.documentName && (
                  <FieldError className="text-xs">{docForm.formState.errors.documentName.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel className="text-xs font-semibold">Kategori Dokumen</FieldLabel>
                <Select
                  defaultValue={docForm.watch("category")}
                  onValueChange={(v) => docForm.setValue("category", v as any)}
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
                <FieldLabel htmlFor="expiryDate" className="text-xs font-semibold">Tanggal Expired (Jatuh Tempo)</FieldLabel>
                <Input id="expiryDate" type="date" {...docForm.register("expiryDate")} />
                {docForm.formState.errors.expiryDate && (
                  <FieldError className="text-xs">{docForm.formState.errors.expiryDate.message}</FieldError>
                )}
              </Field>
            </FieldGroup>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => onUploadDocOpenChange(false)} className="text-xs">
                Batal
              </Button>
              <Button type="submit" size="sm" className="text-xs">
                Upload & Ajukan Approval
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Lead Modal */}
      <Dialog open={isAddLeadOpen} onOpenChange={onAddLeadOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">Tambah Lead CRM Baru</DialogTitle>
            <DialogDescription className="text-xs">
              Sistem akan menghitung skor prioritas otomatis berdasarkan jumlah armada & nilai kontrak.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={leadForm.handleSubmit(onSubmitLead)} className="space-y-4 py-2">
            <FieldGroup className="space-y-3">
              <Field>
                <FieldLabel htmlFor="companyName" className="text-xs font-semibold">Nama Perusahaan Pelayaran</FieldLabel>
                <Input id="companyName" placeholder="Contoh: PT. Nautiva Ocean Agency" {...leadForm.register("companyName")} />
                {leadForm.formState.errors.companyName && (
                  <FieldError className="text-xs">{leadForm.formState.errors.companyName.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="picName" className="text-xs font-semibold">Nama PIC / Kontak Utama</FieldLabel>
                <Input id="picName" placeholder="Contoh: Capt. Herman Wijaya" {...leadForm.register("picName")} />
                {leadForm.formState.errors.picName && (
                  <FieldError className="text-xs">{leadForm.formState.errors.picName.message}</FieldError>
                )}
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="vesselCount" className="text-xs font-semibold">Jumlah Armada</FieldLabel>
                  <Input
                    id="vesselCount"
                    type="number"
                    {...leadForm.register("vesselCount", { valueAsNumber: true })}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="potentialValue" className="text-xs font-semibold">Nilai Potensi (IDR)</FieldLabel>
                  <Input
                    id="potentialValue"
                    type="number"
                    {...leadForm.register("potentialValue", { valueAsNumber: true })}
                  />
                </Field>
              </div>
            </FieldGroup>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => onAddLeadOpenChange(false)} className="text-xs">
                Batal
              </Button>
              <Button type="submit" size="sm" className="text-xs">
                Simpan Prospek CRM
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
