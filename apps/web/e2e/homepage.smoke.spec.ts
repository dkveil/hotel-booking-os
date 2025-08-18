import { test, expect } from '@playwright/test';

test('homepage loads @smoke', async ({ page }) => {
	await page.goto('/');

	await expect(page.locator('h1')).toContainText('Hello World');
	await expect(page.locator('button')).toContainText('Click me test');
});
