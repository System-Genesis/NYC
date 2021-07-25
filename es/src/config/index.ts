import * as env from 'env-var';
import './dotenv';

const config = {
    server: {
        port: env.get('PORT').required().asPortNumber(),
    },
    mongo: {
        uri: env.get('MONGO_URI').required().asUrlString(),
        collectionName: env.get('COLLECTION_NAME').required().asString(),
    },
    rabbit: {
        uri: env.get('RABBIT_URI').required().asUrlString(),
        retryOptions: {
            minTimeout: env.get('RABBIT_RETRY_MIN_TIMEOUT').default(1000).asIntPositive(),
            retries: env.get('RABBIT_RETRY_RETRIES').default(10).asIntPositive(),
            factor: env.get('RABBIT_RETRY_FACTOR').default(1.8).asFloatPositive(),
        },
        selectorQueue: env.get('PRODUCE_QUEUE').required().asString(),
        logQueue: env.get('LOG_QUEUE').required().asString(),
    },
    paths: {
        all: env.get('GET_ALL_URL').required().asUrlString(),
        domainUser: env.get('GET_BY_DOMAIN_USER_URL').required().asUrlString(),
        personalNumber: env.get('GET_BY_PERSONAL_NUMBER_URL').required().asUrlString(),
    },
    token: env.get('TOKEN').required().asString(),
};

export default config;
