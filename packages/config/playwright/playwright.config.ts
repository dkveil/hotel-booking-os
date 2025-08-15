import { defineConfig, devices } from '@playwright/test';

/**
 * Shared Playwright configuration for all apps
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
	timeout: 30 * 1000,
	expect: {
		timeout: 5000,
	},
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI
		? [
				['html', { outputFolder: 'playwright-report' }],
				['json', { outputFile: 'test-results.json' }],
				['github'],
			]
		: [
				['html', { outputFolder: 'playwright-report' }],
				['json', { outputFile: 'test-results.json' }],
				['list'],
			],

	use: {
		baseURL: 'http://localhost:3000',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
		{
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 5'] },
		},
		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 12'] },
		},
	],

	webServer: {
		command: 'pnpm run dev',
		port: 3000,
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
	},
});
