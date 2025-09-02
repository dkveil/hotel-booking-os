export interface ApiError {
	message: string;
	details?: Record<string, string[]>;
}

export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	error?: ApiError;
	status: HttpStatus;
	timestamp: string;
}

export interface HealthCheckResponse {
	status: 'healthy' | 'error';
	timestamp: string;
	service: string;
	environment?: string;
	version?: string;
	uptime?: number;
}

export enum HttpStatus {
	OK = 200,
	CREATED = 201,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	CONFLICT = 409,
	UNPROCESSABLE_ENTITY = 422,
	TOO_MANY_REQUESTS = 429,
	INTERNAL_SERVER_ERROR = 500,
}

export function createSuccessResponse<T>(
	data: T,
	status?: HttpStatus
): ApiResponse<T> {
	return {
		success: true,
		data,
		status: status || 200,
		timestamp: new Date().toISOString(),
	};
}

export function createErrorResponse(
	statusCode: HttpStatus,
	message: string,
	details?: Record<string, any>
): ApiResponse<null> {
	return {
		success: false,
		data: null,
		status: statusCode,
		error: {
			message,
			details,
		},
		timestamp: new Date().toISOString(),
	};
}
