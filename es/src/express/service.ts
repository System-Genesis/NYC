import axios from 'axios';
import config from '../config';
import EsModel from '../mongo/EsModel';
import fieldNames from '../config/fieldNames';

const { express } = config;

export const getAll = async () => await axios.get(`${express.basicURL}`, { headers: { Authorization: express.esToken } });

export const getByDomainUser = async (domainUser: string) =>
    await axios.get(`${express.basicURL}?domainUser=${domainUser}`, { headers: { Authorization: express.esToken } });

export const getByPersonalNumber = async (personalNumber: string) =>
    await axios.get(`${express.basicURL}?personalNumber=${personalNumber}`, { headers: { Authorization: express.esToken } });

export const getByIdentityCard = async (identityCard: string) => {
    const query = {};
    query[fieldNames.es_name.identityCard] = identityCard;
    return await EsModel.findOne(query).lean();
};
