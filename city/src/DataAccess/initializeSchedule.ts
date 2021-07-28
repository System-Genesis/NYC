import repoCity from '../mongo/repo.city';
import { DbHandler } from '../../../utils/scheduleGetData';
import dataFromAPI from './dataFromAPI';

export const schedule = new DbHandler(repoCity.update, dataFromAPI);
export default async () => {
  schedule.start();
};
