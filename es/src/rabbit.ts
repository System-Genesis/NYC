import menash from 'menashmq';
import config from './config';
import sendLog from './logger';

const { rabbit } = config;

require('dotenv').config();

export default async (): Promise<void> => {
    sendLog('info', 'Connecting to Rabbit...', true);

    await menash.connect(rabbit.uri, rabbit.retryOptions);

    sendLog('info', 'Rabbit connected', true);

    await menash.declareQueue(rabbit.logQueue);

    sendLog('info', 'Rabbit initialized', true);
};
