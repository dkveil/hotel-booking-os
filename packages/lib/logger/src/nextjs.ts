import { createLogger } from './index.js';

export function createNextJSLogger(service: string, options = {}) {
	return createLogger({
		service,
		isEdgeRuntime: process.env.NEXT_RUNTIME === 'edge',
		isProduction: process.env.NODE_ENV === 'production',
		...options,
	});
}

export default createNextJSLogger;
