import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import genDiff from './genDiff.js';
import chooseFormat from './formatters/index.js';
import parse from './parsers.js';

const extractFormat = (file, filepath) => {
  const extnameWithDot = extname(filepath);
  return extnameWithDot.slice(1, extnameWithDot.length);
};

const readFile = (filepath) => {
  const path = resolve(cwd(), '__fixtures__', filepath);
  const file = readFileSync(path, 'utf-8');
  const format = extractFormat(file, filepath);
  return parse(file, format);
};

export default (filepath1, filepath2, formatName) => {
  const format = chooseFormat(formatName);
  return format(
    genDiff(readFile(filepath1), readFile(filepath2)),
  );
};
