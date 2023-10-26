const INDENTS_COUNT = 4;
const LEFT_SHIFT = 2;
const REPLACER = ' ';

export default (diff) => {
  const iter = (node, depth) => {
    if (!Array.isArray(node)) {
      return `${node}`;
    }

    const indentSize = depth * INDENTS_COUNT;
    const indent = REPLACER.repeat(indentSize);
    const indentWithSign = REPLACER.repeat(indentSize - LEFT_SHIFT);
    const bracketIndent = REPLACER.repeat(indentSize - INDENTS_COUNT);

    const lines = node.map((line) => {
      const { state, key } = line;
      const val = iter(line.val, depth + 1);

      switch (state) {
        case 'updated':
          const line1 = `${indentWithSign}- ${key}: ${val}`;
          const line2 = `${indentWithSign}+ ${key}: ${line.newVal}`;
          return [line1, line2].join('\n');
        case 'added': return `${indentWithSign}+ ${key}: ${val}`;
        case 'removed': return `${indentWithSign}- ${key}: ${val}`;
        case 'noChanged': return `${indent}${key}: ${val}`;
        default:
      }
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(diff, 1);
};
