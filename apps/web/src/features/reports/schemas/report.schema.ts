import { z } from "zod";

export const reportFilterSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  clientCompany: z.string(),
  vesselType: z.string(),
});

export type ReportFilterValues = z.infer<typeof reportFilterSchema>;
