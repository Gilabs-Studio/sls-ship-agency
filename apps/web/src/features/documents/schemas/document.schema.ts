import { z } from "zod";

export const documentUploadSchema = z.object({
  title: z.string().min(2, "Judul dokumen wajib diisi"),
  category: z.enum(["Sertifikat Kapal", "Dokumen Klien", "Dokumen Internal"]),
  vesselName: z.string().optional(),
  clientCompany: z.string().optional(),
  expiryDate: z.string().optional(),
  notes: z.string().optional(),
});

export type DocumentUploadValues = z.infer<typeof documentUploadSchema>;

export const documentApprovalSchema = z.object({
  documentId: z.string().min(1, "Document ID wajib ada"),
  action: z.enum(["Approve", "Reject"]),
  reviewNote: z.string().optional(),
});

export type DocumentApprovalValues = z.infer<typeof documentApprovalSchema>;
