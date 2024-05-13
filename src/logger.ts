import winston from 'winston';

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(info => {
            return `[${info.timestamp}] ${info.level.toUpperCase()} ${info.message}`
        }),
    ),
    transports: [
        new winston.transports.Console()
    ],
});

switch (process.env.NODE_ENV) {
    case 'production':
        logger.level = 'info';
    case 'development':
    case 'test':
        logger.level = 'debug';
        break;
    default:
        logger.warn(`Unrecognized environment: ${process.env.NODE_ENV}`);
        logger.level = 'info'; 
        break;
}