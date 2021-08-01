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
    const resS: aka[] = (await akaSModel.find(query).lean()) as aka[];
    const resI: picture[] = (await akaIModel.find(query).lean()) as picture[];
    const resT: phone[] = (await akaTModel.find(query).lean()) as phone[];

    const sortedS = resS.sort((c, n) => (c.mi > n.mi ? -1 : 1));
    const sortedI = resI.sort((c, n) => (c.personalNumber > n.personalNumber ? -1 : 1));
    const sortedT = resT.sort((c: phone, n: phone) => (c.MISPAR_ISHI! > n.MISPAR_ISHI! ? -1 : 1));

    const allData = sortedS.map((s) => {
      const pn = s[akaFieldNames.personalNumber];
      s.phone = sortedT.filter((t) => t.MISPAR_ISHI === pn);
      s.picture = sortedI.find((t) => t.personalNumber === pn);
      return s;
    });

    return allData;
  },
  oneByPn: async (mi: string) => {
    const person: aka = await akaSModel.find({ personalNumber: mi }).lean();
    const meta: picture = await akaIModel.find({ personalNumber: mi }).lean();
    const telephone: phone = await akaTModel.filter({ personalNumber: mi }).lean();

    person['picture'] = meta;
    person['phone'] = telephone;

    return person;
  },
  oneByIc: async (identityCard: string) => {
    const person: aka = await akaSModel.find({ identityCard }).lean();
    if (person.mi) {
      const telephone: phone = await akaTModel.filter({ MISPAR_ISHI: person.mi }).lean();
      const meta: picture = await akaIModel.find({ personalNumber: person.mi }).lean();

      person.picture = meta;
      person.phone = telephone;
    }

    return person;
  },
  imgByPn: async (personalNumber: string) => {
    return (await akaIModel.find({ personalNumber }).lean()) as picture;
  },
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
    byPn: async (personalNumber: string, updateObj) => {
      return await akaIModel.findOneAndUpdate({ personalNumber }, updateObj);
    },
    createOne: async (img: picture) => {
      return await akaIModel.create(img);
    },
  },
};

export default { get, update };
