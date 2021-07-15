import getDataService from '../DataAccess/dataFromLocalJson';
import utils from '../utils/utils';

export default {
  all: (query: object) => {
    let data = getDataService.aka();
    if (query) data = utils.filterData(data, query);
    return data;
  },

  byPersonalNumber: (personalNumber: string) => {
    const data = getDataService.aka();
    return utils.findInData(data, { mi: personalNumber });
  },

  byIdentityCard: (identityCard: string) => {
    const data = getDataService.aka();
    return utils.findInData(data, { tz: identityCard });
  },
};
