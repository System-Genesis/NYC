import getSourceData from '../DataAccess/dataFromAPI';
import repoCity from '../mongo/repo.city';
import utils from '../utils/utils';

export default {
  all: async (query: object) => await repoCity.get.all(query),
  byPersonalNumber: async (personalNumber: string) => await repoCity.get.oneByPn(personalNumber),
  byIdentityCard: async (identityCard: string) => await repoCity.get.oneByIc(identityCard),
  byDomainUser: async (domainUser: string) => {
    const data: any[] = await getSourceData();
    return utils.findInData(data, { domUser: domainUser });
  },
};
