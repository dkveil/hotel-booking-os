// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'node:path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

import { Users } from './collections/users';
import { Media } from './collections/media';
import { Rooms } from './collections/rooms';
import { Pages } from './collections/pages';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	routes: {
		admin: '/',
		api: '/api',
		graphQL: '/api/graphql',
	},
	collections: [Users, Media, Rooms, Pages],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || '',
		},
		schemaName: 'cms',
	}),
	sharp: sharp as any,
	plugins: [
		payloadCloudPlugin(),
		// storage-adapter-placeholder
	],
	cookiePrefix: 'cms',
	cors: [
		'http://localhost:5000',
		'http://localhost:5001',
		'http://localhost:8080',
	],
	csrf: [
		'http://localhost:5000',
		'http://localhost:5001',
		'http://localhost:8080',
	],
});
