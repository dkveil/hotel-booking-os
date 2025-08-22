import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@repo/backend';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GatewayOnlyMiddleware } from './middleware/gateway-only.middleware';
import { JwtStrategy, LocalStrategy } from './strategies';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		ConfigModule,
		UsersModule,
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: {
					expiresIn: `${configService.get<number>('JWT_EXPIRATION_TIME')}s`,
				},
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(GatewayOnlyMiddleware)
			.exclude({ path: 'auth/health', method: RequestMethod.GET })
			.forRoutes('*');
	}
}
