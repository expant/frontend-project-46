const INDENTS_COUNT = 4;
const LEFT_SHIFT = 2;
const REPLACER = ' ';

const getIndents = (size) => {
  const indent = REPLACER.repeat(size);
  const indentWithSign = REPLACER.repeat(size - LEFT_SHIFT);
  const bracketIndent = REPLACER.repeat(size - INDENTS_COUNT);
  return [indent, indentWithSign, bracketIndent];
};

const buildLine = (node, indents) => {
  const { state, key, val } = node;
  const [indent, indentWithSign] = indents;
  let line;

  switch (state) {
    case 'updated': {
      const line1 = `${indentWithSign}- ${key}: ${val}`;
      const line2 = `${indentWithSign}+ ${key}: ${node.newVal}`;
      line = [line1, line2].join('\n');
      break;
    }
    case 'added':
      line = `${indentWithSign}+ ${key}: ${val}`;
      break;
    case 'removed':
      line = `${indentWithSign}- ${key}: ${val}`;
      break;
    case 'noChanged':
      line = `${indent}${key}: ${val}`;
      break;
    default: throw new Error(`Unknown state: ${state}`);
  }
  return line;
};

export default (diff) => {
  const iter = (node, depth) => {
    if (!Array.isArray(node)) return `${node}`;

    const indentSize = depth * INDENTS_COUNT;
    const [indent, indentWithSign, bracketIndent] = getIndents(indentSize);
    const lines = node.map((obj) => {
      const val = iter(obj.val, depth + 1);
      const line = buildLine({ ...obj, val }, [indent, indentWithSign]);
      return line;
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(diff, 1);
};
