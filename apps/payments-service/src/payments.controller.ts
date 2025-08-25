import { Body, Controller, Post, Req, Res, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto, CreateChargeSchema, ZodPipe } from '@repo/backend';
import { Request, Response } from 'express';

import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
	constructor(private readonly paymentsService: PaymentsService) {}

	@MessagePattern('create-checkout-session')
	@UsePipes(new ZodPipe(CreateChargeSchema))
	async createChargeFromMessage(
		@Payload() data: CreateChargeDto & { email: string; reservationId: string }
	) {
		const session = await this.paymentsService.createCharge(data);

		return { url: session.url };
	}

	@Post('charge')
	@UsePipes(new ZodPipe(CreateChargeSchema))
	async createChargeFromHttp(
		@Body() data: CreateChargeDto & { email: string; reservationId: string }
	) {
		const session = await this.paymentsService.createCharge(data);

		return { url: session.url };
	}

	@Post('webhook')
	async webhook(@Req() req: Request, @Res() res: Response) {
		return this.paymentsService.handleWebhook(req, res);
	}
}
