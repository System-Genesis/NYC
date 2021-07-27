import repoSf from '../mongo/repo.sf';
import downloadData from './ftp_client';
import { DbHandler } from '../../../utils/scheduleGetData';
import fieldNames from '../config/fieldNames';

export default async () => {
  const schedule = new DbHandler(repoSf.update, downloadData, fieldNames.dataSources.sf);
  schedule.start();
};
