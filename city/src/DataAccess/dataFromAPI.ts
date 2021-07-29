import { logError } from './../../../log/logger';
import axios from 'axios';
import envConfig from '../config/env.config';
import https from 'https';

const { url, headers } = envConfig.axios;
export default async () => {
  try {
    const headersObj = {
      [headers.key1]: headers.value1,
      [headers.key2]: headers.value2,
      [headers.key3]: headers.value3,
    };
    const httpAgent = new https.Agent({ rejectUnauthorized: false });

    const res = await axios.get(url, { headers: headersObj, httpAgent });

    return res.data;
  } catch (error) {
    logError('Error getting data from CTS', error);
    return [];
  }
};
