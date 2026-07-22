import { z } from "zod";
export const projectSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  budget: z.enum(["10-25k","25-50k","50-100k","100k+"]),
  message: z.string().min(20)
});
export type ProjectInput = z.infer<typeof projectSchema>;
