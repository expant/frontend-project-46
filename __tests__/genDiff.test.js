// @ts-check

import { test, expect } from '@jest/globals';
import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('empty objects', () => {
  expect(gendiff({}, {})).toBe('{}');
});

test('gendiff', () => {
  const expected1 = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  const expected2 = `{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`;

  const file1 = readFileSync(getFixturePath('file1.json'), 'utf-8');
  const file2 = readFileSync(getFixturePath('file2.json'), 'utf-8');
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  expect(gendiff(obj1, obj2)).toBe(expected1);
  expect(gendiff(obj1, {})).toBe(expected2);
});
