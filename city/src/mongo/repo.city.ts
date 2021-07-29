import * as mongoose from 'mongoose';

import envConfig from '../config/env.config';
import dataFromAPI from '../DataAccess/dataFromAPI';
import citySchema from './model';

const { mongo } = envConfig;

const cityModel = mongoose.model(mongo.collectionName, citySchema);

export default {
  get: {
    all: async () => await dataFromAPI(),
    oneByPn: async (personalNumber: string) => await cityModel.find({ personalNumber }),
    oneByIc: async (identityCard: string) => await cityModel.find({ identityCard }),
  },
  update: async (data) => {
    await cityModel.deleteMany({});
    await cityModel.insertMany(data);
  },
};
