import menash from 'menashmq';
import config from '../main.config/main.config';
import { logInfo } from '../log/logger';

const { uri, retryOptions, logger } = config.rabbit;

export const connectRabbit = async (service: string) => {
  await menash.connect(uri, retryOptions);

  await menash.declareQueue(logger);

  logInfo(service, 'Rabbit connected');
};

export default { connectRabbit };
