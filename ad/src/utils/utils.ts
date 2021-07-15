import faker from 'faker';
import { createAkaUser } from './../gen/aka.gen';
import { createEsUser } from './../gen/es.gen';
import { createCityUser } from './../gen/city.gen';
import { createAdUser } from './../gen/ad.gen';
import { createSfUser } from './../gen/sf.gen';

export const createUserFun = {
  aka: createAkaUser,
  es: createEsUser,
  city: createCityUser,
  ad: createAdUser,
  sf: createSfUser,
};

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * Math.floor(max - min + 1) + min);
}

export const createCheckDigit = (param: number): number => {
  const rawCheckDigit: number = param
    .toString()
    .split('')
    .reduce((accumulator, currChar, currIndex) => {
      let digitWeight = Number(currChar) * ((currIndex % 2) + 1);

      return (accumulator += digitWeight > 9 ? digitWeight - 9 : digitWeight);
    }, 0);

  return rawCheckDigit % 10 ? 10 - (rawCheckDigit % 10) : 0;
};

export function getRandomFieldFromWeightedObj(array: any[], weights: number[]) {
  const unWeightedArray: string[] = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < weights[i]; j++) {
      unWeightedArray.push(array[i]);
    }
  }

  return unWeightedArray[Math.floor(Math.random() * unWeightedArray.length)];
}

const utils = {
  randomElement: (array: any[]): any => {
    return array[Math.floor(Math.random() * array.length)];
  },

  randomArrFromArr: (array: any[][]): any => {
    const n = getRandomInt(1, array.length);
    return array.sort(() => Math.random() - Math.random()).slice(0, n);
  },

  generateID: (): string => {
    const tz: number = parseInt(utils.generateNumberAsString());
    return `${tz}${createCheckDigit(tz)}`;
  },

  generateNumberAsString: (min: number = 1000000, max: number = 9999999): string => {
    return faker.datatype.number({ min, max }).toString();
  },

  filterData: (data: object[], query: object) => {
    const filteredData = data.filter((record) => {
      for (const key in query) {
        if (!record[key] || !record[key].toString().includes(query[key])) {
          return false;
        }
      }

      return true;
    });

    return filteredData;
  },

  findInData: (data: object[], query: object, exact: boolean = true) => {
    const filteredData = data.find((record) => {
      let equal = true;
      for (const key in query) {
        if (exact) {
          if (!record[key] || !(record[key].toString() === query[key])) {
            equal = false;
          }
        } else {
          if (!record[key] || !record[key].toString().includes(query[key])) {
            equal = false;
          }
        }
      }

      return equal;
    });

    return filteredData;
  },
};

export default utils;
