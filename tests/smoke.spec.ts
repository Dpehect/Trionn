import { expect, test } from "@playwright/test";
test("core routes render", async ({ page }) => { for (const route of ["/", "/about", "/careers", "/contact", "/industries"]) { await page.goto(route); await expect(page.locator("body")).toBeVisible(); } });
test("contact validation is accessible", async ({ page }) => { await page.goto("/contact"); await page.getByRole("button", { name: /send project inquiry/i }).click(); await expect(page.getByText(/please enter your name/i)).toBeVisible(); });
