import * as mongoose from 'mongoose';
import config from '../config';
import fieldNames from '../config/fieldNames';

const ESFieldNames = fieldNames.es_name;

const { mongo } = config;

const EsSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            auto: true,
            select: false,
        },

        [ESFieldNames.entityType]: String,
        [ESFieldNames.firstName]: String,
        [ESFieldNames.lastName]: String,
        [ESFieldNames.identityCard]: String,
        [ESFieldNames.personalNumber]: String,
        [ESFieldNames.rank]: String,
        [ESFieldNames.phone]: String,
        [ESFieldNames.mobilePhone]: String,
        [ESFieldNames.dischargeDay]: String,
        [ESFieldNames.hierarchy]: String,
        [ESFieldNames.mail]: String,
        [ESFieldNames.address]: String,
        [ESFieldNames.job]: String,
        [ESFieldNames.location]: String,
        [ESFieldNames.userName]: String,
        [ESFieldNames.birthDate]: String,
        [ESFieldNames.sex]: String,
        [ESFieldNames.serviceType]: String,
    },
    { versionKey: false },
);

const ESModel = mongoose.model(mongo.collectionName, EsSchema);

export default ESModel;
