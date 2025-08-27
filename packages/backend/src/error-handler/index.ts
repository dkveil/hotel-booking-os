import { ZodError } from 'zod/v4';
import { AppError, ValidationError } from './http-errors';

export function formatResponse(
	status: number,
	message: string,
	errors?: unknown
) {
	const responseContent = {
		success: false,
		status,
		error: {
			message,
			details: errors,
		},
	};

	return responseContent;
}

export function handleError(error: unknown) {
	if (error instanceof AppError) {
		return formatResponse(error.statusCode, error.message, error.details);
	}

	if (error instanceof ZodError) {
		const fieldErrors = error.flatten((issue) => issue.message)
			.fieldErrors as Record<string, string[]>;
		const validationError = new ValidationError(fieldErrors);

		return formatResponse(
			400,
			validationError.message,
			validationError.details
		);
	}

	if (error instanceof Error) {
		return formatResponse(500, error.message);
	}

	console.log('Unhandled error:', error);

	return formatResponse(500, 'Internal server error');
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
