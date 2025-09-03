import { createRequire } from "node:module";
import { resolve, dirname, join } from 'node:path';

const require = createRequire(import.meta.url);

const config = {
    stories: ['../stories/*.stories.tsx', '../stories/**/*.stories.tsx'],

    addons: [
		getAbsolutePath("@storybook/addon-links"),
		getAbsolutePath("@storybook/addon-docs"),
		getAbsolutePath("@storybook/addon-styling-webpack"),
		getAbsolutePath("@storybook/addon-themes"),
		getAbsolutePath("@storybook/addon-onboarding"),
		getAbsolutePath("@chromatic-com/storybook"),
		{
			name: getAbsolutePath("@storybook/addon-postcss"),
			options: {
				postcssLoaderOptions: {
					implementation: require('postcss'),
				},
			},
		},
	],

    framework: {
		name: getAbsolutePath("@storybook/react-vite"),
		options: {},
	},

    core: {},

    async viteFinal(config, { _configType }) {
		return {
			...config,
			define: { 'process.env': {} },
			resolve: {
				alias: [
					{
						find: 'ui',
						replacement: resolve(__dirname, '../../../packages/ui/'),
					},
				],
			},
		};
	}
};

export default config;

function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, "package.json")));
}
