import * as mongoose from 'mongoose';
import fieldNames from '../config/fieldNames';

const akaFieldNames = fieldNames.aka;

const akaPersonSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      auto: true,
      select: false,
    },

    [akaFieldNames.serviceType]: String,
    [akaFieldNames.firstName]: String,
    [akaFieldNames.lastName]: String,
    [akaFieldNames.identityCard]: String,
    [akaFieldNames.personalNumber]: String,
    [akaFieldNames.rank]: String,
    [akaFieldNames.dischargeDay]: String,
    [akaFieldNames.clearance]: String,
    [akaFieldNames.unitName]: String,
    [akaFieldNames.birthDate]: String,
    [akaFieldNames.sex]: String,
  },
  { versionKey: false }
);

export default akaPersonSchema;
