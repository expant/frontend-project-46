// @ts-nocheck

import { test, expect } from '@jest/globals';
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

test('/.json /.yml /.yaml', () => {
  const jsonFile1 = readFileSync(getFixturePath('file1.json'), 'utf-8');
  const jsonFile2 = readFileSync(getFixturePath('file2.json'), 'utf-8');
  const obj1 = JSON.parse(jsonFile1);
  const obj2 = JSON.parse(jsonFile2);

  const ymlFile = readFileSync(getFixturePath('file1.yml'), 'utf-8');
  const yamlFile = readFileSync(getFixturePath('file2.yaml'), 'utf-8');
  const obj3 = yaml.load(ymlFile);
  const obj4 = yaml.load(yamlFile);

  const expectedStylishFormat = readFileSync(getFixturePath('expectedStylishFormat.txt'), 'utf-8');
  const expectedPlainFormat = readFileSync(getFixturePath('expectedPlainFormat.txt'), 'utf-8');
  const expectedJSONFormat = readFileSync(getFixturePath('expectedJSONFormat.txt'), 'utf-8');

  const jsonDiff = genDiff(obj1, obj2);
  const ymlDiff = genDiff(obj3, obj4);

  expect(genStylishFormat(jsonDiff)).toEqual(expectedStylishFormat);
  expect(genPlainFormat(jsonDiff)).toEqual(expectedPlainFormat);
  expect(genJSONFormat(jsonDiff)).toEqual(expectedJSONFormat);
  expect(genStylishFormat(ymlDiff)).toEqual(expectedStylishFormat);
  expect(genPlainFormat(ymlDiff)).toEqual(expectedPlainFormat);
  expect(genJSONFormat(ymlDiff)).toEqual(expectedJSONFormat);
});
