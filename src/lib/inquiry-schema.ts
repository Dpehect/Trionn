import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  company: z.string().trim().min(2).max(120),
  budget: z.enum(["10-25k", "25-50k", "50-100k", "100k+"]),
  message: z.string().trim().min(20).max(4000),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type Inquiry = InquiryInput & {
  id: string;
  createdAt: string;
  status: "new" | "reviewing" | "closed";
};
