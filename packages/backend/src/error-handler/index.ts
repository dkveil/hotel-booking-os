import { ZodError } from 'zod/v4';
import { AppError, ValidationError } from './http-errors';
import { createErrorResponse, HttpStatus } from '@repo/types';

export function handleError(error: unknown) {
	if (error instanceof AppError) {
		return createErrorResponse(error.statusCode, error.message, error.details);
	}

	if (error instanceof ZodError) {
		const fieldErrors = error.flatten((issue) => issue.message)
			.fieldErrors as Record<string, string[]>;
		const validationError = new ValidationError(fieldErrors);

		return createErrorResponse(
			HttpStatus.BAD_REQUEST,
			validationError.message,
			validationError.details
		);
	}

	if (error instanceof Error) {
		return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
	}

	console.log('Unhandled error:', error);
	return createErrorResponse(
		HttpStatus.INTERNAL_SERVER_ERROR,
		'Internal server error'
	);
}

export {
	AppError,
	ValidationError,
	AuthError,
	ForbiddenError,
	ConflictError,
	NotFoundError,
	RateLimitError,
	DatabaseError,
} from './http-errors';
