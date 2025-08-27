import { Module } from '@nestjs/common';

import { ConfigModule } from '@repo/backend';

import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { LoggerModule } from '@repo/logger/nestjs';

@Module({
	imports: [ConfigModule, LoggerModule.forRoot('notifications-service')],
	controllers: [NotificationsController],
	providers: [NotificationsService],
})
export class NotificationsModule {}
