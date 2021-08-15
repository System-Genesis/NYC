import * as mongoose from 'mongoose';

import envConfig from '../config/env.config';
import fieldNames from '../config/fieldNames';
import aka, { phone, picture } from '../types/aka.type';
import akaImgSchema from './model.img';
import akaPersonSchema from './model.person';
import akaPhoneSchema from './model.phone';

const { mongo } = envConfig;
const akaFieldNames = fieldNames.aka;

const akaPersonModel = mongoose.model(mongo.collectionName, akaPersonSchema);
const akaImgModel = mongoose.model(mongo.collectionName, akaImgSchema);
const akaPhoneModel = mongoose.model(mongo.collectionName, akaPhoneSchema);

const get = {
  all: async (query = {}) => {
    const resPerson: aka[] = (await akaPersonModel.find(query).lean()) as aka[];
    const resImg: picture[] = (await akaImgModel.find(query).lean()) as picture[];
    const resPhone: phone[] = (await akaPhoneModel.find(query).lean()) as phone[];

    const sortedPerson = resPerson.sort((c, n) => (c.mi > n.mi ? -1 : 1));
    const sortedImg = resImg.sort((c, n) => (c.personalNumber > n.personalNumber ? -1 : 1));
    const sortedPhone = resPhone.sort((c: phone, n: phone) => (c.MISPAR_ISHI! > n.MISPAR_ISHI! ? -1 : 1));

    const allData = sortedPerson.map((s) => {
      const pn = s[akaFieldNames.personalNumber];
      s.phone = sortedPhone.find((t) => t.MISPAR_ISHI === pn);
      s.picture = sortedImg.find((t) => t.personalNumber === pn);
      return s;
    });

    return allData;
  },
  oneByPn: async (mi: string) => {
    const person: aka = await akaPersonModel.find({ personalNumber: mi }).lean();
    const meta: picture = await akaImgModel.findOne({ personalNumber: mi }).lean();
    const telephone: phone[] = await akaPhoneModel.find({ personalNumber: mi }).lean();

    person.picture = meta;
    person.phone = telephone;

    return person;
  },
  oneByIc: async (identityCard: string) => {
    const person: aka = await akaPersonModel.find({ identityCard }).lean();
   
    if (person.mi) {
      const telephone: phone[] = await akaPhoneModel.find({ MISPAR_ISHI: person.mi }).lean();
      const meta: picture = await akaImgModel.findOne({ personalNumber: person.mi }).lean();

      person.picture = meta;
      person.phone = telephone;
    }

    return person;
  },
  imgByPn: async (personalNumber: string) => {
    return (await akaImgModel.findOne({ personalNumber }).lean()) as picture;
  },
};

const update = {
  person: async (data: aka[]) => {
    await akaPersonModel.deleteMany({});
    await akaPersonModel.insertMany(data);
  },
  phone: async (data: aka[]) => {
    await akaPhoneModel.deleteMany({});
    await akaPhoneModel.insertMany(data);
  },

  image: {
    all: async (data: aka[]) => {
      await akaImgModel.deleteMany({});
      await akaImgModel.insertMany(data);
    },
    byPn: async (personalNumber: string, updateObj) => {
      return await akaImgModel.findOneAndUpdate({ personalNumber }, updateObj);
    },
    createOne: async (img: picture) => {
      return await akaImgModel.create(img);
    },
  },
};

export default { get, update };
