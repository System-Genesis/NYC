import './dotenv';

import env from 'env-var';

export default {
  token: env.get('TOKEN').required().asString(),
  rabbit: {
    uri: env.get('RABBIT_URI').required().asString(),
    logger: env.get('LOGGER').required().asString(),
    retryOptions: {
      minTimeout: env.get('RABBIT_RETRY_MIN_TIMEOUT').default(1000).asIntPositive(),
      retries: env.get('RABBIT_RETRY_RETRIES').default(2).asIntPositive(),
      factor: env.get('RABBIT_RETRY_FACTOR').default(1.8).asFloatPositive(),
    },
  },
  server: {
    port: env.get('PORT').required().asString(),
  },
  ftp: {
    config: {
      host: env.get('FTP_HOST').required().asString(),
      user: env.get('FTP_USER').required().asString(),
      password: env.get('FTP_PASSWORD').required().asString(),
      secure: env.get('FTP_SECURE').required().asBool(),
    },
    download: {
      from: env.get('FTP_FROM').required().asString(),
      to: env.get('FTP_DOWNLOAD_TO').required().asString(),
    },
  },
  mongo: {
    uri: env.get('MONGO_URI').required().asUrlString(),
    collectionName: env.get('COLLECTION_NAME').required().asString(),
  },
};
