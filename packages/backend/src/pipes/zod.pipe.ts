import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Schema } from 'zod';

@Injectable()
export class ZodPipe implements PipeTransform {
	constructor(private readonly schema: Schema) {}

	transform(value: unknown, _metadata: ArgumentMetadata) {
		return this.schema.parse(value);
	}
}
