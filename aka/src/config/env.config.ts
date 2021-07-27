import './dotenv';

import env from 'env-var';

export default {
  // audAka: 'lsluqvF8YMp0ffDPWhDyoYG8xqU9J8',
  tFile: env.get('TFILE').required().asString(),
  token: env.get('TOKEN').required().asString(),
  akaUrl: env.get('AKA_URL').required().asString(),
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
  mongo: {
    uri: env.get('MONGO_URI').required().asUrlString(),
    collectionName: env.get('COLLECTION_NAME').required().asString(),
  },
  spike: {
    spikeUrl: env.get('SPIKE_URL').required().asString(),
    redisUrl: env.get('REDIS_URL').required().asString(),
    redisKeyName: env.get('REDIS_KEY_NAME').required().asString(),
    myAud: env.get('MY_AUDIENCE').required().asString(),
    clientId: env.get('MY_CLIENT_ID').required().asString(),
    clientSecret: env.get('MY_CLIENT_SECRET').required().asString(),
    akaAud: env.get('AKA_AUDIENCE').required().asString(),
    publicKeyPath: env.get('PUBLIC_KEY_PATH').required().asString(),
  },
  minio: {
    mongoUrl: env.get('MINIO_MONGO_URL').required().asString(),
    db: env.get('MINIO_DB').required().asString(),
    endPoint: env.get('MINIO_ENDPOINT').required().asString(),
    port: env.get('MINIO_PORT').required().asPortNumber(),
    useSSL: env.get('MINIO_SSL').required().asBool(),
    accessKey: env.get('MINIO_ACCESS_KEY').required().asString(),
    secretKey: env.get('MINIO_SECRET_KEY').required().asString(),
    bucketName: env.get('MINIO_BUCKET_NAME').required().asString(),
  },
};
