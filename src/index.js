import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';

import gendiff from './genDiff.js';
import parse from './parsers.js';

const getFile = (filepath) => {
  const path = resolve(cwd(), filepath);
  const file = readFileSync(path, 'utf-8');
  return file;
};

export default (filepath1, filepath2) => {
  const file1 = getFile(filepath1);
  const file2 = getFile(filepath2);

  const obj1 = parse(file1, extname(filepath1));
  const obj2 = parse(file2, extname(filepath2));

  return gendiff(obj1, obj2);
};
