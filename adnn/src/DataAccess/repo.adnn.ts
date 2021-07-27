import config from '../config/env.config';
import { getUsers } from './ldap.adnn';

const { pn, ic, filter } = config.format;

export default {
  all: async () => await getUsers(filter),

  oneByPN: async (domainUser: string) => await getUsers(domainUser),

  oneByUser: async (personalNumber: string) => {
    const personalN = `${pn.start}${personalNumber}`;
    return await getUsers(`&(${filter})(${personalN})`);
  },

  oneByIC: async (identityCard: string) => {
    const identity = `${ic.start}${identityCard}${ic.end}`;
    return await getUsers(`&(${filter})(${identity})`);
  },
};
