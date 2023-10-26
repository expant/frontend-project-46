import _ from 'lodash';

const genComplex = (node) => {
  if (!_.isObject(node)) return node;
  return Object
    .entries(node)
    .flatMap(([key, val]) => {
      const obj = { state: 'noChanged', key, val };
      if (!_.isObject(val)) return obj;
      return { ...obj, val: genComplex(val) };
    });
};

const genDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const diff = keys.flatMap((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return {
          state: 'noChanged',
          key,
          val: genDiff(obj1[key], obj2[key]),
        };
      }

      if (obj1[key] === obj2[key]) {
        return { state: 'noChanged', key, val: obj1[key] };
      }
      const val = genComplex(obj1[key]);
      const newVal = genComplex(obj2[key]);
      return {
        state: 'updated', key, val, newVal,
      };
    }

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      const val = _.isObject(obj1[key]) ? genComplex(obj1[key]) : obj1[key];
      return { state: 'removed', key, val };
    }
    const val = _.isObject(obj2[key]) ? genComplex(obj2[key]) : obj2[key];
    return { state: 'added', key, val };
  });
  return _.sortBy(diff, 'key');
};

export default genDiff;
