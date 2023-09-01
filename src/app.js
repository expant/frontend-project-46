import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

import genDiff from './genDiff.js';

export default (filepath1, filepath2) => {
  const path1 = resolve(cwd(), filepath1);
  const path2 = resolve(cwd(), filepath2);

  const file1 = readFileSync(path1, 'utf-8');
  const file2 = readFileSync(path2, 'utf-8');

  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  return genDiff(obj1, obj2);
};
