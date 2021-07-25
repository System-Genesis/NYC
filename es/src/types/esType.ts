import fieldNames from '../config/fieldNames';

const ESFieldNames = fieldNames.es_name;

type esType = {
    [ESFieldNames.entityType]: string;
    [ESFieldNames.firstName]: string;
    [ESFieldNames.lastName]: string;
    [ESFieldNames.identityCard]: string;
    [ESFieldNames.personalNumber]: string;
    [ESFieldNames.rank]: string;
    [ESFieldNames.phone]: string;
    [ESFieldNames.mobilePhone]: string;
    [ESFieldNames.dischargeDay]: string;
    [ESFieldNames.hierarchy]: string;
    [ESFieldNames.mail]: string;
    [ESFieldNames.address]: string;
    [ESFieldNames.job]: string;
    [ESFieldNames.location]: string;
    [ESFieldNames.userName]: string;
    [ESFieldNames.birthDate]: string;
    [ESFieldNames.sex]: string;
    [ESFieldNames.serviceType]: string;
};

export default esType;
