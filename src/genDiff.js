import _ from 'lodash';

const objToStrBySign = (obj) => {
  if (_.has(obj, 'sign')) {
    return `  ${obj.sign} ${obj.key}: ${obj.val}`;
  }
  return `    ${obj.key}: ${obj.val}`;
};

export default (obj1, obj2) => {
  const lengthObj1 = Object.keys(obj1).length;
  const lengthObj2 = Object.keys(obj1).length;
  if (lengthObj1 === 0 && lengthObj2 === 0) {
    return '{}';
  }

  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const diff = keys.reduce((acc, key) => {
    const prop1 = { key, val: obj1[key] };
    const prop2 = { key, val: obj2[key] };
    const propWithMinusSign = { sign: '-', ...prop1 };
    const propWithPlusSign = { sign: '+', ...prop2 };

    if (_.has(obj1, key) && _.has(obj2, key)) {
      return prop1.val === prop2.val
        ? [...acc, prop1]
        : [...acc, propWithMinusSign, propWithPlusSign];
    }

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return [...acc, propWithMinusSign];
    }
    return [...acc, propWithPlusSign];
  }, []);

  const sorted = _.sortBy(diff, 'key');
  const result = sorted.map(objToStrBySign).join('\n');
  return `{\n${result}\n}`;
};
