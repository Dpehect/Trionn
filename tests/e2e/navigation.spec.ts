import { expect, test } from "@playwright/test";

test("primary routes render", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Creative Developer/);
  await page.goto("/projects");
  await expect(page.locator("main")).toBeVisible();
  await page.goto("/about");
  await expect(page.locator("main")).toBeVisible();
  await page.goto("/contact");
  await expect(page.locator("main")).toBeVisible();
});

test("unknown routes show designed 404", async ({ page }) => {
  await page.goto("/not-a-real-route");
  await expect(page.getByText("THIS ROUTE")).toBeVisible();
});
