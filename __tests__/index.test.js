// @ts-nocheck

import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedStylishFormat = readFileSync(getFixturePath('expectedStylishFormat.txt'), 'utf-8');
const expectedPlainFormat = readFileSync(getFixturePath('expectedPlainFormat.txt'), 'utf-8');
const expectedJSONFormat = readFileSync(getFixturePath('expectedJSONFormat.txt'), 'utf-8');

test.each(['json', 'yml', 'yaml'])('gendiff with %s format', (format) => {
  const filepath1 = `file1.${format}`;
  const filepath2 = `file2.${format}`;

  expect(genDiff(filepath1, filepath2)).toBe(expectedStylishFormat);
  expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedStylishFormat);
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlainFormat);
  expect(genDiff(filepath1, filepath2, 'json')).toBe(expectedJSONFormat);
});
