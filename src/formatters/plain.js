const formatOnType = (val) => {
  if (Array.isArray(val)) {
    return '[complex value]';
  }
  if (typeof (val) === 'string') {
    return `'${val}'`;
  }
  return val;
};

const buildLine = (node, path) => {
  const { state, key, val } = node;

  const newVal = formatOnType(val);
  switch (state) {
    case 'added':
      return `Property '${path}${key}' was added with value: ${newVal}`;
    case 'removed':
      return `Property '${path}${key}' was removed`;
    case 'updated': {
      const newValUpdated = formatOnType(node.newVal);
      return `Property '${path}${key}' was updated. From ${newVal} to ${newValUpdated}`;
    }
    case 'noChanged': return '';
    default: throw new Error(`Unknown state: ${state}`);
  }
};

const plain = (diff, path = '') => diff
  .map((node) => {
    const { state, key, val } = node;
    if (Array.isArray(val) && state === 'noChanged') {
      return plain(val, `${path}${key}.`);
    }
    return buildLine(node, path);
  })
  .filter((el) => el !== '')
  .join('\n');

export default plain;
