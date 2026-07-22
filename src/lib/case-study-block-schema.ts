import { z } from "zod";

export const caseStudyBlockSchema = z.discriminatedUnion("type", [
  z.object({ id:z.string(), type:z.literal("text"), eyebrow:z.string(), title:z.string(), body:z.string() }),
  z.object({ id:z.string(), type:z.literal("media"), mediaId:z.string().nullable(), title:z.string(), ratio:z.enum(["16/9","4/3","1/1"]) }),
  z.object({ id:z.string(), type:z.literal("metric"), items:z.array(z.object({label:z.string(),value:z.string()})).min(1).max(6) }),
  z.object({ id:z.string(), type:z.literal("quote"), quote:z.string(), attribution:z.string() }),
]);

export const blockCollectionSchema = z.array(caseStudyBlockSchema).max(40);
export type EditableBlock = z.infer<typeof caseStudyBlockSchema>;
