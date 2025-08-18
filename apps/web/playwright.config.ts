import { devices } from '@playwright/test';
import { createConfig } from '@repo/playwright-config/base';

export default createConfig({
	testDir: './e2e',
	use: {
		baseURL: 'http://localhost:5000',
	},
	webServer: {
		command: 'pnpm run dev',
		port: 5000,
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
	},
	projects: [
		{
			name: 'setup',
			testMatch: /.*\.setup\.ts/,
		},
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
			dependencies: ['setup'],
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
			dependencies: ['setup'],
		},
		{
			name: 'smoke-chromium',
			use: { ...devices['Desktop Chrome'] },
			testMatch: /.*\.smoke\.spec\.ts/,
			dependencies: ['setup'],
		},
	],
});
