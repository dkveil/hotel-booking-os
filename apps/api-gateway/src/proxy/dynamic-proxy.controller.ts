import { All, Controller, Next, Param, Req, Res } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import type { NextFunction, Request, Response } from 'express';
import { ProxyService } from './proxy.service';

@Controller()
export class DynamicProxyController {
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
	@All(':service/*')
	async proxyToService(
		@Param('service') servicePath: string,
		@Req() req: Request,
		@Res() res: Response,
		@Next() next: NextFunction
	) {
		const fullPath = `/${servicePath}`;
		const middleware = this.proxyMiddlewares.get(fullPath);

		if (!middleware) {
			return res.status(404).json({
				error: 'Service not found',
				service: servicePath,
				timestamp: new Date().toISOString(),
			});
		}

		return middleware(req, res, next);
	}
}
