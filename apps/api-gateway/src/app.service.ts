import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getGatewayHealth(): object {
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
