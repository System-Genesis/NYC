import menash from 'menashmq';
import { logInfo } from '../log/logger';
import config from '../main.config/main.config';

const { uri, retryOptions, logger } = config.rabbit;

export const connectRabbit = async (service: string) => {
  await menash.connect(uri, retryOptions);

  await menash.declareQueue(logger);

  logInfo(service, 'Rabbit connected');
};

export default { connectRabbit };
