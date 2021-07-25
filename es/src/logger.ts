import * as winston from 'winston';
import logObject from './types/log';

const { config, format } = winston;

const logger = winston.createLogger({
    levels: config.npm.levels,

    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.splat(),
        format.simple(),
    ),
    transports: [new winston.transports.Console()],
});

export default (level: string, message: string, extraFields?: any): void => {
    const logToSend: logObject = {
        level,
        message,
        system: 'PNCY',
        service: 'Es',
    };

    if (extraFields) {
        logToSend.extraFields = extraFields;
    }

    logger[level](`${message} ${!extraFields ? '' : JSON.stringify(extraFields)}`);
};
