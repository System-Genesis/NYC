import getDataService from '../DataAccess/dataFromLocalJson';
import utils from '../utils/utils';

export default {
  all: (query: object) => {
    let data = getDataService.ad();
    if (query) data = utils.filterData(data, query);
    return data;
  },
  byPersonalNumber: (personalNumber: string) => {
    const data = getDataService.ad();
    return utils.findInData(data, { userPrincipalName: personalNumber }, false);
  },
  byDomainUser: (domainUser: string) => {
    const data = getDataService.ad();
    return utils.findInData(data, { sAMAccountName: domainUser });
  },
  byIdentityCard: (identityCard: string) => {
    const data = getDataService.ad();
    return utils.findInData(data, { userPrincipalName: identityCard }, false);
  },
};
