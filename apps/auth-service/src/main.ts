import { NestFactory } from '@nestjs/core';
import { ConfigService, ZodFilter } from '@repo/backend';
import cookieParser from 'cookie-parser';

import { AuthModule } from './auth.module';

async function bootstrap() {
	const app = await NestFactory.create(AuthModule);

	const configService = app.get(ConfigService);

	// INFO: RabbitMQ is a option I can use in the future
	// app.connectMicroservice<RmqOptions>({
	// 	transport: Transport.RMQ,
	// 	options: {
	// 		urls: [configService.get('RABBITMQ_URL') as RmqUrl],
	// 		noAck: false,
	// 		queue: 'auth',
	// 	},
	// });

	app.use(cookieParser());

	const isProduction = configService.get('NODE_ENV') === 'production';
	const port = Number(configService.get('AUTH_PORT', 6000));

	app.useGlobalFilters(new ZodFilter());

	if (isProduction) {
		app.enableShutdownHooks();
		app.enableCors({
			origin: configService.get('CORS_ORIGIN'),
			credentials: true,
		});
	}

	await app.startAllMicroservices();
	await app.listen(port);
}

void bootstrap();
