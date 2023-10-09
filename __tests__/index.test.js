// @ts-nocheck

import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

import genDiff from '../src/genDiff.js';
import genStylishFormat from '../src/formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff /.json', () => {
  const file1 = readFileSync(getFixturePath('file1.json'), 'utf-8');
  const file2 = readFileSync(getFixturePath('file2.json'), 'utf-8');
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  const expectedFile1 = readFileSync(getFixturePath('expectedFile1.txt'), 'utf-8');
  const diff = genDiff(obj1, obj2);
  expect(genStylishFormat(diff)).toEqual(expectedFile1);
});

test('gendiff /.yml /.yaml', () => {
  const file1 = readFileSync(getFixturePath('file1.yml'), 'utf-8');
  const file2 = readFileSync(getFixturePath('file2.yaml'), 'utf-8');
  const obj1 = yaml.load(file1);
  const obj2 = yaml.load(file2);

  const expectedFile1 = readFileSync(getFixturePath('expectedFile1.txt'), 'utf-8');
  const diff = genDiff(obj1, obj2);
  expect(genStylishFormat(diff)).toEqual(expectedFile1);
});
