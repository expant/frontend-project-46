import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

export default (formatName) => {
  switch (formatName) {
    case 'plain': return plain;
    case 'stylish': return stylish;
    case 'json': return json;
    default:
      throw new Error(`Unknown formatName: ${formatName}`);
  }
};
