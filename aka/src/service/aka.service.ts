import repoAka from '../mongo/repo.aka';

export default {
  all: async (query: object) => await repoAka.get.all(query),
  byPersonalNumber: async (personalNumber: string) => await repoAka.get.oneByPn(personalNumber),
  byIdentityCard: async (identityCard: string) => await repoAka.get.oneByIc(identityCard),
};
