import { Controller, Get } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { AppService } from './app.service';
import type { HealthCheckResponse } from '@repo/types';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@SkipThrottle()
	@Get('gateway-health')
	getGatewayHealth(): HealthCheckResponse {
		return this.appService.getGatewayHealth();
	}
}
