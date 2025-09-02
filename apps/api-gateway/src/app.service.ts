import { Injectable } from '@nestjs/common';
import type { HealthCheckResponse } from '@repo/types';

@Injectable()
export class AppService {
	getGatewayHealth(): HealthCheckResponse {
		return {
			status: 'healthy',
			timestamp: new Date().toISOString(),
			service: 'api-gateway',
			version: process.env.npm_package_version || '1.0.0',
			environment: process.env.NODE_ENV || 'development',
			uptime: process.uptime(),
		};
	}
}
