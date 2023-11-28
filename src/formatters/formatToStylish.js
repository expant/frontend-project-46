import _, { entries } from 'lodash';

const INDENTS_COUNT = 4;
const LEFT_SHIFT = 2;
const REPLACER = ' ';

const getIndents = (size) => {
  // const indent = REPLACER.repeat(size);
  const indent = REPLACER.repeat(size - LEFT_SHIFT);
  const bracketIndent = REPLACER.repeat(size - INDENTS_COUNT);
  return [indent, bracketIndent];
};

const signs = {
  added: '+',
  removed: '-',
  noChanged: ' ',
};

const stringify = (data, type) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const [indent, bracketIndent] = getIndents()
  return Object
    .entries(data)
    .map(([key, val]) => {
      return `${indent}${signs[type]} ${key}: ${stringify(val)}`
    });
};

export default (diff) => {
  const iter = (node, depth) => {
    if (!Array.isArray(node)) return `${node}`;

    const indentSize = depth * INDENTS_COUNT;
    const [indent, indentWithSign, bracketIndent] = getIndents(indentSize);
    const lines = node.map((obj) => {
      const { type, key } = obj;
      switch (type) {
        case 'added': return `${indentWithSign}${signs.added} ${key}: ${stringify(obj.val)}`; // stringify()
        case 'removed': return `${indentWithSign}${signs.removed} ${key}: ${stringify(obj.val)}`; // stringify()
        case 'updated': {
          const val1 = stringify(obj.val1);
          const val2 = stringify(obj.val2);
          const line1 = `${indentWithSign}- ${key}: ${val1}`; // stringify()
          const line2 = `${indentWithSign}+ ${key}: ${val2}`; // stringify()
          return [line1, line2].join('\n');
        }
        case 'nested': {
          const children = iter(obj.children, depth + 1);
          return `${indent}${key}: ${children}`; 
        }
        case 'noChanged': return `${indent}${key}: ${stringify(obj.val)}`;
        default: throw new Error(`Unknown type: ${type}`);   
      }
    }); 
    return `{\n${lines.join('\n')}\n${bracketIndent}}`
  };
  return iter(diff, 1);
};
