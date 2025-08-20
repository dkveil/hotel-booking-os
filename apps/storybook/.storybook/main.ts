import { resolve } from 'node:path';

const config = {
	stories: ['../stories/*.stories.tsx', '../stories/**/*.stories.tsx'],

	addons: [
		'@storybook/addon-links',
		'@storybook/addon-docs',
		'@storybook/addon-styling-webpack',
		'@storybook/addon-themes',
		'@storybook/addon-onboarding',
		'@chromatic-com/storybook',
		{
			name: '@storybook/addon-postcss',
			options: {
				postcssLoaderOptions: {
					implementation: require('postcss'),
				},
			},
		},
	],

	framework: {
		name: '@storybook/react-vite',
		options: {},
	},

	core: {},

	docs: {
		autodocs: 'tag',
	},

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
	},
};

export default config;
