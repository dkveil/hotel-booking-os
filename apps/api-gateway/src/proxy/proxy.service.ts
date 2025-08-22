import { Injectable } from '@nestjs/common';
import { AUTH_SERVICE, ConfigService } from '@repo/backend';
import type { NextFunction, Request, Response } from 'express';
import proxy from 'express-http-proxy';

interface ServiceConfig {
	path: string;
	serviceName: string;
	port: number;
}

@Injectable()
export class ProxyService {
	constructor(private readonly configService: ConfigService) {}

	private getServiceUrl(serviceName: string, port: number) {
		const isProduction = this.configService.get('NODE_ENV') === 'production';

		if (isProduction) {
			return `http://${serviceName}:${port}`;
		}

		return `http://localhost:${port}`;
	}

	createProxyMiddleware(serviceName: string, port: number) {
		const serviceUrl = this.getServiceUrl(serviceName, port);

		return proxy(serviceUrl, {
			timeout: 30000,
			proxyReqPathResolver: (req: Request) => {
				const url = require('node:url');
				const parsedUrl = url.parse(req.originalUrl || req.url);
				const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);

				const targetPath = `/${pathSegments.slice(1).join('/')}`;

				return targetPath + (parsedUrl.search || '');
			},
			proxyReqOptDecorator: (proxyReqOpts: any, srcReq: Request) => {
				proxyReqOpts.headers['X-Forwarded-For'] = srcReq.ip;
				proxyReqOpts.headers['X-Original-Host'] = srcReq.get('host');
				return proxyReqOpts;
			},
			proxyErrorHandler: (err: any, res: Response, next: any) => {
				if (!res.headersSent) {
					res.status(503).json({
						error: 'Service temporarily unavailable',
						service: serviceName,
						timestamp: new Date().toISOString(),
					});
				}
			},
			preserveHostHdr: true,
		});
	}

	getServiceConfigs(): ServiceConfig[] {
		return [
			{
				path: '/auth',
				serviceName: AUTH_SERVICE,
				port: Number(this.configService.get('AUTH_PORT', 6000)),
			},
		];
	}

	getServicePath() {
		return this.getServiceConfigs().map((config) => config.path);
	}
}
