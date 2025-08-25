import { Module } from '@nestjs/common';

import { ConfigModule } from '@repo/backend';

import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
	imports: [ConfigModule],
	controllers: [NotificationsController],
	providers: [NotificationsService],
})
export class NotificationsModule {}
