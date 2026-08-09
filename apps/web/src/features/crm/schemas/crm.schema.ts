import { z } from "zod";

export const leadSchema = z.object({
  companyName: z.string().min(2, "Nama perusahaan minimal 2 karakter"),
  picName: z.string().min(2, "Nama PIC wajib diisi"),
  picPhone: z.string().min(6, "Nomor telepon tidak valid"),
  picEmail: z.string().email("Email tidak valid"),
  source: z.string().min(2, "Sumber lead wajib diisi"),
  vesselCount: z.number().min(1, "Jumlah armada minimal 1"),
  potentialValue: z.number().min(0, "Nilai potensi wajib diisi"),
  notes: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Nama kontak wajib diisi"),
  company: z.string().min(2, "Nama perusahaan wajib diisi"),
  position: z.string().min(2, "Jabatan wajib diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(6, "Nomor telepon wajib diisi"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const dealSchema = z.object({
  leadId: z.string().min(1, "Pilih lead prospek"),
  title: z.string().min(3, "Judul penawaran wajib diisi"),
  proposalValue: z.number().min(1000000, "Nilai penawaran minimal Rp 1.000.000"),
  validUntil: z.string().min(1, "Batas berlaku wajib diisi"),
});

export type DealFormValues = z.infer<typeof dealSchema>;
