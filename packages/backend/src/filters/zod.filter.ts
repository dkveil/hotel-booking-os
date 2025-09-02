import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch } from '@nestjs/common';
import { ZodError } from 'zod';
import { handleError } from '../error-handler';

@Catch(ZodError)
export class ZodFilter implements ExceptionFilter {
	constructor() {}

	catch(exception: ZodError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		const errorResponse = handleError(exception);

		response.status(errorResponse.status).json(errorResponse);
	}
}
