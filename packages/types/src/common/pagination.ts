import { z } from 'zod';

export const PaginatedSearchParamsSchema = z.object({
	page: z.number().int().positive().default(1),
	pageSize: z.number().int().positive().default(10),
	query: z.string().optional(),
	filter: z.string().optional(),
	sortBy: z.string().optional(),
});

export type PaginationSearchParams = z.infer<
	typeof PaginatedSearchParamsSchema
>;

export interface PaginationMeta {
	page: number;
	pageSize: number;
	totalPages: number;
	total: number;
	isPrev: boolean;
	isNext: boolean;
}

export interface PaginatedResponse<T> {
	data: T[];
	pagination: PaginationMeta;
}

export function createPaginationMeta(
	page: string | number,
	pageSize: string | number,
	total: number
): PaginationMeta {
	const totalPages = Math.ceil(total / Number(pageSize));
	const isPrev = Number(page) > 1;
	const isNext = Number(page) < totalPages;

	return {
		page: Number(page),
		pageSize: Number(pageSize),
		totalPages,
		total,
		isPrev,
		isNext,
	};
}

export function createDefinedPaginationMeta(
	page: number,
	paginCounter: number,
	totalPages: number,
	totalDocs: number,
	hasNextPage: boolean,
	hasPrevPage: boolean
): PaginationMeta {
	return {
		page: Number(page),
		pageSize: Number(paginCounter),
		totalPages,
		total: totalDocs,
		isPrev: hasPrevPage,
		isNext: hasNextPage,
	};
}

export interface RepositoryPaginationOptions {
	skip?: number;
	limit?: number;
}

export function createRepositoryPagination({
	page,
	pageSize,
}: {
	page: number;
	pageSize?: number;
}): RepositoryPaginationOptions {
	return {
		limit: Number(pageSize),
		skip: (Number(page) - 1) * Number(pageSize),
	};
}

export interface PayloadResponse<T> {
	docs: T[];
	page: number;
	pagingCounter: number;
	totalPages: number;
	totalDocs: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

export function createPaginatedDataFromPayload<T>(
	payloadData: PayloadResponse<T>,
	dataKey: string
): Record<string, any> {
	const {
		docs,
		page,
		pagingCounter,
		totalPages,
		totalDocs,
		hasNextPage,
		hasPrevPage,
	} = payloadData;

	const paginationMeta = createDefinedPaginationMeta(
		page,
		pagingCounter,
		totalPages,
		totalDocs,
		hasNextPage,
		hasPrevPage
	);

	return {
		[dataKey]: docs,
		pagination: paginationMeta,
	};
}
