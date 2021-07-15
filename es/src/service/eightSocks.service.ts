import getDataService from '../DataAccess/dataFromLocalJson';
import utils from '../utils/utils';

export default {
  all: (query: object) => {
    let data = getDataService.eightSocks();
    if (query) data = utils.filterData(data, query);
    return data;
  },
  byPersonalNumber: (personalNumber: string) => {
    const data = getDataService.eightSocks();
    return utils.findInData(data, { tz: personalNumber });
  },
  byDomainUser: (domainUser: string) => {
    const data = getDataService.eightSocks();
    return utils.findInData(data, { userName: domainUser });
  },
  byIdentityCard: (identityCard: string) => {
    const data = getDataService.eightSocks();
    return utils.findInData(data, { mi: identityCard });
  },
};
