import _ from 'lodash';

const getIndent = (depth) => {
  const indentsCount = 4
  const leftShift = 2;
  const replacer = ' ';

  return {
    indent: replacer.repeat(depth * indentsCount),
    indentWithSign: replacer.repeat((depth * indentsCount) - leftShift),
  }
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) return `${data}`;
  const lines = Object
    .entries(data)
    .map(([key, val]) => {
      const { indent } = getIndent(depth + 1);
      const value = stringify(val, depth + 1);
      return `${indent}${key}: ${value}`;
    });

  return `{\n${lines.join('\n')}\n${getIndent(depth).indent}}`;
};

export default (diff) => {
  const iter = (node, depth) => {
    const { indent, indentWithSign } = getIndent(depth);

    const lines = node.map((obj) => {
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
        case 'noChanged': return `${indent}${key}: ${stringify(obj.val, depth)}`;
        default: throw new Error(`Unknown type: ${type}`);   
      }
    }); 
    return `{\n${lines.join('\n')}\n${indent}}`;
  };
  return iter(diff, 1);
};
