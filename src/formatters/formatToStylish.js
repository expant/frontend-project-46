import _ from 'lodash';

const INDENTS_COUNT = 4;
const LEFT_SHIFT = 2;
const REPLACER = '*';

const getIndent = (depth, size) => REPLACER.repeat(depth * size);

// indentWithSign: REPLACER.repeat((depth * size) - LEFT_SHIFT),
 
// const getIndents = (size) => {
//   // const indent = REPLACER.repeat(size);
//   const indent = REPLACER.repeat(size - LEFT_SHIFT);
//   const bracketIndent = REPLACER.repeat(size - INDENTS_COUNT);
//   return [indent, bracketIndent];
// };

const signs = {
  added: '+',
  removed: '-',
  noChanged: ' ',
};

const stringify = (data, type, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const lines = Object
    .entries(data)
    .map(([key, val]) => {
      console.log(getIndent(depth + 1));
      return `${getIndent(depth + 1)}${signs[type]} ${key}: ${stringify(val)}`
    });

  return `{\n${lines.join('\n')}\n${getIndent(depth + 1)}}`;
};

export default (diff) => {
  const iter = (node, depth) => {
    // const { indent, indentWithSign } = getIndent(depth, INDENTS_COUNT);
    const lines = node.map((obj) => {
      const { type, key } = obj;
      switch (type) {
        case 'added': return `${getIndent(depth)}+ ${key}: ${stringify(obj.val, type)}`; // stringify()
        case 'removed': return `${getIndent(depth)}- ${stringify(obj.val, type)}`; // stringify()
        case 'updated': {
          const val1 = stringify(obj.val1, 'removed');
          const val2 = stringify(obj.val2, 'added');
          const line1 = `${getIndent(depth)}- ${key}: ${val1}`; // stringify()
          const line2 = `${getIndent(depth)}+ ${key}: ${val2}`; // stringify()
          return [line1, line2].join('\n');
        }
        case 'nested': {
          const children = iter(obj.children, depth + 1);
          return `${getIndent(depth)}${key}: ${children}`; 
        }
        case 'noChanged': return `${getIndent(depth)}${key}: ${stringify(obj.val, type)}`;
        default: throw new Error(`Unknown type: ${type}`);   
      }
    }); 
    return `{\n${lines.join('\n')}\n${getIndent(depth)}}`;
  };
  return iter(diff, 0);
};
