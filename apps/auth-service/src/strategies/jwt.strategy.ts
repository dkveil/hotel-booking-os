import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { ConfigService } from '@repo/backend';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { TokenPayload } from '../interfaces/token-payload.interface';
import type { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		configService: ConfigService,
		private readonly usersService: UsersService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: any) =>
					request?.cookies?.Authentication || request?.Authentication,
			]),
			secretOrKey: configService.get('JWT_SECRET')!,
		});
	}

	async validate({ userId }: TokenPayload) {
		return this.usersService.getUser({ id: userId });
	}
}
