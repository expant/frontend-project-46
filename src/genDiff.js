import _ from 'lodash';

export default (obj1, obj2) => {
  const iter = (currentObj1, currentObj2, isSigns = true) => {
    const keys = _.union(_.keys(currentObj1), _.keys(currentObj2)); 

    const diff = keys.map((key) => {

      if (_.has(currentObj1, key) && _.has(currentObj2, key)) {
        if (_.isObject(currentObj1[key]) && _.isObject(currentObj2[key])) {
          return { sign: '', [key]: iter(currentObj1[key], currentObj2[key]) }
        }

        const prop1 = { sign: '-', [key]: currentObj1[key] };
        const prop2 = { sign: '+', [key]: currentObj2[key] };
        return prop1[key] === prop2[key] 
          ? { sign: '', [key]: currentObj1[key] } : [prop1, prop2];
      }

      if (_.has(currentObj1, key) && !_.has(currentObj2, key)) {
        return { sign: '-', [key]: _.cloneDeep(currentObj1[key]) };
      }
      return { sign: '+', [key]: _.cloneDeep(currentObj2[key]) };
      })
      .flat();

    // console.log(JSON.stringify(diff));
    return diff;
    
    // const sortedDiff = _.sortBy(diff, );
    // return sortedDiff;
  };

  console.log(JSON.stringify(iter(obj1, obj2)));
  return iter(obj1, obj2);
};


