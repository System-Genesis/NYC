import * as mongoose from 'mongoose';

import envConfig from '../config/env.config';
import fieldNames from '../config/fieldNames';
import aka, { phone, picture } from '../types/aka.type';
import akaISchema from './model.i';
import akaSSchema from './model.s';
import akaTSchema from './model.t';

const { mongo } = envConfig;
const akaFieldNames = fieldNames.aka;

const akaSModel = mongoose.model(mongo.collectionName, akaSSchema);
const akaIModel = mongoose.model(mongo.collectionName, akaISchema);
const akaTModel = mongoose.model(mongo.collectionName, akaTSchema);

const get = {
  all: async (query = {}) => {
    const resS: aka[] = await akaSModel.find(query);
    const resI: picture[] = await akaIModel.find(query);
    const resT: phone[] = await akaTModel.find(query);

    const sortedS = resS.sort((c: any, n: any) => (c.personalNumber > n.personalNumber ? -1 : 1));
    const sortedI = resI.sort((c: any, n: any) => (c.personalNumber > n.personalNumber ? -1 : 1));
    const sortedT = resT.sort((c: phone, n: phone) => (c.MISPAR_ISHI! > n.MISPAR_ISHI! ? -1 : 1));

    const allData = sortedS.map((s) => {
      const pn = s[akaFieldNames.personalNumber];
      s.phone = sortedT.find((t) => t.MISPAR_ISHI === pn);
      s.metaData = sortedI.find((t) => t.personalNumber === pn);
      return s;
    });

    return allData;
  },
  oneByPn: async (personalNumber: string) => await akaSModel.find({ personalNumber }),
  oneByIc: async (identityCard: string) => await akaSModel.find({ identityCard }),
};

const update = {
  s: async (data: aka[]) => {
    await akaSModel.deleteMany({});
    await akaSModel.insertMany(data);
  },
  t: async (data: aka[]) => {
    await akaTModel.deleteMany({});
    await akaTModel.insertMany(data);
  },

  i: {
    all: async (data: aka[]) => {
      await akaIModel.deleteMany({});
      await akaIModel.insertMany(data);
    },
    gatByPn: async (personalNumber: string, updateObj) => {
      return await akaIModel.findOneAndUpdate({ personalNumber }, updateObj);
    },
    createOne: async (img: picture) => {
      return await akaIModel.create(img);
    },
  },
};

export default { get, update };
