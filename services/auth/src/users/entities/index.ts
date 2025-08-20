import type { User } from '@prisma/client';

export type { User };

export type UserCreateInput = {
	email: string;
	password: string;
	id?: string;
};
