import { NestFactory } from '@nestjs/core';
import { ConfigService, ZodFilter } from '@repo/backend';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import express from 'express';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());

	app.use(express.json({ limit: '50mb' }));
	app.use(express.urlencoded({ limit: '50mb', extended: true }));

	const logger = app.get(Logger);
	app.useLogger(logger);

	const configService = app.get(ConfigService);
	const isProduction = configService.get('NODE_ENV') === 'production';

	const config = new DocumentBuilder()
		.setTitle('Hotel Booking API')
		.setDescription('API Gateway for the hotel booking system')
		.setVersion('1.0')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
			'access-token'
		)
		.addServer(
			`http://localhost:${configService.get('GATEWAY_PORT')}`,
			'Development'
		)
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api-docs', app, document, {
		swaggerOptions: {
			persistAuthorization: true,
		},
	});

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

	logger.log(`🚀 API Gateway listening at http://${host}:${port}`);
	logger.log(`📚 API Documentation: http://${host}:${port}/api-docs`);
	logger.log(`🌍 Environment: ${isProduction ? 'production' : 'development'}`);
	logger.log(`🔗 CORS Origins: ${JSON.stringify(origin)}`);

	process.on('SIGTERM', () => {
		logger.warn('🛑 SIGTERM received, shutting down gracefully');
		server.close(() => {
			logger.log('✅ Process terminated');
			process.exit(0);
		});
	});

	process.on('SIGINT', () => {
		logger.warn('🛑 SIGINT received, shutting down gracefully');
		server.close(() => {
			logger.log('✅ Process terminated');
			process.exit(0);
		});
	});
}

void bootstrap();
