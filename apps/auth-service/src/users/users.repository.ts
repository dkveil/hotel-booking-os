import { Injectable } from '@nestjs/common';

import { AbstractRepository, DatabaseService } from '@repo/backend';

import { User } from './entities';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
	constructor(db: DatabaseService) {
		super(db);
	}

	protected get model() {
		return this.db?.user;
	}

	protected get repositoryName() {
		return 'User';
	}
}
