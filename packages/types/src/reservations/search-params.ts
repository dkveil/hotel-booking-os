import { z } from 'zod';
import { BaseSearchParamsSchema } from '../common/pagination';
import { ReservationStatus } from '@prisma/client';

// Reservation-specific search parameters
export const ReservationSearchParamsSchema = BaseSearchParamsSchema.extend({
	sortBy: z
		.enum(['createdAt', 'updatedAt', 'startDate', 'endDate', 'totalPrice'])
		.default('createdAt'),
	status: z
		.enum(Object.values(ReservationStatus) as [string, ...string[]])
		.optional(),
	startDate: z.string().datetime().optional(),
	endDate: z.string().datetime().optional(),
	placeId: z.string().uuid().optional(),
	userId: z.string().uuid().optional(),
	minPrice: z.coerce.number().min(0).optional(),
	maxPrice: z.coerce.number().min(0).optional(),
	guestsCount: z.coerce.number().min(1).max(10).optional(),
	currency: z.enum(['PLN', 'EUR', 'USD']).optional(),
});

export type ReservationSearchParams = z.infer<typeof ReservationSearchParamsSchema>;

// Create reservation schema
export const CreateReservationSchema = z.object({
	placeId: z.string().uuid(),
	startDate: z.string().datetime(),
	endDate: z.string().datetime(),
	guestsCount: z.number().min(1).max(10).default(1),
	totalPrice: z.number().min(0),
	currency: z.enum(['PLN', 'EUR', 'USD']).default('PLN'),
	notes: z.string().optional(),
	charge: z.object({
		amount: z.number().min(0),
		currency: z.string(),
		// Dodatkowe pola dla Stripe charge
		paymentMethodId: z.string().optional(),
		savePaymentMethod: z.boolean().default(false),
	}),
}).refine(
	(data) => new Date(data.endDate) > new Date(data.startDate),
	{
		message: 'End date must be after start date',
		path: ['endDate'],
	}
);

export type CreateReservationDto = z.infer<typeof CreateReservationSchema>;

// Update reservation schema
export const UpdateReservationSchema = CreateReservationSchema
	.omit({ charge: true })
	.partial()
	.extend({
		status: z.enum(Object.values(ReservationStatus) as [string, ...string[]]).optional(),
	});

export type UpdateReservationDto = z.infer<typeof UpdateReservationSchema>;
