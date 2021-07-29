import './dotenv';

import env from 'env-var';

export default {
  token: env.get('TOKEN').required().asString(),
  mongo: {
    uri: env.get('MONGO_URI').required().asUrlString(),
    collectionName: env.get('COLLECTION_NAME').required().asString(),
  },
  axios: {
    url: env.get('URL').required().asString(),
    headers: {
      key1: env.get('HEADERS_KEY1').required().asString(),
      key2: env.get('HEADERS_KEY2').required().asString(),
      key3: env.get('HEADERS_KEY3').required().asString(),
      value1: env.get('HEADERS_VALUE1').required().asString(),
      value2: env.get('HEADERS_VALUE2').required().asString(),
      value3: env.get('HEADERS_VALUE3').required().asString(),
    },
  },
};
