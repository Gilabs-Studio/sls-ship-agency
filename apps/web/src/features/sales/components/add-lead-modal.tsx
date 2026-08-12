"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addLeadSchema, type AddLeadFormValues } from "../schemas/sales.schema";
import type { ShippingBusinessType } from "../types/sales.types";

interface AddLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: AddLeadFormValues) => void;
}

const BUSINESS_TYPES: ShippingBusinessType[] = [
  "Container Carrier",
  "Oil & Chemical Tanker",
  "Tug & Barge (Coal & Minerals)",
  "General Cargo & Breakbulk",
  "Offshore Support & Supply",
];

const LEAD_SOURCES = [
  "Inbound Website",
  "Referral Partner",
  "Port Exhibition",
  "Outbound Sales",
  "Tender Portal",
] as const;

export function AddLeadModal({ open, onOpenChange, onSubmit }: AddLeadModalProps) {
  const t = useTranslations("sales");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddLeadFormValues>({
    resolver: zodResolver(addLeadSchema),
    defaultValues: {
      companyName: "",
      businessType: "Container Carrier",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      leadSource: "Inbound Website",
      potentialValueMonthly: 150000000,
      notes: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        companyName: "",
        businessType: "Container Carrier",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        leadSource: "Inbound Website",
        potentialValueMonthly: 150000000,
        notes: "",
      });
    }
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-foreground">
            {t("addModal.title")}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {t("addModal.subtitle")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <FieldGroup className="space-y-3">
            <Field>
              <FieldLabel htmlFor="companyName">{t("addModal.companyLabel")}</FieldLabel>
              <Input
                id="companyName"
                placeholder={t("addModal.companyPlaceholder")}
                className="glass-input text-xs"
                {...register("companyName")}
              />
              {errors.companyName && (
                <FieldError>{errors.companyName.message}</FieldError>
              )}
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="businessType">{t("addModal.businessTypeLabel")}</FieldLabel>
                <Controller
                  name="businessType"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="businessType" className="glass-input text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {BUSINESS_TYPES.map((bt) => (
                          <SelectItem key={bt} value={bt} className="text-xs">
                            {bt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="leadSource">{t("addModal.sourceLabel")}</FieldLabel>
                <Controller
                  name="leadSource"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="leadSource" className="glass-input text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LEAD_SOURCES.map((ls) => (
                          <SelectItem key={ls} value={ls} className="text-xs">
                            {ls}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="contactName">{t("addModal.picNameLabel")}</FieldLabel>
                <Input
                  id="contactName"
                  placeholder={t("addModal.picNamePlaceholder")}
                  className="glass-input text-xs"
                  {...register("contactName")}
                />
                {errors.contactName && (
                  <FieldError>{errors.contactName.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="contactEmail">{t("addModal.emailLabel")}</FieldLabel>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder={t("addModal.emailPlaceholder")}
                  className="glass-input text-xs"
                  {...register("contactEmail")}
                />
                {errors.contactEmail && (
                  <FieldError>{errors.contactEmail.message}</FieldError>
                )}
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="contactPhone">{t("addModal.phoneLabel")}</FieldLabel>
                <Input
                  id="contactPhone"
                  placeholder={t("addModal.phonePlaceholder")}
                  className="glass-input text-xs"
                  {...register("contactPhone")}
                />
                {errors.contactPhone && (
                  <FieldError>{errors.contactPhone.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="potentialValueMonthly">{t("addModal.valueLabel")}</FieldLabel>
                <Input
                  id="potentialValueMonthly"
                  type="number"
                  className="glass-input text-xs"
                  {...register("potentialValueMonthly", { valueAsNumber: true })}
                />
                {errors.potentialValueMonthly && (
                  <FieldError>{errors.potentialValueMonthly.message}</FieldError>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="notes">{t("addModal.notesLabel")}</FieldLabel>
              <Input
                id="notes"
                placeholder={t("addModal.notesPlaceholder")}
                className="glass-input text-xs"
                {...register("notes")}
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="pt-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer"
            >
              {t("addModal.cancel")}
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-primary text-primary-foreground font-semibold cursor-pointer"
            >
              {t("addModal.submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
