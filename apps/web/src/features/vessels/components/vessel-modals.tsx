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
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  vesselRegistrationSchema,
  certificateRenewSchema,
  type VesselRegistrationValues,
  type CertificateRenewValues,
} from "../schemas/vessel.schema";

interface VesselModalsProps {
  isAddVesselOpen: boolean;
  onAddVesselOpenChange: (open: boolean) => void;
  onAddVesselSubmit: (data: VesselRegistrationValues) => void;
  isRenewCertOpen: boolean;
  onRenewCertOpenChange: (open: boolean) => void;
  onRenewCertSubmit: (data: CertificateRenewValues) => void;
  selectedCertId: string | null;
}

export function VesselModals({
  isAddVesselOpen,
  onAddVesselOpenChange,
  onAddVesselSubmit,
  isRenewCertOpen,
  onRenewCertOpenChange,
  onRenewCertSubmit,
  selectedCertId,
}: VesselModalsProps) {
  // Vessel Reg Form
  const vesselForm = useForm<VesselRegistrationValues>({
    resolver: zodResolver(vesselRegistrationSchema),
    defaultValues: {
      name: "",
      imoNumber: "",
      flag: "Indonesia 🇮🇩",
      vesselType: "Cargo",
      clientCompany: "",
      builtYear: 2020,
      grossTonnage: 5000,
    },
  });

  // Certificate Renew Form
  const renewForm = useForm<CertificateRenewValues>({
    resolver: zodResolver(certificateRenewSchema),
    defaultValues: {
      certificateId: selectedCertId || "",
      issueDate: "2026-08-09",
      newExpiryDate: "2027-08-09",
      issuingAuthority: "Biro Klasifikasi Indonesia (BKI)",
      notes: "Sertifikat diperbarui secara resmi.",
    },
  });

  React.useEffect(() => {
    if (selectedCertId) {
      renewForm.setValue("certificateId", selectedCertId);
    }
  }, [selectedCertId, renewForm]);

  return (
    <>
      {/* Vessel Registration Modal */}
      <Dialog open={isAddVesselOpen} onOpenChange={onAddVesselOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">Registrasi Kapal Armada Baru</DialogTitle>
            <DialogDescription className="text-xs">
              Checklist sertifikat wajib akan dibuat otomatis berdasarkan tipe kapal.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={vesselForm.handleSubmit((values) => {
              onAddVesselSubmit(values);
              vesselForm.reset();
              onAddVesselOpenChange(false);
            })}
            className="space-y-3 py-1"
          >
            <FieldGroup className="space-y-3">
              <Field>
                <FieldLabel htmlFor="name" className="text-xs font-semibold">Nama Kapal</FieldLabel>
                <Input id="name" placeholder="Contoh: KM Maritime Star" {...vesselForm.register("name")} />
                {vesselForm.formState.errors.name && (
                  <FieldError className="text-xs">{vesselForm.formState.errors.name.message}</FieldError>
                )}
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="imoNumber" className="text-xs font-semibold">IMO Number</FieldLabel>
                  <Input id="imoNumber" placeholder="IMO 981234" {...vesselForm.register("imoNumber")} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="flag" className="text-xs font-semibold">Bendera Kapal</FieldLabel>
                  <Input id="flag" placeholder="Indonesia" {...vesselForm.register("flag")} />
                </Field>
              </div>

              <Field>
                <FieldLabel className="text-xs font-semibold">Jenis Kapal</FieldLabel>
                <Select
                  defaultValue={vesselForm.watch("vesselType")}
                  onValueChange={(v) => vesselForm.setValue("vesselType", v as VesselRegistrationValues["vesselType"])}
                >
                  <SelectTrigger className="w-full text-xs">
                    <SelectValue placeholder="Pilih tipe" />
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
                <FieldLabel htmlFor="clientCompany" className="text-xs font-semibold">Perusahaan Pelayaran (Pemilik)</FieldLabel>
                <Input id="clientCompany" placeholder="Contoh: PT. Nautiva Ocean Agency" {...vesselForm.register("clientCompany")} />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="builtYear" className="text-xs font-semibold">Tahun Pembuatan</FieldLabel>
                  <Input id="builtYear" type="number" {...vesselForm.register("builtYear", { valueAsNumber: true })} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="grossTonnage" className="text-xs font-semibold">Gross Tonnage (GT)</FieldLabel>
                  <Input id="grossTonnage" type="number" {...vesselForm.register("grossTonnage", { valueAsNumber: true })} />
                </Field>
              </div>
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

      {/* Certificate Renew Modal */}
      <Dialog open={isRenewCertOpen} onOpenChange={onRenewCertOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">Perpanjangan Sertifikat Kapal</DialogTitle>
            <DialogDescription className="text-xs">
              Pembaruan tanggal berlaku sertifikat akan mereset jadwal pengingat reminder.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={renewForm.handleSubmit((values) => {
              onRenewCertSubmit(values);
              renewForm.reset();
              onRenewCertOpenChange(false);
            })}
            className="space-y-3 py-1"
          >
            <FieldGroup className="space-y-3">
              <Field>
                <FieldLabel htmlFor="issuingAuthority" className="text-xs font-semibold">Otoritas Penerbit Sertifikat</FieldLabel>
                <Input id="issuingAuthority" placeholder="Contoh: Biro Klasifikasi Indonesia" {...renewForm.register("issuingAuthority")} />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="issueDate" className="text-xs font-semibold">Tanggal Terbit Baru</FieldLabel>
                  <Input id="issueDate" type="date" {...renewForm.register("issueDate")} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="newExpiryDate" className="text-xs font-semibold">Tanggal Expired Baru</FieldLabel>
                  <Input id="newExpiryDate" type="date" {...renewForm.register("newExpiryDate")} />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="notes" className="text-xs font-semibold">Catatan Audit</FieldLabel>
                <Textarea id="notes" placeholder="Catatan perpanjangan..." {...renewForm.register("notes")} className="text-xs" />
              </Field>
            </FieldGroup>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => onRenewCertOpenChange(false)} className="text-xs">
                Batal
              </Button>
              <Button type="submit" size="sm" className="text-xs">
                Perbarui & Reset Reminder
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
