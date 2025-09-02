import type { CollectionConfig } from 'payload';

export const Rooms: CollectionConfig = {
	slug: 'rooms',
	admin: {
		useAsTitle: 'title',
	},
	access: {
		read: () => true,
		create: ({ req: { user } }) => !!user,
		update: ({ req: { user } }) => !!user,
		delete: ({ req: { user } }) => !!user,
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
		},
	],
};
