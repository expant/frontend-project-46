import { readFileSync } from 'node:fs';
// import path from 'node:path';
import { cwd } from 'node:process';

import compare from './compare.js';

export default (filepath1, filepath2) => {
  const path1 = `${cwd()}/src/files/${filepath1}`;
  const path2 = `${cwd()}/src/files/${filepath2}`;

  const file1 = readFileSync(path1, { encoding: 'utf-8' });
  const file2 = readFileSync(path2, { encoding: 'utf-8' });

  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  return compare(obj1, obj2);
};
