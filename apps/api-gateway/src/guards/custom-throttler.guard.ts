import { type ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
	protected async getTracker(req: Record<string, any>): Promise<string> {
		return req.ip;
	}

	protected async shouldSkip(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		if (request.url === '/gateway-health') {
			return true;
		}

		if (request.user?.role === 'admin') {
			return true;
		}

		return false;
	}
}
