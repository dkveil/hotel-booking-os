import type { CollectionConfig } from 'payload';
import { authenticatedOrPublished, authenticated } from '@/access';
import { slugField } from '@/fields/slug';

export const PAGES_SLUG = 'pages';

export const Pages: CollectionConfig<'pages'> = {
	slug: PAGES_SLUG,
	labels: {
		singular: 'Page',
		plural: 'Pages',
	},
	access: {
		read: authenticatedOrPublished,
		create: authenticated,
		update: authenticated,
		delete: authenticated,
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		...slugField('title'),
		{
			name: 'publishedAt',
			type: 'date',
			label: 'Publication Date',
			admin: {
				position: 'sidebar',
				description: 'Date when this page was or will be published',
			},
		},
	],
	versions: {
		drafts: {
			autosave: {
				interval: 100,
			},
			schedulePublish: true,
		},
		maxPerDoc: 50,
	},
};
