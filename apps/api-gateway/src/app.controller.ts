import { Controller, Get } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@SkipThrottle()
	@Get('gateway-health')
	getGatewayHealth(): object {
		return this.appService.getGatewayHealth();
	}
}
