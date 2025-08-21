import { Injectable } from '@nestjs/common';

import { AbstractRepository } from '@repo/backend';

import type { User } from './entities';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
	protected get model() {
		return this.db?.user;
	}

	protected get repositoryName() {
		return 'User';
	}
}
