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
  leadSchema,
  contactSchema,
  dealSchema,
  type LeadFormValues,
  type ContactFormValues,
  type DealFormValues,
} from "../schemas/crm.schema";
import type { LeadItem } from "../types/crm.types";

interface CrmModalsProps {
  leads: LeadItem[];
  isAddLeadOpen: boolean;
  onAddLeadOpenChange: (open: boolean) => void;
  onAddLeadSubmit: (data: LeadFormValues) => void;
  isAddContactOpen: boolean;
  onAddContactOpenChange: (open: boolean) => void;
  onAddContactSubmit: (data: ContactFormValues) => void;
  isAddDealOpen: boolean;
  onAddDealOpenChange: (open: boolean) => void;
  onAddDealSubmit: (data: DealFormValues) => void;
}

export function CrmModals({
  leads,
  isAddLeadOpen,
  onAddLeadOpenChange,
  onAddLeadSubmit,
  isAddContactOpen,
  onAddContactOpenChange,
  onAddContactSubmit,
  isAddDealOpen,
  onAddDealOpenChange,
  onAddDealSubmit,
}: CrmModalsProps) {
  // Lead form
  const leadForm = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      companyName: "",
      picName: "",
      picPhone: "",
      picEmail: "",
      source: "Pameran Maritim",
      vesselCount: 3,
      potentialValue: 200000000,
      notes: "",
    },
  });

  // Contact form
  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      position: "Manager Operasional",
      email: "",
      phone: "",
    },
  });

  // Deal form
  const dealForm = useForm<DealFormValues>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      leadId: leads[0]?.id || "",
      title: "Penawaran Keagenan Kapal",
      proposalValue: 300000000,
      validUntil: "2026-09-30",
    },
  });

  return (
    <>
      {/* Add Lead Modal */}
      <Dialog open={isAddLeadOpen} onOpenChange={onAddLeadOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">Pendaftaran Lead Prospek Baru</DialogTitle>
            <DialogDescription className="text-xs">
              Otomatis menghitung skor prioritas dan menjadwalkan reminder follow-up.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={leadForm.handleSubmit((values) => {
              onAddLeadSubmit(values);
              leadForm.reset();
              onAddLeadOpenChange(false);
            })}
            className="space-y-3 py-1"
          >
            <FieldGroup className="space-y-3">
              <Field>
                <FieldLabel htmlFor="companyName" className="text-xs font-semibold">Nama Perusahaan Pelayaran</FieldLabel>
                <Input id="companyName" placeholder="Contoh: PT Ocean Trans Line" {...leadForm.register("companyName")} />
                {leadForm.formState.errors.companyName && (
                  <FieldError className="text-xs">{leadForm.formState.errors.companyName.message}</FieldError>
                )}
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="picName" className="text-xs font-semibold">Nama PIC</FieldLabel>
                  <Input id="picName" placeholder="Contoh: Capt. Herman" {...leadForm.register("picName")} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="picPhone" className="text-xs font-semibold">Telepon PIC</FieldLabel>
                  <Input id="picPhone" placeholder="0812..." {...leadForm.register("picPhone")} />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="picEmail" className="text-xs font-semibold">Email PIC</FieldLabel>
                <Input id="picEmail" type="email" placeholder="pic@perusahaan.com" {...leadForm.register("picEmail")} />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="vesselCount" className="text-xs font-semibold">Jumlah Armada</FieldLabel>
                  <Input id="vesselCount" type="number" {...leadForm.register("vesselCount", { valueAsNumber: true })} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="potentialValue" className="text-xs font-semibold">Nilai Potensi (IDR)</FieldLabel>
                  <Input id="potentialValue" type="number" {...leadForm.register("potentialValue", { valueAsNumber: true })} />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="notes" className="text-xs font-semibold">Catatan Kebutuhan</FieldLabel>
                <Textarea id="notes" placeholder="Deskripsi armada & kebutuhan keagenan..." {...leadForm.register("notes")} className="text-xs" />
              </Field>
            </FieldGroup>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => onAddLeadOpenChange(false)} className="text-xs">
                Batal
              </Button>
              <Button type="submit" size="sm" className="text-xs">
                Simpan Lead Prospek
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Contact Modal */}
      <Dialog open={isAddContactOpen} onOpenChange={onAddContactOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">Tambah Kontak PIC Pelayaran</DialogTitle>
            <DialogDescription className="text-xs">
              Catat data person in charge untuk riwayat interaksi & penawaran.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={contactForm.handleSubmit((values) => {
              onAddContactSubmit(values);
              contactForm.reset();
              onAddContactOpenChange(false);
            })}
            className="space-y-3 py-1"
          >
            <FieldGroup className="space-y-3">
              <Field>
                <FieldLabel htmlFor="name" className="text-xs font-semibold">Nama Lengkap</FieldLabel>
                <Input id="name" placeholder="Contoh: Ir. Bambang Subagyo" {...contactForm.register("name")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="company" className="text-xs font-semibold">Nama Perusahaan</FieldLabel>
                <Input id="company" placeholder="Contoh: PT Lautan Utama" {...contactForm.register("company")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="position" className="text-xs font-semibold">Jabatan</FieldLabel>
                <Input id="position" placeholder="Contoh: Manager Operasional Fleet" {...contactForm.register("position")} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="email" className="text-xs font-semibold">Email</FieldLabel>
                  <Input id="email" type="email" placeholder="bambang@company.com" {...contactForm.register("email")} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="phone" className="text-xs font-semibold">Nomor Telepon</FieldLabel>
                  <Input id="phone" placeholder="0811..." {...contactForm.register("phone")} />
                </Field>
              </div>
            </FieldGroup>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => onAddContactOpenChange(false)} className="text-xs">
                Batal
              </Button>
              <Button type="submit" size="sm" className="text-xs">
                Simpan Kontak
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Deal Proposal Modal */}
      <Dialog open={isAddDealOpen} onOpenChange={onAddDealOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">Buat Proposal Penawaran (Quotation)</DialogTitle>
            <DialogDescription className="text-xs">
              Sistem akan membuatkan draft dokumen penawaran resmi.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={dealForm.handleSubmit((values) => {
              onAddDealSubmit(values);
              dealForm.reset();
              onAddDealOpenChange(false);
            })}
            className="space-y-3 py-1"
          >
            <FieldGroup className="space-y-3">
              <Field>
                <FieldLabel className="text-xs font-semibold">Pilih Lead Prospek</FieldLabel>
                <Select
                  defaultValue={dealForm.watch("leadId")}
                  onValueChange={(v) => dealForm.setValue("leadId", v)}
                >
                  <SelectTrigger className="w-full text-xs">
                    <SelectValue placeholder="Pilih lead" />
                  </SelectTrigger>
                  <SelectContent>
                    {leads.map((l) => (
                      <SelectItem key={l.id} value={l.id}>
                        {l.companyName} ({l.vesselCount} Kapal)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="title" className="text-xs font-semibold">Judul Proposal</FieldLabel>
                <Input id="title" placeholder="Contoh: Proposal Keagenan Armada Cargo 2026" {...dealForm.register("title")} />
              </Field>

              <Field>
                <FieldLabel htmlFor="proposalValue" className="text-xs font-semibold">Nilai Penawaran (IDR)</FieldLabel>
                <Input id="proposalValue" type="number" {...dealForm.register("proposalValue", { valueAsNumber: true })} />
              </Field>

              <Field>
                <FieldLabel htmlFor="validUntil" className="text-xs font-semibold">Masa Berlaku Proposal</FieldLabel>
                <Input id="validUntil" type="date" {...dealForm.register("validUntil")} />
              </Field>
            </FieldGroup>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => onAddDealOpenChange(false)} className="text-xs">
                Batal
              </Button>
              <Button type="submit" size="sm" className="text-xs">
                Generate Dokumen Proposal
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
