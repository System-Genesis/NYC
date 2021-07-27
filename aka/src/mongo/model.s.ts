import * as mongoose from 'mongoose';
import fieldNames from '../config/fieldNames';

const akaFieldNames = fieldNames.aka;

const akaSSchema = new mongoose.Schema(
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
    [akaFieldNames.phone]: String,
    [akaFieldNames.areaCode]: String,
    [akaFieldNames.mobilePhone]: String,
    [akaFieldNames.areaCodeMobile]: String,
    [akaFieldNames.dischargeDay]: String,
    [akaFieldNames.clearance]: String,
    [akaFieldNames.unitName]: String,
    [akaFieldNames.telephoneType]: String,
    [akaFieldNames.birthDate]: String,
    [akaFieldNames.sex]: String,
    [akaFieldNames.picture]: String,
  },
  { versionKey: false }
);

export default akaSSchema;
