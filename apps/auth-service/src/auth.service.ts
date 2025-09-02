import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@repo/backend';
import type { Response } from 'express';

import type { User } from './users/entities';
import type { HealthCheckResponse } from '@repo/types';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	getAuthHealth(): HealthCheckResponse {
		return {
			status: 'healthy',
			timestamp: new Date().toISOString(),
			service: 'auth-service',
			version: process.env.npm_package_version || '1.0.0',
			environment: process.env.NODE_ENV || 'development',
			uptime: process.uptime(),
		};
	}

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
