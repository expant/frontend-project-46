import _ from 'lodash';

const getSign = (state) => {
  switch (state) {
    case 'added': return '+';
    case 'removed': return '-';
    case 'noChanged': return '';
    default: return;
  }
};

export default (diff, replacer = ' ', indentsCount = 4) => {
  const leftShift = 2;
  const iter = (currentNode, depth) => {
    if (!Array.isArray(currentNode)) {
      return `${currentNode}`;
    }

    const indentSize = depth * indentsCount;
    const indent = replacer.repeat(indentSize);
    const indentWithSign = replacer.repeat(indentSize - leftShift);
    const bracketIndent = replacer.repeat(indentSize - indentsCount);

    const lines = currentNode.map((line) => {
      const { state, key } = line;
      const val = iter(line.val, depth + 1);

      if (state === 'updated') {
        const line1 = `${indentWithSign}${getSign(state)} ${key}: ${val}`;
        const line2 = `${indentWithSign}${getSign(state)} ${key}: ${line.newVal}`;
        return [line1, line2].join('\n');
      }

      return `${indent}${getSign(state)} ${key}: ${val}`;
    });
    
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return `{\n${iter(diff, 1)}}`;
};




// if (Array.isArray(currentNode)) {
    //   const formattedNode = currentNode.reduce((acc, node) => {
    //     const { sign, key, val } = node;

    //     const leftSide = sign !== ''
    //       ? `${acc}${indentWithSign}${sign} ${key}: ` : `${acc}${indent}${sign}${key}: `;

    //     if (!Array.isArray(val) && !_.isObject(val)) {
    //       return `${leftSide}${val}\n`;
    //     }

    //     const nextNode = iter(val, depth + 1);
    //     return nextNode[0] === '{'
    //       ? `${leftSide}${nextNode}\n`
    //       : `${leftSide}{\n${nextNode}${indent}}\n`;
    //   }, '');

    //   return formattedNode;
    // }

    // const bracketIndent = replacer.repeat(indentSize - indentsCount);
    // const lines = Object
    //   .entries(currentNode)
    //   .map(([key, val]) => `${indent}${key}: ${iter(val, depth + 1)}`);

    // return [
    //   '{',
    //   ...lines,
    //   `${bracketIndent}}`,
    // ].join('\n');
