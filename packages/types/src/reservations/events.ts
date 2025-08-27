// Domain events dla reservations
export interface BaseDomainEvent {
	id: string;
	type: string;
	aggregateId: string;
	aggregateType: string;
	version: number;
	timestamp: string;
	data: Record<string, any>;
	metadata?: Record<string, any>;
}

export interface BookingConfirmedEvent extends BaseDomainEvent {
	type: 'booking.confirmed';
	aggregateType: 'reservation';
	data: {
		reservationId: string;
		userId: string;
		placeId: string;
		startDate: string;
		endDate: string;
		totalPrice: number;
		currency: string;
		guestsCount: number;
		confirmedAt: string;
	};
}

export interface BookingExpiredEvent extends BaseDomainEvent {
	type: 'booking.expired';
	aggregateType: 'reservation';
	data: {
		reservationId: string;
		userId: string;
		placeId: string;
		expiredAt: string;
		reason: 'payment_timeout' | 'approval_timeout' | 'manual_expiry';
		originalStatus: string;
	};
}

export interface BookingCancelledEvent extends BaseDomainEvent {
	type: 'booking.cancelled';
	aggregateType: 'reservation';
	data: {
		reservationId: string;
		userId: string;
		placeId: string;
		cancelledAt: string;
		reason: 'user_request' | 'owner_rejection' | 'payment_failed' | 'system_cancellation';
		refundAmount?: number;
		refundCurrency?: string;
	};
}

export interface BookingPaymentProcessedEvent extends BaseDomainEvent {
	type: 'booking.payment_processed';
	aggregateType: 'reservation';
	data: {
		reservationId: string;
		userId: string;
		paymentId: string;
		amount: number;
		currency: string;
		status: 'succeeded' | 'failed' | 'pending';
		processedAt: string;
	};
}

// Union type wszystkich reservation events
export type ReservationDomainEvent = 
	| BookingConfirmedEvent 
	| BookingExpiredEvent 
	| BookingCancelledEvent 
	| BookingPaymentProcessedEvent;

// Event payload types (bez metadanych)
export type BookingConfirmedPayload = BookingConfirmedEvent['data'];
export type BookingExpiredPayload = BookingExpiredEvent['data'];
export type BookingCancelledPayload = BookingCancelledEvent['data'];
export type BookingPaymentProcessedPayload = BookingPaymentProcessedEvent['data'];
