// @ts-nocheck

import { test, expect, describe } from '@jest/globals';
import path, { dirname } from 'path';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

import genDiff from '../src/genDiff.js';
import genStylishFormat from '../src/formatters/stylish.js';
import genPlainFormat from '../src/formatters/plain.js';
import genJSONFormat from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each(['json', 'yml', 'yaml'])('gendiff %s format', (format) => {
  const filepath1 = readFileSync(getFixturePath(`file1.${format}`), 'utf-8');
  const filepath2 = readFileSync(getFixturePath(`file2.${format}`), 'utf-8');
  
  const data1 = format === 'json' ? JSON.parse(filepath1) : yaml.load(filepath1);
  const data2 = format === 'json' ? JSON.parse(filepath2) : yaml.load(filepath2);

  const diff = JSON.parse(expectedJSONFormat);
  expect(genDiff(data1, data2)).toEqual(diff);
  expect(genDiff(data1, data2)).toEqual(diff);
  expect(genDiff(data1, data2)).toEqual(diff);
});


// const expectedStylishFormat = readFileSync(getFixturePath('expectedStylishFormat.txt'), 'utf-8');
// const expectedPlainFormat = readFileSync(getFixturePath('expectedPlainFormat.txt'), 'utf-8');
// const expectedJSONFormat = readFileSync(getFixturePath('expectedJSONFormat.txt'), 'utf-8');