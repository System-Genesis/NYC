import repoCity from '../mongo/repo.city';
import { DbHandler } from '../../../utils/scheduleGetData';
import dataFromAPI from './dataFromAPI';

export default async () => {
  const schedule = new DbHandler(repoCity.update, dataFromAPI);
  schedule.start();
};
