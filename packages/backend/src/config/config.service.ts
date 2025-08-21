import { Buffer } from 'node:buffer';
import * as crypto from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService extends NestConfigService {
	get databaseUrl(): string {
		const url = this.get<string>('DATABASE_URL');
		if (!url) {
			throw new Error('DATABASE_URL is required');
		}
		return url;
	}

	get redisConnectData() {
		const host = this.get<string>('REDIS_HOST');
		const port = this.get<number>('REDIS_PORT');
		const password = this.get<string>('REDIS_PASSWORD');

		if (!(host && port && password)) {
			throw new Error('Redis configuration is incomplete');
		}

		return { host, port, password };
	}

	get useRedis(): boolean {
		return this.get<string>('USE_REDIS') === 'true';
	}

	createSignedMessage(
		payload: Record<string, unknown>,
		serviceName?: string
	): Record<string, unknown> {
		const serviceToken = this.get('INTER_SERVICE_SECRET');
		const timestamp = Date.now();

		if (!serviceToken) {
			throw new Error('INTER_SERVICE_SECRET not configured');
		}

		const fullPayload = serviceName
			? { ...payload, service: serviceName }
			: payload;

		const dataToSign = JSON.stringify(
			{
				...fullPayload,
				timestamp,
			},
			Object.keys(fullPayload).sort()
		);

		const signature = crypto
			.createHmac('sha256', serviceToken)
			.update(dataToSign)
			.digest('hex');

		return {
			...fullPayload,
			serviceToken,
			timestamp,
			signature,
		};
	}

	verifySignature(
		payload: Record<string, unknown>,
		timestamp: number,
		receivedSignature: string,
		serviceName?: string
	): boolean {
		const serviceToken = this.get('INTER_SERVICE_SECRET');

		if (!serviceToken) {
			return false;
		}

		const fullPayload = serviceName
			? { ...payload, service: serviceName }
			: payload;

		const dataToSign = JSON.stringify(
			{
				...fullPayload,
				timestamp,
			},
			Object.keys(fullPayload).sort()
		);

		const expectedSignature = crypto
			.createHmac('sha256', serviceToken)
			.update(dataToSign)
			.digest('hex');

		return crypto.timingSafeEqual(
			Buffer.from(receivedSignature, 'hex'),
			Buffer.from(expectedSignature, 'hex')
		);
	}

	isTimestampValid(timestamp: number, maxAgeMinutes = 5): boolean {
		const now = Date.now();
		const maxAge = maxAgeMinutes * 60 * 1000;
		return Math.abs(now - timestamp) <= maxAge;
	}
}
