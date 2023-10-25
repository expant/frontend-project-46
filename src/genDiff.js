import _ from 'lodash';

const genComplex = (obj) => {
  return Object
    .entries(obj)
    .flatMap(([key, val]) => {
      const state = 'noChanges';
      if (!_.isObject(val)) {
        return { state, key, val };
      }
      return genComplex(val);
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
      return { state: 'updated', key, val: obj1[key], newVal: obj2[key] };
    }

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { state: 'removed', key, val: genComplex(obj1[key]) };
    }  
    return { state: 'added', key, val: genComplex(obj2[key]) };
  });
  return _.sortBy(diff, 'key');
};
 
export default genDiff;

