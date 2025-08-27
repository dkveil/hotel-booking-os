import { NestFactory } from '@nestjs/core';
import type { RmqOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';
import { ConfigService, ZodFilter } from '@repo/backend';
import cookieParser from 'cookie-parser';

import { PaymentsModule } from './payments.module';

async function bootstrap() {
	const app = await NestFactory.create(PaymentsModule, {
		rawBody: true,
	});

	app.use(cookieParser());

	const configService = app.get(ConfigService);

	app.connectMicroservice<RmqOptions>({
		transport: Transport.RMQ,
		options: {
			urls: [configService.get('RABBITMQ_URL') as RmqUrl],
			noAck: false,
			queue: 'payments',
		},
	});

	const isProduction = configService.get('NODE_ENV') === 'production';

	const host = isProduction ? '0.0.0.0' : 'localhost';
	const port = Number(configService.get('PAYMENTS_PORT', 6002));

	app.useGlobalFilters(new ZodFilter());

	if (isProduction) {
		app.enableShutdownHooks();
	}

	await app.startAllMicroservices();
	await app.listen(port, host);

	console.log(`🚀 Payments service listening at http://${host}:${port}`);
	console.log(`🌍 Environment: ${isProduction ? 'production' : 'development'}`);
}

void bootstrap();
