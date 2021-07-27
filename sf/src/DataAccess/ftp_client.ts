import { logError, logInfo } from './../log/logger';
import ftp from 'basic-ftp';
import config from '../config/env.config';

const { config: access, download } = config.ftp;

const downloadData = async () => {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access(access);
    console.log(await client.list());
    await client.downloadTo(download.to, download.from);
    logInfo('FTP file successfully downloaded');
  } catch (err) {
    logError('FTP ERROR', err);
    console.log(err);
  }

  client.close();
};

export default downloadData;
