import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const diff = keys.flatMap((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return { 
          key, 
          val: genDiff(obj1[key], obj2[key]) 
        };
      }

      if (obj1[key] === obj2[key]) {
        const val = obj1[key];
        return { key, val };
      }
      const prevVal = obj1[key];
      const newVal = obj2[key];
      return { state: 'updated', key, prevVal, newVal };
    }

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { state: 'removed', key, val: _.cloneDeep(obj1[key]) };
    }
    return { state: 'added', key, val: _.cloneDeep(obj2[key]) };
  });

  return _.sortBy(diff, 'key');
};

export default genDiff;

