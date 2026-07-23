import { test,expect } from '@playwright/test';
test('home and primary routes render',async({page})=>{for(const path of ['/','/projects','/careers','/contact']){await page.goto(path);await expect(page.locator('body')).toBeVisible();await expect(page).not.toHaveTitle(/404/)}});
