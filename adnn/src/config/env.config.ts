import env from 'env-var';
import './dotenv';

export default {
  token: env.get('TOKEN').required().asString(),
  ldap: {
    url: env.get('LDAP_URL').required().asString(),
    userName: env.get('LDAP_USER_NAME').required().asString(),
    password: env.get('LDAP_PASSWORD').required().asString(),
    scope: env.get('LDAP_SCOPE').required().asString(),
    attributes: env.get('LDAP_ATTRIBUTES').required().asString(),
    base: env.get('LDAP_BASE').required().asString(),
    nnKey: env.get('LDAP_KEY').required().asString(),
  },
  format: {
    filter: env.get('FILTER').required().asString(),
    pn: {
      start: env.get('PN_START').required().asString(),
    },
    ic: {
      start: env.get('IC_START').required().asString(),
      end: env.get('IC_END').required().asString(),
    },
  },
};
