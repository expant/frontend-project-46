import _ from 'lodash';

const formatOnType = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  if (typeof (val) === 'string') {
    return `'${val}'`;
  }
  return val;
};

const buildLine = (node, path) => {
  const { type, key } = node;

  switch (type) {
    case 'added': {
      const val = formatOnType(node.val);
      return `Property '${path}${key}' was added with value: ${val}`;
    }
    case 'removed': return `Property '${path}${key}' was removed`;
    case 'updated': {
      const val1 = formatOnType(node.val1);
      const val2 = formatOnType(node.val2);
      return `Property '${path}${key}' was updated. From ${val1} to ${val2}`;
    }
    case 'noChanged': return '';
    default: throw new Error(`Unknown type: ${type}`);
  }
};

const plain = (diff, path = '') => diff
  .map((node) => {
    const { type, key } = node;
    if (type === 'nested') {
      return plain(node.children, `${path}${key}.`);
    }
    return buildLine(node, path);
  })
  .filter((el) => el !== '')
  .join('\n');

export default plain;
