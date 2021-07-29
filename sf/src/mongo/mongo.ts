import { logInfo } from './../log/logger';
import * as mongoose from 'mongoose';
import config from '../config/env.config';

const { mongo } = config;

export default async () => {
  logInfo('Connecting to Mongo...');

  await mongoose.connect(mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  logInfo('Mongo connection established');
};
