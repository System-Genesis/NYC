import axios from 'axios';
import config from '../config';
import EsModel from '../mongo/EsModel';
import fieldNames from '../config/fieldNames';

const { paths } = config;

const tokenQuery = (token: string): string => `&token=${token}`;

export const getAll = async () => await axios.get(`${paths.all}${tokenQuery(config.token)}`);

export const getByDomainUser = async (domainUser: string) =>
    await axios.get(`${paths.domainUser}${domainUser}${tokenQuery(config.token)}`);

export const getByPersonalNumber = async (personalNumber: string) =>
    await axios.get(`${paths.personalNumber}${personalNumber}${tokenQuery(config.token)}`);

export const getByIdentityCard = async (identityCard: string) => {
    const query = {};
    query[fieldNames.es_name.identityCard] = identityCard;
    return await EsModel.findOne(query).lean();
};
