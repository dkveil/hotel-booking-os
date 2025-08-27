// Standardowe API response types
export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
	timestamp: string;
}

export interface ApiError {
	error: string;
	message: string;
	statusCode: number;
	timestamp: string;
	path?: string;
	details?: Record<string, any>;
}

// Health check response
export interface HealthCheckResponse {
	status: 'ok' | 'error';
	timestamp: string;
	uptime: number;
	version?: string;
	environment?: string;
	services?: Record<string, 'healthy' | 'unhealthy'>;
}

// Common HTTP status types
export type HttpStatus = 
	| 200 // OK
	| 201 // Created
	| 400 // Bad Request
	| 401 // Unauthorized
	| 403 // Forbidden
	| 404 // Not Found
	| 409 // Conflict
	| 422 // Unprocessable Entity
	| 500; // Internal Server Error

// Generic success response builder
export function createSuccessResponse<T>(
	data: T,
	message?: string
): ApiResponse<T> {
	return {
		success: true,
		data,
		message,
		timestamp: new Date().toISOString(),
	};
}

// Generic error response builder
export function createErrorResponse(
	error: string,
	message: string,
	statusCode: HttpStatus,
	details?: Record<string, any>
): ApiError {
	return {
		error,
		message,
		statusCode,
		timestamp: new Date().toISOString(),
		details,
	};
}
