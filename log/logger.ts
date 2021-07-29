import { menash } from 'menashmq';
import path from 'path';
import winston from 'winston';
import configEnv from '../aka/src/config/env.config';

const { config, format } = winston;

const date = () => new Date(Date.now()).toLocaleDateString().replace(/\//g, '_');

export const logger = winston.createLogger({
  levels: config.npm.levels,

  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.splat(),
    format.simple(),
    format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, `../../log/${date()}-logger.log`),
      maxsize: 50000,
    }),
  ],
});

const log = (level: string, service: string, msg: string, any: any = '') => {
  menash.send(configEnv.rabbit.logger, {
    level: level,
    title: `${msg}. ${any ? JSON.stringify(any) : ''}`,
    system: 'NYC',
    service: service,
    extraFields: any,
  });

  console.log(`${msg} ${!any ? '' : JSON.stringify(any)}`);

  if (any) logger[level](`${msg} ${JSON.stringify(any)}`);
  else logger[level](msg);
};

/**
 * Send log in level INFO to logger queue and to local logger
 * @param level - Log level
 * @param msg - explanation of logger
 * @param any - objet to add to msg
 */
export const logInfo = (service: string, msg: string, any: any = '') => {
  log('info', service, msg, any);
};

/**
 * Send log in level warn to logger queue and to local logger
 * @param level - Log level
 * @param msg - explanation of logger
 * @param any - objet to add to msg
 */
export const logWarn = (service: string, msg: string, any: any = '') => {
  log('warn', service, msg, any);
};

/**
 * Send log in level ERROR to logger queue and to local logger
 * @param level - Log level
 * @param msg - explanation of logger
 * @param any - objet to add to msg
 */
export const logError = (service: string, msg: string, any: any = '') => {
  log('error', service, msg, any);
};
