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

	app
		.getHttpAdapter()
		.getInstance()
		.set('trust proxy', isProduction ? 'loopback' : 1);

	const host = isProduction ? '0.0.0.0' : 'localhost';
	const port = Number(configService.get('GATEWAY_PORT', 8080));
	const origin = configService.get('CORS_ORIGIN').split(',');

	app.useGlobalFilters(new ZodFilter());

	if (isProduction) {
		app.enableShutdownHooks();
	}

	app.enableCors({
		origin,
		credentials: true,
	});

	const server = await app.listen(port, host);

	console.log(`🚀 API Gateway listening at http://${host}:${port}`);
	console.log(`🌍 Environment: ${isProduction ? 'production' : 'development'}`);
	console.log(`🔗 CORS Origins: ${JSON.stringify(origin)}`);

	process.on('SIGTERM', () => {
		console.log('🛑 SIGTERM received, shutting down gracefully');
		server.close(() => {
			console.log('✅ Process terminated');
			process.exit(0);
		});
	});

	process.on('SIGINT', () => {
		console.log('🛑 SIGINT received, shutting down gracefully');
		server.close(() => {
			console.log('✅ Process terminated');
			process.exit(0);
		});
	});
}

void bootstrap();
