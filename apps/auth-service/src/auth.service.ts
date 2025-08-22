import { Injectable } from '@nestjs/common';
import { ConfigService } from '@repo/backend';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';

import type { User } from './users/entities';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async login(user: User, response: Response) {
		const tokenPayload = {
			userId: user.id.toString(),
		};

		const expires = new Date();
		const jwtExpiration = this.configService.get('JWT_EXPIRATION_TIME');
		expires.setSeconds(expires.getSeconds() + Number(jwtExpiration));

		const token = this.jwtService.sign(tokenPayload, {
			expiresIn: Number(jwtExpiration),
		});

		response.cookie('Authentication', token, {
			expires,
			httpOnly: true,
		});
	}
}
