import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@repo/backend/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomThrottlerGuard } from './guards/custom-throttler.guard';

@Module({
	imports: [
		ConfigModule,
		ThrottlerModule.forRootAsync({
			useFactory: (configService: ConfigService) => {
				return {
					throttlers: [
						{
							name: 'default',
							ttl: 900000,
							limit: 1000,
						},
					],
					// TODO: Add Redis storage
					storage: configService.get('USE_REDIS') ? undefined : undefined,
					generateKey: (context, tracker) => {
						const request = context.switchToHttp().getRequest();
						return `${tracker}-${request.ip}`;
					},
					errorMessage: 'Too many requests, please try again later!',
				};
			},
			inject: [ConfigService],
		}),
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: CustomThrottlerGuard,
		},
	],
})
export class AppModule {}
