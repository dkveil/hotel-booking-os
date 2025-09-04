import type { CheckboxField, TextField } from 'payload';

import { formatSlugHook } from './format-slug';

type Overrides = {
	slugOverrides?: Partial<TextField>;
	checkboxOverrides?: Partial<CheckboxField>;
};

type Slug = (
	fieldToUse?: string,
	overrides?: Overrides
) => [TextField, CheckboxField];

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
	const { slugOverrides, checkboxOverrides } = overrides;

	const checkBoxField: CheckboxField = {
		name: 'slugLock',
		type: 'checkbox',
		defaultValue: true,
		admin: {
			hidden: true,
			position: 'sidebar',
		},
		...checkboxOverrides,
	};

	const slugField: TextField = {
		name: 'slug',
		type: 'text',
		index: true,
		label: 'URL',
		hooks: {
			beforeValidate: [formatSlugHook(fieldToUse)],
		},
		admin: {
			position: 'sidebar',
			components: {
				Field: {
					path: '@/fields/slug/slug-component#SlugComponent',
					clientProps: {
						fieldToUse,
						checkboxFieldPath: checkBoxField.name,
					},
				},
			},
		},
	} as TextField;

	return [slugField, checkBoxField];
};
