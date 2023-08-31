// @ts-check

import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';

test('gendiff', () => {
  const obj1 = { name: 'Anton', age: 23 };
  const obj2 = { sex: 'male' };
  const correct1 = `{
  - age: 23
  - name: Anton
  + sex: male
}`

  const obj3 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  const obj4 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };

  const correct2 = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(obj1, obj2)).toBe(correct1);
  expect(genDiff(obj3, obj4)).toBe(correct2);
});
