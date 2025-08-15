import { defineConfig, PlaywrightTestConfig } from '@playwright/test';
import baseConfig from '../playwright.config.js';

export const createConfig = (overrides: Partial<PlaywrightTestConfig> = {}): PlaywrightTestConfig => {
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
