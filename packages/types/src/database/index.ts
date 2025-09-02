export * from './prisma-extensions';

export interface IRepository<T extends { id: string }> {
	findMany(options?: FindManyOptions<T>): Promise<T[]>;
	findOne(options: FindOneOptions<T>): Promise<T | null>;
	findById(id: string, include?: IncludeOptions): Promise<T | null>;
	create(data: any): Promise<T>;
	update(id: string, data: any): Promise<T>;
	delete(id: string): Promise<T>;
	count(filterQuery?: FilterQuery<T>): Promise<number>;
	transaction<R>(fn: (tx: DatabaseTransaction) => Promise<R>): Promise<R>;
}

import type {
	FindManyOptions,
	FindOneOptions,
	FilterQuery,
	IncludeOptions,
	DatabaseTransaction,
} from './prisma-extensions';
