import pino from 'pino';

interface LoggerOptions {
	level?: string;
	isProduction?: boolean;
	isEdgeRuntime?: boolean;
	service?: string;
	pretty?: boolean;
}

export function createPinoConfig(options: LoggerOptions = {}) {
	const {
		level = process.env.LOG_LEVEL || 'info',
		isProduction = process.env.NODE_ENV === 'production',
		isEdgeRuntime = process.env.NEXT_RUNTIME === 'edge',
		service,
		pretty = !(isProduction || isEdgeRuntime),
	} = options;

	return {
		level,
		timestamp: pino.stdTimeFunctions.isoTime,
		formatters: {
			level: (label: string) => ({ level: label.toUpperCase() }),
		},
		transport: pretty
			? {
					target: 'pino-pretty',
					options: {
						colorize: true,
						ignore: 'pid,hostname',
						translateTime: 'SYS:standard',
					},
				}
			: undefined,
		name: service,
	};
}

export function createLogger(options: LoggerOptions = {}) {
	return pino(createPinoConfig(options));
}

export const logger = createLogger();

export default logger;
