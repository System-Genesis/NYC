import repoSf from '../mongo/repo.sf';
import downloadData from './ftp_client';
import { DbHandler } from '../../../utils/scheduleGetData';

export default async () => {
  const schedule = new DbHandler(downloadData, repoSf.update);
  schedule.start();
};
