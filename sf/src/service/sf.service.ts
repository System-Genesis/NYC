import repoSf from '../mongo/repo.sf';

export default {
  all: async (query: object) => await repoSf.get.all(query),
  byPersonalNumber: async (personalNumber: string) => await repoSf.get.oneByPn(personalNumber),
  byIdentityCard: async (identityCard: string) => await repoSf.get.oneByIc(identityCard),
};
