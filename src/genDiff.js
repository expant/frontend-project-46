import _ from 'lodash';

const iter = (currentObj1, currentObj2) => {
  const keys = _.union(_.keys(currentObj1), _.keys(currentObj2));

  const diff = keys.flatMap((key) => {
    if (_.has(currentObj1, key) && _.has(currentObj2, key)) {
      if (_.isObject(currentObj1[key]) && _.isObject(currentObj2[key])) {
        return { sign: '', key, val: iter(currentObj1[key], currentObj2[key]) };
      }

      const prop1 = { sign: '-', key, val: currentObj1[key] };
      const prop2 = { sign: '+', key, val: currentObj2[key] };
      return currentObj1[key] === currentObj2[key] ? { ...prop1, sign: '' } : [prop1, prop2];
    }

    if (_.has(currentObj1, key) && !_.has(currentObj2, key)) {
      return { sign: '-', key, val: _.cloneDeep(currentObj1[key]) };
    }
    return { sign: '+', key, val: _.cloneDeep(currentObj2[key]) };
  });
  return _.sortBy(diff, 'key');
};

export default (obj1, obj2) => iter(obj1, obj2);
