import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import path from 'node:path';

import gendiff from './genDiff.js';

export default (filepath1, filepath2) => {
  const path1 = path.resolve(cwd(), filepath1);
  const path2 = path.resolve(cwd(), filepath2);

  const file1 = readFileSync(path1, 'utf-8');
  const file2 = readFileSync(path2, 'utf-8');

  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  return gendiff(obj1, obj2);
};
