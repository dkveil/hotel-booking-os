import { Module } from '@nestjs/common';
import { ConfigModule } from '@repo/backend/config';
import { DynamicProxyController } from './dynamic-proxy.controller';
import { ProxyService } from './proxy.service';

@Module({
	imports: [ConfigModule],
	providers: [ProxyService],
	controllers: [DynamicProxyController],
	exports: [ProxyService],
})
export class ProxyModule {}
