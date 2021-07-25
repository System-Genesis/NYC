import repoSf from '../mongo/repo.sf';
import downloadData from './ftp_client';
import { DbHandler } from './scheduleDwnldFile';

export default async () => {
  const schedule = new DbHandler(downloadData, repoSf.update);
  schedule.start();
};
