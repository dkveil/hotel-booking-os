import type { Prisma, Reservation, User } from '@prisma/client';

export type { Reservation, User, ReservationStatus } from '@prisma/client';
export type { Prisma } from '@prisma/client';

export type ReservationCreateInput = Prisma.ReservationCreateInput;
export type ReservationUpdateInput = Prisma.ReservationUpdateInput;
export type ReservationWhereInput = Prisma.ReservationWhereInput;
export type ReservationOrderByInput =
	Prisma.ReservationOrderByWithRelationInput;

export type UserCreateInput = Prisma.UserCreateInput;
export type UserUpdateInput = Prisma.UserUpdateInput;
export type UserWhereInput = Prisma.UserWhereInput;
export type UserOrderByInput = Prisma.UserOrderByWithRelationInput;

export type ReservationPartial = Partial<Reservation>;
export type UserPartial = Partial<User>;

export type ReservationPublic = Pick<
	Reservation,
	| 'id'
	| 'status'
	| 'placeId'
	| 'startDate'
	| 'endDate'
	| 'totalPrice'
	| 'currency'
	| 'guestsCount'
	| 'notes'
	| 'createdAt'
	| 'updatedAt'
>;

export type UserPublic = Pick<User, 'id' | 'email' | 'createdAt' | 'updatedAt'>;

export type FilterQuery<T> = Partial<
	Record<
		keyof T,
		| string
		| number
		| boolean
		| Date
		| { gte?: any; lte?: any; gt?: any; lt?: any }
	>
>;

export type IncludeOptions = Record<string, boolean | Record<string, boolean>>;

export interface FindManyOptions<T> {
	filterQuery?: FilterQuery<T>;
	pagination?: {
		skip?: number;
		take?: number;
	};
	orderBy?: {
		[key: string]: 'asc' | 'desc';
	};
	include?: IncludeOptions;
}

export interface FindOneOptions<T> {
	filterQuery?: FilterQuery<T>;
	include?: IncludeOptions;
}

export type DatabaseTransaction = Prisma.TransactionClient;
