import {
	Injectable,
	NestMiddleware,
	UnauthorizedException,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class GatewayOnlyMiddleware implements NestMiddleware {
	constructor(private readonly logger: Logger) {}

	use(req: Request, _res: Response, next: NextFunction) {
		const xForwardedFor = req.headers['x-forwarded-for'];
		const xOriginalHost = req.headers['x-original-host'];

		if (!(xForwardedFor && xOriginalHost)) {
			this.logger.warn('🚫 Direct access attempt blocked:', {
				ip: req.ip,
				path: req.path,
				headers: {
					'x-forwarded-for': xForwardedFor,
					'x-original-host': xOriginalHost,
				},
			});

			throw new UnauthorizedException({
				message: 'Direct access not allowed',
				error: 'Use API Gateway at port 8080',
				statusCode: 401,
			});
		}

		this.logger.log('✅ Request from API Gateway allowed:', {
			path: req.path,
			originalHost: xOriginalHost,
		});

		next();
	}
}
