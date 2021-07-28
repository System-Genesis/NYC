import * as mongoose from 'mongoose';
import fieldNames from '../config/fieldNames';

const cityFieldNames = fieldNames.city_name;

const citySchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      auto: true,
      select: false,
    },

    [cityFieldNames.firstName]: String,
    [cityFieldNames.lastName]: String,
    [cityFieldNames.identityCard]: String,
    [cityFieldNames.rank]: String,
    [cityFieldNames.dischargeDay]: String,
    [cityFieldNames.clearance]: String,
    [cityFieldNames.currentUnit]: String,
    [cityFieldNames.serviceType]: String,
    [cityFieldNames.mobilePhone]: String,
    [cityFieldNames.personalNumber]: String,
    [cityFieldNames.mail]: String,
    [cityFieldNames.job]: String,
    [cityFieldNames.profession]: String,
    [cityFieldNames.hierarchy]: String,
    [cityFieldNames.domainUsers]: String,
    [cityFieldNames.company]: String,
    [cityFieldNames.tags]: String,
    [cityFieldNames.domains]: String,
  },
  { versionKey: false }
);

export default citySchema;
