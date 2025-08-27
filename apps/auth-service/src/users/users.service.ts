import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService, AuthError, ConflictError } from '@repo/backend';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UserCreateInput } from './entities';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	async createUser(createUserDto: CreateUserDto) {
		const user = await this.usersRepository.transaction(
			async (db: DatabaseService) => {
				const { email, password } = createUserDto;

				const hashedPassword = await bcrypt.hash(password, 10);

				const existingUser = await db.user.findUnique({ where: { email } });

				if (existingUser) {
					throw new ConflictError('User with this email already exists', {
						email: existingUser.email,
						conflictType: 'duplicate_email',
					});
				}

				const userData: UserCreateInput = {
					email,
					password: hashedPassword,
				};

				return await db.user.create({ data: userData });
			}
		);

		return user;
	}

	async verifyUser(email: string, password: string) {
		const user = await this.usersRepository.findOne({ filterQuery: { email } });

		if (!user) {
			throw new AuthError('Invalid credentials');
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw new AuthError('Invalid credentials');
		}

		return user;
	}

	async getUser(getUserDto: GetUserDto) {
		const { id } = GetUserDto.parse(getUserDto);

		return this.usersRepository.findOne({
			filterQuery: { id },
		});
	}
}
