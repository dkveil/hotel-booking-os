import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CurrentUser } from '@repo/backend';
import type { Response } from 'express';

// biome-ignore lint/style/useImportType: <explanation>
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import type { User } from './users/entities';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	async login(
		@CurrentUser() user: User,
		@Res({ passthrough: true }) response: Response
	) {
		await this.authService.login(user, response);
		response.send();
	}

	@UseGuards(JwtAuthGuard)
	@MessagePattern('authenticate')
	async authenticate(@Payload() payload: Record<string, unknown>) {
		return payload.user;
	}
}
