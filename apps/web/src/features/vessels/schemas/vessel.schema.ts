import { z } from "zod";

export const vesselRegistrationSchema = z.object({
  name: z.string().min(2, "Nama kapal minimal 2 karakter"),
  imoNumber: z.string().min(7, "IMO Number minimal 7 karakter"),
  flag: z.string().min(2, "Bendera kapal wajib diisi"),
  vesselType: z.enum(["Cargo", "Tanker", "Tugboat", "Bulk Carrier"]),
  clientCompany: z.string().min(2, "Nama perusahaan pelayaran pemilik wajib diisi"),
  builtYear: z.number().min(1970).max(2026),
  grossTonnage: z.number().min(100),
});

export type VesselRegistrationValues = z.infer<typeof vesselRegistrationSchema>;

export const certificateRenewSchema = z.object({
  certificateId: z.string().min(1, "Pilih sertifikat"),
  issueDate: z.string().min(1, "Tanggal terbit wajib diisi"),
  newExpiryDate: z.string().min(1, "Tanggal expired baru wajib diisi"),
  issuingAuthority: z.string().min(2, "Otoritas penerbit wajib diisi"),
  notes: z.string().optional(),
});

export type CertificateRenewValues = z.infer<typeof certificateRenewSchema>;
