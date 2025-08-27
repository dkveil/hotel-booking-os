import { Module, DynamicModule } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { createPinoConfig } from './index.js';

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: NestJS pattern requires class with static methods
export class LoggerModule {
	static forRoot(serviceName?: string): DynamicModule {
		const autoServiceName =
			serviceName || process.env.npm_package_name || 'unknown-service';
		return {
			module: LoggerModule,
			imports: [
				PinoLoggerModule.forRoot({
					pinoHttp: createPinoConfig({
						service: autoServiceName,
						pretty: true,
					}),
				}),
			],
			exports: [PinoLoggerModule],
		};
	}
}
