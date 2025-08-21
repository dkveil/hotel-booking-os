import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import { envSchema } from './env.schema';

function findWorkspaceRoot(): string {
	let currentDir = process.cwd();

	while (currentDir !== '/') {
		if (
			existsSync(join(currentDir, 'pnpm-workspace.yaml')) ||
			existsSync(join(currentDir, 'turbo.json'))
		) {
			return join(currentDir, '.env.local');
		}
		currentDir = join(currentDir, '..');
	}

	return '.env';
}

@Global()
@Module({
	imports: [
		NestConfigModule.forRoot({
			isGlobal: true,
			envFilePath: findWorkspaceRoot(),
			validate: (env) => envSchema.parse(env),
		}),
	],
	providers: [ConfigService],
	exports: [ConfigService],
})
export class ConfigModule {}
