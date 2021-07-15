import getSourceData from '../DataAccess/dataFromLocalJson';
import utils from '../utils/utils';

export default {
  all: (query: object) => {
    let data = getSourceData();
    if (query) data = utils.filterData(data, query);
    return data;
  },
  byPersonalNumber: (personalNumber: string) => {
    const data = getSourceData();
    return utils.findInData(data, { personalNumber });
  },
  byDomainUser: (domainUser: string) => {
    const data = getSourceData();
    return utils.findInData(data, { domUser: domainUser });
  },
  byIdentityCard: (identityCard: string) => {
    const data = getSourceData();
    return utils.findInData(data, { tz: identityCard });
  },
};
