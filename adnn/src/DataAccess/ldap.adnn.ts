import { logError } from './../../../sf/src/log/logger';
import ldap from 'ldapjs';
import config from '../config/env.config';

const { url, userName, password, scope, attributes, base, nnKey } = config.ldap;

const clint = ldap.createClient({
  url: url,
  reconnect: true,
});

clint.bind(userName, password, (err) => {
  if (err) logError('LDAP ERROR', err);
});

const convertToStdFormat = (entry) => {
  const attributes = entry.attributes.map((att) => [att.type, att.vals[0]]);
  const attributes_keys = entry.attributes.map((att) => att.type);
  const attributes_vals = entry.attributes.map((att) => att.vals[0]);
  const upnIndex = attributes_keys.findIndex((key) => key === nnKey);
  const upnVal = attributes_vals[upnIndex];

  const record = {};

  if (upnIndex != -1) record[nnKey] = upnVal;

  attributes.forEach((att) => (record[att[0]] = att[1]));

  return record;
};

const getEntries = (filter: string) => {
  const opt: ldap.SearchOptions = {
    filter,
    scope: scope as 'base' | 'one' | 'sub' | undefined,
    attributes,
    paged: {
      pageSize: 500,
    },
  };

  return new Promise((resolve, _reject) => {
    const entries: any = [];

    clint.search(base, opt, (err, res) => {
      if (err) logError('LDAP ERROR', err);

      res.on('searchEntry', (entry) => {
        entries.push(convertToStdFormat(entry));
      });
      res.on('end', () => {
        const compare_cn = (rec1, rec2) => rec1 > rec2;
        const records = entries.sort(compare_cn);
        resolve(records);
      });
    });
  });
};

export const getUsers = async (filter: string) => {
  try {
    return await getEntries(filter);
  } catch (error) {
    logError('LDAP ERROR', error);
  }
};
