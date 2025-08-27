import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '../config';
import { AuthError } from '../error-handler';

@Injectable()
export class InterServiceGuard implements CanActivate {
	constructor(private readonly configService: ConfigService) {}

	canActivate(context: ExecutionContext): boolean {
		const data = context.switchToRpc().getData();
		const { serviceToken, timestamp, signature, service, ...payload } = data;

		if (!(serviceToken && timestamp && signature)) {
			throw new AuthError('Missing required authentication fields');
		}

		const expectedToken = this.configService.get('INTER_SERVICE_SECRET');

		if (serviceToken !== expectedToken) {
			throw new AuthError('Invalid service token');
		}

		if (!this.configService.isTimestampValid(timestamp)) {
			throw new AuthError('Request expired or from future');
		}

		if (
			!this.configService.verifySignature(
				payload,
				timestamp,
				signature,
				service
			)
		) {
			throw new AuthError('Invalid message signature');
		}

		return true;
	}
}
