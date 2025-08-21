import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// biome-ignore lint/style/useImportType: <explanation>
import { ConfigService } from '@repo/backend';
import { ExtractJwt, Strategy } from 'passport-jwt';

// biome-ignore lint/style/useImportType: <explanation>
import { TokenPayload } from '../interfaces/token-payload.interface';
// biome-ignore lint/style/useImportType: <explanation>
import { UsersService } from '../users/users.service';

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
