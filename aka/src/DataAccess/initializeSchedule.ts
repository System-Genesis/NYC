import repoSf from '../mongo/repo.aka';
import { DbHandler } from '../../../utils/scheduleGetData';
import getAkaData from './getAkaData';

export default async () => {
  const schedule = new DbHandler(repoSf.update, getAkaData);
  schedule.start();
};
