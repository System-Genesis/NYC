import * as mongoose from 'mongoose';

import envConfig from '../config/env.config';
import { sf } from '../types/sf.type';
import sfSchema from './model';

const { mongo } = envConfig;

const sfModel = mongoose.model(mongo.collectionName, sfSchema);

export default {
  get: {
    all: async (query = {}) => await sfModel.find(query),
    oneByPn: async (personalNumber: string) => await sfModel.find({ personalNumber }),
    oneByIc: async (identityCard: string) => await sfModel.find({ identityCard }),
  },
  update: async (data: sf[]) => {
    await sfModel.deleteMany({});
    await sfModel.insertMany(data);
  },
};
