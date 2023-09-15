import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';

import genDiff from './genDiff.js';
import genStylishFormat from './formatters/stylish.js';
import parse from './parsers.js';

const getFile = (filepath) => {
  const path = resolve(cwd(), '__fixtures__', filepath);
  const file = readFileSync(path, 'utf-8');
  return file;
};

export default (filepath1, filepath2, format) => {
  const file1 = getFile(filepath1);
  const file2 = getFile(filepath2);

  const obj1 = parse(file1, extname(filepath1));
  const obj2 = parse(file2, extname(filepath2));

  const diff = genDiff(obj1, obj2);
  if (format === 'stylish') {
    return genStylishFormat(diff);
  }

  return 'plain format';
};
