import menash from 'menashmq';
import config from '../config/env.config';
import { logInfo } from '../../../log/logger';

export const connectRabbit = async () => {
  await menash.connect(config.rabbit.uri, config.rabbit.retryOptions);

  await menash.declareQueue(config.rabbit.logger);

  logInfo('Rabbit connected');
};

export default { connectRabbit };
