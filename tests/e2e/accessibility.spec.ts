import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const route of ["/","/work","/studio","/contact"]) {
  test(`accessibility ${route}`, async ({page})=>{
    await page.goto(route);
    const results=await new AxeBuilder({page}).analyze();
    expect(results.violations).toEqual([]);
  });
}
