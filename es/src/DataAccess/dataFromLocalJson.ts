import fs from 'fs';

const readJson = (fileName: string): object[] => {
  return JSON.parse(fs.readFileSync(fileName, 'utf8'));
};

export default {
  sf: () => {
    return readJson('./mockFiles/sf.json');
  },
  eightSocks: () => {
    return readJson('./mockFiles/eightSocks.json');
  },
  city: () => {
    return readJson('./mockFiles/city.json');
  },
  aka: () => {
    return readJson('./mockFiles/aka.json');
  },
  ad: () => {
    return readJson('./mockFiles/ad.json');
  },
  adNn: () => {
    return readJson('./mockFiles/adNn.json');
  },
};
