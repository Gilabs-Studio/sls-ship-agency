import { z } from "zod";

export const reminderThresholdSchema = z.object({
  threshold30Days: z.boolean(),
  threshold15Days: z.boolean(),
  threshold7Days: z.boolean(),
  threshold1Day: z.boolean(),
  sendEmail: z.boolean(),
  sendWhatsApp: z.boolean(),
});

export type ReminderThresholdValues = z.infer<typeof reminderThresholdSchema>;
