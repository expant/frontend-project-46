import _ from 'lodash';

const indentsCount = 4;
const leftShift = 2;
const replacer = ' ';

const getIndent = (depth) => replacer.repeat(depth * indentsCount);
const getIndentWithSign = (depth) => replacer.repeat((depth * indentsCount) - leftShift);

const stringify = (data, depth) => {
  if (!_.isObject(data)) return `${data}`;
  const lines = Object
    .entries(data)
    .map(([key, val]) => {
      const indent = getIndent(depth + 2);
      const value = stringify(val, depth + 1);
      return `${indent}${key}: ${value}`;
    });

  return `{\n${lines.join('\n')}\n${getIndent(depth + 1)}}`;
};

export default (diff) => {
  const iter = (node, depth) => {
    const lines = node.map((obj) => {
      const indent = getIndent(depth + 1);
      const indentWithSign = getIndentWithSign(depth + 1);
      const { type, key } = obj;

      switch (type) {
        case 'added': return `${indentWithSign}+ ${key}: ${stringify(obj.val, depth)}`;
        case 'removed': return `${indentWithSign}- ${key}: ${stringify(obj.val, depth)}`;
        case 'updated': {
          const line1 = `${indentWithSign}- ${key}: ${stringify(obj.val1, depth)}`;
          const line2 = `${indentWithSign}+ ${key}: ${stringify(obj.val2, depth)}`;
          return [line1, line2].join('\n');
        }
        case 'nested': {
          const children = iter(obj.children, depth + 1);
          return `${indent}${key}: ${children}`;
        }
        case 'unchanged': return `${indent}${key}: ${stringify(obj.val, depth)}`;
        default: throw new Error(`Unknown type: ${type}`);
      }
    });
    const indent = getIndent(depth);
    return `{\n${lines.join('\n')}\n${indent}}`;
  };
  return iter(diff, 0);
};
