type aka = {
  firstName: string;
  lastName: string;
  tz: string;
  mi: string;
  clearance: string;
  rnk: string;
  nstype: string;
  rld: string;
  hr: string;
  birthday: string;
  sex: 'm' | 'f';
  phone?: phone;
  metaData?: picture;
};

export type phone = {
  MISPAR_ISHI?: string;
  MISPAR_MOFE: string;
  T_RISHUM_TCHILA: string;
  KIDOMET: string;
  EZUR_HIUG: string;
  MIS_TELEPHON: string;
  SUG_TELEPHONE: string;
  SUG_KTOVET: string;
};

export type picture = {
  _id?: string;
  personalNumber: string;
  path: string;
  format: string;
  takenAt: Date;
};

export default aka;
