import { HttpStatus } from '@repo/types';

export class AppError extends Error {
	statusCode: HttpStatus;
	isOperational: boolean;
	details?: Record<string, unknown>;

	constructor(
		statusCode: HttpStatus,
		message: string,
		isOperational = true,
		details?: Record<string, unknown>
	) {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		this.details = details;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class ValidationError extends AppError {
	constructor(fieldErrors: Record<string, string[]>) {
		const details = ValidationError.formatFieldErrors(fieldErrors);
		super(HttpStatus.BAD_REQUEST, 'Invalid request data', true, details);
	}

	static formatFieldErrors(
		errors: Record<string, string[]>
	): Record<string, unknown> {
		const formattedErrors: Record<string, string> = {};

		Object.entries(errors).forEach(([field, messages]) => {
			const fieldName = field.charAt(0).toUpperCase() + field.slice(1);

			if (messages[0] === 'required') {
				formattedErrors[field] = `${fieldName} is required`;
			} else {
				formattedErrors[field] = `${fieldName}: ${messages.join(' and ')}`;
			}
		});

		return formattedErrors;
	}
}

export class AuthError extends AppError {
	constructor(message = 'Authentication failed') {
		super(HttpStatus.UNAUTHORIZED, message);
	}
}

export class ForbiddenError extends AppError {
	constructor(message = 'Forbidden access') {
		super(HttpStatus.FORBIDDEN, message);
	}
}

export class ConflictError extends AppError {
	constructor(
		message = 'Resource already exists',
		details?: Record<string, unknown>
	) {
		super(HttpStatus.CONFLICT, message, true, details);
	}
}

export class NotFoundError extends AppError {
	constructor(message = 'Resource not found') {
		super(HttpStatus.NOT_FOUND, message);
	}
}

export class RateLimitError extends AppError {
	constructor(message = 'Too many requests, please try again later') {
		super(HttpStatus.TOO_MANY_REQUESTS, message);
	}
}

export class DatabaseError extends AppError {
	constructor(message = 'Database error', details?: Record<string, unknown>) {
		super(HttpStatus.INTERNAL_SERVER_ERROR, message, true, details);
	}
}
