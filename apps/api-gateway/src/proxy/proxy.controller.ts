import { All, Controller, Next, Req, Res } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import type { NextFunction, Request, Response } from 'express';
import { ProxyService } from './proxy.service';

@Controller()
export class ProxyController {
	private proxyMiddlewares: Map<string, any> = new Map();

	constructor(private readonly proxyService: ProxyService) {
		this.initializeProxyMiddlewares();
	}

	private initializeProxyMiddlewares() {
		const services = this.proxyService.getServiceConfigs();

		services.forEach((service) => {
			const middleware = this.proxyService.createProxyMiddleware(
				service.serviceName,
				service.port
			);

			this.proxyMiddlewares.set(service.path, middleware);
		});
	}

	@SkipThrottle()
	@All('auth/*')
	proxyAuth(
		@Req() req: Request,
		@Res() res: Response,
		@Next() next: NextFunction
	) {
		const middleware = this.proxyMiddlewares.get('/auth');
		return middleware(req, res, next);
	}
}
