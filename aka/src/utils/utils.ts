const utils = {
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
