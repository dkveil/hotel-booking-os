import { z } from 'zod';

export const envSchema = z.object({
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
	GATEWAY_PORT: z.coerce.number().default(6000),
	CORS_ORIGIN: z.string().default('*'),
});
