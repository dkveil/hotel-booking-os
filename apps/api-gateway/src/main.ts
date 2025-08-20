import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@repo/backend';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);

	console.log(configService.databaseUrl);

	await app.listen(process.env.PORT ?? 8000);
}

void bootstrap();
