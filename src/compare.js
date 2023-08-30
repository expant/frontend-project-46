import _ from 'lodash';

export default (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const result = keys
    .reduce((acc, key) => {
      if (_.has(obj1, key) && _.has(obj2, key)) {
        const prop1 = `${key}: ${obj1[key]}`;
        const prop2 = `${key}: ${obj2[key]}`;
        return obj1[key] === obj2[key] 
          ? [...acc, [' ', prop1]]
          : [...acc, ['-', prop1], ['+', prop2]];
      }

      if (_.has(obj1, key) && !_.has(obj2, key)) {
        const prop = `${key}: ${obj1[key]}`;
        return [...acc, ['-', prop]];
      }
      const prop = `${key}: ${obj2[key]}`;
      return [...acc, ['+', prop]];
    }, [])
    .sort((a, b) => (a[1][0] === b[1][0] ? 1 : a[1].localeCompare(b[1])))
    .map((line) => `  ${line[0]} ${line[1]}`)
    .join('\n');

  return `{\n${result}\n}`;
};
