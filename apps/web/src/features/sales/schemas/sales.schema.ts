import { z } from "zod";

export const addLeadSchema = z.object({
  companyName: z
    .string()
    .min(3, "Nama perusahaan minimal 3 karakter")
    .max(100, "Nama perusahaan maksimal 100 karakter"),
  businessType: z.enum([
    "Container Carrier",
    "Oil & Chemical Tanker",
    "Tug & Barge (Coal & Minerals)",
    "General Cargo & Breakbulk",
    "Offshore Support & Supply",
  ]),
  contactName: z.string().min(2, "Nama PIC minimal 2 karakter"),
  contactEmail: z.string().email("Format email tidak valid"),
  contactPhone: z.string().min(8, "Nomor telepon/HP minimal 8 karakter"),
  leadSource: z.enum([
    "Inbound Website",
    "Referral Partner",
    "Port Exhibition",
    "Outbound Sales",
    "Tender Portal",
  ]),
  potentialValueMonthly: z.number().min(1000000, "Nilai minimal Rp 1.000.000"),
  notes: z.string().optional(),
});

export type AddLeadFormValues = z.infer<typeof addLeadSchema>;

export const discoveryFormSchema = z.object({
  vesselCountNeeded: z.number().min(1, "Jumlah kapal minimal 1"),
  frequentlyExpiringCerts: z.string().min(3, "Masukkan minimal 1 sertifikat"),
  outsourcingNeeds: z.string().min(3, "Masukkan kebutuhan outsource"),
  currentAgencyPainPoints: z
    .string()
    .min(5, "Deskripsikan keluhan/constraint agen saat ini"),
  expectedStartDate: z.string().min(1, "Tanggal target mulai wajib diisi"),
  budgetRangeMonthly: z.string().min(3, "Kisaran budget wajib diisi"),
});

export type DiscoveryFormValues = z.infer<typeof discoveryFormSchema>;
