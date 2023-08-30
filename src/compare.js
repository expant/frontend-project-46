import _ from 'lodash';

export default (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const diff = keys
    .reduce((acc, key) => {
      const prop1 = `${key}: ${obj1[key]}`;
      const prop2 = `${key}: ${obj2[key]}`;

      if (_.has(obj1, key) && _.has(obj2, key)) {
        return obj1[key] === obj2[key]
          ? [...acc, [' ', prop1]]
          : [...acc, ['-', prop1], ['+', prop2]];
      }

      if (_.has(obj1, key) && !_.has(obj2, key)) {
        return [...acc, ['-', prop1]];
      }
      return [...acc, ['+', prop2]];
    }, [])
    .sort(([, prop1], [, prop2]) => (prop1[0] === prop2[0] ? 1 : prop1.localeCompare(prop2)))
    .map(([sign, prop]) => `  ${sign} ${prop}`)
    .join('\n');

  return `{\n${diff}\n}`;
};
