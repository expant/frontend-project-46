import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const diff = keys.flatMap((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return { sign: '', key, val: genDiff(obj1[key], obj2[key]) };
      }

      if (obj1[key] === obj2[key]) {
        return { sign: '', key, val: obj1[key] };
      }
      return { sign: '', key, prevVal: obj1[key], newVal: obj2[key] };
      // const prop1 = { sign: '-', key, val: obj1[key] };
      // const prop2 = { sign: '+', key, val: obj2[key] };
      // return obj1[key] === obj2[key] ? { ...prop1, sign: '' } : [prop1, prop2];
    }

    const isComplex = true; 
    const complexObj1 = { sign: '-', key, val: _.cloneDeep(obj1[key]), isComplex };
    const complexObj2 = { sign: '+', key, val: _.cloneDeep(obj2[key]), isComplex };
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return complexObj1;
    }
    return complexObj2;
  });
  return _.sortBy(diff, 'key');
};


export default genDiff;

