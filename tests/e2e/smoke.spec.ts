import { test, expect } from "@playwright/test";

test("home and work routes load", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name:/WE MAKE/i })).toBeVisible();
  await page.goto("/work");
  await expect(page.getByRole("heading", { name:"WORK" })).toBeVisible();
});

test("contact brief renders", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByText("Step 1 / 5")).toBeVisible();
});
