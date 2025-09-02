import {
	createErrorResponse,
	createPaginatedDataFromPayload,
	createSuccessResponse,
	PayloadResponse,
} from '@repo/types';
import { fetchHandler } from './handlers/fetch';

const API_ADMIN_BASE_URL = 'http://localhost:5001/api';

export class AdminAPI {
	private static async fetchPaginatedData<T>(
		endpoint: string,
		dataKey: string,
		options?: RequestInit
	) {
		try {
			const { data, success, error } = await fetchHandler<PayloadResponse<T>>(
				`${API_ADMIN_BASE_URL}${endpoint}`,
				{ method: 'GET', ...options }
			);

			if (!(success && data)) {
				throw new Error(error?.message || `Failed to fetch ${dataKey}`);
			}

			const paginatedData = createPaginatedDataFromPayload(data, dataKey);
			return createSuccessResponse(paginatedData);
		} catch (error) {
			return createErrorResponse(500, 'Internal server error');
		}
	}

	static async getAllRooms<T>(options?: RequestInit) {
		return this.fetchPaginatedData<T>('/rooms', 'rooms', options);
	}
}
