import _ from 'lodash';

const getValOnType = (node) => {
  if (!_.isObject(node)) return node;
  return Object
    .entries(node)
    .flatMap(([key, val]) => {
      if (!_.isObject(val)) return { type: 'noChanged', key, val };
      return { type: 'nested', key, children: getValOnType(val) };
    });
};

const checkWithEqualKeys = (data1, data2, key) => {
  const dataVal1 = data1[key];
  const dataVal2 = data2[key];

  if (dataVal1 !== dataVal2) {
    const val1 = getValOnType(dataVal1);
    const val2 = getValOnType(dataVal2);
    return {
      type: 'updated', key, val1, val2,
    };
  }
  return { type: 'noChanged', key, val: dataVal1 };
};

const genDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const diff = keys.map((key) => {
    if (!_.has(data1, key)) {
      return { type: 'added', key, val: getValOnType(data2[key]) };
    }
    if (!_.has(data2, key)) {
      return { type: 'removed', key, val: getValOnType(data1[key]) };
    }

    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      const children = genDiff(data1[key], data2[key]);
      return { type: 'nested', key, children };
    }
    return checkWithEqualKeys(data1, data2, key);
  });
  return _.sortBy(diff, 'key');
};

export default genDiff;
