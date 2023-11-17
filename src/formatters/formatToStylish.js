const INDENTS_COUNT = 4;
const LEFT_SHIFT = 2;
const REPLACER = ' ';

const getIndents = (size) => {
  const indent = REPLACER.repeat(size);
  const indentWithSign = REPLACER.repeat(size - LEFT_SHIFT);
  const bracketIndent = REPLACER.repeat(size - INDENTS_COUNT);
  return [indent, indentWithSign, bracketIndent];
};

const stringify = (data) => {
  
};

const buildLine = (node, indents) => {
  const { type, key } = node;
  const [indent, indentWithSign] = indents;

  switch (type) {
    case 'updated': {
      const line1 = `${indentWithSign}- ${key}: ${node.val1}`;
      const line2 = `${indentWithSign}+ ${key}: ${node.val2}`;
      return [line1, line2].join('\n');
    }
    case 'added': return `${indentWithSign}+ ${key}: ${node.val}`;
    case 'removed': return `${indentWithSign}- ${key}: ${node.val}`;
    case 'noChanged': return `${indent}${key}: ${node.val}`;
    case 'nested': return `${indent}${key}: ${node.children}`;
    default: throw new Error(`Unknown type: ${type}`);
  }
};

export default (diff) => {
  const iter = (node, depth) => {
    if (!Array.isArray(node)) return `${node}`;

    const indentSize = depth * INDENTS_COUNT;
    const [indent, indentWithSign, bracketIndent] = getIndents(indentSize);
    const lines = node.map((obj) => {
      if (obj.type === 'updated') {
        const val1 = iter(obj.val1, depth + 1);
        const val2 = iter(obj.val2, depth + 1);
        return buildLine({ ...obj, val1, val2 }, [indent, indentWithSign]);
      }
      if (obj.type === 'nested') {
        const children = iter(obj.children, depth + 1);
        return buildLine({ ...obj, children }, [indent, indentWithSign]);
      }
      const val = iter(obj.val, depth + 1);
      return buildLine({ ...obj, val }, [indent, indentWithSign]);
    });

    return `{\n${lines.join('\n')}\n ${bracketIndent}}`
  };

  return iter(diff, 1);
};
