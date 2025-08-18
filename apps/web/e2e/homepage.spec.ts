import { expect, test } from '@playwright/test';

const HOTEL_BOOKING_TITLE_REGEX = /Hotel Booking/i;

test.describe('Homepage', () => {
	test('should display homepage correctly', async ({ page }) => {
		await page.goto('/');

		await expect(page).toHaveTitle(HOTEL_BOOKING_TITLE_REGEX);

		await expect(page.locator('body')).toBeVisible();

		const logs: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				logs.push(msg.text());
			}
		});

		await page.waitForLoadState('networkidle');
		expect(logs).toHaveLength(0);
	});

	test('should be responsive', async ({ page }) => {
		await page.goto('/');

		// Desktop
		await page.setViewportSize({ width: 1200, height: 800 });
		await expect(page.locator('body')).toBeVisible();

		// Tablet
		await page.setViewportSize({ width: 768, height: 1024 });
		await expect(page.locator('body')).toBeVisible();

		// Mobile
		await page.setViewportSize({ width: 375, height: 667 });
		await expect(page.locator('body')).toBeVisible();
	});
});
