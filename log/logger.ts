import { menash } from 'menashmq';
import winston, { config, format } from 'winston';

const { LOG_QUEUE } = process.env;

const logger = winston.createLogger({
  levels: config.npm.levels,

  format: format.combine(format.colorize(), format.splat(), format.simple()),
  transports: [new winston.transports.Console()],
});

export const logInfo = (msg: string, servie: string, any?: any) => {
  menash.send(LOG_QUEUE!, {
    level: 'info',
    message: `${msg}. ${any ? JSON.stringify(any) : ''}`,
    system: 'NYC',
    service: servie,
    extraFields: any,
  });

  if (any) logger.info(`${msg} ${JSON.stringify(any)}`);
  else logger.info(msg);
};

export const logWarn = (msg: string, servie: string, any?: any) => {
  menash.send(LOG_QUEUE!, {
    level: 'warning',
    message: `${msg}. ${any ? JSON.stringify(any) : ''}`,
    system: 'NYC',
    service: servie,
    extraFields: any,
  });
  logger.warn(`${msg} ${!any ? '' : JSON.stringify(any)}`);
};

export const logError = (msg: string, servie: string, any?: any) => {
  menash.send(LOG_QUEUE!, {
    level: 'error',
    message: `${msg}. ${any ? JSON.stringify(any) : ''}`,
    system: 'traking',
    service: servie,
    extraFields: any,
  });
  logger.error(`${msg} ${!any ? '' : JSON.stringify(any)}`);
};