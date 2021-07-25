import * as mongoose from 'mongoose';
import fieldNames from '../config/fieldNames';

const sfFieldNames = fieldNames.sf_name;

const sfSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      auto: true,
      select: false,
    },

    [sfFieldNames.userName]: String,
    [sfFieldNames.firstName]: String,
    [sfFieldNames.lastName]: String,
    [sfFieldNames.fullName]: String,
    [sfFieldNames.mail]: String,
    [sfFieldNames.personalNumber]: String,
    [sfFieldNames.identityCard]: String,
    [sfFieldNames.hierarchy]: String,
    [sfFieldNames.sex]: String,
    [sfFieldNames.serviceType]: String,
    [sfFieldNames.rank]: String,
    [sfFieldNames.status]: String,
    [sfFieldNames.address]: String,
    [sfFieldNames.telephone]: String,
    [sfFieldNames.entityType]: String,
    [sfFieldNames.dischargeDay]: String,
    [sfFieldNames.primaryDU]: String,
  },
  { versionKey: false }
);

export default sfSchema;
