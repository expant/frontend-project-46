import _ from 'lodash';

export default (diff, replacer = ' ', indentsCount = 4) => {
  const leftShift = 1;
  const iter = (currentNode, depth) => {
    if (!_.isObject(currentNode) && !Array.isArray(currentNode)) {
      return `${currentNode}`;
    }

    if (Array.isArray(currentNode)) {
      const formattedNode = currentNode.reduce((acc, node) => {
        const { sign, key, val } = node; 
        const indentSize = sign !== '' ? depth * indentsCount - leftShift : depth * indentsCount;
        const indent = replacer.repeat(indentSize);
        
        const leftSide = `${acc}${indent}${sign} ${key}: `; 
  
        if (!Array.isArray(val) && !_.isObject(val)) {
          return `${leftSide}${val}\n`;
        }
          
        const nextNode = iter(val, depth + 1);
        return nextNode[0] === '{' 
          ? `${leftSide}${nextNode}\n`
          : `${leftSide}{\n${nextNode}${indent}} \n`; 
      }, '');
  
      return formattedNode;
    }

    const indentSize = depth * indentsCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - indentsCount);
    const lines = Object
      .entries(currentNode)
      .map(([key, val]) => `${currentIndent} ${key}: ${iter(val, depth + 1)}`); 
      
    return [
      '{',
      ...lines,
      `${bracketIndent} }`,
    ].join('\n');
  
  };
  
  return `{\n${iter(diff, 1)}}`;
};

