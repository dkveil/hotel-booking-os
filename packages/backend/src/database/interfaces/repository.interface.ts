import type { DatabaseService } from '../database.service';

export type IncludeOptions = Record<string, boolean | Record<string, boolean>>;

export type FindManyOptions<T> = {
	filterQuery?: Partial<Record<keyof T, string | number | boolean | Date>>;
	pagination?: {
		skip?: number;
		take?: number;
	};
	orderBy?: {
		[key: string]: 'asc' | 'desc';
	};
	include?: IncludeOptions;
};

export type FindOneOptions<T> = {
	filterQuery: Partial<Record<keyof T, string | number | boolean | Date>>;
	include?: IncludeOptions;
};

export type CreateOptions<T> = {
	data: Partial<T>;
	include?: IncludeOptions;
};

export type UpdateOptions<T> = {
	filterQuery: Partial<Record<keyof T, string | number | boolean | Date>>;
	data: Partial<T>;
	include?: IncludeOptions;
};

export type Pagination = {
	total: number;
	page: number;
	limit?: number;
	pages: number;
};

export type FilterQuery<T> = Partial<
	Record<keyof T, string | number | boolean | Date>
>;

export type IRepository<T extends { id: string }> = {
	create: (options: CreateOptions<T>) => Promise<T>;

	findAll: (include?: IncludeOptions) => Promise<T[]>;

	findMany: (options?: FindManyOptions<T>) => Promise<T[]>;

	findOne: (options: FindOneOptions<T>) => Promise<T | null>;

	findOneOrFail: (options: FindOneOptions<T>) => Promise<T>;

	update: (options: UpdateOptions<T>) => Promise<T>;

	remove: (filterQuery: FilterQuery<T>) => Promise<void>;

	softRemove: (filterQuery: FilterQuery<T>) => Promise<void>;

	restore: (filterQuery: FilterQuery<T>) => Promise<T>;

	transaction: <R>(callback: (db: DatabaseService) => Promise<R>) => Promise<R>;

	throwNotFoundException: (filterQuery: FilterQuery<T>) => never;
};
