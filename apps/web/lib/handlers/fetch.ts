import type { ApiResponse } from '@repo/types';
import { createSuccessResponse, createErrorResponse } from '@repo/types';

type FetchOptions = RequestInit & {
	timeout?: number;
};

function isError(error: unknown): error is Error {
	return error instanceof Error;
}

export async function fetchHandler<T>(
	url: string,
	options: FetchOptions
): Promise<ApiResponse<T>> {
	const { timeout = 10000, headers: customHeaders, ...restOptions } = options;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	const defaultHeaders: HeadersInit = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	};

	const headers: HeadersInit = {
		...defaultHeaders,
		...customHeaders,
	};

	const config: RequestInit = {
		...restOptions,
		headers,
		signal: controller.signal,
	};

	try {
		console.log(`Fetching: ${url}`);
		const response = await fetch(url, config);

		clearTimeout(timeoutId);

		if (!response.ok) {
			console.error(`Fetch error: ${response.status} - ${response.statusText}`);
			throw new Error(response.statusText);
		}

		const data = await response.json();
		console.log(`Fetch success: ${url}`);

		return createSuccessResponse(data) as ApiResponse<T>;
	} catch (err) {
		clearTimeout(timeoutId);
		const error = isError(err) ? err : new Error('Unknown error');
		console.error(`Fetch error: ${error.message}`, { url, error });

		return createErrorResponse(500, error.message) as ApiResponse<T>;
	}
}
