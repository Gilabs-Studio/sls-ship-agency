import { z } from "zod";

export const quickAddVesselSchema = z.object({
  vesselName: z.string().min(2, "Nama kapal minimal 2 karakter"),
  imoNumber: z.string().min(7, "IMO Number minimal 7 karakter"),
  flag: z.string().min(2, "Bendera wajib diisi"),
  vesselType: z.enum(["Cargo", "Tanker", "Tugboat", "Bulk Carrier"]),
  clientName: z.string().min(2, "Nama perusahaan pelayaran wajib diisi"),
});

export type QuickAddVesselValues = z.infer<typeof quickAddVesselSchema>;

export const quickUploadDocSchema = z.object({
  documentName: z.string().min(2, "Nama dokumen wajib diisi"),
  vesselId: z.string().min(1, "Pilih kapal terkait"),
  category: z.enum(["Sertifikat Kapal", "Dokumen Klien", "Dokumen Internal"]),
  expiryDate: z.string().min(1, "Tanggal expired wajib diisi"),
});

export type QuickUploadDocValues = z.infer<typeof quickUploadDocSchema>;

export const quickAddLeadSchema = z.object({
  companyName: z.string().min(2, "Nama perusahaan wajib diisi"),
  picName: z.string().min(2, "Nama PIC wajib diisi"),
  vesselCount: z.number().min(1, "Jumlah armada minimal 1"),
  potentialValue: z.number().min(0, "Nilai kontrak wajib diisi"),
});

export type QuickAddLeadValues = z.infer<typeof quickAddLeadSchema>;
