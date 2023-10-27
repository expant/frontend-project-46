import genDiff from '../genDiff.js';
import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

export default (obj1, obj2, formatName) => {
  const diff = genDiff(obj1, obj2);
  switch (formatName) {
    case 'plain': return plain(diff);
    case 'stylish': return stylish(diff);
    case 'json': return json(diff);
    default: 
      throw new Error(`Unknown formatName: ${formatName}`);
  }
};
