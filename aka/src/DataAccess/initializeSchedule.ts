import repoSf from '../mongo/repo.aka';
import { DbHandler } from '../../../utils/scheduleGetData';
import { getAkaData } from './getAkaData';
import filedNames from '../config/fieldNames';

export default async () => {
  const schedule = new DbHandler(repoSf.update, getAkaData, filedNames.dataSources.aka);
  schedule.start();
};
