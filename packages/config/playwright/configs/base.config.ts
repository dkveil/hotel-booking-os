import { defineConfig, type PlaywrightTestConfig } from '@playwright/test';
import baseConfig from '../playwright.config';

export const createConfig = (
	overrides: Partial<PlaywrightTestConfig> = {}
): PlaywrightTestConfig => {
	return defineConfig({
		...baseConfig,
		...overrides,
		use: {
			...baseConfig.use,
			...overrides.use,
		},
		projects: overrides.projects || baseConfig.projects,
	});
};
