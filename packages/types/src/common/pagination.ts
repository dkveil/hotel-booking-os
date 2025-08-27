import { z } from 'zod';

// Base pagination parameters schema
export const PaginationParamsSchema = z.object({
	page: z.coerce.number().min(1).default(1),
	limit: z.coerce.number().min(1).max(100).optional(),
	order: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationParams = z.infer<typeof PaginationParamsSchema>;

// Generic search parameters - można rozszerzać
export const BaseSearchParamsSchema = PaginationParamsSchema.extend({
	search: z.string().optional(),
	sortBy: z.string().optional(),
});

export type BaseSearchParams = z.infer<typeof BaseSearchParamsSchema>;

// Pagination response metadata
export interface PaginationMeta {
	page: number;
	limit?: number;
	total: number;
	totalPages: number;
}

// Generic paginated response
export interface PaginatedResponse<T> {
	data: T[];
	pagination: PaginationMeta;
}

// Helper function do tworzenia paginacji
export function createPaginationMeta(
	page: number,
	limit: number | undefined,
	total: number
): PaginationMeta {
	const actualLimit = limit || total;
	return {
		page,
		limit,
		total,
		totalPages: actualLimit > 0 ? Math.ceil(total / actualLimit) : 1,
	};
}

// Repository-style pagination options
export interface RepositoryPaginationOptions {
	skip?: number;
	take?: number;
}

export function createRepositoryPagination(
	page: number,
	limit?: number
): RepositoryPaginationOptions {
	if (!limit) return {};
	
	return {
		take: limit,
		skip: (page - 1) * limit,
	};
}
