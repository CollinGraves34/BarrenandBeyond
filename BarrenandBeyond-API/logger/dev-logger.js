const { format, createLogger, transports } = require('winston');
const { timestamp, combine, printf, errors } = format;

function buildDevLogger() {
	const logFormat = printf(({ level, message, timestamp, stack }) => {
		return `${timestamp}  ${level}: ${stack || message}`;
	});

	return createLogger({
		format: combine(
			format.colorize(),
			timestamp({ format: 'MM-dd-YYYY HH:mm' }),
			errors({ stack: true }),
			logFormat
		),
		transports: [new transports.Console({ level: 'debug' })],
	});
}

module.exports = buildDevLogger;
