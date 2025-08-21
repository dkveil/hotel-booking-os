import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

// biome-ignore lint/style/useImportType: <explanation>
import { User } from '../users/entities/';
// biome-ignore lint/style/useImportType: <explanation>
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
	constructor(private readonly usersService: UsersService) {
		super({ usernameField: 'email' });
	}

	async validate(email: string, password: string): Promise<User> {
		try {
			const user = await this.usersService.verifyUser(email, password);

			return user;
		} catch (error) {
			throw new UnauthorizedException(error);
		}
	}
}
