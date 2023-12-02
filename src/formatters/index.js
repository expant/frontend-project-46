import formatToStylish from './formatToStylish.js';
import formatToPlain from './formatToPlain.js';
import formatToJson from './formatToJson.js';

export default (formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish': return formatToStylish;
    case 'plain': return formatToPlain;
    case 'json': return formatToJson;
    default: throw new Error(`Unknown format name ${formatName}`);
  }
};
