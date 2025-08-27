import { NestFactory } from '@nestjs/core';
import type { RmqOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';
import { ConfigService, ZodFilter } from '@repo/backend';
import cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';

import { NotificationsModule } from './notifications.module';

async function bootstrap() {
	const app = await NestFactory.create(NotificationsModule);

	app.use(cookieParser());

	const logger = app.get(Logger);
	app.useLogger(logger);

	const configService = app.get(ConfigService);

	app.connectMicroservice<RmqOptions>({
		transport: Transport.RMQ,
		options: {
			urls: [configService.get('RABBITMQ_URL') as RmqUrl],
			noAck: false,
			queue: 'notifications',
		},
	});

	const isProduction = configService.get('NODE_ENV') === 'production';

	const host = isProduction ? '0.0.0.0' : 'localhost';
	const port = Number(configService.get('NOTIFICATIONS_PORT', 6003));

	app.useGlobalFilters(new ZodFilter());

	if (isProduction) {
		app.enableShutdownHooks();
	}

	await app.startAllMicroservices();
	await app.listen(port, host);

	logger.log(`🚀 Notifications service listening at http://${host}:${port}`);
	logger.log(`🌍 Environment: ${isProduction ? 'production' : 'development'}`);
}

void bootstrap();
