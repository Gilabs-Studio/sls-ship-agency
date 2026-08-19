"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { ClipboardCheck } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { discoveryFormSchema, type DiscoveryFormValues } from "../schemas/sales.schema";
import type { LeadOpportunity } from "../types/sales.types";

interface DiscoveryFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLead: LeadOpportunity | null;
  onSubmit: (leadId: string, values: DiscoveryFormValues) => void;
}

export function DiscoveryFormModal({
  open,
  onOpenChange,
  selectedLead,
  onSubmit,
}: DiscoveryFormModalProps) {
  const t = useTranslations("sales");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DiscoveryFormValues>({
    resolver: zodResolver(discoveryFormSchema),
    defaultValues: {
      vesselCountNeeded: 5,
      frequentlyExpiringCerts: "SOLAS, MARPOL, ISM Code",
      outsourcingNeeds: "UWILD Diving, Radio Survey",
      currentAgencyPainPoints: "Pengurusan perizinan sering terlambat dari target SLA.",
      expectedStartDate: "2026-09-01",
      budgetRangeMonthly: "Rp 100.000.000 - Rp 200.000.000 / bulan",
    },
  });

  useEffect(() => {
    if (open && selectedLead?.qualification) {
      const q = selectedLead.qualification;
      reset({
        vesselCountNeeded: q.vesselCountNeeded,
        frequentlyExpiringCerts: q.frequentlyExpiringCerts.join(", "),
        outsourcingNeeds: q.outsourcingNeeds.join(", "),
        currentAgencyPainPoints: q.currentAgencyPainPoints,
        expectedStartDate: q.expectedStartDate,
        budgetRangeMonthly: q.budgetRangeMonthly,
      });
    } else if (open) {
      reset({
        vesselCountNeeded: 5,
        frequentlyExpiringCerts: "SOLAS, MARPOL, ISM Code",
        outsourcingNeeds: "UWILD Diving, Radio Survey",
        currentAgencyPainPoints: "Pengurusan perizinan sering terlambat dari target SLA.",
        expectedStartDate: "2026-09-01",
        budgetRangeMonthly: "Rp 100.000.000 - Rp 200.000.000 / bulan",
      });
    }
  }, [open, selectedLead, reset]);

  const handleFormSubmit = (values: DiscoveryFormValues) => {
    if (!selectedLead) return;
    onSubmit(selectedLead.id, values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle className="text-base font-bold flex items-center gap-2 text-foreground">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            {t("discoveryModal.title")}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {t("discoveryModal.subtitle")}
            <strong className="text-foreground">{selectedLead?.companyName}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-2">
          <FieldGroup className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="vesselCountNeeded">
                  {t("discoveryModal.vesselCountLabel")}
                </FieldLabel>
                <Input
                  id="vesselCountNeeded"
                  type="number"
                  className="glass-input text-xs"
                  {...register("vesselCountNeeded", { valueAsNumber: true })}
                />
                {errors.vesselCountNeeded && (
                  <FieldError>{errors.vesselCountNeeded.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="budgetRangeMonthly">
                  {t("discoveryModal.budgetLabel")}
                </FieldLabel>
                <Input
                  id="budgetRangeMonthly"
                  className="glass-input text-xs"
                  {...register("budgetRangeMonthly")}
                />
                {errors.budgetRangeMonthly && (
                  <FieldError>{errors.budgetRangeMonthly.message}</FieldError>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="frequentlyExpiringCerts">
                {t("discoveryModal.expiringCertsLabel")}
              </FieldLabel>
              <Input
                id="frequentlyExpiringCerts"
                placeholder={t("discoveryModal.expiringCertsPlaceholder")}
                className="glass-input text-xs"
                {...register("frequentlyExpiringCerts")}
              />
              {errors.frequentlyExpiringCerts && (
                <FieldError>{errors.frequentlyExpiringCerts.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="outsourcingNeeds">
                {t("discoveryModal.outsourceLabel")}
              </FieldLabel>
              <Input
                id="outsourcingNeeds"
                placeholder={t("discoveryModal.outsourcePlaceholder")}
                className="glass-input text-xs"
                {...register("outsourcingNeeds")}
              />
              {errors.outsourcingNeeds && (
                <FieldError>{errors.outsourcingNeeds.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="currentAgencyPainPoints">
                {t("discoveryModal.painPointsLabel")}
              </FieldLabel>
              <Textarea
                id="currentAgencyPainPoints"
                placeholder={t("discoveryModal.painPointsPlaceholder")}
                className="glass-input text-xs min-h-[70px]"
                {...register("currentAgencyPainPoints")}
              />
              {errors.currentAgencyPainPoints && (
                <FieldError>{errors.currentAgencyPainPoints.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="expectedStartDate">
                {t("discoveryModal.startDateLabel")}
              </FieldLabel>
              <Input
                id="expectedStartDate"
                type="date"
                className="glass-input text-xs"
                {...register("expectedStartDate")}
              />
              {errors.expectedStartDate && (
                <FieldError>{errors.expectedStartDate.message}</FieldError>
              )}
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
              {t("discoveryModal.cancel")}
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-primary text-primary-foreground font-semibold cursor-pointer"
            >
              {t("discoveryModal.submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
