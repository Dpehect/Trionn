import { describe, expect, it } from "vitest";
import { projects } from "../../src/lib/site-data";

describe("project data", () => {
  it("uses unique slugs", () => {
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
  });
  it("contains enough work for the horizontal index", () => {
    expect(projects.length).toBeGreaterThanOrEqual(6);
  });
});
