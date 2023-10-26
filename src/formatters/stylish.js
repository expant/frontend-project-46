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
      let result;

      switch (state) {
        case 'updated': {
          const line1 = `${indentWithSign}- ${key}: ${val}`;
          const line2 = `${indentWithSign}+ ${key}: ${line.newVal}`;
          result = [line1, line2].join('\n');
          break;
        }
        case 'added':
          result = `${indentWithSign}+ ${key}: ${val}`;
          break;
        case 'removed':
          result = `${indentWithSign}- ${key}: ${val}`;
          break;
        case 'noChanged':
          result = `${indent}${key}: ${val}`;
          break;
        default: throw new Error(`Unknown state: ${state}`);
      }
      return result;
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(diff, 1);
};
