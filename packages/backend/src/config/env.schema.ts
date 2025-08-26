import { z } from 'zod';

export const envSchema = z.object({
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
	CORS_ORIGIN: z.string().default('*'),

	GATEWAY_PORT: z.coerce.number().default(8080),
	AUTH_PORT: z.coerce.number().default(6000),
	RESERVATIONS_PORT: z.coerce.number().default(6001),
	PAYMENTS_PORT: z.coerce.number().default(6002),

	DATABASE_URL: z.string(),

	JWT_SECRET: z.string(),
	JWT_EXPIRATION_TIME: z.coerce.number().default(3600),

	STRIPE_SECRET_KEY: z.string(),
	STRIPE_SUCCESS_URL: z.string(),
	STRIPE_CANCEL_URL: z.string(),
	STRIPE_WEBHOOK_SECRET: z.string(),

	INTER_SERVICE_SECRET: z.string(),

	SMTP_USER: z.string(),
	GOOGLE_OAUTH_CLIENT_ID: z.string(),
	GOOGLE_OAUTH_CLIENT_SECRET: z.string(),
	GOOGLE_OAUTH_REFRESH_TOKEN: z.string(),
	GOOGLE_OAUTH_ACCESS_TOKEN: z.string(),

	USE_REDIS: z.boolean().default(false),
	REDIS_HOST: z.string().default('localhost'),
	REDIS_PORT: z.coerce.number().default(6379),
	REDIS_PASSWORD: z.string().default(''),

	RABBITMQ_URL: z.string().default('amqp://rabbitmq:5672'),
	RABBITMQ_PORT: z.coerce.number().default(5672),
});
