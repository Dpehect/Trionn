import { describe, expect, it } from "vitest";
import { projectBriefSchema } from "@/lib/project-brief-schema";

describe("projectBriefSchema", () => {
  it("accepts a valid brief", () => {
    const result = projectBriefSchema.safeParse({
      name:"Ada North", email:"ada@example.com", company:"Studio",
      projectType:"Product experience", budget:"25-50k",
      timeline:"1-3 months", services:["Strategy"],
      message:"We need a complete digital experience for our launch.",
      website:"", honeypot:""
    });
    expect(result.success).toBe(true);
  });

  it("rejects spam honeypot content", () => {
    const result = projectBriefSchema.safeParse({
      name:"Ada North", email:"ada@example.com", company:"Studio",
      projectType:"Product experience", budget:"25-50k",
      timeline:"1-3 months", services:["Strategy"],
      message:"We need a complete digital experience for our launch.",
      website:"", honeypot:"spam"
    });
    expect(result.success).toBe(false);
  });
});
