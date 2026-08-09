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

import { userAccountSchema, type UserAccountFormValues } from "../schemas/settings.schema";

interface UserFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitUser: (data: UserAccountFormValues) => void;
}

export function UserFormModal({ isOpen, onOpenChange, onSubmitUser }: UserFormModalProps) {
  const form = useForm<UserAccountFormValues>({
    resolver: zodResolver(userAccountSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "Staff Operasional",
      department: "Divisi Operasional",
      companyName: "",
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-sm font-bold">Tambah Akun Pengguna Baru</DialogTitle>
          <DialogDescription className="text-xs">
            Hak akses modul akan dikendalikan otomatis sesuai dengan peran RBAC yang dipilih.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit((values) => {
            onSubmitUser(values);
            form.reset();
            onOpenChange(false);
          })}
          className="space-y-3 py-1"
        >
          <FieldGroup className="space-y-3">
            <Field>
              <FieldLabel htmlFor="name" className="text-xs font-semibold">Nama Lengkap</FieldLabel>
              <Input id="name" placeholder="Contoh: Rian Pratama" {...form.register("name")} />
              {form.formState.errors.name && (
                <FieldError className="text-xs">{form.formState.errors.name.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="email" className="text-xs font-semibold">Alamat Email</FieldLabel>
              <Input id="email" type="email" placeholder="rian@solidmaritime.com" {...form.register("email")} />
            </Field>

            <Field>
              <FieldLabel className="text-xs font-semibold">Peran (Role RBAC)</FieldLabel>
              <Select
                defaultValue={form.watch("role")}
                onValueChange={(v) => form.setValue("role", v as any)}
              >
                <SelectTrigger className="w-full text-xs">
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Super Admin">Super Admin (Akses Penuh)</SelectItem>
                  <SelectItem value="Staff Operasional">Staff Operasional (Kelola Armada & Sertifikat)</SelectItem>
                  <SelectItem value="Sales / Business Dev">Sales / Business Dev (Kelola CRM & Lead)</SelectItem>
                  <SelectItem value="Klien">Klien (Read-Only Portal Kapal Sendiri)</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="department" className="text-xs font-semibold">Departemen / Divisi</FieldLabel>
              <Input id="department" placeholder="Contoh: Operations Division" {...form.register("department")} />
            </Field>
          </FieldGroup>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)} className="text-xs">
              Batal
            </Button>
            <Button type="submit" size="sm" className="text-xs">
              Buat Akun User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
