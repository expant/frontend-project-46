import genDiff from '../genDiff.js';
import plain from './plain.js';
import stylish from './stylish.js';

export default (obj1, obj2, formatName) => {
  const diff = genDiff(obj1, obj2);
  if (formatName === 'plain') {
    return plain(diff);
  }
  return stylish(diff);
};