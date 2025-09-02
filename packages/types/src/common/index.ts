export * from './pagination';
export * from './api';

export const SUPPORTED_CURRENCIES = ['PLN', 'EUR', 'USD'] as const;
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export type Environment = 'development' | 'production' | 'test';

export interface DateRange {
	startDate: Date;
	endDate: Date;
}

export interface StringDateRange {
	startDate: string;
	endDate: string;
}
