const INDENTS_COUNT = 4;
const LEFT_SHIFT = 2;
const REPLACER = ' ';

const getIndents = (size) => {
  const indent = REPLACER.repeat(size);
  const indentWithSign = REPLACER.repeat(size - LEFT_SHIFT);
  const bracketIndent = REPLACER.repeat(size - INDENTS_COUNT);
  return [indent, indentWithSign, bracketIndent];
};

// const stringify = (data) => {
  
// };

export default (diff) => {
  const iter = (node, depth) => {
    if (!Array.isArray(node)) return `${node}`;

    const indentSize = depth * INDENTS_COUNT;
    const [indent, indentWithSign, bracketIndent] = getIndents(indentSize);
    const lines = node.map((obj) => {
      const { type, key } = obj;
      switch (type) {
        case 'added': return `${indentWithSign}+ ${key}: ${iter(obj.val, depth + 1)}`;
        case 'removed': return `${indentWithSign}- ${key}: ${iter(obj.val, depth + 1)}`;
        case 'updated': {
          const val1 = iter(obj.val1, depth + 1);
          const val2 = iter(obj.val2, depth + 1);
          const line1 = `${indentWithSign}- ${key}: ${val1}`;
          const line2 = `${indentWithSign}+ ${key}: ${val2}`;
          return [line1, line2].join('\n');
        }
        case 'nested': {
          const children = iter(obj.children, depth + 1);
          return `${indent}${key}: ${children}`;
        }
        case 'noChanged': return `${indent}${key}: ${iter(obj.val, depth + 1)}`;
        default: throw new Error(`Unknown type: ${type}`);   
      }
    }); 
    return `{\n${lines.join('\n')}\n${bracketIndent}}`
  };
  return iter(diff, 1);
};
