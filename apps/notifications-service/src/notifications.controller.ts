import { Controller, Get, UsePipes } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ZodPipe } from '@repo/backend';

import { NotifyEmailDto } from './dto';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@Get('health')
	health() {
		return this.notificationsService.getNotificationsHealth();
	}

	@UsePipes(new ZodPipe(NotifyEmailDto))
	@EventPattern('notify_email')
	async notifyEmail(@Payload() data: NotifyEmailDto) {
		await this.notificationsService.notifyEmail(data);
	}
}
