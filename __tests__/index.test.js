// @ts-nocheck

import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

import genDiff from '../src/genDiff.js';
import genStylishFormat from '../src/formatters/stylish.js';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// test('json file parsing', () => {
//   const jsonFile = readFileSync(getFixturePath('file1.json'), 'utf-8');
 
//   const expectedJsonFile = JSON.parse(jsonFile);
//   const jsonFormat = path.extname('file1.json');
//   expect(parse(jsonFile, jsonFormat)).toEqual(expectedJsonFile);
// });

// test('yml/yaml files parsing', () => {
//   const ymlFile = readFileSync(getFixturePath('file2.yml'), 'utf-8');
//   const yamlFile = readFileSync(getFixturePath('file2.yaml'), 'utf-8');

//   const expectedYmlFile = yaml.load(ymlFile);
//   const ymlFormat = path.extname('file2.yml');
//   expect(parse(ymlFile, ymlFormat)).toEqual(expectedYmlFile);

//   const expectedYamlFile = yaml.load(yamlFile);
//   const yamlFormat = path.extname('file2.yaml');
//   expect(parse(yamlFile, yamlFormat)).toEqual(expectedYamlFile);
// });

test('gendiff', () => {
  const file1 = readFileSync(getFixturePath('file1.json'), 'utf-8');
  const file2 = readFileSync(getFixturePath('file2.json'), 'utf-8');
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  const expectedFile1 = readFileSync(getFixturePath('expectedFile1.txt'), 'utf-8');
  const diff = genDiff(obj1, obj2);
  expect(genStylishFormat(diff)).toEqual(expectedFile1); 
});
