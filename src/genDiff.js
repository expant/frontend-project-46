import _ from 'lodash';

const genComplex = (node) => {
  if (!_.isObject(node)) return node;
  return Object
    .entries(node)
    .flatMap(([key, val]) => {
      const obj = { type: 'noChanged', key, val };
      if (!_.isObject(val)) return obj;
      return { ...obj, children: genComplex(val) };
    });
};

const checkWithEqualKeys = (data1, data2, key) => {
  const valObj1 = data1[key];
  const valObj2 = data2[key];

  if (valObj1 === valObj2) {
    return { type: 'noChanged', key, val: valObj1 };
  }

  const val1 = genComplex(valObj1);
  const val2 = genComplex(valObj2);
  return {
    type: 'updated', key, val1, val2,
  };
};

const genDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const diff = keys.map((key) => {
    if (!_.has(data1, key)) {
      const val = _.isObject(data2[key]) ? genComplex(data2[key]) : data2[key];
      return { type: 'added', key, val };
    }

    if (!_.has(data2, key)) {
      const val = _.isObject(data1[key]) ? genComplex(data1[key]) : data1[key];
      return { type: 'removed', key, val };
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
