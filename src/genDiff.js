import _ from 'lodash';

const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return { type: 'added', key, val: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { type: 'removed', key, val: data1[key] };
    }

    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      const children = genDiff(data1[key], data2[key]);
      return { type: 'nested', key, children };
    }
    if (data1[key] !== data2[key]) {
      return {
        type: 'updated', key, val1: data1[key], val2: data2[key],
      };
    }
    return { type: 'unchanged', key, val: data1[key] };
  });
};

export default genDiff;
