import repoCity from '../mongo/repo.city';
import { DbHandler } from '../../../utils/scheduleGetData';
import dataFromAPI from './dataFromAPI';
import fieldNames from '../config/fieldNames';

export const schedule = new DbHandler(repoCity.update, dataFromAPI,fieldNames.dataSources.city);

export default async () => {  
  schedule.start();
};
