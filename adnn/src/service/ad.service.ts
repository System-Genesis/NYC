import getAdNN from '../DataAccess/repo.adnn';

export default {
  all: async () => await getAdNN.all(),
  byPersonalNumber: async (personalNumber: string) => await getAdNN.oneByPN(personalNumber),
  byDomainUser: async (domainUser: string) => await getAdNN.oneByUser(domainUser),
  byIdentityCard: async (identityCard: string) => await getAdNN.oneByIC(identityCard),
};
