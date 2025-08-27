export * from './pagination';
export * from './api';

// Common enums i constants
export const SUPPORTED_CURRENCIES = ['PLN', 'EUR', 'USD'] as const;
export type SupportedCurrency = typeof SUPPORTED_CURRENCIES[number];

export const RESERVATION_LIMITS = {
	MIN_GUESTS: 1,
	MAX_GUESTS: 10,
	MAX_ADVANCE_DAYS: 365,
	MIN_STAY_HOURS: 1,
	MAX_STAY_DAYS: 30,
} as const;

// Common validation patterns
export const VALIDATION_PATTERNS = {
	UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
	EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	PHONE: /^\+?[\d\s\-\(\)]+$/,
} as const;

// Environment types
export type Environment = 'development' | 'production' | 'test';

// Common date utilities types
export interface DateRange {
	startDate: Date;
	endDate: Date;
}

export interface StringDateRange {
	startDate: string;
	endDate: string;
}
