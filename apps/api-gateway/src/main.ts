import { NestFactory } from '@nestjs/core';
import { ConfigService, ZodFilter } from '@repo/backend';
import cookieParser from 'cookie-parser';
import express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());

	app.use(express.json({ limit: '50mb' }));
	app.use(express.urlencoded({ limit: '50mb', extended: true }));

	const configService = app.get(ConfigService);

	const isProduction = configService.get('NODE_ENV') === 'production';

	const origin = configService.get('CORS_ORIGIN').split(',');
	const port = Number(configService.get('GATEWAY_PORT', 6000));

	app.useGlobalFilters(new ZodFilter());

	if (isProduction) {
		app.enableShutdownHooks();
	}

	app.enableCors({
		origin,
		credentials: true,
	});

	await app.listen(port);
}

void bootstrap();
