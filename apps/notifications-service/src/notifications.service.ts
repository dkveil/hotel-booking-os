import { Injectable } from '@nestjs/common';
import { ConfigService } from '@repo/backend';
import * as nodemailer from 'nodemailer';

import { NotifyEmailDto } from './dto';

@Injectable()
export class NotificationsService {
	private transporter: nodemailer.Transporter;

	constructor(private readonly configService: ConfigService) {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: this.configService.get('SMTP_USER'),
				clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
				clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
				refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
			},
		});
	}

	getNotificationsHealth(): object {
		return {
			status: 'healthy',
			timestamp: new Date().toISOString(),
			service: 'notifications-service',
			version: process.env.npm_package_version || '1.0.0',
			environment: process.env.NODE_ENV || 'development',
			uptime: process.uptime(),
		};
	}

	async notifyEmail(data: NotifyEmailDto) {
		const { email, text } = data;

		await this.transporter.sendMail({
			from: this.configService.get('SMTP_USER'),
			to: email,
			subject: 'Your reservation has been confirmed',
			text,
		});
	}
}
