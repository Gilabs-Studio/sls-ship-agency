import { z } from "zod";

export const userAccountSchema = z.object({
  name: z.string().min(2, "Nama user wajib diisi"),
  email: z.string().email("Email tidak valid"),
  role: z.enum(["Super Admin", "Staff Operasional", "Sales / Business Dev", "Klien"]),
  department: z.string().min(2, "Divisi/Departemen wajib diisi"),
  companyName: z.string().optional(),
});

export type UserAccountFormValues = z.infer<typeof userAccountSchema>;
